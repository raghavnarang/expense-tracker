import ContentLoader from "react-content-loader";

const GroupSkeleton: React.FC = () =>(
    <div className={'border-b border-gray-300 py-3 flex justify-between items-center'}>
        <p className={'text-gray-700'}>
            <ContentLoader
                speed={2}
                width={300}
                height={20}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="0" ry="0" width="300" height="20" />
            </ContentLoader>
        </p>
        <div>
            <ContentLoader
                speed={2}
                width={30}
                height={30}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className={'mr-2 inline-block'}
            >
                <circle cx="15" cy="15" r="15" />
            </ContentLoader>
            <ContentLoader
                speed={2}
                width={30}
                height={30}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className={'mr-2 inline-block'}
            >
                <circle cx="15" cy="15" r="15" />
            </ContentLoader>
        </div>
    </div>
);

export default GroupSkeleton