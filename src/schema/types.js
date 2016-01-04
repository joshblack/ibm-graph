type EdgeLabelType = {
  name: string;
  directed: boolean;
  multiplicity: MultiplicityType;
};

type EdgeType = {
  name: string;
  directed: boolean;
  index: IndexType;
  multiplicity: MultiplicityType;
};

type PropertyKeyType = {
  name: string;
  dataType: DataType;
  cardinality: CardinalityType;
};

type PropertyType = {
  name: string;
  type: DataType;
  index: IndexType;
};

type SchemaIndexType = {
  name: string;
  unique: boolean;
  composite: boolean;
  indexOnly?: string;
  propertyKeys: Array<string>;
};

type IndexType = {
  name: string;
  unique: boolean;
  composite: boolean;
  indexOnly: boolean;
};

type VertexLabelType = {
  name: string;
};

type VertexType = {
  name: string;
  properties: Array<PropertyType>;
  inEdges: Array<EdgeType>;
  outEdges: Array<EdgeType>;
};

type SchemaType = {
  edgeIndexes: Array<SchemaIndexType>;
  edgeLabels: Array<EdgeLabelType>;
  propertyKeys: Array<PropertyKeyType>;
  vertexIndexes: Array<SchemaIndexType>;
  vertexLabels: Array<VertexLabelType>;
};
