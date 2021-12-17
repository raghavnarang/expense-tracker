"use strict";
exports.__esModule = true;
var Toast = function (_a) {
    var text = _a.text, onClick = _a.onClick;
    return <div className={'fixed bottom-10 right-10 rounded-md bg-gray-800 text-white w-80 p-4 cursor-pointer shadow-xl'} onClick={function () { return !!onClick && onClick(); }}>
        {text}
    </div>;
};
exports["default"] = Toast;
//# sourceMappingURL=Toast.js.map