{
  "edgeIndexes": [],
  "edgeLabels": [
    {
      "directed": true,
      "multiplicity":"SIMPLE",
      "name":"route"
    }
  ],
  "propertyKeys": [
    {
      "cardinality":"SINGLE",
      "dataType":"String",
      "name":"city"
    }
  ],
  "vertexIndexes": [
    {
      "composite":false,
      "name":"cityIndex",
      "propertyKeys": [
        "city"
      ],
      "unique":false
    }
  ],
  "vertexLabels": [
    {"name": "location"}
  ]
}



// Assumptions
// - Properties are globally unique, ie properties of the same name must
//   have the same properties

export default function Schema(vertices: Array<VertexType>): string {
  return 'hi';
}
