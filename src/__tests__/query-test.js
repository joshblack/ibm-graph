import nock from 'nock';
import { Query } from '../Query';

const GDS = nock(process.env.GDS_API_URL)
  .post('/gremlin', {
    gremlin: 'g.V()'
  })
  .basicAuth({
    user: 'foo',
    pass: 'bar'
  })
  .reply(200, {
    result: {
      data: [],
      meta: []
    }
  });

describe('#Query', () => {
  it('should query a service and forward along the gremlin request', async (done) => {
    const query = `g.V()`;

    try {
      const result = await Query(query);

      expect(result.data).toExist;
      expect(result.meta).toExist;
      done();
    } catch (err) {
      console.log(err);
      done();
    }
  });
});
