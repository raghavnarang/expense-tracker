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
exports.TabsSkeleton = void 0;
var dynamic_1 = __importDefault(require("next/dynamic"));
var react_1 = require("react");
var ContentLoader = (0, dynamic_1["default"])(function () { return Promise.resolve().then(function () { return __importStar(require('react-content-loader')); }); }, { ssr: false });
var Tabs = function (_a) {
    var tabs = _a.tabs, onTabClick = _a.onTabClick, onTabAdd = _a.onTabAdd, currentTab = _a.currentTab, isAddLoading = _a.isAddLoading, children = _a.children;
    var _b = (0, react_1.useState)(false), newTab = _b[0], setNewTab = _b[1];
    var _c = (0, react_1.useState)(''), newTabText = _c[0], setNewTabText = _c[1];
    var inputRef = (0, react_1.useRef)(null);
    var onKeyDown = function (e) {
        if (e.key === 'Enter') {
            setNewTab(false);
            !!onTabAdd && onTabAdd(newTabText);
            setNewTabText('');
        }
        if (e.key === 'Escape') {
            setNewTab(false);
            setNewTabText('');
        }
    };
    var activeClass = function (tab) { return currentTab === tab ? 'border-gray-400 border-b-0 shadow' : 'border-b-0 border-gray-300'; };
    return <div className={'border-b border-gray-300'}>
        {Object.keys(tabs).map(function (tab) {
            return <div className={"px-7 py-3 rounded-t-xl mr-2 cursor-pointer text-sm hover:shadow inline-block border ".concat(activeClass(tab))} key={tab} onClick={function () { return !!onTabClick && onTabClick(tab); }}>
                {tabs[tab]}
            </div>;
        })}
        {!newTab && <div className={'p-0 m-0 w-8 h-8 pb-1 rounded-2xl cursor-pointer border border-gray-300 inline-flex items-center justify-center hover:shadow-md'} onClick={function () { return setNewTab(true); }}>
            {isAddLoading ? <ContentLoader speed={2} width={30} height={20} backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
                <rect x="0" y="0" rx="0" ry="0" width="30" height="20"/>
            </ContentLoader> : '+'}
        </div>}
        {newTab && <div className={'px-7 py-3 rounded-t-xl mr-2 cursor-pointer text-sm border border-gray-300 hover:shadow inline-block'}>
            <input className={'outline-none border-none'} ref={inputRef} type="text" value={newTabText} onChange={function (e) { return setNewTabText(e.target.value); }} onKeyDown={onKeyDown} autoFocus={true}/>
        </div>}
        {children}
    </div>;
};
var TabsSkeleton = function (_a) {
    var _b = _a.tabs, tabs = _b === void 0 ? 5 : _b;
    return <div>
        {Array.from(Array(tabs).keys()).map(function (tab) {
            return <div className={'px-7 py-3 rounded-t-xl mr-2 text-sm border border-gray-300 inline-block'} key={tab}>
                <ContentLoader speed={2} width={30} height={20} backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
                    <rect x="0" y="0" rx="0" ry="0" width="30" height="20"/>
                </ContentLoader>
            </div>;
        })}
    </div>;
};
exports.TabsSkeleton = TabsSkeleton;
exports["default"] = Tabs;
//# sourceMappingURL=Tabs.js.map