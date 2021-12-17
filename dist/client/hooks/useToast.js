"use strict";
exports.__esModule = true;
var react_1 = require("react");
var utils_1 = require("../utils");
var useToast = function () {
    var showToast = (0, react_1.useContext)(utils_1.ToastContext).showToast;
    return showToast;
};
exports["default"] = useToast;
//# sourceMappingURL=useToast.js.map