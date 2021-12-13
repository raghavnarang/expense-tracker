const PageCard: React.FC = ({ children }) =>
    <div className={'flex h-screen w-screen justify-center items-center bg-gray-100'}>
        <div className={'container rounded-2xl shadow-2xl w-4/5 h-4/5 p-10 bg-white'}>
            {children}
        </div>
    </div>

export default PageCard;