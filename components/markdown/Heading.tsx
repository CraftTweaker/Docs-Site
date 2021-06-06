import React, { ReactNode } from "react";
import { HeadingProps } from "../../utils/Interfaces";

function makeHeader(level: number, id: string, child: ReactNode[]) {
    switch (level) {
        case 1:
            return <h1 id={id}>{child}</h1>;
        case 2:
            return <h2 id={id}>{child}</h2>;
        case 3:
            return <h3 id={id}>{child}</h3>;
        case 4:
            return <h4 id={id}>{child}</h4>;
        case 5:
            return <h5 id={id}>{child}</h5>;
        case 6:
            return <h6 id={id}>{child}</h6>;
    }
}

export default function Heading(props: HeadingProps) {
    let { level, children } = props;
    let child: any = children[0];
    let id = props.node.data.id;

    return (
        <div className={`flex gap-x-2 group ${level === 1 ? `justify-center` : ``}`}>
            {makeHeader(level, id, child)}
            <a
                className={`${
                    level === 1 ? `w-9 h-9 sm:w-6 sm:h-6` : `w-5 h-5`
                } my-auto cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 md:invisible group-hover:visible`}
                href={`#${id}`}
            >
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                    />
                </svg>
            </a>
        </div>
    );
}
