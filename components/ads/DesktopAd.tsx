import React, { useEffect, useState } from "react";
import { NavObject } from "../../utils/Interfaces";
import { matchesMedia } from "../../utils/Utils";
import { Breakpoint } from "react-socks";


export default function DesktopAd({
    id,
    current,
    type,
}: { id: string, current: NavObject, type: "image" | "text" }) {

    return <Breakpoint mdu up className = {`grid`}>

        <RenderAd id = {id} current = {current} type = {type}/>

    </Breakpoint>
}

function RenderAd({
    id,
    current,
    type,
}: { id: string, current: NavObject, type: "image" | "text" }) {
    let matches = matchesMedia("(min-width: 768px)");
    let [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) {
            //@ts-ignore
            ethicalads.load();
        }
    }, [loaded])

    useEffect(() => {
        if (!matches) {
            setLoaded(false)
            return;
        }
        setLoaded(true)
    }, [matches, current]);


    if (!loaded) {
        return <></>
    }
    return <div className = {`mx-auto bordered`} data-ea-publisher = "docs-blamejared-com" data-ea-type = {type} data-ea-manual = "true" id = {id}/>;
}