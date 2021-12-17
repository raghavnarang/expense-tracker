"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var react_query_1 = require("react-query");
var utils_1 = require("../utils");
var qs_1 = __importDefault(require("qs"));
var useDeleteGroup = function () { return (0, react_query_1.useMutation)(function (group) {
    var qString = {
        deleteOrMoveEntries: group.deleteOrMoveEntries
    };
    if (!!group.moveToGroupId) {
        qString.moveGroupId = group.moveToGroupId;
    }
    return axios_1["default"]["delete"]((0, utils_1.getApiUrl)("group/".concat(group.id, "?").concat(qs_1["default"].stringify(qString))));
}); };
exports["default"] = useDeleteGroup;
//# sourceMappingURL=useDeleteGroup.js.map