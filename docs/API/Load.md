# Load

Load is a utility off of the `API` module that helps you load valid GraphSON or GraphML documents to your IBM Graph service. It requires you to pass in the following parameters:

- `auth`: Auth object used to authenticate with the service
- `uri`: The URL for your service
- `filePath`: The absolute path to your file
- `type`: One of `GraphSON` or `GraphML`, depending on your type of file

You can use it in the following fashion:

```js
const { GDS_API_URL, GDS_USERNAME, GDS_PASSWORD } = process.env;

const auth = {
  user: GDS_USERNAME,
  pass: GDS_PASSWORD
};

async function loadData() {
  try {
    const { Load } = API;

    const filePath = path.resolve(__dirname, 'your-data.json');

    const result = await Load({
      auth,
      uri: GDS_API_URL,
      filePath,
      type: 'GraphSON',

      // Set to true if you want to see all the requests happening
      // behind the scenes
      debug: true
    });

    // Will return true if successfull!
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {

    // Will bubble up any errors from the response
    console.log(error);
  }
}

loadData()
  .then(() => {})
  .catch((error) => console.log(error));
```

