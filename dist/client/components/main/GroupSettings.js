"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var useDeleteGroup_1 = __importDefault(require("../../hooks/useDeleteGroup"));
var useEditGroup_1 = __importDefault(require("../../hooks/useEditGroup"));
var useFetchGroups_1 = __importDefault(require("../../hooks/useFetchGroups"));
var useToast_1 = __importDefault(require("../../hooks/useToast"));
var Group_1 = __importDefault(require("../global/Group"));
var GroupSkeleton_1 = __importDefault(require("../global/GroupSkeleton"));
var Modal_1 = __importDefault(require("../global/Modal"));
var GroupSettings = function () {
    var _a = (0, useFetchGroups_1["default"])(), groups = _a.data, refetch = _a.refetch;
    var editGroup = (0, useEditGroup_1["default"])();
    var deleteGroup = (0, useDeleteGroup_1["default"])();
    var showToast = (0, useToast_1["default"])();
    var _b = (0, react_1.useState)(false), isOpen = _b[0], setOpen = _b[1];
    var _c = (0, react_1.useState)(0), groupToDelete = _c[0], setGroupToDelete = _c[1];
    (0, react_1.useEffect)(function () {
        if (editGroup.isSuccess) {
            refetch();
            editGroup.reset();
            showToast('Group Edited Successfully!');
        }
    }, [editGroup.isSuccess]);
    (0, react_1.useEffect)(function () {
        if (editGroup.isError) {
            editGroup.reset();
            showToast('Unable to edit group!');
        }
    }, [editGroup.isError]);
    (0, react_1.useEffect)(function () {
        if (deleteGroup.isSuccess) {
            refetch();
            deleteGroup.reset();
            showToast('Group Deleted Successfully!');
        }
    }, [deleteGroup.isSuccess]);
    (0, react_1.useEffect)(function () {
        if (deleteGroup.isError) {
            deleteGroup.reset();
            showToast('Unable to delete group!');
        }
    }, [deleteGroup.isError]);
    var onEdit = function (id) { return function (title) {
        editGroup.mutate({ id: id, title: title });
    }; };
    var deleteGroupFn = function (id, moveToGroupId) {
        setGroupToDelete(0);
        setOpen(false);
        if (!moveToGroupId) {
            deleteGroup.mutate({ id: id, deleteOrMoveEntries: 'delete' });
            return;
        }
        deleteGroup.mutate({ id: id, deleteOrMoveEntries: 'move', moveToGroupId: moveToGroupId });
    };
    var onDelete = function (id) { return function (option) {
        if (!option) {
            showToast('You need to choose a delete option before continue.');
            return;
        }
        if (option === 'move') {
            setGroupToDelete(id);
        }
        if (option === 'delete') {
            deleteGroupFn(id);
        }
    }; };
    var onModalClose = function () {
        setOpen(false);
        setGroupToDelete(0);
    };
    return <div className={'inline-block'}>
        <button onClick={function () { return setOpen(true); }} className={'ml-3 py-1 px-3 text-sm rounded-2xl cursor-pointer border-2 border-blue-500 inline-flex items-center justify-center hover:shadow-md transition-shadow duration-500'}>
            Group Settings
        </button>

        {isOpen && !groupToDelete && <Modal_1["default"] onRequestClose={onModalClose}>
            <h2 className={'text-xl mb-5 mt-3'}>Group Settings</h2>
            {!!groups && groups.map(function (group) {
                var _a;
                return ((_a = editGroup.variables) === null || _a === void 0 ? void 0 : _a.id) === group.id
                    ? <GroupSkeleton_1["default"] />
                    : <Group_1["default"] {...group} key={group.id} deleteOptions={{
                            'delete': 'Delete Entries as well',
                            'move': 'Move Entries to another group'
                        }} onRequestEdit={onEdit(group.id)} onRequestDelete={onDelete(group.id)}/>;
            })}
        </Modal_1["default"]>}

        {isOpen && !!groupToDelete && <Modal_1["default"] onRequestClose={onModalClose} size="sm">
            <h2 className={'text-xl mb-5 mt-3'}>Select a group to move</h2>
            {!!groups && groups.map(function (group) {
                return groupToDelete.toString() !== group.id.toString()
                    ? <div onClick={function () { return deleteGroupFn(groupToDelete, group.id); }} className={'border-b border-gray-300 py-3 flex justify-between items-center hover:bg-gray-300 cursor-pointer'}>
                        <p className={'text-gray-700'}>{group.title}</p>
                    </div>
                    : null;
            })}
        </Modal_1["default"]>}
    </div>;
};
exports["default"] = GroupSettings;
//# sourceMappingURL=GroupSettings.js.map