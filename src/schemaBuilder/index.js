import { dedupeStrategy } from './dedupe';
import { flattenVertices } from './flatten';

export default function SchemaBuilder(...vertices) {
  const flattened = flattenVertices(vertices);

  return Object.keys(flattened).reduce((acc, key) => ({
    ...acc,
    [key]: dedupeStrategy[key](flattened[key])
  }), {});
}

