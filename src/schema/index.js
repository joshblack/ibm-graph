import { flattenVertices } from './flatten';
import { dedupeStrategy } from './dedupe';

export default function Schema(...vertices) {
  const flattened = flattenVertices(vertices);

  // return Object.keys(flattened).reduce((acc, key) => ({
    // ...acc,
    // [key]: dedupeStrategy[key](flattened[key])
  // }), {});
}
