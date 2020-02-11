# apland/mongo

> Provides a promise that resolves into a [MongoDB collection](https://docs.mongodb.com/manual/reference/method/js-collection/).

## Install

```
$ npm install apland/mongo
```

## Usage

Set environment variable.

```bash
MONGODB_URI="mongodb://USERNAME:PASSWORD@HOST:OOIRT/DATABASE"
```

Import package and access collection.

```js
const { collection } = require('apland/mongo')
// ...
const categories = (await collection('categories')).find(filter).sort(sortBy).toArray()
```
