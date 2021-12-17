"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ToastContext = exports.getApiUrl = void 0;
var react_1 = __importDefault(require("react"));
var getApiUrl = function (url) { return "http://localhost:4000/".concat(url); };
exports.getApiUrl = getApiUrl;
exports.ToastContext = react_1["default"].createContext({
    showToast: function (text) { }
});
//# sourceMappingURL=utils.js.map