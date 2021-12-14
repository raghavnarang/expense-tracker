import dynamic from 'next/dynamic';

const ContentLoader = dynamic(
    () => import('react-content-loader'),
    { ssr: false }
)

const EntrySkeleton: React.FC = () =>
    <div className={'flex items-center text-gray-500 mb-2'}>
        <p className={'w-7/12 py-2 px-2 rounded mr-5 outline-none'}>
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
        <p className={'w-3/12 py-2 px-2 rounded mr-5 outline-none'}>
            <ContentLoader
                speed={2}
                width={100}
                height={20}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="0" ry="0" width="100" height="20" />
            </ContentLoader>
        </p>
        <div className={'w-2/12'}>
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

export default EntrySkeleton;