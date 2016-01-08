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
    headers
  };

  winston.info(options);

  request(options, (error, res, body) => {
    const end = Date.now();
    const duration = end - start;

    if (error) {
      reject(error);
      return;
    }

    if (body.code) {
      reject(body.response);
      return;
    }

    const response = JSON.parse(body);

    resolve({
      ...response,
      duration
    });
  });
});

export default Query;
