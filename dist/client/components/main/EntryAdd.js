"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var useCreateEntry_1 = __importDefault(require("../../hooks/useCreateEntry"));
var useToast_1 = __importDefault(require("../../hooks/useToast"));
var EntryAdd_1 = __importDefault(require("../global/EntryAdd"));
var EntrySkeleton_1 = __importDefault(require("../global/EntrySkeleton"));
var EntryAdd = function (_a) {
    var _b = _a.groupId, groupId = _b === void 0 ? 0 : _b, onSuccess = _a.onSuccess;
    var showToast = (0, useToast_1["default"])();
    var createEntry = (0, useCreateEntry_1["default"])();
    var onCreateEntry = function (message, amount) {
        createEntry.mutate({ message: message, amount: amount, groupId: groupId });
    };
    var isLoading = createEntry.isLoading, isError = createEntry.isError, isSuccess = createEntry.isSuccess;
    (0, react_1.useEffect)(function () {
        if (isError) {
            showToast('Unable to add Entry');
        }
    }, [isError]);
    (0, react_1.useEffect)(function () {
        if (isSuccess) {
            showToast('Entry Added successfully');
            !!onSuccess && onSuccess();
        }
    }, [isSuccess]);
    if (isLoading) {
        return <EntrySkeleton_1["default"] />;
    }
    return <EntryAdd_1["default"] onSubmit={onCreateEntry}/>;
};
exports["default"] = EntryAdd;
//# sourceMappingURL=EntryAdd.js.map