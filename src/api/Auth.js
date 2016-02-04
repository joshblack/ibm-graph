import Query from './Query';

/**
 * Authencation wrapper for getting a token from the service.
 *
 * Makes a request to the `_session` endpoint using `Query` and keeps track of
 * the token received in an appropriate header to pass into following `Query`
 * calls instead of an `auth` object.
 *
 * @param {Object} params
 * @param {Object} params.auth - Auth object passed into Query for the service
 * @param {String} params.uri - String for the URI of the Service
 * @returns {Object}
 */
const Auth = async ({ auth, uri }) => {
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

export default Auth;

