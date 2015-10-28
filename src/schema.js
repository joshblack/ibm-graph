import invariant from 'invariant';
import { types as t } from './types';
import { cardinality as c } from './cardinality';
import { multiplicity as m } from './multiplicity';

const initial = {
  edgeIndexes: [],
  vertexIndexes: [],
  vertexLabels: [],
  edgeLabels: [],
  propertyKeys: []
};

/**
 * Schema takes a collection of vertices and builds out an object that can be
 * consumed by Graph Data Store that represents a Schema of the Graph.
 *
 */
export default function Schema(vertices) {
  return vertices.reduce((acc, vertex) => {
    const { label, outEdges, inEdges, ...keys } = vertex;
    const edges = [];

    let propertyKeys;

    invariant(label, 'A label is required for each vertex.');

    if (keys) {
      propertyKeys = Object.keys(keys).reduce((acc, key) => {
        const { type, cardinality } = keys[key];

        invariant(
          cardinality,
          'The type of cardinality must be specified on the %s property. ' +
          'Check to see if you specified one and the value isn\'t undefined',
          key
        );

        invariant(
          type,
          'The dataType of the %s property needs to be specified.',
          key
        );

        return acc.concat({
          cardinality,
          dataType: type,
          name: key
        });
      }, []);
    }

    if (outEdges) {
      edges.push(...outEdges);
    }

    if (inEdges) {
      edges.push(...inEdges);
    }

    const edgeLabels = edges.map(({ label, multiplicity }) => ({
      directed: true,
      multiplicity,
      name: label
    }));

    return {
      edgeIndexes: [],
      vertexIndexes: [],
      vertexLabels: [...acc.vertexLabels, { name: label }],
      propertyKeys: [...acc.propertyKeys, ...propertyKeys],
      edgeLabels: [...acc.edgeLabels, ...edgeLabels]
    };
  }, initial);
}