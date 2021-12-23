"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getUniqueSlug = exports.deleteGroup = exports.DeleteOrMoveEntries = exports.editGroup = exports.getGroup = exports.getGroups = exports.createGroup = void 0;
var client_1 = __importDefault(require("../client"));
var utils_1 = require("../utils");
/** Create Group */
var createGroup = function (title, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var slug;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getUniqueSlug)(title)];
            case 1:
                slug = _a.sent();
                return [4 /*yield*/, client_1["default"].group.create({
                        data: { title: title, groupSlug: slug, userId: userId }
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createGroup = createGroup;
/** Get Groups (Optional: Include Entries) */
var getGroups = function (offset, limit, includeEntries, entryOffset, entryLimit, userId) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 10; }
    if (includeEntries === void 0) { includeEntries = false; }
    if (entryOffset === void 0) { entryOffset = 0; }
    if (entryLimit === void 0) { entryLimit = 10; }
    var include = {
        entries: false
    };
    if (includeEntries) {
        include.entries = { skip: entryOffset, take: entryLimit };
    }
    return client_1["default"].group.findMany({ skip: offset, take: limit, include: include, where: { userId: userId } });
};
exports.getGroups = getGroups;
/** Get Group (with Entries w/ Pagination) */
var getGroup = function (id, offset, limit) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 10; }
    return client_1["default"].group.findUnique({
        where: { id: id },
        include: {
            entries: {
                skip: offset,
                take: limit
            }
        }
    });
};
exports.getGroup = getGroup;
/** Edit Group */
var editGroup = function (title, groupId) {
    return client_1["default"].group.update({ where: { id: groupId }, data: { title: title } });
};
exports.editGroup = editGroup;
var DeleteOrMoveEntries;
(function (DeleteOrMoveEntries) {
    DeleteOrMoveEntries["DELETE"] = "delete";
    DeleteOrMoveEntries["MOVE"] = "move";
})(DeleteOrMoveEntries = exports.DeleteOrMoveEntries || (exports.DeleteOrMoveEntries = {}));
;
/** Delete Group */
var deleteGroup = function (groupId, deleteOrMove, moveToGroupId) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteQuery, query_1, query;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deleteQuery = client_1["default"].group["delete"]({ where: { id: groupId } });
                if (!(deleteOrMove === DeleteOrMoveEntries.DELETE)) return [3 /*break*/, 2];
                query_1 = client_1["default"].entry.deleteMany({ where: { groupId: groupId } });
                return [4 /*yield*/, client_1["default"].$transaction([query_1, deleteQuery])];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                // deleteOrMove === DeleteOrMoveEntries.MOVE
                if (!moveToGroupId) {
                    throw new Error('Move Group ID not found');
                }
                query = client_1["default"].entry.updateMany({ data: { groupId: moveToGroupId }, where: { groupId: groupId } });
                return [4 /*yield*/, client_1["default"].$transaction([query, deleteQuery])];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.deleteGroup = deleteGroup;
/** Get Unique Slug */
var getUniqueSlug = function (groupName) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, result, slugId, slugs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                slug = (0, utils_1.slugify)(groupName);
                return [4 /*yield*/, client_1["default"].group.findMany({
                        where: { groupSlug: { startsWith: slug } },
                        select: { groupSlug: true }
                    })];
            case 1:
                result = _a.sent();
                if (!result.length) {
                    return [2 /*return*/, slug];
                }
                slugId = 0;
                slugs = result.map(function (group) { return group.groupSlug; });
                while (slugs.includes("".concat(slug, "-").concat(++slugId)))
                    ;
                return [2 /*return*/, "".concat(slug, "-").concat(slugId)];
        }
    });
}); };
exports.getUniqueSlug = getUniqueSlug;
//# sourceMappingURL=group.js.map