"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var useFetchEntries_1 = __importDefault(require("../../hooks/useFetchEntries"));
var useFetchGroups_1 = __importDefault(require("../../hooks/useFetchGroups"));
var EntryHead_1 = __importDefault(require("../global/EntryHead"));
var EntrySkeleton_1 = __importDefault(require("../global/EntrySkeleton"));
var EntryAdd_1 = __importDefault(require("../main/EntryAdd"));
var EntryList_1 = __importDefault(require("./EntryList"));
var Entries = function () {
    var _a = (0, useFetchGroups_1["default"])(), isGroupsLoading = _a.isLoading, currentGroupId = _a.currentGroupId;
    var _b = (0, useFetchEntries_1["default"])(currentGroupId), isLoading = _b.isLoading, isError = _b.isError, _c = _b.data, entries = _c === void 0 ? [] : _c, refetch = _b.refetch;
    if (isError) {
        return <div className={'h-4/6 overflow-y-auto flex justify-center'}>
            <p className={'mt-10 mb-5'}>Unable to list expenses</p>
            <button onClick={function () { return refetch(); }} className={'border border-rose-500 rounded-md text-rose-500 px-7 py-2 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-300'}>
                Try Again
            </button>
        </div>;
    }
    if (isGroupsLoading || isLoading) {
        return <div className={'h-4/6 overflow-y-auto'}>
            <EntryHead_1["default"] />
            {Array.from(Array(10).keys()).map(function (key) {
                return <EntrySkeleton_1["default"] key={key}/>;
            })}
        </div>;
    }
    var totalExpenses = 0;
    if (!!entries && entries.length > 0) {
        totalExpenses = entries.reduce(function (total, entry) { return total + parseFloat(entry.amount.toString()); }, 0);
    }
    return <>
        <div className={'h-5/6 overflow-y-auto'}>
            <EntryHead_1["default"] />
            <EntryList_1["default"] entries={entries} refetchEntries={refetch}/>
            {currentGroupId && <EntryAdd_1["default"] groupId={currentGroupId} onSuccess={refetch}/>}
        </div>
        <div className={'flex items-center text-gray-500 pt-2 border-t border-gray-300'}>
            <p className={'w-7/12 py-2 px-2 rounded outline-none text-right'}>Total:</p>
            <p className={'w-3/12 py-2 px-2 rounded mr-5 outline-none'}>{totalExpenses}</p>
        </div>
    </>;
};
exports["default"] = Entries;
//# sourceMappingURL=Entries.js.map