import invariant from 'invariant';

// Take in an Edge and return back the Label and any Index specified on it
const flattenEdge = (edge ) => {
  const { name, multiplicity, directed, index } = edge;

  invariant(
    ['name', 'multiplicity', 'directed'].every((t) => edge.hasOwnProperty(t)),
    'An edge requires `name`, `multiplicity`, and `directed` to be specified',
  );

  invariant(
    !index ||
    ['name', 'unique', 'composite'].every((t) => index.hasOwnProperty(t)),
    'An index requires `name`, `unique`, and `composite` to be specified'
  );

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

const flattenVertices = (vertices) => vertices
  .reduce((acc, { name, properties, index }) => {
    const { vertexLabels, vertexIndexes, propertyKeys } = acc;


    if (properties) {
      const { name, type } = properties;

      propertyKeys.push({ name, type });
    }

    return {
      vertexLabels: vertexLabels.concat({ name }),
      vertexIndexes,
      propertyKeys
    };
  }, {
    vertexLabels: [],
    vertexIndexes: [],
    propertyKeys: []
  });

// const flattenVertices = (vertices) =>
  // vertices.reduce((acc, v) => {
    // const {
      // edgeIndexes,
      // edgeLabels,
      // propertyKeys,
      // vertexIndexes,
      // vertexLabels } = acc;

    // const vertexLabel = v.name;
    // const edges = [...v.inEdges, ...v.outEdges]
      // .map(edge)
      // .reduce((acc, [label, index]) => {
        // const { edgeIndexes, edgeLabels } = acc;

        // if (index) {
          // edgeIndexes.push(index);
        // }

        // edgeLabels.push(label);

        // return {
          // edgeIndexes,
          // edgeLabels
        // };

      // }, {
        // edgeIndexes,
        // edgeLabels
      // });

    // const vertices = v.properties
      // .reduce((acc, p) => {
        // const { vertexIndexes, vertexLabels } = acc;

        // console.log(p);

      // }, {
        // vertexIndexes,
        // vertexLabels
      // });

    // return {
      // edgeIndexes: edgeIndexes.concat([]),
      // edgeLabels: edgeLabels.concat([]),
      // propertyKeys: propertyKeys.concat([]),
      // vertexIndexes: vertexIndexes.concat([]),
      // vertexLabels: vertexLabels.concat([])
    // };
  // }, {
    // edgeIndexes: [],
    // edgeLabels: [],
    // propertyKeys: [],
    // vertexIndexes: [],
    // vertexLabels: []
  // })

export { flattenEdges };
export { flattenVertices };
