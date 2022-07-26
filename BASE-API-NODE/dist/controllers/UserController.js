"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _Controller2 = _interopRequireDefault(require("./Controller"));

var _UserModel = _interopRequireDefault(require("../models/UserModel"));

var _UserService = _interopRequireDefault(require("../services/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var userService = new _UserService["default"](new _UserModel["default"]().getInstance());

var UserController = /*#__PURE__*/function (_Controller) {
  _inherits(UserController, _Controller);

  var _super = _createSuper(UserController);

  function UserController(service) {
    var _this;

    _classCallCheck(this, UserController);

    _this = _super.call(this, service);
    _this.addUser = _this.addUser.bind(_assertThisInitialized(_this));
    _this.login = _this.login.bind(_assertThisInitialized(_this));
    _this.registerUser = _this.registerUser.bind(_assertThisInitialized(_this));
    _this.changePassword = _this.changePassword.bind(_assertThisInitialized(_this));
    _this.search = _this.search.bind(_assertThisInitialized(_this));
    _this.getUserByQuery = _this.getUserByQuery.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(UserController, [{
    key: "getUserByQuery",
    value: function () {
      var _getUserByQuery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.service.getUserByQuery(req.query);

              case 2:
                response = _context.sent;
                return _context.abrupt("return", res.status(response.statusCode).send(response));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUserByQuery(_x, _x2) {
        return _getUserByQuery.apply(this, arguments);
      }

      return getUserByQuery;
    }()
  }, {
    key: "addUser",
    value: function () {
      var _addUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var hash, userData, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hash = _bcrypt["default"].hashSync(req.body.password, 10);
                userData = req.body;
                userData.password = hash;
                _context2.next = 5;
                return this.service.insert(userData);

              case 5:
                response = _context2.sent;
                return _context2.abrupt("return", res.status(response.statusCode).send(response));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addUser(_x3, _x4) {
        return _addUser.apply(this, arguments);
      }

      return addUser;
    }()
  }, {
    key: "registerUser",
    value: function () {
      var _registerUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var hash, userData, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                hash = _bcrypt["default"].hashSync(req.body.password, 10);
                userData = req.body;
                userData.password = hash;
                _context3.next = 5;
                return this.service.registerUser(userData);

              case 5:
                response = _context3.sent;
                return _context3.abrupt("return", res.status(response.statusCode).send(response));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function registerUser(_x5, _x6) {
        return _registerUser.apply(this, arguments);
      }

      return registerUser;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.service.login(req.body);

              case 2:
                response = _context4.sent;
                return _context4.abrupt("return", res.status(response.statusCode).send(response));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function login(_x7, _x8) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.service.search(req.query, req.user._id);

              case 2:
                response = _context5.sent;
                return _context5.abrupt("return", res.status(response.statusCode).send(response));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function search(_x9, _x10) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "changePassword",
    value: function () {
      var _changePassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.service.changePassword(req.body, req.params.id);

              case 2:
                response = _context6.sent;
                return _context6.abrupt("return", res.status(response.statusCode).send(response));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function changePassword(_x11, _x12) {
        return _changePassword.apply(this, arguments);
      }

      return changePassword;
    }()
  }]);

  return UserController;
}(_Controller2["default"]);

var _default = new UserController(userService);

exports["default"] = _default;