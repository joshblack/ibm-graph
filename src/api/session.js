import Query from './Query';
import Auth from './Auth';

const Session = async ({ auth, uri }) => {
  const { headers } = await Auth({ auth, uri });
  const query = async ({ uri, method, json }) => {
    const result = await Query({ uri, method, json, headers });

    return result;
  };

  return {
    query
  };
};

export default Session;
