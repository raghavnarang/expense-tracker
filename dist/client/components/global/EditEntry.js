"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ti_1 = require("react-icons/ti");
var EditEntry = function (_a) {
    var onCancel = _a.onCancel, onSubmit = _a.onSubmit, initMessage = _a.message, initAmount = _a.amount;
    var _b = (0, react_1.useState)(!!initMessage ? initMessage : ''), message = _b[0], setMessage = _b[1];
    var _c = (0, react_1.useState)(!!initAmount ? initAmount.toString() : ''), amount = _c[0], setAmount = _c[1];
    return <div className={'flex items-center mb-2'}>
        <input onChange={function (e) { return setMessage(e.target.value); }} value={message} placeholder="Message" type="text" autoFocus={true} className={'w-7/12 px-2 py-2 border border-gray-300 rounded mr-5 outline-none'}/>

        <input onChange={function (e) { return setAmount(e.target.value); }} value={amount} placeholder="Amount" type="number" className={'w-3/12 px-2 py-2 border border-gray-300 rounded mr-5 outline-none'}/>

        <div className={'w-2/12'}>
            <button className={'rounded-full border border-green-500 p-1 mr-2'} onClick={function () { return !!onSubmit && onSubmit(message, parseFloat(amount)); }}>
                <ti_1.TiTick className={'text-green-500 w-5 h-5'}/>
            </button>
            <button className={'rounded-full border border-rose-500 p-1'} onClick={function () { return !!onCancel && onCancel(); }}>
                <ti_1.TiCancel className={'text-rose-500 w-5 h-5'}/>
            </button>
        </div>
    </div>;
};
exports["default"] = EditEntry;
//# sourceMappingURL=EditEntry.js.map