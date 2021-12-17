"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var react_query_1 = require("react-query");
var utils_1 = require("../utils");
var useCreateEntry = function () { return (0, react_query_1.useMutation)(function (entry) {
    return axios_1["default"].post((0, utils_1.getApiUrl)("entry"), entry);
}); };
exports["default"] = useCreateEntry;
//# sourceMappingURL=useCreateEntry.js.map