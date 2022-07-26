"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("./Service"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

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

var UserService = /*#__PURE__*/function (_Service) {
  _inherits(UserService, _Service);

  var _super = _createSuper(UserService);

  function UserService(model) {
    var _this;

    _classCallCheck(this, UserService);

    _this = _super.call(this, model);
    _this.login = _this.login.bind(_assertThisInitialized(_this));
    _this.registerUser = _this.registerUser.bind(_assertThisInitialized(_this));
    _this.changePassword = _this.changePassword.bind(_assertThisInitialized(_this));
    _this.search = _this.search.bind(_assertThisInitialized(_this));
    _this.getUserByQuery = _this.getUserByQuery.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(UserService, [{
    key: "getUserByQuery",
    value: function () {
      var _getUserByQuery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(quary) {
        var userId, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = quary.userId;
                _context.prev = 1;
                _context.next = 4;
                return this.model.findById(userId);

              case 4:
                user = _context.sent;
                return _context.abrupt("return", {
                  error: false,
                  statusCode: 200,
                  data: user
                });

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", {
                  error: _context.t0.message,
                  statusCode: 400,
                  data: null
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function getUserByQuery(_x) {
        return _getUserByQuery.apply(this, arguments);
      }

      return getUserByQuery;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item, user) {
        var keyword, users;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                keyword = item.search ? {
                  $or: [{
                    name: {
                      $regex: item.search,
                      $options: "i"
                    }
                  }, {
                    email: {
                      $regex: item.search,
                      $options: "i"
                    }
                  }]
                } : {};
                _context2.next = 4;
                return this.model.find(keyword).find({
                  $ne: user
                });

              case 4:
                users = _context2.sent;
                return _context2.abrupt("return", {
                  error: false,
                  statusCode: 200,
                  data: users
                });

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", {
                  error: _context2.t0.message,
                  statusCode: 400,
                  data: null
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function search(_x2, _x3) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "registerUser",
    value: function () {
      var _registerUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item) {
        var name, email, password, pic, userExist, user, token;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                name = item.name, email = item.email, password = item.password, pic = item.pic;

                if (!(!name || !email || !password)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", {
                  error: 'Plese Enter all the feilds',
                  statusCode: 400,
                  data: null
                });

              case 3:
                _context3.next = 5;
                return this.model.findOne({
                  "email": item.email
                });

              case 5:
                userExist = _context3.sent;

                if (!userExist) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", {
                  error: 'User already exists',
                  statusCode: 400,
                  data: null
                });

              case 8:
                _context3.prev = 8;
                _context3.next = 11;
                return this.model.create({
                  name: item.name,
                  email: item.email,
                  password: item.password,
                  pic: item.pic
                });

              case 11:
                user = _context3.sent;
                token = _jsonwebtoken["default"].sign({
                  id: user._id
                }, process.env.JWT_SECRET_KEY, {
                  expiresIn: '7d'
                });

                if (!user) {
                  _context3.next = 15;
                  break;
                }

                return _context3.abrupt("return", {
                  error: false,
                  statusCode: 200,
                  message: "User Register successfully",
                  data: user,
                  token: token
                });

              case 15:
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](8);
                return _context3.abrupt("return", {
                  error: _context3.t0.message,
                  statusCode: 400,
                  data: null
                });

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 17]]);
      }));

      function registerUser(_x4) {
        return _registerUser.apply(this, arguments);
      }

      return registerUser;
    }() //login user

  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(item) {
        var user, results, token;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.model.findOne({
                  "email": item.email
                });

              case 3:
                user = _context4.sent;

                if (!user) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 7;
                return _bcrypt["default"].compareSync(item.password, user.password);

              case 7:
                results = _context4.sent;

                if (!results) {
                  _context4.next = 13;
                  break;
                }

                token = _jsonwebtoken["default"].sign({
                  id: user._id
                }, process.env.JWT_SECRET_KEY, {
                  expiresIn: '7d'
                });
                return _context4.abrupt("return", {
                  error: false,
                  message: 'login successfully',
                  statusCode: 200,
                  data: user,
                  token: token
                });

              case 13:
                return _context4.abrupt("return", {
                  error: 'You entered the wrong email or password',
                  statusCode: 401,
                  data: null
                });

              case 14:
                _context4.next = 17;
                break;

              case 16:
                return _context4.abrupt("return", {
                  error: 'You entered the wrong email or password',
                  statusCode: 401,
                  data: null
                });

              case 17:
                _context4.next = 22;
                break;

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", {
                  error: _context4.t0.message,
                  statusCode: 400,
                  data: null
                });

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 19]]);
      }));

      function login(_x5) {
        return _login.apply(this, arguments);
      }

      return login;
    }() //change password with current password

  }, {
    key: "changePassword",
    value: function () {
      var _changePassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(item, id) {
        var user, results, hash, update;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.model.findOne({
                  "_id": id
                });

              case 3:
                user = _context5.sent;

                if (!user) {
                  _context5.next = 21;
                  break;
                }

                _context5.next = 7;
                return _bcrypt["default"].compareSync(item.currentPassword, user.password);

              case 7:
                results = _context5.sent;

                if (!results) {
                  _context5.next = 18;
                  break;
                }

                _context5.next = 11;
                return _bcrypt["default"].hashSync(item.password, 10);

              case 11:
                hash = _context5.sent;
                _context5.next = 14;
                return this.model.findByIdAndUpdate(user._id, {
                  password: hash
                });

              case 14:
                update = _context5.sent;
                return _context5.abrupt("return", {
                  error: false,
                  message: 'password changed successfully',
                  statusCode: 200,
                  data: update
                });

              case 18:
                return _context5.abrupt("return", {
                  error: 'You entered wrong currant password',
                  statusCode: 400,
                  data: null
                });

              case 19:
                _context5.next = 22;
                break;

              case 21:
                return _context5.abrupt("return", {
                  error: 'You entered wrong currant password',
                  statusCode: 400,
                  data: null
                });

              case 22:
                _context5.next = 27;
                break;

              case 24:
                _context5.prev = 24;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", {
                  error: _context5.t0.message,
                  statusCode: 400,
                  data: null
                });

              case 27:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 24]]);
      }));

      function changePassword(_x6, _x7) {
        return _changePassword.apply(this, arguments);
      }

      return changePassword;
    }()
  }]);

  return UserService;
}(_Service2["default"]);

var _default = UserService;
exports["default"] = _default;