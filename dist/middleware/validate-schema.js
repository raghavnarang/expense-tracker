"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.validateSchema = void 0;
var validateSchema = function (schema) { return function (req, res, next) {
    var result = schema.validate(__assign(__assign(__assign({}, req.params), req.body), req.query));
    if (!!result.error) {
        next(result.error);
    }
    res.locals.data = result.value;
    next();
}; };
exports.validateSchema = validateSchema;
//# sourceMappingURL=validate-schema.js.map