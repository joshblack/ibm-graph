IBM Graph
=========

JavaScript module for interacting with the IBM Graph service.

[![Build Status](https://travis-ci.org/joshblack/ibm-graph.svg?branch=master)](https://travis-ci.org/joshblack/ibm-graph)

This repo holds an implementation of various modules used for JavaScript development with IBM Graph. Namely, this repo includes a way to define a Schema, and Query the service. In addition, this module exposes:

- `dataTypes`: a map containing basic supported types, useful for defining fields on a Schema
- `cardinality`: a map containing the types of cardinality that are used on properties when defining a Schema
- `multiplicity`: a map containing the types of multiplicity that represent the relationship of edges when defining a Schema

You can interact with any of these publically available APIs by using import specifiers, for example:

```js
import { API, SchemaBuilder, schema } from 'ibm-graph';
```

If you're interested in learning more, check out the `docs` section and explore how you can leverage each module.

