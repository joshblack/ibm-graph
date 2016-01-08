import Session from './session';

const { GDS_API_URL } = process.env;

const Schema = async ({ auth }) => {
  const uri = `${GDS_API_URL}/schema`
  const { query } = await Session({ auth });

  return {
    get: async () => await query({
      uri,
      method: 'GET'
    }),
    create: async (schema) => await query({
      uri,
      method: 'POST',
      json: { ...schema }
    })
  };
};

export default Schema;
