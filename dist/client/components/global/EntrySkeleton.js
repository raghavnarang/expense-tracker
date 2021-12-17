"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dynamic_1 = __importDefault(require("next/dynamic"));
var ContentLoader = (0, dynamic_1["default"])(function () { return Promise.resolve().then(function () { return __importStar(require('react-content-loader')); }); }, { ssr: false });
var EntrySkeleton = function () {
    return <div className={'flex items-center text-gray-500 mb-2'}>
        <p className={'w-7/12 py-2 px-2 rounded mr-5 outline-none'}>
            <ContentLoader speed={2} width={300} height={20} backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
                <rect x="0" y="0" rx="0" ry="0" width="300" height="20"/>
            </ContentLoader>
        </p>
        <p className={'w-3/12 py-2 px-2 rounded mr-5 outline-none'}>
            <ContentLoader speed={2} width={100} height={20} backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
                <rect x="0" y="0" rx="0" ry="0" width="100" height="20"/>
            </ContentLoader>
        </p>
        <div className={'w-2/12'}>
            <ContentLoader speed={2} width={30} height={30} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" className={'mr-2 inline-block'}>
                <circle cx="15" cy="15" r="15"/>
            </ContentLoader>
            <ContentLoader speed={2} width={30} height={30} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" className={'mr-2 inline-block'}>
                <circle cx="15" cy="15" r="15"/>
            </ContentLoader>
        </div>
    </div>;
};
exports["default"] = EntrySkeleton;
//# sourceMappingURL=EntrySkeleton.js.map