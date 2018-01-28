module.exports = function ensureCtype(contentTypes) {
  const types = Array.isArray(contentTypes) ? contentTypes : [contentTypes];
  const typeStr = types.join(' or ');
  const message = `Unsupported Content-Type. Use: ${typeStr}`;
  const send = /json/.test(typeStr) ? 'json' : 'send';

  return (req, res, next) => {
    const isType = req.is(types);
    if (!isType) return res.status(415)[send](message);
    next();
  };
};