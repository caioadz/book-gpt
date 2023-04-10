import weaviate from 'weaviate-ts-client';
import { Class } from './class.js';
var { encode } = await import('gpt-3-encoder')

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

export default { client: client };

export async function initialize() {
    await client.schema.classCreator()
        .withClass(Class.Book.schema())
        .do();
}

export async function destroy() {
    await client.schema.classDeleter()
        .withClassName(Class.Book.name())
        .do();
}

export async function create(chapter) {
    await client.data.creator()
        .withClassName(Class.Book.name())
        .withProperties({
            chapter_id: chapter.id,
            title: chapter.title,
            order: chapter.order,
            level: chapter.level,
            content: chapter.content,
            tokens: encode(chapter.content).length
        })
        .do();
}

export async function get(question, top, concept) {
    return await client.graphql.get()
        .withClassName(Class.Book.name())
        .withFields('title content')
        .withNearText({ concepts: [concept || question] })
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
                chapter_id: paragraph.chapter_id,
                title: paragraph.title,
                order: paragraph.order,
                level: paragraph.level,
                paragraph: paragraph.num,
                content: paragraph.content,
                tokens: encode(paragraph.content).length
            }
        });
    }

    async log() {
        console.log(this.objectsBatcher);
    }
    
    async complete() {
        await this.objectsBatcher.do();
    }
}