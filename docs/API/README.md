# API

The `API` module exposes a variety of modules for interacting with the service, from authentication and session management to creating/retrieving a Schema. The intent is to also to provide first-class support for Vertices and Edges in the near future.

Make sure to check out the [examples](./examples.md)!

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

Module used for grabbing `gds-token` from the service. We use this internally to create the `Session` module in the following fashion:

```js
const Session = async ({ auth, uri }) => {
  const { headers } = await Auth({ auth, uri });
  const query = async ({ uri, method, json }) => {
    const result = await Query({ uri, method, json, headers });

    return result;
  };

  return {
    query
  };
};
```

### Session

Module used to begin a session with the service. We currently use this to support the `Schema` module. This is most often used for longer query sessions so you don't have to use the basic authentication schema against the service.

Usage:

```js
const { query } = await Session({ auth, uri });
```

### Schema

Module used for creating or retrieving Schemas from the service.

Usage:

```js
const { get, create } = await Schema({ auth, uri: GDS_API_URL });
```

### Vertex

Coming soon!

### Edges

Coming soon!

