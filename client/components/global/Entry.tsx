import { useState } from 'react';
import { TiDelete, TiEdit } from 'react-icons/ti';
import EditEntry from './EditEntry';
import TooltipConfirmation from './TooltipConfirmation';

type propsType = {
    onRequestEdit?: (message: string, amount: number) => void,
    onRequestDelete?: () => void,
    message: string,
    amount: number
}

const Entry: React.FC<propsType> = ({ onRequestEdit, onRequestDelete, message, amount }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const onEditSubmit = (message: string, amount: number) => {
        !!onRequestEdit && onRequestEdit(message, amount);
        setIsEdit(false);
    }

    const onDeleteButtonClick = (button: string) => {
        if (button === 'yes') {
            !!onRequestDelete && onRequestDelete();
        }

        setIsDelete(false);
    }

    if (isEdit) {
        return <EditEntry
            onCancel={() => setIsEdit(false)}
            onSubmit={onEditSubmit}
            message={message}
            amount={amount}
        />
    }

    return <div className={'flex items-center text-gray-700 mb-2'}>
        <p className={'w-7/12 py-2 rounded mr-5 outline-none'}>{message}</p>
        <p className={'w-3/12 py-2 rounded mr-5 outline-none'}>{amount}</p>
        <div className={'w-2/12'}>
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
                    buttons={{ yes: 'Yes', no: 'No' }}
                    onButtonClick={onDeleteButtonClick}
                    onRequestClose={() => setIsDelete(false)}
                />}
            </div>
        </div>
    </div>
}

export default Entry;