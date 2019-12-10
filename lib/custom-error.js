"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }

}

var _default = CustomError;
exports.default = _default;
//# sourceMappingURL=custom-error.js.map