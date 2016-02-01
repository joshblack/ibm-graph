import Query from './query';

const Authorization = async ({ auth, uri }) => {
  const options = {
    uri: `${uri.slice(0, uri.length - 2)}/_session`,
    method: 'GET',
    auth
  };

  try {
    const { 'gds-token': token } = await Query(options);
    const headers = {
      Authorization: `gds-token ${token}`
    };

    return { headers };
  } catch (err) {
    return err;
  }
};

export default Authorization;
