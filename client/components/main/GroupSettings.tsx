import { useEffect, useState } from "react";
import useDeleteGroup from "../../hooks/useDeleteGroup";

import useEditGroup from "../../hooks/useEditGroup";
import useFetchGroups from "../../hooks/useFetchGroups";
import useToast from "../../hooks/useToast";

import Group from "../global/Group";
import GroupSkeleton from "../global/GroupSkeleton";
import Modal from "../global/Modal";

const GroupSettings: React.FC = () => {
    const { data: groups, refetch } = useFetchGroups();
    const editGroup = useEditGroup();
    const deleteGroup = useDeleteGroup();
    const showToast = useToast();

    const [isOpen, setOpen] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState(0);

    useEffect(() => {
        if (editGroup.isSuccess) {
            refetch();
            editGroup.reset();
            showToast('Group Edited Successfully!');
        }
    }, [editGroup.isSuccess]);

    useEffect(() => {
        if (editGroup.isError) {
            editGroup.reset();
            showToast('Unable to edit group!');
        }
    }, [editGroup.isError]);

    useEffect(() => {
        if (deleteGroup.isSuccess) {
            refetch();
            deleteGroup.reset();
            showToast('Group Deleted Successfully!');
        }
    }, [deleteGroup.isSuccess]);

    useEffect(() => {
        if (deleteGroup.isError) {
            deleteGroup.reset();
            showToast('Unable to delete group!');
        }
    }, [deleteGroup.isError]);

    const onEdit = (id: number) => (title: string) => {
        editGroup.mutate({ id, title });
    }

    const deleteGroupFn = (id: number, moveToGroupId?: number) => {
        setGroupToDelete(0);
        setOpen(false);

        if (!moveToGroupId) {
            deleteGroup.mutate({ id, deleteOrMoveEntries: 'delete' });
            return;
        }

        deleteGroup.mutate({ id, deleteOrMoveEntries: 'move', moveToGroupId });
    }

    const onDelete = (id: number) => (option?: string) => {
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
    }

    const onModalClose = () => {
        setOpen(false);
        setGroupToDelete(0);
    }

    return <div className={'inline-block'}>
        <button onClick={() => setOpen(true)} className={'ml-3 py-1 px-3 text-sm rounded-2xl cursor-pointer border-2 border-blue-500 inline-flex items-center justify-center hover:shadow-md transition-shadow duration-500'}>
            Group Settings
        </button>

        {isOpen && !groupToDelete && <Modal onRequestClose={onModalClose}>
            <h2 className={'text-xl mb-5 mt-3'}>Group Settings</h2>
            {!!groups && groups.map(group =>
                editGroup.variables?.id === group.id
                    ? <GroupSkeleton />
                    : <Group
                        {...group}
                        key={group.id}
                        deleteOptions={{
                            'delete': 'Delete Entries as well',
                            'move': 'Move Entries to another group'
                        }}
                        onRequestEdit={onEdit(group.id)}
                        onRequestDelete={onDelete(group.id)}
                    />
            )}
        </Modal>}

        {isOpen && !!groupToDelete && <Modal onRequestClose={onModalClose} size="sm">
            <h2 className={'text-xl mb-5 mt-3'}>Select a group to move</h2>
            {!!groups && groups.map(group =>
                groupToDelete.toString() !== group.id.toString()
                    ? <div
                        onClick={() => deleteGroupFn(groupToDelete, group.id)}
                        className={'border-b border-gray-300 py-3 flex justify-between items-center hover:bg-gray-300 cursor-pointer'}
                    >
                        <p className={'text-gray-700'}>{group.title}</p>
                    </div>
                    : null
            )}
        </Modal>}
    </div>
}

export default GroupSettings;