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
        "propertyKeys": [
          {
            "name": "name",
            "dataType": "String",
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
          },
          {
            "name": "follows",
            "multiplicity": "MULTI",
            "directed": true
          }
        ]
      });
  });
});
