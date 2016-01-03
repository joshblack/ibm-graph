# Graph Data Store

[![Build Status](https://travis-ci.org/joshblack/cds-graph.svg?branch=master)](https://travis-ci.org/joshblack/cds-graph)

This repo holds an implementation of various modules used for JavaScript development with Graph Data Store. Namely, this repo includes a way to define a Schema, and Query the Graph Data Store service. In addition, this module exposes:

- `types`: a map containing all basic types supported by titan, useful for defining fields on a Schema
- `cardinality`: a map containing the types of cardinality that are used on properties when defining a Schema
- `multiplicity`: a map containing the types of multiplicity that represent the relationship of edges when defining a Schema

You can interact with any of these publically available APIs by using import specifiers, for example:

```
import { Query, Schema, types, cardinality, multiplicity } from 'cds-graph';
```

## Schema

The `Schema` package will look to transform an input of vertex definitions into a suitable schema definition that can then be sent to a Graph Data Store instance through its REST API.

For example:

```
import {
  Schema,
  types as t,
  cardinality as c,
  multiplicity as m } from 'cds-graph';
  
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

Schema(InterviewVertex);
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

## Query

Query is an interface used for Querying the Graph Data Store service. It mandates that three fields are set in `ENV`, namely:

- `API_URL`: The API url given to you by the Graph Data Store service
- `USER`: The user information given to you by the Graph Data Store service
- `PASS`: The password information given to you by the Graph Data Store service

And will actively throw errors if these fields are not set.

In addition, if you're `NODE_ENV` is set to development the module will log out timing stats for the current query. In the future, we'll look into more robust ways of handling this logging mechanism.

Queries are very intruitive to use, they are simply wrappers for `gremlin` queries for the service. They are implemented using ES2015 Promises and can be consumed by calling `.then` or using `async/await` features available in ES2016. For example:

```
import { Query } from 'cds-graph';

// Promise
Query('g.V()').then((vertices) => console.log(vertices));

// async/await, will require async function in the parent scope
const vertices = await Query('g.V()');
```

There's also a batched mechanism in place if performance is a concern, simply use `BatchedQuery` in the following fashion:

```
import { BatchedQuery } from 'cds-graph';

BatchedQueries.add(`graph.addVertex(label, 'test')`);
BatchedQueries.add(`graph.addVertex(label, 'test')`);

// Promise
BatchedQueries.run().then((result) => console.log(result));

// async/await
const results = await BatchedQueries.run();
```
