import Image from 'next/image';
import Link from 'next/link';

const links = {
    sourceCode: 'https://github.com/rohits2404/Axira',
} as const;

export const SourceCode = () => {
    return (
        <Link href={links.sourceCode} target="_blank" rel="noreferrer noopener" className="hover:opacity-80" title="Source Code">
            <Image src="/images/github.svg" alt="GitHub" height={30} width={30} />
        </Link>
    );
};