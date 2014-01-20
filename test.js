var ensureCtype = require('./'),
  sinon = require('sinon');

describe('ensureCtype', function () {
  var noop, req, res, mid;

  beforeEach(function () {
    noop = function () {};
    req = sinon.stub({is: noop});
    res = {json: sinon.spy(), send: sinon.spy()};
  });

  it('should call the next mid. if the type is ok', function (done) {
    mid = ensureCtype('json');
    req.is.returns(true);
    function check () {
      res.json.called.should.be.false;
      res.send.called.should.be.false;
      done();
    }
    mid(req, res, check);
  });

  it('should render 400 if the type is not ok', function () {
    mid = ensureCtype('text');
    req.is.returns(false);
    mid(req, res, noop);
    res.send.called.should.be.true;
  });

  it('should allow an array of ctypes', function (done) {
    mid = ensureCtype(['text', 'csv']);
    req.is.withArgs('csv').returns(true);
    mid(req, res, done);
    if (res.send.called) throw new Error('called send');
  });
});
