import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Group({ props, custom }: { props: any, custom: any }) {
    if (!props.hasOwnProperty("name")) {
        return <div className = {`bg-red-500 border-2 border-red-500 rounded p-4 bg-opacity-25 my-2`}>
            <p>
                "name" property missing from requiredMods!
            </p>
            <div className = {`flex flex-col gap-y-1`}>
                {Object.keys(props).map(key => {
                    return <p>"{key}": "{props[key]}"</p>;
                })}
            </div>
        </div>
    }

    let name: string = props.name;
    let [collapsed, setCollapsed] = useState(false);
    let id = `g-${custom.headingId}`
    return <>
        <div className = {`px-4 py-2 my-4 border even:bg-gray-50 odd:bg-[#eef7fc] border-gray-300 dark:border-dark-700 dark:even:bg-dark-900 dark:odd:bg-dark-950`}>
            <div className = {`border-b border-gray-300 dark:border-dark-700 -mx-4 px-4 pb-2`}>
                <div className = {`flex justify-between`}>
                    <div className = {`flex flex-wrap gap-x-1 my-auto`}>
                        <a className = {`w-5 h-5 my-auto cursor-pointer hover:text-blue-500`} href = {`#${id}`}>
                            <svg fill = "currentColor" viewBox = "0 0 20 20" xmlns = "http://www.w3.org/2000/svg">
                                <path fillRule = "evenodd" d = "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule = "evenodd"/>
                            </svg>
                        </a>

                        <span className = {`text-xl font-mono`} id = {id}>{name}</span>
                    </div>
                    <span className = {`hover:text-blue-500 fill-current cursor-pointer`} onClick = {event => {
                        setCollapsed(!collapsed)
                    }}>

            {collapsed ?
                <svg className = "w-6 h-6 select-none" fill = "currentColor" viewBox = "0 0 20 20">
                    <path fillRule = "evenodd" d = "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule = "evenodd"/>
                </svg>
                :
                <svg className = "w-6 h-6 select-none" fill = "currentColor" viewBox = "0 0 20 20">
                    <path fillRule = "evenodd" d = "M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule = "evenodd"/>
                </svg>
            }

          </span>
                </div>
            </div>
            <motion.div
                initial = {{
                    height: collapsed ? "2rem" : "100%",
                }}
                animate = {{
                    height: collapsed ? "2rem" : "100%",
                    transition: { duration: `0.25` }
                }}

                className = {`mt-2`}
            >
                <div className = "h-full overflow-hidden">
                    {props.children}
                </div>
            </motion.div>
            {/*<div className = {`mt-2 ${collapsed ? `h-8 overflow-hidden` : ``}`}>*/} {/*    */} {/*</div>*/}
        </div>
    </>
}