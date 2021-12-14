import { useState } from 'react';
import { TiDelete, TiEdit } from 'react-icons/ti';
import EditEntry from './EditEntry';

type propsType = {
    onEdit?: (message: string, amount: number) => void,
    onRequestDelete?: () => void,
    message: string,
    amount: number
}

const Entry: React.FC<propsType> = ({ onEdit, onRequestDelete, message, amount }) => {
    const [isEdit, setIsEdit] = useState(false);

    const onEditSubmit = (message: string, amount: number) => {
        !!onEdit && onEdit(message, amount);
        setIsEdit(false);
    }

    if (isEdit) {
        return <EditEntry
            onCancel={() => setIsEdit(false)}
            onSubmit={onEditSubmit}
            message={message}
            amount={amount}
        />
    }

    return <div className={'flex items-center text-gray-500 mb-2'}>
        <p className={'w-7/12 py-2 px-2 rounded mr-5 outline-none'}>{message}</p>
        <p className={'w-3/12 py-2 px-2 rounded mr-5 outline-none'}>{amount}</p>
        <div className={'w-2/12'}>
            <button
                className={'rounded-full border border-blue-500 p-1 mr-2'}
                onClick={() => setIsEdit(true)}
            >
                <TiEdit className={'text-blue-500 w-5 h-5'} />
            </button>
            <button
                className={'rounded-full border border-rose-500 p-1'}
                onClick={() => !!onRequestDelete && onRequestDelete()}
            >
                <TiDelete className={'text-rose-500 w-5 h-5'} />
            </button>
        </div>
    </div>
}

export default Entry;