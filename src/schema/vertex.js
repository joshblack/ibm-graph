// {
  // "edgeIndexes": [],
  // "edgeLabels": [
    // {
      // "directed": true,
      // "multiplicity":"SIMPLE",
      // "name":"route"
    // }
  // ],
  // "propertyKeys": [
    // {
      // "cardinality":"SINGLE",
      // "dataType":"String",
      // "name":"city"
    // }
  // ],
  // "vertexIndexes": [
    // {
      // "composite":false,
      // "name":"cityIndex",
      // "propertyKeys": [
        // "city"
      // ],
      // "unique":false
    // }
  // ],
  // "vertexLabels": [
    // {"name": "location"}
  // ]
// }
//
import type { DataType } from './dataTypes';
import type { CardinalityType } from './cardinality';
import type { MultiplicityType } from './multiplicity';

type VertexLabelType = {
  name: string;
};

type EdgeLabelType = {
  name: string;
  directed: boolean;
  multiplicity: MultiplicityType;
};

type PropertyKeyType = {
  name: string;
  dataType: DataType;
  cardinality: CardinalityType;
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

type PropertyType = {
  name: string;
  type: DataType;
  index: IndexType;
};

type EdgeType = {
  name: string;
  directed: boolean;
  index: IndexType;
  multiplicity: MultiplicityType;
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

// Assumptions
// - Properties are globally unique, ie properties of the same name must
//   have the same properties

export default function Schema(vertices: Array<VertexType>): string {
  return 'hi';
}
