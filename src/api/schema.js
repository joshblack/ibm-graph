import Session from './session';

const Schema = async ({ auth, uri }) => {
  const { query } = await Session({ auth, uri });
  const schemaURI = `${uri}/schema`;

  const get = async () => {
    try {
      const { result } = await query({
        uri: schemaURI,
        method: 'GET'
      });

      return result.data;
    } catch (error) {
      return error;
    }
  };

  const create = async (schema) => {
    try {
      const { result } = await query({
        uri: schemaURI,
        method: 'POST',
        json: schema
      });

      return result.data;
    } catch (error) {
      return error;
    }
  };

  return {
    get,
    create
  };
};

export default Schema;
