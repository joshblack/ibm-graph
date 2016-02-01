import Query from './query';
import Authorization from './authorization';

const Session = async ({ auth, uri }) => {
  const { headers } = await Authorization({ auth, uri });
  const query = async ({ uri, method, json }) => {
    const result = await Query({ uri, method, json, headers });

    return result;
  };

  return {
    query
  };
};

export default Session;
