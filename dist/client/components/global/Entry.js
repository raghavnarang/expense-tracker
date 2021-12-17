"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var ti_1 = require("react-icons/ti");
var EditEntry_1 = __importDefault(require("./EditEntry"));
var TooltipConfirmation_1 = __importDefault(require("./TooltipConfirmation"));
var Entry = function (_a) {
    var onRequestEdit = _a.onRequestEdit, onRequestDelete = _a.onRequestDelete, message = _a.message, amount = _a.amount;
    var _b = (0, react_1.useState)(false), isEdit = _b[0], setIsEdit = _b[1];
    var _c = (0, react_1.useState)(false), isDelete = _c[0], setIsDelete = _c[1];
    var onEditSubmit = function (message, amount) {
        !!onRequestEdit && onRequestEdit(message, amount);
        setIsEdit(false);
    };
    var onDeleteButtonClick = function (button) {
        if (button === 'yes') {
            !!onRequestDelete && onRequestDelete();
        }
        setIsDelete(false);
    };
    if (isEdit) {
        return <EditEntry_1["default"] onCancel={function () { return setIsEdit(false); }} onSubmit={onEditSubmit} message={message} amount={amount}/>;
    }
    return <div className={'flex items-center text-gray-700 mb-2'}>
        <p className={'w-7/12 py-2 rounded mr-5 outline-none'}>{message}</p>
        <p className={'w-3/12 py-2 rounded mr-5 outline-none'}>{amount}</p>
        <div className={'w-2/12'}>
            <button className={'rounded-full border border-blue-500 p-1 mr-2'} onClick={function () { return setIsEdit(true); }}>
                <ti_1.TiEdit className={'text-blue-500 w-5 h-5'}/>
            </button>
            <div className={'inline-block'}>
                <button className={'rounded-full border border-rose-500 p-1'} onClick={function () { return setIsDelete(true); }}>
                    <ti_1.TiDelete className={'text-rose-500 w-5 h-5'}/>
                </button>
                {isDelete && <TooltipConfirmation_1["default"] text='Are you sure?' buttons={{ yes: 'Yes', no: 'No' }} onButtonClick={onDeleteButtonClick} onRequestClose={function () { return setIsDelete(false); }}/>}
            </div>
        </div>
    </div>;
};
exports["default"] = Entry;
//# sourceMappingURL=Entry.js.map