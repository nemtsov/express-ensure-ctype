Ensure Content-Type
===================

Tiny [express](https://github.com/visionmedia/express) middleware for blocking 
unwanted Content-Type(s). When a type doesn't match, a 400 error is
sent to the client, otherwise the next middleware is called.

Usage:

```javascript
var express = require('express'),
  ensureCtype = require('express-ensure-ctype'),
  ensureJson = ensureCtype('json'),
  app = express();

app.post('/', ensureJson, function (req, res) {
  res.json(req.body);
});

app.listen(3000);
```

Result:

```
curl -i -XPOST 'http://localhost:3000/'

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 37
Date: Mon, 20 Jan 2014 05:02:37 GMT
Connection: keep-alive

"Unsupported Content-Type. Use: json"
```

```
curl -i -XPOST -H 'Content-Type: application/json' 'http://localhost:3000/'

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2014 05:05:24 GMT
Connection: keep-alive
Transfer-Encoding: chunked
```

An array can also be used for multiple content-types:

```javascript
ensureCtype(['csv', 'text']);
```

License
-------

MIT
