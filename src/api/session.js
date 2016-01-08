import Query from './query';
import Authorization from './authorization';

const Session = async ({ auth }) => {
  const { headers } = await Authorization({ auth });
  const query = async ({ uri, method, json }) => {
    const result = await Query({ uri, method, json, headers });

    return result;
  };

  return {
    query
  };
};

export default Session;
