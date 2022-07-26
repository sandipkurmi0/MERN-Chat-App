"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller = /*#__PURE__*/function () {
  function Controller(service) {
    _classCallCheck(this, Controller);

    this.service = service;
    this.insert = this.insert.bind(this);
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this["delete"] = this["delete"].bind(this);
  }

  _createClass(Controller, [{
    key: "insert",
    value: function () {
      var _insert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.service.insert(req.body);

              case 2:
                response = _context.sent;
                return _context.abrupt("return", res.status(201).send(response));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function insert(_x, _x2) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.service.getAll(req.query);

              case 2:
                response = _context2.sent;
                return _context2.abrupt("return", res.status(response.statusCode).send(response));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAll(_x3, _x4) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                _context3.next = 3;
                return this.service.get(id);

              case 3:
                response = _context3.sent;
                return _context3.abrupt("return", res.status(response.statusCode).send(response));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function get(_x5, _x6) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                _context4.next = 3;
                return this.service.update(id, req.body);

              case 3:
                response = _context4.sent;
                return _context4.abrupt("return", res.status(response.statusCode).send(response));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                _context5.next = 3;
                return this.service["delete"](id);

              case 3:
                response = _context5.sent;
                return _context5.abrupt("return", res.status(response.statusCode).send(response));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _delete(_x9, _x10) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return Controller;
}();

var _default = Controller;
exports["default"] = _default;