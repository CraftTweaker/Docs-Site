import React from "react";


export default function Deprecated({ props }: { props: any }) {
    let hasChildren = !!props.children;
    return <div className = {`bg-red-500 border-2 border-red-500 rounded bg-opacity-25 mb-4`}>
        <div className={`text-center ${hasChildren ? `border-b-2 border-red-400`: ``} px-4 py-2`}>
            Deprecated
        </div>
        {hasChildren && <div className={`px-4 py-4 bg-red-100 dark:bg-gray-800 bg-opacity-25 dark:bg-opacity-25`}>
            {props.children}
        </div>}
    </div>
}