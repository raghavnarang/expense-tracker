"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var react_query_1 = require("react-query");
var utils_1 = require("../utils");
var useEditEntry = function () { return (0, react_query_1.useMutation)(function (entry) {
    return axios_1["default"].put((0, utils_1.getApiUrl)("entry/".concat(entry.id)), entry);
}); };
exports["default"] = useEditEntry;
//# sourceMappingURL=useEditEntry.js.map