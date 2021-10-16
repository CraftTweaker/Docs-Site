import React, { ReactElement, useEffect, useState } from "react";
import { Page } from "../../util/Types";
import { Breakpoint } from "react-socks";

export default function EthicalAd({
    id,
    current,
    type,
    className
}: { id: string, current: Page, type: "image" | "text", className?: string }): ReactElement {

    return (
        <Breakpoint lg down>

            <RenderAd id = {id} current = {current} type = {type} className = {className}/>

        </Breakpoint>
    );
}

function RenderAd({
    id,
    current,
    type,
    className = ""
}: { id: string, current: Page, type: "image" | "text", className?: string }) {
    // const matches = matchesMedia("(max-width: 767px)");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) {
            //@ts-ignore
            ethicalads.load();
        }
    }, [loaded]);

    useEffect(() => {
        //@ts-ignore
        if (typeof ethicalads === "undefined") {
            return;
        }
        // if (!matches) {
        //     setLoaded(false);
        //     return;
        // }
        setLoaded(true);
    }, [/* matches,*/ current]);


    if (!loaded) {
        return <></>;
    }
    return <div className = {`${className ?? ""} bordered`} data-ea-publisher = "docs-blamejared-com" data-ea-type = {type} data-ea-manual = "true" data-ea-keywords = {"devops"} id = {id}/>;
}