import weaviate from 'weaviate-ts-client';
import { Class } from './src/class.js';
var { encode } = await import('gpt-3-encoder')

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

export default { client: client };

export async function initialize() {
    await client.batch
        .objectsBatcher()
        .withObject(Class.Book.schema())
        .do();
}

export async function destroy() {
    await i.default.client.schema.classDeleter()
        .withClassName(Class.Book.name())
        .do();
}

export async function create(chapter) {
    await client.data.creator()
        .withClassName(Class.Book.name())
        .withProperties({
            title: chapter.title,
            order: chapter.order,
            level: chapter.level,
            content: chapter.content,
            tokens: encode(chapter.content).length
        })
        .do();
}

export async function get(question, top) {
    return await client.graphql.get()
        .withClassName(Class.Book.name())
        .withFields('content')
        .withNearText({ concepts: [question] })
        .withGenerate({ groupedTask: question })
        .withLimit(top)
        .do();
}

export class BookBatcher {
    static create() {
        return new this(client.batch.objectsBatcher());
    }

    constructor(objectsBatcher) {
        this.objectsBatcher = objectsBatcher;
    }

    addParagraph(paragraph) {
        this.objectsBatcher.withObject({
            class: Class.Book.name(),
            properties: {
                title: paragraph.title,
                order: paragraph.order,
                level: paragraph.level,
                paragraph: paragraph.num, //TODO
                content: paragraph.content,
                tokens: encode(paragraph.content).length
            }
        });
    }
    
    async complete() {
        await this.objectsBatcher.do();
    }
}