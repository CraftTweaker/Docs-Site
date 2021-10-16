import React, { ReactElement, useEffect, useState } from "react";
import { Breakpoint } from "react-socks";
import { matchesMedia } from "../../util/Hooks";
import { Page } from "../../util/Types";


export default function DesktopAd({
    id,
    current,
    type,
    className
}: { id: string, current: Page, type: "image" | "text", className?: string  }): ReactElement {

    return <Breakpoint lg up className = {`grid`}>

        <RenderAd id = {id} current = {current} type = {type} className={className}/>

    </Breakpoint>;
}

function RenderAd({
    id,
    current,
    type
}: { id: string, current: Page, type: "image" | "text", className?: string  }) {
    const matches = matchesMedia("(min-width: 768px)");
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
        if (!matches) {
            setLoaded(false);
            return;
        }
        setLoaded(true);
    }, [matches, current]);


    if (!loaded) {
        return <></>;
    }
    return <div className = {`mx-auto bordered`} data-ea-publisher = "docs-blamejared-com" data-ea-type = {type} data-ea-manual = "true" data-ea-keywords = {"devops"} id = {id}/>;
}