"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var EditEntry_1 = __importDefault(require("./EditEntry"));
var EntryAdd = function (_a) {
    var onSubmit = _a.onSubmit;
    var _b = (0, react_1.useState)(false), isAdd = _b[0], setIsAdd = _b[1];
    var onEditSubmit = function (message, amount) {
        !!onSubmit && onSubmit(message, amount);
        setIsAdd(false);
    };
    return <>
        {isAdd ?
            <EditEntry_1["default"] onCancel={function () { return setIsAdd(false); }} onSubmit={onEditSubmit}/> :
            <button className={'border border-blue-500 rounded-md text-blue-500 px-7 py-2 text-sm hover:bg-blue-500 hover:text-white transition-colors duration-300'} onClick={function () { return setIsAdd(true); }}>
                Add
            </button>}
    </>;
};
exports["default"] = EntryAdd;
//# sourceMappingURL=EntryAdd.js.map