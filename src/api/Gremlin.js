import Session from './Session';

const Gremlin = async ({ auth, uri, debug }) => {
  const { query } = await Session({ auth, uri, debug });
  const gremlinURI = `${uri}/gremlin`;

  const run = async (gremlin) => {
    try {
      const { result } = await query({
        uri: gremlinURI,
        method: 'POST',
        body: { gremlin }
      });

      return result.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    run
  };
};

export default Gremlin;

