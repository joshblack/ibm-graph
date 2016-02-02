import invariant from 'invariant';
import areEqual from '../utils/areEqual';

const dedupeByName = (collection) => {
  const cache = {};

  return collection.reduce((acc, item) => {
    const { name } = item;

    if (cache[name]) {
      invariant(
        areEqual(item, cache[name]),
        'Mismatch occured between duplicate label entries. Expected %s, got %s',
        JSON.stringify(item, null, 2),
        JSON.stringify(cache[name], null, 2)
      );

      return acc;
    }

    cache[name] = item;

    return acc.concat(item);
  }, []);
};

const dedupeByKey = (collection) => {
  const keys = collection.reduce((acc, item) => {
    const { name, propertyKeys } = item;

    if (acc[name]) {
      acc[name].propertyKeys.push(...propertyKeys);

      return acc;
    }

    return {
      ...acc,
      [name]: item
    };
  }, {});

  return Object.keys(keys).map((key) => keys[key]);
};

const dedupeStrategy = {
  edgeLabels: dedupeByName,
  edgeIndexes: dedupeByName,
  propertyKeys: dedupeByName,
  vertexLabels: dedupeByName,
  vertexIndexes: dedupeByKey
};

export { dedupeByName };
export { dedupeByKey };
export { dedupeStrategy };

