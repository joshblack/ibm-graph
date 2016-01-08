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

    console.log('body');
    console.log(body);

    const response = JSON.parse(body);

    if (response.code) {
      reject(response);
      return;
    }

    resolve({
      ...response,
      duration
    });
  });
});

export default Query;
