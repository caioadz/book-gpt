export class Class {
}

Class.Book = class {
    static name() {
        return 'Book';
    }

    static schema() {
        return {
            'class': 'Book',
            "vectorizer": "text2vec-openai",
            "moduleConfig": {
                "text2vec-openai": {
                    "model": "ada",
                    //"modelVersion": "002",
                    "type": "text"
                }
                /*"text2vec-openai": {  
                    "vectorizeClassName": false,
                    "model": "babbage",
                    "type": "text"
                }*/
            },
            'properties': [
                {
                    'name': 'chapter_id',
                    'dataType': ['string'],
                    "moduleConfig": {
                        "text2vec-openai": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    }
                },
                {
                    'name': 'title',
                    'dataType': ['string'],
                    "moduleConfig": {
                        "text2vec-openai": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    }
                },
                {
                    'name': 'order',
                    'dataType': ['int'],
                    "moduleConfig": {
                        "text2vec-openai": {
                            "skip": true,
                            "vectorizePropertyName": false
                        }
                    }
                },
                {
                    'name': 'level',
                    'dataType': ['int'],
                    "moduleConfig": {
                        "text2vec-openai": {
                            "skip": true,
                            "vectorizePropertyName": false
                        }
                    }
                },
                {
                    'name': 'paragraph',
                    'dataType': ['int'],
                    "moduleConfig": {
                        "text2vec-openai": {
                            "skip": true,
                            "vectorizePropertyName": false
                        }
                    }
                },
                {
                    'name': 'content',
                    'dataType': ['text'],
                    "moduleConfig": {
                        "text2vec-openai": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                },
                {
                    'name': 'tokens',
                    'dataType': ['int'],
                    "moduleConfig": {
                        "text2vec-openai": {
                            "skip": true,
                            "vectorizePropertyName": false
                        }
                    }
                }
            ]
        };
    }
}