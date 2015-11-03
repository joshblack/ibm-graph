import request from 'request';

const Query = (gremlin) => {
  const start = Date.now();
  const payload = {
    json: { gremlin },
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  };

  if (process.env.NODE_ENV !== 'production') {
    console.log('Gremlin Query:\n ', gremlin);
    console.log('Query stats:');
    console.log('  Start Time:', start);
  }

  return new Promise((resolve, reject) => {
    request.post(`${process.env.API_URL}/gremlin`, payload, (err, res, body) => {
      const end = Date.now();
      const duration = end - start;

      if (process.env.NODE_ENV !== 'production') {
        console.log('  End Time:', end);
        console.log('  Duration:', duration);
      }

      // Internal error
      if (err) {
        return reject(err);
      }

      // Service error
      if (!body.result) {
        return reject(body);
      }

      resolve({
        data: body.result.data,
        meta: {
          ...body.result.meta,
          duration
        }
      });
    });
  });
};

const BatchQueries = () => {
  let queries = [];

  return {
    add: (query) => queries.push(query),
    run: () => {
      const result = Promise.all(queries.map(Query));

      queries = [];

      return result;
    }
  };
};

const BatchedQuery = BatchQueries();

export { Query };
export { BatchedQuery };
