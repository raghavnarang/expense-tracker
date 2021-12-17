"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_content_loader_1 = __importDefault(require("react-content-loader"));
var GroupSkeleton = function () { return (<div className={'border-b border-gray-300 py-3 flex justify-between items-center'}>
        <p className={'text-gray-700'}>
            <react_content_loader_1["default"] speed={2} width={300} height={20} backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
                <rect x="0" y="0" rx="0" ry="0" width="300" height="20"/>
            </react_content_loader_1["default"]>
        </p>
        <div>
            <react_content_loader_1["default"] speed={2} width={30} height={30} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" className={'mr-2 inline-block'}>
                <circle cx="15" cy="15" r="15"/>
            </react_content_loader_1["default"]>
            <react_content_loader_1["default"] speed={2} width={30} height={30} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" className={'mr-2 inline-block'}>
                <circle cx="15" cy="15" r="15"/>
            </react_content_loader_1["default"]>
        </div>
    </div>); };
exports["default"] = GroupSkeleton;
//# sourceMappingURL=GroupSkeleton.js.map