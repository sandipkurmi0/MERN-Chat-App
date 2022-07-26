"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(router) {
  router.post("/api/user", _UserController["default"].addUser);
  router.get("/api/user", _UserController["default"].getAll);
  router.post("/api/register", _UserController["default"].registerUser);
  router.post("/api/login", _UserController["default"].login);
  router.get("/api/getUserByQuery", _UserController["default"].getUserByQuery);
  router.get("/api/search", _auth["default"], _UserController["default"].search);
};

exports["default"] = _default;