import invariant from 'invariant';
import Schema from './Schema';
import { types } from './types';
import { cardinality } from './cardinality';
import { multiplicity } from './multiplicity';
import { Query, BatchedQuery } from './Query';

const { NODE_ENV, API_URL, USER, PASS } = process.env;

invariant(
  process.env.API_URL,
  'No URL specified for the API endpoint. Make sure to include `API_URL` in your env.'
);

invariant(
  process.env.USER,
  'No user information specified for authenticating against the API endpoint. Make sure to include `USER` in your env.'
);

invariant(
  process.env.PASS,
  'No password specified for authenticating against the API endpoint. Make sure to include `PASS` in your env.'
);

const GraphDataStorePublic = {
  types,
  cardinality,
  multiplicity,
  Query,
  BatchedQuery,
  Schema
};

export default GraphDataStorePublic;
