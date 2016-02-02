# API

## Examples

### Setup

```js
import Schema from '../schema';
import APISchema from './schema';

import { dataTypes as t } from '../schema/dataTypes';
import { cardinality as c } from '../schema/cardinality';

const auth = {
  user: GDS_USERNAME,
  pass: GDS_PASSWORD
};

try {
  const { get, create } = await APISchema({ auth, uri: GDS_API_URL });

  const schema = {
    // Information will go in here
  };

  const result = await create(schema);
} catch (err) {
  console.log(err);
}
```

### Creating a Vertex Label

```js
const schema = {
  vertexLabels: [
    {
      name: 'firstVertexLabel'
    }
  ]
};
```

### Creating an Edge Label

```js
const schema = {
  edgeLabels: [
    {
      name: 'firstEdgeLabel',

      // Optional, default m.ManyToMany ('MULTI')
      multiplicity: m.ManyToMany,

      // Optional, default false
      directed: true
    },
    {
      name: 'secondEdgeLabel',
      directed: true
    },
    {
      name: 'thirdEdgeLabel',
    }
  ]
};
```

You will receive a `BadRequestError` if you:

- Don't include any properties on an edge label object
- Specify an invalid `multiplicity` value
- Specify an invalid `directed` value
- Specify a name as something other than a string

### Creating a Property Key

```js
const propertyKeyMutation = {
  name: 'firstPropertyKey',
  cardinality: c.Single,
  dataType: t.String
};

const schema = {
  propertyKeys: [
    propertyKeyMutation
  ]
};
```

### Creating a Vertex Index

```js
const schema = {
  vertexIndexes: [
    {
      propertyKeys: [
        'firstPropertyKey'
      ],

      name: 'firstPropertyIndex',

      // Optional, default false
      unique: false,

      // Optional, default false
      composite: true
    }
  ]
};
```

Before creating an index, make sure that:

- The property key(s) you're creating the index for exists
- The index name doesn't exist already in your schema

Notes:

- An index is considered `mixed` if `composite` is set to `false`.

### Creating an Edge Index

```js
const schema = {
  edgeIndexes: [
    {
      propertyKeys: [
        'firstEdgePropertyKey'
      ],

      name: 'firstEdgePropertyIndex',

      // Optional, default false
      unique: false,

      // Optional, default false
      composite: true
    }
  ]
};
```

