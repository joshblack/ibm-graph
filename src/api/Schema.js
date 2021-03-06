import invariant from 'invariant';
import Session from './Session';

/**
 * Given a schema and set of indices, check to make sure that every property
 * key on the indices exist in the given schema.
 */
const checkForPropertyKey = (schema, indices) => {
  const { propertyKeys: schemaPropertyKeys } = schema;
  const currentPropertyKeys = schemaPropertyKeys.map(({ name }) => name);

  let missingPropertyKeys = [];

  indices.forEach((index) => {
    const { propertyKeys: indexPropertyKeys } = index;

    indexPropertyKeys.forEach((propertyKey) => {

      if (currentPropertyKeys.indexOf(propertyKey) === -1) {
        missingPropertyKeys.push(propertyKey);
      }
    })
  });

  invariant(
    missingPropertyKeys.length === 0,
    'You are trying to create an index for property keys that don\'t ' +
    'exist in your current schema. Trying to make an index for the property ' +
    'keys: ' + JSON.stringify(missingPropertyKeys)
  );
};

/**
 * Schema abstraction over the Schema REST endpoint. Allows you to create and
 * retrieve a schema.
 *
 * @param {Object} params
 * @param {Object} params.auth - Auth object used to create the Session
 * @param {String} params.uri - URI string for the service
 * @returns {Object}
 */
const Schema = async ({ auth, uri, debug }) => {
  const { query } = await Session({ auth, uri, debug });
  const schemaURI = `${uri}/schema`;

  const get = async () => {
    try {
      const { result } = await query({
        uri: schemaURI,
        method: 'GET'
      });

      return result.data[0];
    } catch (error) {
      return error;
    }
  };

  let schema = await get();

  const create = async (schemaMutation) => {
    const { vertexIndexes, edgeIndexes, ...rest } = schemaMutation;

    checkForPropertyKey(schema, edgeIndexes);
    checkForPropertyKey(schema, vertexIndexes);

    try {
      const { result } = await query({
        uri: schemaURI,
        method: 'POST',
        json: schemaMutation
      });

      schema = result.data[0];

      return result.data;
    } catch (error) {
      return error;
    }
  };

  return {
    get,
    create,
    schema
  };
};

export default Schema;

