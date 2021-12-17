"use strict";
exports.__esModule = true;
exports.slugify = exports.asyncHandler = void 0;
var asyncHandler = function (fn) { return function (req, res, next) {
    return Promise.resolve(fn(req, res, next))["catch"](next);
}; };
exports.asyncHandler = asyncHandler;
var slugify = function (str) {
    return str.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};
exports.slugify = slugify;
//# sourceMappingURL=utils.js.map