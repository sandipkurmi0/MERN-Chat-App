"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ChatController = _interopRequireDefault(require("../controllers/ChatController"));

var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(router) {
  router.post("/api/chat", _ChatController["default"].newChat);
  router.get("/api/chat/:userId", _ChatController["default"].getAllUserChat);
};

exports["default"] = _default;