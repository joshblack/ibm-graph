# `schema`

`schema` is a simple utility to gain access to the `dataTypes`, `multiplicity`, and `cardinality` values that are available to you when using IBM Graph.

Since IBM Graph is a managed service, certain values that you may find in documentation for Titan will not be available. As a result, `dataTypes` is actually a subset of the types that Titan support.

## Usage

You can access `dataTypes`, `multiplicity`, and `cardinality` by doing the following:

```js
import { schema } from 'ibm-graph';

const {
  dataTypes: d,
  multiplicity: m,
  cardinality :c
} = schema;

// Usage
d.String;
m.ManyToMany;
c.Single;
```

Each of these values on the exported modules will correspond to a string constant that will be sent to the server in any kind of request. Since each module is just a mapping of a key to a string, you can inspect the values directly by looking at the modules in `src/schema`. At a high level we have:

| Module | Key | String |
|--------|-----|--------|
| `cardinality` | `Single` | `SINGLE` |
| `cardinality` | `List` | `LIST` |
| `cardinality` | `SET` | `SET` |
| `dataTypes`   | `String` | `String` |
| `dataTypes`   | `Boolean` | `Boolean` |
| `dataTypes`   | `Integer` | `Integer` |
| `dataTypes`   | `Float` | `Float` |
| `multiplicity` | `Multi` | `MULTI` |
| `multiplicity` | `Simple` | `SIMPLE` |
| `multiplicity` | `ManyToOne` | `MANY2ONE` |
| `multiplicity` | `OneToMany` | `ONE2MANY` |
| `multiplicity` | `OneToOne` | `ONE2ONE` |

