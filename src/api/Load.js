import fs from 'fs';
import invariant from 'invariant';
import Query from './Query';

const types = {
  graphson: 'json',
  graphml: 'xml'
};

const Load = ({ auth, uri, filePath, type, debug }) =>
  new Promise((resolve, reject) => {
    const t = type.toLowerCase();

    invariant(
      types[t],
      'Expected `type` supplied to `Load` to be one of [GraphSON, GraphML]. ' +
      'Instead got %s.',
      type
    );

    fs.readFile(filePath, async function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      const bulkUploadURI = `${uri}/bulkload/${t}`;
      const formData = {
        [t]: fs.createReadStream(filePath),
        type: `application/${types[t]}`
      };

      const response = await Query({
        auth,
        method: 'POST',
        uri: bulkUploadURI,
        formData,
        debug
      });

      if (!response.result) {
        reject(response);
        return;
      }

      resolve(result.data[0]);
    });
  });

export default Load;

