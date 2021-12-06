import React, { PropsWithChildren, ReactElement } from "react";
import { DirectiveProps } from "util/Types";
import { LeafDirective } from "mdast-util-directive/complex-types";
import { ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/react/solid";

export default function RequiredMod({ props }: { props: DirectiveProps<LeafDirective> }): ReactElement {
    const attributes: Record<string, string> = JSON.parse(`${props.attributes ?? {}}`);

    if (!("builtIn" in attributes)) {
        return <div className = {`bg-red-500 border-2 border-red-500 p-4 bg-opacity-25 my-2`}>
            <p>
                "builtIn" property missing from requiredMods!
            </p>
            <p>
                Provided: {JSON.stringify(attributes)}
            </p>
        </div>;
    }
    const builtIn: boolean = attributes.builtIn === "true";
    const modLink: string = attributes.modLink ?? ``;
    const requiredMod: string = attributes.requiredMod ?? ``;
    const requiredModLink: string = attributes.requiredModLink ?? ``;

    const bgClass = builtIn ? `bg-cyan-500` : `bg-rose-500`;
    const borderClass = builtIn ? `border-cyan-500` : `border-rose-500`;

    return <>
        <div className = {`${bgClass} border-2 ${borderClass} p-4 bg-opacity-25 my-4`}>
            <div className = {`flex gap-x-2`}>
                {builtIn ? <>
                    <ShieldCheckIcon className = {`w-6 h-6 my-auto`}/>

                    <span className = {`my-auto`}> This page relates to <ModLink link = {modLink}>{props.children}</ModLink>, which has built-in support!</span>
                </> : <>
                    <ShieldExclamationIcon className = {`w-6 h-6 my-auto`}/>

                    <span className = {`my-auto`}> This page relates to <ModLink link = {modLink}>{props.children}</ModLink>, which does not have built-in support, you will need to install <ModLink link = {requiredModLink}>{requiredMod}</ModLink> as well!</span>
                </>}
            </div>


        </div>
    </>;
}

function ModLink(props: PropsWithChildren<{ link?: string }>) {

    if (!props.link) {
        return <span className = {`font-semibold`}>{props.children}</span>;
    }

    return <a className = {`font-semibold`} href = {props.link} target = {`_blank`} rel = {`noopener noreferrer`}>
        {props.children}
    </a>;

}