import Schema from '../schema';
import APISchema from './schema';

import { dataTypes as t } from '../schema/dataTypes';
import { cardinality as c } from '../schema/cardinality';
import { multiplicity as m } from '../schema/multiplicity';



import { UserVertex, TweetVertex } from '../schema/__fixtures__/vertices.js';

const { GDS_API_URL, GDS_USERNAME, GDS_PASSWORD } = process.env;


/**
 * Using to drive testing of Schemas
 */
async function testRunner() {
  const auth = {
    user: GDS_USERNAME,
    pass: GDS_PASSWORD
  };

  try {
    const { get, create } = await APISchema({ auth, uri: GDS_API_URL });
    // const schema = Schema(UserVertex, TweetVertex);
    const schema = {
      edgeIndexes: [
        {
          propertyKeys: [
            'firstEdgeLabel',
          ],
          name: 'firstEdgeIndex',
        }
      ]
    };

    const result = await create(schema);
    // const result = await get();

    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.log(err);
  }
}

testRunner()
  .then(() => {})
  .catch((err) => console.log(err));

