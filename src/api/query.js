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
  body,
  headers,
  formData,
  debug = false
}) => new Promise((resolve, reject) => {
  const start = Date.now();
  const options = {
    uri,
    method,
    auth,
    json: body,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers
    }
  };

  if (formData) {
    options.formData = formData;
  }

  if (debug) {
    winston.info(`${Date.now()}`, 'request', JSON.stringify(options, null, 2));
  }

  request(options, (error, res, body) => {
    const end = Date.now();
    const duration = end - start;

    if (error) {
      reject(error);
      return;
    }

    /**
     * We have to wrap parsing our response in a try/catch because the service
     * may throw unexpected string errors like:
     *
     * 502 Bad Gateway: ...
     */
    let response;

    try {
      response = typeof body === 'object' ? body : JSON.parse(body);
    } catch (e) {
      reject(body);
      return;
    }

    if (response.code) {
      reject(response);
      return;
    }

    resolve({
      ...response,
      duration
    });

    if (debug) {
      winston.info(`${Date.now()}`, 'response', JSON.stringify(response, null, 2));
    }
  });
});

export default Query;

