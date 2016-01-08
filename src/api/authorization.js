import Query from './query';

const { GDS_API_URL } = process.env;

const Authorization = async ({ auth }) => {
  const uri = `${GDS_API_URL.slice(0, GDS_API_URL.length - 2)}/_session`;
  const options = {
    uri,
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
