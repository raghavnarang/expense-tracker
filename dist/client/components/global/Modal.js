"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Modal = function (_a) {
    var onRequestClose = _a.onRequestClose, children = _a.children, _b = _a.size, size = _b === void 0 ? 'md' : _b;
    var modalRef = (0, react_1.useRef)(null);
    /** Close Modal on Escape */
    (0, react_1.useEffect)(function () {
        var onEsc = function (e) {
            if (e.key === 'Escape') {
                !!onRequestClose && onRequestClose();
            }
        };
        document.addEventListener('keydown', onEsc);
        return function () { return document.removeEventListener('keydown', onEsc); };
    }, []);
    /** Close on Outside Click */
    var onOutsideClick = function (e) {
        var _a;
        if (!((_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
            !!onRequestClose && onRequestClose();
        }
    };
    var modalSize = size === 'md' ? 'w-6/12' : 'w-3/12';
    return <div onClick={onOutsideClick} className={'absolute bg-black-rgba w-screen h-screen top-0 left-0 flex justify-center items-center'}>
        <div ref={modalRef} className={"h-4/6 ".concat(modalSize, " rounded-lg bg-white px-10 py-5")}>
            {children}
        </div>
    </div>;
};
exports["default"] = Modal;
//# sourceMappingURL=Modal.js.map