import React from "react";

export default function RequiredMod({ props }: { props: any }) {
    if (!props.hasOwnProperty("builtIn")) {
        return <div className = {`bg-red-500 border-2 border-red-500 rounded p-4 bg-opacity-25 my-2`}>
            <p>
                "builtIn" property missing from requiredMods!
            </p>
            <div className = {`flex flex-col gap-y-1`}>
                {Object.keys(props).map(key => {
                    return <p>"{key}": "{props[key]}"</p>;
                })}
            </div>
        </div>
    }
    let builtIn: boolean = props.builtIn === "true";
    let modLink: string = props.modLink ?? ``
    let requiredMod: string = props.requiredMod ?? ``;
    let requiredModLink: string = props.requiredModLink ?? ``;

    let bgClass = builtIn ? `bg-teal-500` : `bg-red-500`;
    let borderClass = builtIn ? `border-teal-500` : `border-red-500`;


    return <>
        <div className = {`${bgClass} border-2 ${borderClass} rounded p-4 bg-opacity-25 my-4`}>
            {builtIn ? <div className = {`flex gap-x-2`}>
                <svg className = "w-16 h-16 sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-6 hlg:h-6 my-auto" fill = "none" stroke = "currentColor" viewBox = "0 0 24 24"
                     xmlns = "http://www.w3.org/2000/svg">
                    <path strokeLinecap = "round" strokeLinejoin = "round" strokeWidth = {2}
                          d = "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
                <div className = {`my-auto`}>
                    {modLink.length > 0 ? <a className = {`font-semibold mr-1`} href = {modLink}> {props.children}</a> :
                        <span className = {`font-semibold mr-1`}> {props.children}</span>} has built in mod support! You don't need any other mods for
                    this to work!
                </div>
            </div> : <div className = {`flex gap-x-2`}>
                <svg className = "w-16 h-16 sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-6 hlg:h-6 my-auto" fill = "none" stroke = "currentColor" viewBox = "0 0 24 24"
                     xmlns = "http://www.w3.org/2000/svg">
                    <path strokeLinecap = "round" strokeLinejoin = "round" strokeWidth = {2}
                          d = "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <div className = {`my-auto`}>
                    {modLink.length > 0 ? <a className = {`font-semibold mr-1`} href = {modLink}> {props.children}</a> :
                        <span className = {`font-semibold mr-1`}> {props.children}</span>} does not have built in mod support, you will
                    need {requiredModLink.length > 0 ?
                    <a className = {`font-semibold mr-1`} href = {requiredModLink}> {requiredMod}</a> :
                    <span className = {`font-semibold mr-1`}> {requiredMod}</span>}for this to work!
                </div>
            </div>}


        </div>
    </>
}