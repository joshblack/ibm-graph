import invariant from 'invariant';

const checkIndex = (index) => {
  if (index) {
    invariant(
      ['name', 'unique', 'composite'].every((t) => index.hasOwnProperty(t)),
      'An index requires `name`, `unique`, and `composite` to be specified'
    );
  }
};

// Take in an Edge and return back the Label and any Index specified on it
const flattenEdge = (edge) => {
  const { name, multiplicity, directed, index } = edge;

  invariant(
    ['name', 'multiplicity', 'directed'].every((t) => edge.hasOwnProperty(t)),
    'An edge requires `name`, `multiplicity`, and `directed` to be specified',
  );

  checkIndex(index);

  return [
    { name, multiplicity, directed },
    index
  ];
};

const flattenEdges = (edges) => edges
  .map(flattenEdge)
  .reduce((acc, [label, index]) => {
    const { edgeIndexes, edgeLabels } = acc;

    if (index) {
      edgeIndexes.push(index);
    }

    edgeLabels.push(label);

    return {
      edgeIndexes,
      edgeLabels
    };

  }, {
    edgeIndexes: [],
    edgeLabels: []
  });

const flattenProperty = (property) => {
  const { name, type, cardinality, index } = property;

  invariant(
    ['name', 'type', 'cardinality'].every((t) => property.hasOwnProperty(t)),
    'A property requires `name`, `type`, and `cardinality` to be specified'
  );

  checkIndex(index);

  return [
    { name, type, cardinality },
    { propertyKeys: [name], ...index }
  ];
};

const flattenProperties = (properties) => properties
  .map(flattenProperty)
  .reduce((acc, [propertyKey, index]) => {
    const { propertyKeys, vertexIndexes } = acc;

    return {
      propertyKeys: propertyKeys.concat(propertyKey),
      vertexIndexes: vertexIndexes.concat(index)
    };
  }, {
    propertyKeys: [],
    vertexIndexes: []
  });

const flattenVertex = (vertex) => {
  const { name, properties, inEdges, outEdges } = vertex;
  const edges = flattenEdges([...inEdges, ...outEdges]);

  const flattenedProperties = flattenProperties(properties);

  return {
    vertexLabels: [{ name }],
    ...flattenedProperties,
    ...edges
  };
};

const flattenVertices = (vertices) => vertices
  .map(flattenVertex)
  .reduce((acc, vertex) => ({
    edgeLabels: acc.edgeLabels.concat(vertex.edgeLabels),
    edgeIndexes: acc.edgeIndexes.concat(vertex.edgeIndexes),
    propertyKeys: acc.propertyKeys.concat(vertex.propertyKeys),
    vertexIndexes: acc.vertexIndexes.concat(vertex.vertexIndexes),
    vertexLabels: acc.vertexLabels.concat(vertex.vertexLabels)
  }), {
    edgeIndexes: [],
    edgeLabels: [],
    propertyKeys: [],
    vertexIndexes: [],
    vertexLabels: []
  });

export { flattenEdges };
export { flattenVertex };
export { flattenProperties };
export { flattenVertices };
