import ePub from 'epub';

export class Reader {
    static buildLovecraft() {
        return new this('./docs/lovecraft-annual.epub');
    }

    static buildPoe() {
        return new this('./docs/edgar-allan-poe.epub');
    }

    constructor(filePath) {
        this.load(filePath);
    }

    load(filePath) {
        var epub = new ePub(filePath);
        
        epub.output = { 
            chapters: {} 
        };

        epub.on('end', function () {
            epub.flow.forEach(chapter => {
                epub.output.chapters[chapter.id] = chapter;
            });
        });

        epub.on('end', function () {
            Object.keys(epub.output.chapters).forEach(chapter_id => {
                epub.getChapter(chapter_id, (error, text) => {
                    epub.output.chapters[chapter_id].content = text.replace( /(<([^>]+)>)/ig, '');
                });
            });
        });

        epub.parse();

        this.metadata = epub.metadata;
        this.chapters = epub.output.chapters;

    }
}