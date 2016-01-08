import Schema from '../schema';
import APISchema from './schema';

import { UserVertex, TweetVertex } from '../schema/__fixtures__/vertices.js';

const { GDS_USERNAME, GDS_PASSWORD } = process.env;

/**
 * Using to drive testing of Schemas
 */
async function testRunner() {
  const auth = {
    user: GDS_USERNAME,
    pass: GDS_PASSWORD
  };

  try {
    const schema = Schema(UserVertex, TweetVertex);
    const { get, create } = await APISchema({ auth });
    const result = await create(schema);

    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

testRunner()
  .then(() => {})
  .catch((err) => console.log(err));

