import { dedupeByName } from '../dedupe';

describe('#dedupeByName', () => {
  it('should exclude vertex labels with identical names', () => {
    const labels = [
      { name: 'user' },
      { name: 'user' }
    ];

    const result = dedupeByName(labels);

    expect(result).toEqual([{ name: 'user' }]);
  });

  it('should exclude edge labels with identical names', () => {
    const edge = {
      name: 'author',
      multiplicity: 'ONE2MANY',
      directed: true
    };
    const edgeLabels = [edge, edge];
    const result = dedupeByName(edgeLabels);

    expect(result)
      .toEqual([edge]);
  });

  it('should exclude propertyKeys with identical names', () => {
    const propertyKey = {
      name: 'name',
      type: 'String',
      cardinality: 'SINGLE'
    };
    const propertyKeys = [propertyKey, propertyKey];
    const result = dedupeByName(propertyKeys);

    expect(result).toEqual([propertyKey]);
  });

  it('should exclude edgeIndexes with identical names', () => {
    const edgeIndex = {
      name: 'authorIndex',
      unique: false,
      composite: true,
      indexOnly: false
    };
    const edgeIndexes = [edgeIndex, edgeIndex];
    const result = dedupeByName(edgeIndexes);

    expect(result).toEqual([edgeIndex]);
  });

  it('should warn when mismatch occurs on a collision', () => {
    const edgeLabels = [
      {
        name: 'author',
        multiplicity: 'ONE2MANY',
        directed: true
      },
      {
        name: 'author',
        multiplicity: 'ONE2MANY',
        directed: false
      }
    ];

    expect(() => dedupeByName(edgeLabels)).toThrow();
  });
});
