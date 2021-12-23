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
exports.deleteEntry = exports.editEntry = exports.getEntries = exports.moveToGroup = exports.unadjustEntry = exports.adjustEntry = exports.createEntry = void 0;
var client_1 = __importDefault(require("../client"));
var group_1 = require("./group");
var createEntry = function (message, amount, groupId, groupName, userId, date) {
    if (groupName === void 0) { groupName = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var createData;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = {};
                    _b = {
                        userId: userId,
                        message: message,
                        amount: amount
                    };
                    _c = {};
                    _d = {
                        where: {
                            id: groupId
                        }
                    };
                    _e = {
                        title: groupName
                    };
                    return [4 /*yield*/, (0, group_1.getUniqueSlug)(groupName)];
                case 1:
                    createData = (_a.data = (_b.group = (_c.connectOrCreate = (_d.create = (_e.groupSlug = _f.sent(),
                        _e.userId = userId,
                        _e),
                        _d),
                        _c),
                        _b),
                        _a);
                    if (!!date) {
                        createData.data.createdAt = date;
                    }
                    return [4 /*yield*/, client_1["default"].entry.create(createData)];
                case 2: return [2 /*return*/, _f.sent()];
            }
        });
    });
};
exports.createEntry = createEntry;
var adjustEntry = function (entryId, parentEntryId) { return client_1["default"].entry.update({
    data: {
        parent: {
            connect: { id: parentEntryId }
        }
    }, where: { id: entryId }
}); };
exports.adjustEntry = adjustEntry;
var unadjustEntry = function (entryId) { return client_1["default"].entry.update({
    data: {
        parent: {
            disconnect: true
        }
    },
    where: {
        id: entryId
    }
}); };
exports.unadjustEntry = unadjustEntry;
var moveToGroup = function (entryId, groupId) { return client_1["default"].entry.update({
    where: { id: entryId },
    data: {
        group: {
            connect: { id: groupId }
        }
    }
}); };
exports.moveToGroup = moveToGroup;
var getEntries = function (offset, limit, groupId, userId) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 10; }
    if (groupId === void 0) { groupId = 0; }
    var findArgs = {
        skip: offset,
        take: limit
    };
    findArgs.where = { userId: userId };
    if (!!groupId) {
        findArgs.where.groupId = groupId;
    }
    return client_1["default"].entry.findMany(findArgs);
};
exports.getEntries = getEntries;
var editEntry = function (entryId, message, amount, date) {
    if (!message && !amount && !date) {
        throw new Error('Invalid data for updating entry');
    }
    var updateData = {};
    if (!!message) {
        updateData.message = message;
    }
    if (!!amount) {
        updateData.amount = amount;
    }
    if (!!date) {
        updateData.createdAt = date;
    }
    return client_1["default"].entry.update({
        where: { id: entryId },
        data: updateData
    });
};
exports.editEntry = editEntry;
var deleteEntry = function (entryId) {
    return client_1["default"].entry["delete"]({ where: { id: entryId } });
};
exports.deleteEntry = deleteEntry;
//# sourceMappingURL=entry.js.map