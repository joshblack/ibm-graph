import { flattenProperties } from '../flatten';
import { NameProperty, TextProperty } from '../__fixtures__/properties';

describe('#flattenProperties', () => {
  it('can map a property definition to propertyKeys and vertexIndexes', () => {
    expect(flattenProperties([NameProperty], 'vertexIndexes'))
      .toEqual({
        propertyKeys: [
          {
            name: 'name',
            dataType: 'String',
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
            composite: true
          }
        ]
      });
  });

  it('should map multiple properties defined on a vertex', () => {
    const result = flattenProperties([NameProperty, TextProperty], 'vertexIndexes');

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
      dataType: 'String',
      cardinality: 'SINGLE',
      index: {}
    }]);

    expect(result).toThrow();
  });

  it('should handle missing indexes', () => {
    const result = flattenProperties([{
      name: 'foo',
      dataType: 'String',
      cardinality: 'SINGLE',
    }]);

    expect(result.propertyKeys).toExist;
    expect(result.vertexIndexes).toExist;
  });
});
