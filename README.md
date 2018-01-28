# Ensure Content-Type [![Build Status](http://travis-ci.org/nemtsov/express-ensure-ctype.png)](http://travis-ci.org/nemtsov/express-ensure-ctype) [![NPM version](https://badge.fury.io/js/express-ensure-ctype.svg)](http://badge.fury.io/js/express-ensure-ctype)

Tiny [express](https://github.com/visionmedia/express) middleware for blocking 
unwanted Content-Type(s). When a type doesn't match, a 400 error is
sent to the client, otherwise the next middleware is called.

Usage:

```javascript
const express = require('express');
const ensureCtype = require('express-ensure-ctype');

const ensureJson = ensureCtype('json');
const app = express();

app.post('/', ensureJson, (req, res) => {
  res.json(req.body);
});

app.listen(3000);
```

Result:

```
curl -i -XPOST http://localhost:3000/

HTTP/1.1 415 Unsupported Media Type
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 37
ETag: W/"25-LXMJEoIT4KTBnB71Rca6CNA/pM0"
Date: Sun, 28 Jan 2018 00:45:38 GMT
Connection: keep-alive

"Unsupported Content-Type. Use: json"
```

```
curl -i -H 'Content-type: application/json' -d '{}' http://localhost:3000/

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
ETag: W/"7-ofL7/ixK2BdJzQOAtzUpXQb50MQ"
Date: Sun, 28 Jan 2018 00:44:58 GMT
Connection: keep-alive
Transfer-Encoding: chunked
```

An array can also be used for multiple content-types:

```javascript
ensureCtype(['csv', 'text']);
```

License
-------

[MIT](/LICENSE)
