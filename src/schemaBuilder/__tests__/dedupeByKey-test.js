import { dedupeByKey } from '../dedupe';

describe('#dedupByKey', () => {
  it('should merge indexes with different propertyKeys but same name', () => {
    const firstIndex = {
      name: 'fooIndex',
      composite: false,
      unique: false,
      propertyKeys: [
        'bar'
      ]
    };

    const secondIndex = {
      name: 'fooIndex',
      composite: false,
      unqiue: false,
      propertyKeys: [
        'baz'
      ]
    };

    const result = dedupeByKey([firstIndex, secondIndex]);

    expect(result).toEqual([
      {
        name: 'fooIndex',
        composite: false,
        unique: false,
        propertyKeys: [
          'bar',
          'baz'
        ]
      }
    ]);
  });
});
