import { flattenVertex } from '../flatten';
import { UserVertex } from '../__fixtures__/vertices';

const validArray = (e) => {
  expect(e).toExist;
  expect(e.length).toBeGreaterThan(0);
};

describe('#flattenVertex', () => {
  it('should flatten a vertex into labels, property keys, and indexes', () => {
    const result = flattenVertex(UserVertex);

    expect(result)
      .toEqual({
        "vertexLabels": [
          {
            "name": "user"
          }
        ],
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
          }
        ],
        "propertyKeys": [
          {
            "name": "name",
            "dataType": "String",
            "cardinality": "SINGLE"
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
        "vertexIndexes": [
          {
            "propertyKeys": [
              "name"
            ],
            "name": "nameIndex",
            "unique": false,
            "composite": true
          }
        ]
      });
  });
});
