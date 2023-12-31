const { BAD_REQUEST_CODE } = require('./statusCode');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = BAD_REQUEST_CODE;
  }
}

module.exports = BadRequest;
