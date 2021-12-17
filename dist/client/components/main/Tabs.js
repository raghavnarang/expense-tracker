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
var router_1 = require("next/router");
var react_1 = require("react");
var useCreateGroup_1 = __importDefault(require("../../hooks/useCreateGroup"));
var useFetchGroups_1 = __importDefault(require("../../hooks/useFetchGroups"));
var useToast_1 = __importDefault(require("../../hooks/useToast"));
var Tabs_1 = __importStar(require("../global/Tabs"));
var GroupSettings_1 = __importDefault(require("./GroupSettings"));
var Tabs = function () {
    var _a = (0, useFetchGroups_1["default"])(), isLoading = _a.isLoading, isError = _a.isError, groups = _a.data, currentGroupSlug = _a.currentGroupSlug, refetch = _a.refetch;
    var createGroup = (0, useCreateGroup_1["default"])();
    var showToast = (0, useToast_1["default"])();
    var router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(function () {
        if (isError) {
            showToast('Unable to fetch Expenses');
        }
    }, [isError]);
    (0, react_1.useEffect)(function () {
        if (createGroup.isSuccess) {
            showToast('Group Added successfully');
            refetch();
        }
    }, [createGroup.isSuccess]);
    var groupTabs = {};
    if (groups) {
        for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
            var tab = groups_1[_i];
            groupTabs[tab.groupSlug] = tab.title;
        }
    }
    var onTabAdd = function (name) {
        createGroup.mutate(name);
    };
    var onTabClick = function (slug) {
        !!slug && router.push("/".concat(slug));
    };
    return isLoading ? <Tabs_1.TabsSkeleton /> :
        <Tabs_1["default"] onTabAdd={onTabAdd} onTabClick={onTabClick} tabs={groupTabs} currentTab={currentGroupSlug}>
        <GroupSettings_1["default"] />
    </Tabs_1["default"]>;
};
exports["default"] = Tabs;
//# sourceMappingURL=Tabs.js.map