import { useState } from "react";
import { TiDelete, TiEdit } from "react-icons/ti";
import GroupType from "../../types/group";
import EditGroup from "./EditGroup";
import TooltipConfirmation from "./TooltipConfirmation";

type GroupViewArgs = GroupType & {
    onRequestEdit?: (title: string) => void,
    onRequestDelete?: (option?: string) => void,
    deleteOptions?: {
        [key: string]: string
    }
};

const Group: React.FC<GroupViewArgs> = ({ title, onRequestDelete, onRequestEdit, deleteOptions }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const onEditSubmit = (title: string) => {
        !!onRequestEdit && onRequestEdit(title);
        setIsEdit(false);
    }

    const onDeleteButtonClick = (button: string, radioOption?: string) => {
        if (button === 'yes') {
            !!onRequestDelete && onRequestDelete(radioOption);
        }

        setIsDelete(false);
    }

    if (isEdit) {
        return <EditGroup
            onCancel={() => setIsEdit(false)}
            onSubmit={onEditSubmit}
            title={title}
        />
    }

    return (
        <div className={'border-b border-gray-300 py-3 flex justify-between items-center'}>
            <p className={'text-gray-700'}>{title}</p>
            <div>
                <button
                    className={'rounded-full border border-blue-500 p-1 mr-2'}
                    onClick={() => setIsEdit(true)}
                >
                    <TiEdit className={'text-blue-500 w-5 h-5'} />
                </button>
                <div className={'inline-block'}>
                    <button
                        className={'rounded-full border border-rose-500 p-1'}
                        onClick={() => setIsDelete(true)}
                    >
                        <TiDelete className={'text-rose-500 w-5 h-5'} />
                    </button>
                    {isDelete && <TooltipConfirmation
                        text='Are you sure?'
                        radios={deleteOptions}
                        buttons={{ yes: 'Yes', no: 'No' }}
                        size={!!deleteOptions ? 'md' : 'sm'}
                        onButtonClick={onDeleteButtonClick}
                        onRequestClose={() => setIsDelete(false)}
                    />}
                </div>
            </div>
        </div>
    );
}

export default Group