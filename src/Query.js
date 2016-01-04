import request from 'request';

const { NODE_ENV, GDS_API_URL, GDS_USERNAME, GDS_PASSWORD } = process.env;

const Query = (gremlin) => {
  const start = Date.now();
  const payload = {
    json: { gremlin },
    auth: {
      user: GDS_USERNAME,
      pass: GDS_PASSWORD
    }
  };

  return new Promise((resolve, reject) => {
    request.post(`${GDS_API_URL}/gremlin`, payload, (err, res, body) => {
      const end = Date.now();
      const duration = end - start;

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
