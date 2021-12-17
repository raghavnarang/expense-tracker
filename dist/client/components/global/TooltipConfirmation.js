"use strict";
exports.__esModule = true;
var react_1 = require("react");
/** Note: Always place it within a button */
var TooltipConfirmation = function (_a) {
    var text = _a.text, buttons = _a.buttons, radios = _a.radios, selectedRadio = _a.selectedRadio, onButtonClick = _a.onButtonClick, _b = _a.size, size = _b === void 0 ? 'sm' : _b, onRequestClose = _a.onRequestClose;
    var _c = (0, react_1.useState)(selectedRadio), currentRadio = _c[0], setCurrentRadio = _c[1];
    var tipSize = size === 'md' ? 'w-80' : 'w-60';
    var tipRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        /** Close on Outside Click */
        var onOutsideClick = function (e) {
            var _a;
            if (!((_a = tipRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
                !!onRequestClose && onRequestClose();
            }
        };
        document.addEventListener('click', onOutsideClick);
        return function () {
            document.removeEventListener('click', onOutsideClick);
        };
    }, []);
    return <div className={'relative w-0 h-0'}>
        <div ref={tipRef} className={"absolute top-2 -right-10 bg-gray-800 rounded-lg py-2 px-4 ".concat(tipSize)}>
            {/** Text */}
            {!!text && <p className={'text-white text-md mt-1'}>{text}</p>}

            {/** Radio */}
            {!!radios && Object.keys(radios).map(function (radio) {
            return <label className={'text-gray-300 text-sm flex items-center my-2'} key={radio}>
                    <input className={'mr-2'} type='radio' value={radio} checked={currentRadio === radio} onChange={function (e) { return setCurrentRadio(e.target.value); }}/>

                    {radios[radio]}
                </label>;
        })}

            <div>
                {Object.keys(buttons).map(function (btn) {
            return <button key={btn} className={'border-none text-gray-300 text-sm mr-4 mt-2 mb-1 hover:text-white'} onClick={function () { return !!onButtonClick && onButtonClick(btn, currentRadio); }}>
                        {buttons[btn]}
                    </button>;
        })}
            </div>
        </div>
        <span className={'absolute -top-2 -right-6 border-t-transparent border-x-transparent border-8 border-b-gray-800 block w-px h-px'}/>
    </div>;
};
exports["default"] = TooltipConfirmation;
//# sourceMappingURL=TooltipConfirmation.js.map