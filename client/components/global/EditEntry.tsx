import { useState } from 'react';
import { TiTick, TiCancel } from 'react-icons/ti';

type propsType = {
    onCancel?: () => void,
    onSubmit?: (message: string, amount: number) => void,
    message?: string,
    amount?: number
}

const EditEntry: React.FC<propsType> = ({ onCancel, onSubmit, message: initMessage, amount: initAmount }) => {
    const [message, setMessage] = useState<string>(!!initMessage ? initMessage : '');
    const [amount, setAmount] = useState<string>(!!initAmount ? initAmount.toString() : '');

    return <div className={'flex items-center mb-2'}>
        <input
            onChange={e => setMessage(e.target.value)}
            value={message}
            placeholder="Message"
            type="text"
            autoFocus={true}
            className={'w-7/12 px-2 py-2 border border-gray-300 rounded mr-5 outline-none'} />

        <input
            onChange={e => setAmount(e.target.value)}
            value={amount}
            placeholder="Amount"
            type="number"
            className={'w-3/12 px-2 py-2 border border-gray-300 rounded mr-5 outline-none'} />

        <div className={'w-2/12'}>
            <button
                className={'rounded-full border border-green-500 p-1 mr-2'}
                onClick={() => !!onSubmit && onSubmit(message, parseFloat(amount))}
            >
                <TiTick className={'text-green-500 w-5 h-5'} />
            </button>
            <button
                className={'rounded-full border border-rose-500 p-1'}
                onClick={() => !!onCancel && onCancel()}
            >
                <TiCancel className={'text-rose-500 w-5 h-5'} />
            </button>
        </div>
    </div>
}

export default EditEntry;