# `SchemaBuilder`

`SchemaBuilder` can be used to construct a schema that you can then send to the service out of a collection of vertices. In our case, a vertex can be through of as following the structure:

```js
const Vertex = {
  name: 'vertexName',
  properties: [
    FooProperty
  ],
  inEdges: [
    BarEdge
  ],
  outEdges: [
    BazEdge
  ]
};
```

An edge corresponds to:

```js
import { schema } from 'ibm-graph';

const { multiplicity: m } = schema;

const Edge = {
  name: 'edgeName',

  // optional, defaults to 'MULTI'
  multiplicity: m.ManyToOne,

  // optional, defaults to `false`
  directed: true
};
```

And a property corresponds to:

```js
import { schema } from 'ibm-graph';

const { dataTypes: t, cardinality: c } = schema;

const Property = {
  name: 'propertyName',
  dataType: t.String,
  cardinality: c.Single
};
```

We can leverage the indexes we create by calling `SchemaBuilder` with all the vertices that we want to create a schema for. For example:

```js
import { UserVertex, TweetVertex } from '../vertices';

const schema = SchemaBuilder(UserVertex, TweetVertex);
```

The output of the `SchemaBuilder` corresponds to a valid schema that you can then send to the IBM Graph service.

## Indexes

A property can also contain an index by following the convention:

```js
const Property = {
  name: 'name',
  dataType: t.String,
  cardinality: c.Single,
  index: {
    name: 'nameIndex',
    unique: false,
    composite: true,
    indexOnly: false
  }
};
```

