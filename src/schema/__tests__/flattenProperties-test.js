import { flattenProperties } from '../flatten';
import { NameProperty, TextProperty } from '../__fixtures__/properties';

describe('#flattenProperties', () => {
  it('can map a property definition to propertyKeys and vertexIndexes', () => {
    expect(flattenProperties([NameProperty]))
      .toEqual({
        propertyKeys: [
          {
            name: 'name',
            type: 'String',
            cardinality: 'SINGLE'
          }
        ],
        vertexIndexes: [
          {
            propertyKeys: [
              'name'
            ],
            name: 'nameIndex',
            unique: false,
            composite: true,
            indexOnly: false
          }
        ]
      });
  });

  it('should map multiple properties defined on a vertex', () => {
    const result = flattenProperties([NameProperty, TextProperty]);

    expect(result.propertyKeys).toExist;
    expect(result.vertexIndexes).toExist;
  });

  it('should handle invalid properties missing name, type or cardinality', () => {
    const result = () => flattenProperties([{}]);

    expect(result).toThrow();
  });

  it('should handle invalid indexes', () => {
    const result = () => flattenProperties([{
      name: 'foo',
      type: 'String',
      cardinality: 'SINGLE',
      index: {}
    }]);

    expect(result).toThrow();
  });

  it('should handle missing indexes', () => {
    const result = flattenProperties([{
      name: 'foo',
      type: 'String',
      cardinality: 'SINGLE',
    }]);

    expect(result.propertyKeys).toExist;
    expect(result.vertexIndexes).toExist;
  });
});
