module.exports = function ensureCtype(contentTypes) {
  var types = Array.isArray(contentTypes) ? contentTypes : [contentTypes],
    message = 'Unsupported Content-Type. Use: ' + types.join(' or '),
    send = ('json' === contentTypes) ? 'json' : 'send';

  return function (req, res, next) {
    var some = types.some(function (c) { return req.is(c) });
    if (!some) return res[send](400, message);
    next();
  };
};
