const Toast: React.FC<{ text: String, onClick?: () => void }> = ({ text, onClick }) => {
    return <div
        className={'fixed bottom-10 right-10 rounded-md bg-gray-800 text-white w-80 p-4 cursor-pointer shadow-xl'}
        onClick={() => !!onClick && onClick()}
    >
        {text}
    </div>
}

export default Toast;