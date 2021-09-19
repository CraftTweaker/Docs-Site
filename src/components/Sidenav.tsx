import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { SideNavFolderProps, SideNavItemProps, SideNavProps } from "../util/Types";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { NavContext } from "../util/Context";
import { LazyMotion, m } from "framer-motion";
import { Router } from "next/router";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const loadFeatures = () => import("./dynamic/DomAnimation").then(res => res.default);

export default function Sidenav(props: SideNavProps): ReactElement {

    const { data } = useSWR(`/api/${props.version}/${props.language}/nav`, fetcher);
    const nav = useContext(NavContext);
    useEffect(() => {
        nav.addFolder(`nav/${props.folder}`);
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

    return <div className = {`${nav.open ? `` : `hidden lg:block`} flex-none w-8/12 lg:w-80 h-content bg-gray-50 dark:bg-gray-850 shadow-md border-r border-transparent dark:border-black overflow-y-scroll fixed lg:sticky lg:top-18 scrollbar-h-2 scrollbar-custom`}>
        {data &&
        <NavFolder path = {`nav`} nav = {data["nav"]} root = {true} name = {``} version = {props.version} language = {props.language} level = {0} initialOpen = {true} isCurrent = {isCurrent}/>}
    </div>;

}


function NavFolder(props: SideNavFolderProps): ReactElement {

    const children = useRef<string[]>(Object.keys(props.nav));
    const nav = useContext(NavContext);
    const [open, setOpen] = useState(nav.folders.some(value => value.startsWith(props.path)));
    const [opening, setOpening] = useState(false);

    function toggleFolder() {
        if (open) {
            nav.removeFolder(props.path);
        } else {
            nav.addFolder(props.path);
        }
        setOpening(true);
        setOpen(!open);
    }


    return <div className = {`flex flex-col`}>

        {!props.root &&
        <button style = {{ paddingLeft: `${props.level * 0.75}ch` }} className = {`p-1 block h-8 flex gap-x-0 nav-item`} onClick = {toggleFolder}>
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
                className = {`overflow-hidden flex flex-col`}
            >
                {(open || opening) && children.current.map(value => {
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

        <a className = {`p-1 block align-bottom justify-self-center nav-item ${props.isCurrent(pagePath) ? `nav-item-selected` : ``}`} style = {{ paddingLeft: `${props.level * 0.75}ch` }}>

            {props.name}
        </a>

    </Link>;
}