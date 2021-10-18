import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SideNavFolderProps, SideNavItemProps, SideNavProps } from "../util/Types";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { NavContext } from "../util/Context";
import { LazyMotion, m } from "framer-motion";
import { Router } from "next/router";
import SidebarOutlinks from "./ui/SidebarOutlinks";
import { AD_REFRESH_RATE, DesktopAd } from "./ads/Ads";

const loadFeatures = () => import("./dynamic/DomAnimation").then(res => res.default);

export default function Sidenav(props: SideNavProps): ReactElement {

    const lastRender = useRef(0);
    setInterval(() => {
        lastRender.current = lastRender.current + 1;
    }, AD_REFRESH_RATE);

    const nav = useContext(NavContext);
    useEffect(() => {
        let folders = "nav";
        for (const folder of props.folder.split("/")) {
            folders += `/${folder}`;
            nav.addFolder(`${folders}`);
        }
    }, [props.folder]);

    useEffect(() => {
        const handleRouteChange = (path: string) => {
            if (!path.startsWith(`/${props.version}/${props.language}/`)) {
                nav.clearFolders();
            }
            nav.setOpen(false);
        };
        Router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            Router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, []);


    function isCurrent(path: string) {
        return props.slug === path;
    }

    return <div className = {`${nav.open ? `` : `hidden lg:flex`} flex-col justify-between flex-none w-8/12 lg:w-80 h-content bg-gray-50 dark:bg-gray-850 shadow-md border-r border-transparent dark:border-black fixed lg:sticky lg:top-18`}>
        <div className = {`overflow-y-auto h-content lg:h-with-ad scrollbar-h-2 scrollbar-light dark:scrollbar-dark`}>
            <SidebarOutlinks/>
            <NavFolder path = {`nav`} nav = {props.nav["nav"]} root = {true} name = {``} version = {props.version} language = {props.language} level = {0} initialOpen = {true} isCurrent = {isCurrent}/>
        </div>
        <div key = {lastRender.current}>
            <DesktopAd id = {"side-nav-ad"} current = {{
                name: new Date().toString(),
                path: "value"
            }} type = {"image"} className = {`mx-auto pt-4 hidden lg:block h-[18.5rem]`}/>
        </div>

    </div>;
}


function NavFolder(props: SideNavFolderProps): ReactElement {
    const children = Object.keys(props.nav);
    const nav = useContext(NavContext);
    const open = nav.isOpen(props.path);
    const [opening, setOpening] = useState(false);

    function toggleFolder() {
        if (nav.isOpen(props.path)) {
            nav.removeFolder(props.path);
        } else {
            nav.addFolder(props.path);
        }
        setOpening(true);
    }


    return <div className = {`flex flex-col`}>

        {!props.root &&
        <button style = {{ paddingLeft: `${0.5 + (props.level * 0.75)}ch` }} className = {`p-1 block flex gap-x-0 nav-item text-left`} onClick = {toggleFolder}>
            <ChevronRightIcon className = {`w-4 h-4 my-auto transform transition-transform duration-150 ${open ? `rotate-90` : ``}`}/>
            <p className = {`my-auto mr-2`}>{props.name}</p>
        </button>}

        <LazyMotion features = {loadFeatures}>
            <m.div
                initial = {{
                    height: open ? "100%" : "0"
                }}
                animate = {{
                    height: open ? "100%" : "0"
                }}
                onAnimationComplete = {() => {
                    if (opening) {
                        setOpening(false);
                    }
                }}
                transition = {{ type: "tween", ease: "anticipate" }}
                className = {`overflow-hidden flex flex-col`}
            >
                {(open || opening) && children.map(value => {
                        if (typeof props.nav[value] === "string") {
                            return <NavItem name = {value} version = {props.version} language = {props.language} key = {props.nav[value] as unknown as string} path = {props.nav[value] as unknown as string} level = {props.level + 1} current = {false} isCurrent = {props.isCurrent}/>;
                        }
                        return <NavFolder path = {`${props.path}/${value}`} key = {value} nav = {props.nav[value]} name = {value} root = {false} version = {props.version} language = {props.language} level = {props.level + 1} initialOpen = {false} isCurrent = {props.isCurrent}/>;
                    }
                )}
            </m.div>
        </LazyMotion>
    </div>;
}

function NavItem(props: SideNavItemProps): ReactElement {

    const pagePath = props.path.replace(/\.md/, "");

    return <Link href = {`/${props.version}/${props.language}/${pagePath}`}>

        <a className = {`p-1 block align-bottom justify-self-center nav-item ${props.isCurrent(pagePath) ? `nav-item-selected` : ``}`} style = {{ paddingLeft: `${0.5 + (props.level * 0.75)}ch` }}>

            {props.name}
        </a>

    </Link>;
}