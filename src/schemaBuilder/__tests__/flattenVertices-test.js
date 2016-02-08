import { flattenVertices } from '../flatten';
import { UserVertex, TweetVertex } from '../__fixtures__/vertices';

describe('#flattenVertices', () => {
  it('should work', () => {
    const result = flattenVertices([UserVertex, TweetVertex]);

    expect(result)
      .toEqual({
        "edgeLabels": [
          {
            "name": "follows",
            "multiplicity": "MULTI",
            "directed": true
          },
          {
            "name": "tweeted",
            "multiplicity": "MANY2ONE",
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
          },
          {
            "name": "author",
            "multiplicity": "ONE2MANY",
            "directed": true
          }
        ],
        "edgeIndexes": [
          {
            "propertyKeys": [
              "followed"
            ],
            "name": "followedIndex",
            "unique": false,
            "composite": true
          },
          {
            "propertyKeys": [
              "followed"
            ],
            "name": "followedIndex",
            "unique": false,
            "composite": true
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
            "dataType": "Integer",
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
            "composite": true
          },
          {
            "propertyKeys": [
              "text"
            ],
            "name": "textIndex",
            "unique": false,
            "composite": true
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
