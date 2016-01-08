import Schema from '../index';
import { UserVertex, TweetVertex } from '../__fixtures__/vertices';

describe('#Schema', () => {
  it('should work', () => {
    const result = Schema(UserVertex, TweetVertex);

    expect(result)
      .toEqual({
        "edgeLabels": [
          {
            "name": "author",
            "multiplicity": "ONE2MANY",
            "directed": true
          },
          {
            "name": "follows",
            "multiplicity": "MULTI",
            "directed": true
          },
          {
            "name": "tweeted",
            "multiplicity": "MANY2ONE",
            "directed": true
          }
        ],
        "edgeIndexes": [
          {
            "name": "authorIndex",
            "unique": false,
            "composite": true,
            "indexOnly": false
          }
        ],
        "propertyKeys": [
          {
            "name": "name",
            "dataType": "String",
            "cardinality": "SINGLE"
          },
          {
            "name": "text",
            "dataType": "String",
            "cardinality": "SINGLE"
          },
          {
            "name": "time",
            "dataType": "Date",
            "cardinality": "SINGLE"
          }
        ],
        "vertexIndexes": [
          {
            "propertyKeys": [
              "name"
            ],
            "name": "nameIndex",
            "unique": false,
            "composite": true,
            "indexOnly": false
          },
          {
            "propertyKeys": [
              "text"
            ],
            "name": "textIndex",
            "unique": false,
            "composite": true,
            "indexOnly": false
          },
          {
            "propertyKeys": [
              "time"
            ],
            "name": "timeIndex",
            "unique": false,
            "composite": true,
            "indexOnly": false
          }
        ],
        "vertexLabels": [
          {
            "name": "user"
          },
          {
            "name": "tweet"
          }
        ]
      });
  });
});
