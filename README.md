[![Build Status](https://travis-ci.org/joshblack/ibm-graph.svg?branch=master)](https://travis-ci.org/joshblack/ibm-graph)

This repo holds an implementation of various modules used for JavaScript development with IBM Graph. Namely, this repo includes a way to define a Schema, and Query the Graph Data Store service. In addition, this module exposes:

- `dataTypes`: a map containing all basic types supported by titan, useful for defining fields on a Schema
- `cardinality`: a map containing the types of cardinality that are used on properties when defining a Schema
- `multiplicity`: a map containing the types of multiplicity that represent the relationship of edges when defining a Schema

You can interact with any of these publically available APIs by using import specifiers, for example:

```js
import { API, SchemaBuilder, schema } from 'ibm-graph';
```

## API

The API exposes a variety of modules for interacting with the service, from authentication and session management to creating/retrieving a Schema. The intent is to also to provide first-class support for Vertices and Edges in the near future.

### Query

`Query` is a simple abstraction to communicate with the IBM Graph service. It rquires the following:

- `uri`: Where are we sending the request to
- `method`: What is the HTTP method for sending the request
- `auth`: Basic user/pass combination for authentication against the service

It also has two optional parameters:

- `headers`: Headers that you can provide for the query (for example, a session header)
- `json`: A `JSON` payload to send in the request

Example usage:

```js
import { API } from 'ibm-graph';

const { GDS_API_URL, GDS_USERNAME, GDS_PASSWORD } = process.env;
const { Query } = API;

const auth = {
  user: GDS_USERNAME,
  pass: GDS_PASSWORD
};

const options = {
  uri: `${GDS_API_URL}/schema`,
  method: 'GET',
  auth
};

Query(options)
  .then((response) => {
    // handle response
  })
  .catch((error) => console.log(error));

```

### Auth

Module used for grabbing `gds-token` from the service.

### Session

Module used to begin a session with the service.

### Schema

Module used for creating or retrieving Schemas from the service.

### Vertex

Coming soon!

### Edges

Coming soon!

## SchemaBuilder

The `Schema` package will look to transform an input of vertex definitions into a suitable schema definition that can then be sent to a Graph Data Store instance through its REST API.

For example:

```
import { SchemaBuilder, schema } from 'ibm-graph';

const {
  dataTypes: t,
  cardinality: c,
  multiplicity: m
} = schema;

const IntervieweeVertex = {
  label: 'interviewee',
  name: {
    type: t.string,
    cardinality: c.Single
  },
  outEdges: [{
    label: 'currentRole',
    multiplicity: m.OneToOne,
  }, {
    label: 'previousRole',
    multiplicity: m.OneToMany
  }],
  inEdges: [{
    label: 'holder',
    multiplicity: m.ManyToOne
  }, {
    label: 'previousHolder',
    multiplicity: m.ManyToMany
  }]
};

SchemaBuilder(InterviewVertex);
```

This will result in the following Schema definition that can then be sent to the CDS Graph Data Store service to help boost performance.

```
{
  'edgeIndexes': [],
  'vertexIndexes': [],
  'vertexLabels': [
    {
      'name': 'interviewee'
    }
  ],
  'propertyKeys': [
    {
      'cardinality': 'SINGLE',
      'dataType': 'String',
      'name': 'name'
    }
  ],
  'edgeLabels': [
    {
      'directed': true,
      'multiplicity': 'ONE2ONE',
      'name': 'currentRole'
    },
    {
      'directed': true,
      'multiplicity': 'ONE2MANY',
      'name': 'previousRole'
    },
    {
      'directed': true,
      'multiplicity': 'MANY2ONE',
      'name': 'holder'
    },
    {
      'directed': true,
      'multiplicity': 'MULTI',
      'name': 'previousHolder'
    }
  ]
}
```

