import invariant from 'invariant';
import Schema from './schema';
import { dataTypes } from './schema/dataTypes';
import { cardinality } from './schema/cardinality';
import { multiplicity } from './schema/multiplicity';
import { Query, BatchedQuery } from './Query';

const { GDS_API_URL, GDS_USERNAME, GDS_PASSWORD } = process.env;

invariant(
  GDS_API_URL,
  'No URL specified for the API endpoint. Make sure to include `GDS_API_URL`' +
  ' in your env.'
);

invariant(
  GDS_USERNAME,
  'No user information specified for authenticating against the API ' +
  'endpoint. Make sure to include `GDS_USERNAME` in your env.'
);

invariant(
  GDS_PASSWORD,
  'No password specified for authenticating against the API endpoint. Make ' +
  'sure to include `GDS_PASSWORD` in your env.'
);

const GraphDataStorePublic = {
  types: dataTypes,
  cardinality,
  multiplicity,
  Query,
  Schema
};

export default GraphDataStorePublic;
