import request from 'request';
import winston from 'winston';

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

