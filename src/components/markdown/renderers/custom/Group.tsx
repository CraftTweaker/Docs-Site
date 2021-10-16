import React, {ReactElement, useState} from "react";
import {motion} from "framer-motion";
import {DirectiveProps} from "util/Types";
import {ContainerDirective} from "mdast-util-directive/complex-types";
import {LinkIcon, MinusIcon, PlusIcon} from "@heroicons/react/solid";
import {InlineCode} from "../Code";

export default function Group({props, custom}: { props: DirectiveProps<ContainerDirective>, custom: { headingId: string } }): ReactElement {
    const attributes: Record<string, string> = props.attributes || {};
    const name = attributes.name;
    const [collapsed, setCollapsed] = useState(false);
    const id = `g-${custom.headingId}`;
    if (!("name" in attributes)) {
        return <div className = {`bg-red-500 border-2 border-red-500 p-4 bg-opacity-25 my-2`}>
            <p>
                "name" property missing from group!
            </p>
            <p>
                Provided: {JSON.stringify(attributes)}
            </p>
        </div>;
    }

    return <div className = {`px-4 py-2 my-4 even:bg-gray-50 odd:bg-gray-150 dark:even:bg-gray-875 dark:odd:bg-gray-825 border border-gray-300 dark:border-gray-700`}>
        <div className = {`border-b border-gray-300 dark:border-gray-700 -mx-4 px-4 pb-2 flex justify-between`}>
            <div className = {`flex flex-wrap gap-x-1 my-auto`}>
                <a className = {`w-5 h-5 my-auto cursor-pointer anchor hover:text-blue-500`} href = {`#${id}`}>

                    <p className = {`sr-only`}>{`Link to ${id}`}</p>
                    <LinkIcon className = {`w-5 h-5 fill-current`}/>

                </a>

                <span className = {`text-xl font-mono hidden xl:block scroll-margin`} id = {id}>{name}</span>
            </div>
            <button className = {`hover:text-blue-500 fill-current cursor-pointer`} onClick = {() => setCollapsed(!collapsed)}>
                {collapsed ? <PlusIcon className = "w-6 h-6 select-none"/> : <MinusIcon className = "w-6 h-6 select-none"/>}
            </button>
        </div>
        <motion.div
            initial = {{
                height: collapsed ? "2rem" : "100%"
            }}
            animate = {{
                height: collapsed ? "2rem" : "100%",
                transition: {duration: `0.25`}
            }}

            className = {`mt-2 overflow-hidden`}
        >
            <p className = {`mb-2 block xl:hidden`} id = {id}>Name: <InlineCode>{name}</InlineCode></p> {props.children}
        </motion.div>
    </div>;
}