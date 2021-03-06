import invariant from 'invariant';

const checkIndex = (index) => {
  if (!index) {
    return;
  }

  invariant(
    ['name', 'unique', 'composite', 'indexOnly']
      .every((t) => index.hasOwnProperty(t)),
    'An index requires `name`, `unique`, `composite`, and `indexOnly to be ' +
    'specified. Instead got: ' + JSON.stringify(index, null, 2)
  );

  const { indexOnly, ...rest } = index;

  invariant(
    indexOnly === false || typeof indexOnly === 'string',
    '`indexOnly` should either be a label specified as a string or should ' +
    'be set to `false`.'
  );

  if (!indexOnly) {
    return rest;
  }

  return { indexOnly, ...rest };
};

// Take in an Edge and return back the Label and any Index specified on it
const flattenEdge = (edge) => {
  const { name, multiplicity, directed } = edge;

  invariant(
    ['name', 'multiplicity', 'directed'].every((t) => edge.hasOwnProperty(t)),
    'An edge requires `name`, `multiplicity`, and `directed` to be specified. ' +
    'Instead got: ' + JSON.stringify(edge, null, 2)
  );

  return [
    { name, multiplicity, directed }
  ];
};

const flattenEdges = (edges) => edges
  .map(flattenEdge)
  .reduce((acc, [label]) => acc.concat(label), []);

const flattenProperty = (property) => {
  const { name, dataType, cardinality, index } = property;

  invariant(
    ['name', 'dataType', 'cardinality']
      .every((t) => property.hasOwnProperty(t)),
    'A property requires `name`, `dataType`, and `cardinality` to be ' +
    'specified. Instead got: ' + JSON.stringify(property, null, 2)
  );

  let validatedIndex;

  if (index) {
    validatedIndex = {
      propertyKeys: [name],
      ...checkIndex(index)
    };
  }

  return [
    { name, dataType, cardinality },
    validatedIndex
  ];
};

const flattenProperties = (properties, indexType) => properties
  .map(flattenProperty)
  .reduce((acc, [propertyKey, index]) => {
    const { propertyKeys, [indexType]: prevIndexType } = acc;
    const nextIndex = index
      ? prevIndexType.concat(index)
      : prevIndexType;

    return {
      propertyKeys: propertyKeys.concat(propertyKey),
      [indexType]: nextIndex,
    };
  }, {
    propertyKeys: [],
    [indexType]: []
  });

const flattenVertex = (vertex) => {
  const {
    name,
    properties: vertexProperties,
    inEdges,
    outEdges
  } = vertex;
  const allEdges = [...inEdges, ...outEdges];

  const edgeProperties = allEdges
    .filter((e) => e.properties)
    .map((e) => e.properties)
    .reduce((acc, p) => acc.concat(p), []);

  const properties = {
    ...flattenProperties(edgeProperties, 'edgeIndexes'),
    ...flattenProperties(vertexProperties, 'vertexIndexes')
  };

  const edges = flattenEdges(allEdges);

  return {
    vertexLabels: [{ name }],
    edgeLabels: edges,
    ...properties,
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

