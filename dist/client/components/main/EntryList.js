"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var useEditEntry_1 = __importDefault(require("../../hooks/useEditEntry"));
var useDeleteEntry_1 = __importDefault(require("../../hooks/useDeleteEntry"));
var useToast_1 = __importDefault(require("../../hooks/useToast"));
var Entry_1 = __importDefault(require("../global/Entry"));
var EntrySkeleton_1 = __importDefault(require("../global/EntrySkeleton"));
var EntryList = function (_a) {
    var entries = _a.entries, refetch = _a.refetchEntries;
    var editEntry = (0, useEditEntry_1["default"])();
    var deleteEntry = (0, useDeleteEntry_1["default"])();
    var showToast = (0, useToast_1["default"])();
    (0, react_1.useEffect)(function () {
        if (editEntry.isSuccess) {
            refetch();
            editEntry.reset();
            showToast('Entry Edited Successfully!');
        }
    }, [editEntry.isSuccess]);
    (0, react_1.useEffect)(function () {
        if (editEntry.isError) {
            editEntry.reset();
            showToast('Unable to edit entry!');
        }
    }, [editEntry.isError]);
    (0, react_1.useEffect)(function () {
        if (deleteEntry.isSuccess) {
            refetch();
            deleteEntry.reset();
            showToast('Entry Deleted Successfully!');
        }
    }, [deleteEntry.isSuccess]);
    (0, react_1.useEffect)(function () {
        if (deleteEntry.isError) {
            deleteEntry.reset();
            showToast('Unable to delete entry!');
        }
    }, [deleteEntry.isError]);
    if (entries.length === 0) {
        return <div>
            <p className={'my-5'}>No Expenses found</p>
        </div>;
    }
    var onEdit = function (id) { return function (message, amount) {
        editEntry.mutate({ id: id, message: message, amount: amount });
    }; };
    var onDelete = function (id) { return function () {
        deleteEntry.mutate(id);
    }; };
    return <>
        {entries.map(function (entry) {
            var _a;
            return ((_a = editEntry.variables) === null || _a === void 0 ? void 0 : _a.id) === entry.id || deleteEntry.variables === entry.id
                ? <EntrySkeleton_1["default"] key={entry.id}/>
                : <Entry_1["default"] key={entry.id} message={entry.message} amount={entry.amount} onRequestEdit={onEdit(entry.id)} onRequestDelete={onDelete(entry.id)}/>;
        })}
    </>;
};
exports["default"] = EntryList;
//# sourceMappingURL=EntryList.js.map