import Auth from './Auth';
import Query from './Query';

/**
 * Creates a new session with the service, wrapping any query with the
 * appropriate Authentication header that includes the `gds-token` from
 * invoking `Auth`.
 *
 * @param {Object} params
 * @param {Object} params.auth - Auth object used to authenticate
 * @param {String} params.uri - The URI string for the service
 * @returns {Object}
 */
const Session = async ({ auth, uri, debug }) => {
  const { headers } = await Auth({ auth, uri, debug });

  const query = async ({ uri, method, body }) => {
    const result = await Query({ uri, method, body, headers, debug });

    return result;
  };

  return {
    query
  };
};

export default Session;

