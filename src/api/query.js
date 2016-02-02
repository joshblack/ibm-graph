import request from 'request';
import winston from 'winston';

/**
 * Query interface for executing a request against the IBM Graph Service.
 *
 * Generic wrapper over request that handles for error checking nuances when
 * communicating with IBM Graph, also provides some context with `winston` and
 * provides meta information like the duration of the query to help out with
 * performance.
 *
 * @param {Object} params
 * @param {String} params.uri  - The uri to send the request to
 * @param {String} params.method - The HTTP method for sending the request
 * @param {Object} params.auth - An auth object containing user/pass creds.
 * @param {Object} params.json - Pass in an arbitrary payload in the request
 * @param {Object} params.headers  - Pass in headers for things like sessions
 * @returns {Object}
 */
const Query = ({
  uri,
  method,
  auth,
  json,
  headers
}) => new Promise((resolve, reject) => {
  const start = Date.now();
  const options = {
    uri,
    method,
    auth,
    json,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers
    }
  };

  winston.info(`${Date.now()}`, 'request', JSON.stringify(options, null, 2));

  request(options, (error, res, body) => {
    const end = Date.now();
    const duration = end - start;

    if (error) {
      reject(error);
      return;
    }

    if (body.code) {
      reject(body);
      return;
    }

    const response = typeof body === 'object' ? body : JSON.parse(body);

    resolve({
      ...response,
      duration
    });

    winston.info(`${Date.now()}`, 'response', JSON.stringify(response, null, 2));
  });
});

export default Query;

