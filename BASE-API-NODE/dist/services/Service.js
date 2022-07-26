"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Service = /*#__PURE__*/function () {
  function Service(model) {
    _classCallCheck(this, Service);

    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this["delete"] = this["delete"].bind(this);
    this.get = this.get.bind(this);
  }

  _createClass(Service, [{
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
        var skip, limit, id, items, total;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                skip = query.skip, limit = query.limit;
                skip = skip ? Number(skip) : 1;
                limit = limit ? Number(limit) : 10;
                skip = (skip - 1) * limit;
                delete query.skip;
                delete query.limit;
                id = query._id;

                if (id) {
                  try {
                    // eslint-disable-next-line no-underscore-dangle
                    id = new _mongoose["default"].mongo.ObjectId(id);
                  } catch (error) {// console.log('not able to generate mongoose id with content', id);
                  }
                }

                _context.prev = 8;
                _context.next = 11;
                return this.model.find(query).select(['-password']).skip(skip).limit(limit);

              case 11:
                items = _context.sent;
                _context.next = 14;
                return this.model.countDocuments();

              case 14:
                total = _context.sent;
                return _context.abrupt("return", {
                  error: false,
                  message: 'request successfullly',
                  statusCode: 200,
                  total: total,
                  data: items
                });

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](8);
                return _context.abrupt("return", {
                  error: _context.t0.message,
                  statusCode: 400,
                  data: null
                });

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 18]]);
      }));

      function getAll(_x) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var items;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.model.findById(id).select(['-password']);

              case 3:
                items = _context2.sent;
                return _context2.abrupt("return", {
                  error: false,
                  message: 'request successfullly',
                  statusCode: 200,
                  data: items
                });

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", {
                  error: _context2.t0.message,
                  statusCode: 400,
                  data: null
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function get(_x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "insert",
    value: function () {
      var _insert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.model.create(item);

              case 3:
                data = _context3.sent;
                return _context3.abrupt("return", {
                  error: false,
                  message: 'successfully inserted',
                  statusCode: 201,
                  data: data
                });

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", {
                  error: _context3.t0.message,
                  statusCode: 400,
                  data: null
                });

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function insert(_x3) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, item) {
        var data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.model.findByIdAndUpdate(id, item, {
                  "new": true
                });

              case 3:
                data = _context4.sent;
                return _context4.abrupt("return", {
                  error: false,
                  message: 'successfully updated',
                  statusCode: 200,
                  data: data
                });

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", {
                  error: _context4.t0.message,
                  statusCode: 400,
                  data: null
                });

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 7]]);
      }));

      function update(_x4, _x5) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
        var item;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.model.findByIdAndDelete(id);

              case 3:
                item = _context5.sent;

                if (item) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return", {
                  error: true,
                  message: 'item not found',
                  statusCode: 404,
                  data: null
                });

              case 6:
                return _context5.abrupt("return", {
                  error: false,
                  message: 'record delete successfullly!',
                  statusCode: 200,
                  data: item
                });

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", {
                  error: _context5.t0.message,
                  statusCode: 400,
                  data: null
                });

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 9]]);
      }));

      function _delete(_x6) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return Service;
}();

var _default = Service;
exports["default"] = _default;