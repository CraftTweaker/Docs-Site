import React, { ReactElement, ReactNode } from "react";
import { ReactMarkdownProps } from "react-markdown/lib/ast-to-react";
import { LinkIcon } from "@heroicons/react/solid";


type HeadingProps = JSX.IntrinsicElements["h1"] &
    ReactMarkdownProps & {
    level: number
};

function makeHeader(level: number, id: string, child: ReactNode[], className: string) {
    switch (level) {
        case 1:
            return <h1 id = {id} className={className}>{child}</h1>;
        case 2:
            return <h2 id = {id} className={className}>{child}</h2>;
        case 3:
            return <h3 id = {id} className={className}>{child}</h3>;
        case 4:
            return <h4 id = {id} className={className}>{child}</h4>;
        case 5:
            return <h5 id = {id} className={className}>{child}</h5>;
        case 6:
            return <h6 id = {id} className={className}>{child}</h6>;
    }
}

export default function Heading(props: HeadingProps): ReactElement {
    const { level, children } = props;
    const child: any = children[0];
    const id = (props.node.properties || { id: "invalid" }).id as string;

    return (
        <div className = {`flex gap-x-2 group ${level === 1 ? `justify-center` : ``} `}>
            {makeHeader(level, id, child, `scroll-margin`)}

            <a className = {`${level === 1 ? `w-9 h-9 sm:w-6 sm:h-6` : `w-5 h-5`} my-auto cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 md:invisible group-hover:visible`}
               href = {`#${id}`}
            >
                {/*Putting this not in a single string makes 2 elements for some reason*/}

                <p className = {`sr-only`}>{`Link to ${id}`}</p>
                <LinkIcon className = {`my-auto`}/>

            </a>
        </div>
    );
}
