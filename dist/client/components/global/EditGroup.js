"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ti_1 = require("react-icons/ti");
var EditGroup = function (_a) {
    var onCancel = _a.onCancel, onSubmit = _a.onSubmit, initTitle = _a.title;
    var _b = (0, react_1.useState)(!!initTitle ? initTitle : ''), title = _b[0], setTitle = _b[1];
    return <div className={'border-b border-gray-300 py-3 flex justify-between items-center'}>
        <input onChange={function (e) { return setTitle(e.target.value); }} value={title} placeholder="Title" type="text" autoFocus={true} className={'w-4/12 border border-gray-300 rounded outline-none'}/>

        <div>
            <button className={'rounded-full border border-green-500 p-1 mr-2'} onClick={function () { return !!onSubmit && onSubmit(title); }}>
                <ti_1.TiTick className={'text-green-500 w-5 h-5'}/>
            </button>
            <button className={'rounded-full border border-rose-500 p-1'} onClick={function () { return !!onCancel && onCancel(); }}>
                <ti_1.TiCancel className={'text-rose-500 w-5 h-5'}/>
            </button>
        </div>
    </div>;
};
exports["default"] = EditGroup;
//# sourceMappingURL=EditGroup.js.map