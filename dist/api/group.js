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
var express_1 = __importDefault(require("express"));
var group_1 = require("../controllers/group");
var utils_1 = require("../utils");
/** Data Validators for API Endpoint's input */
var group_validate_input_1 = require("./middleware/group-validate-input");
var router = express_1["default"].Router();
/** Get Groups */
router.get('/list', group_validate_input_1.getGroupsValidate, (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, offset, limit, includeEntries, entryOffset, entryLimit, userId, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = res.locals.data, offset = _a.offset, limit = _a.limit, includeEntries = _a.includeEntries, entryOffset = _a.entryOffset, entryLimit = _a.entryLimit;
                userId = res.locals.user.userId;
                return [4 /*yield*/, (0, group_1.getGroups)(offset, limit, includeEntries, entryOffset, entryLimit, userId)];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); }));
/** Create Group */
router.post('/', group_validate_input_1.createGroupValidate, (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, userId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                title = res.locals.data.title;
                userId = res.locals.user.userId;
                return [4 /*yield*/, (0, group_1.createGroup)(title, userId)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); }));
/** Edit Group */
router.put('/:id', group_validate_input_1.editGroupValidate, (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, title, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = res.locals.data, id = _a.id, title = _a.title;
                return [4 /*yield*/, (0, group_1.editGroup)(title, id)];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); }));
/** Delete Group */
router["delete"]('/:id', group_validate_input_1.deleteGroupValidate, (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, deleteOrMoveEntries, moveGroupId, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = res.locals.data, id = _a.id, deleteOrMoveEntries = _a.deleteOrMoveEntries, moveGroupId = _a.moveGroupId;
                return [4 /*yield*/, (0, group_1.deleteGroup)(id, deleteOrMoveEntries, moveGroupId)];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); }));
/** Get Group (w/ Entries) */
router.get('/:id', group_validate_input_1.getGroupValidate, (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, offset, limit, id, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = res.locals.data, offset = _a.offset, limit = _a.limit, id = _a.id;
                return [4 /*yield*/, (0, group_1.getGroup)(id, offset, limit)];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); }));
exports["default"] = router;
//# sourceMappingURL=group.js.map