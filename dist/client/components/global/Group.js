"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var ti_1 = require("react-icons/ti");
var EditGroup_1 = __importDefault(require("./EditGroup"));
var TooltipConfirmation_1 = __importDefault(require("./TooltipConfirmation"));
var Group = function (_a) {
    var title = _a.title, onRequestDelete = _a.onRequestDelete, onRequestEdit = _a.onRequestEdit, deleteOptions = _a.deleteOptions;
    var _b = (0, react_1.useState)(false), isEdit = _b[0], setIsEdit = _b[1];
    var _c = (0, react_1.useState)(false), isDelete = _c[0], setIsDelete = _c[1];
    var onEditSubmit = function (title) {
        !!onRequestEdit && onRequestEdit(title);
        setIsEdit(false);
    };
    var onDeleteButtonClick = function (button, radioOption) {
        if (button === 'yes') {
            !!onRequestDelete && onRequestDelete(radioOption);
        }
        setIsDelete(false);
    };
    if (isEdit) {
        return <EditGroup_1["default"] onCancel={function () { return setIsEdit(false); }} onSubmit={onEditSubmit} title={title}/>;
    }
    return (<div className={'border-b border-gray-300 py-3 flex justify-between items-center'}>
            <p className={'text-gray-700'}>{title}</p>
            <div>
                <button className={'rounded-full border border-blue-500 p-1 mr-2'} onClick={function () { return setIsEdit(true); }}>
                    <ti_1.TiEdit className={'text-blue-500 w-5 h-5'}/>
                </button>
                <div className={'inline-block'}>
                    <button className={'rounded-full border border-rose-500 p-1'} onClick={function () { return setIsDelete(true); }}>
                        <ti_1.TiDelete className={'text-rose-500 w-5 h-5'}/>
                    </button>
                    {isDelete && <TooltipConfirmation_1["default"] text='Are you sure?' radios={deleteOptions} buttons={{ yes: 'Yes', no: 'No' }} size={!!deleteOptions ? 'md' : 'sm'} onButtonClick={onDeleteButtonClick} onRequestClose={function () { return setIsDelete(false); }}/>}
                </div>
            </div>
        </div>);
};
exports["default"] = Group;
//# sourceMappingURL=Group.js.map