import { BookBatcher } from './database.js';
import { Reader } from './reader.js';

export async function insertPoe() {
    var book = Reader.buildPoe();
    await new Promise(r => setTimeout(r, 1000));
    insert(book);
}

export function insert(book) {
    var batcher = BookBatcher.create();

    Object.keys(book.chapters).forEach(chapter_id => {
        var chapter = book.chapters[chapter_id];
        var paragraphs = splitIntoParagraphs(chapter.content);

        paragraphs.forEach((paragraph, index) => {
            batcher.addParagraph({
                chapter_id: chapter_id,
                title: chapter.title,
                order: chapter.order,
                level: chapter.level,
                num: index,
                content: paragraph
            });
        });
    });

    batcher.complete();
}

export function insertSingle(chapter) {
    var batcher = BookBatcher.create();

    var paragraphs = splitIntoParagraphs(chapter.content);

    paragraphs.forEach((paragraph, index) => {
        console.log(index);

        batcher.addParagraph({
            chapter_id: chapter.id,
            title: chapter.title,
            order: chapter.order,
            level: chapter.level,
            num: index,
            content: paragraph
        });
    });

    batcher.complete();
}

function splitIntoParagraphs(content) {
    return content.split(/\n+/g).map(paragraph => paragraph.trim()).filter(paragraph => paragraph.length > 0);
}