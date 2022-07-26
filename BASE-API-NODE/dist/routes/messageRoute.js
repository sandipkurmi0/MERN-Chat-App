"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _MessageController = _interopRequireDefault(require("../controllers/MessageController"));

var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(router) {
  router.post("/api/message", _MessageController["default"].sendMessage);
  router.get("/api/message/:chatId", _MessageController["default"].getChatMessages);
};

exports["default"] = _default;