import React from "react";
import NavFolder from "./NavFolder";
import NavItem from "./NavItem";
import OutLinks from "./nav/OutLinks";
import VerLangs from "./nav/VerLangs";
import ThemeOptions from "./nav/ThemeOptions";
import SearchNav from "./nav/SearchNav";
import SimpleBar from "simplebar-react";
import { SideNavProps } from "../utils/Interfaces";
import { DesktopAd } from "./ads/Ads";
import { Breakpoint } from 'react-socks';


export default function SideNav({ version, lang, navs, current, verlang, stub = false, showingNav, parentFolders }: SideNavProps) {

    return (<>
        <div
            className = {`w-full md:w-72 bg-gray-200 dark:bg-dark-800 dark:text-dark-100 z-10 shadow-lg border-r border-gray-300 dark:border-dark-700 h-with-nav break-all absolute md:static left-0 md:left-auto ${showingNav ? `` : `hidden md:flex flex-col`}`}>
            <SimpleBar className = {`h-with-nav md:h-with-ad min-h-with-ad flex-grow`}>
                <div className = {`h-full min-h-with-nav md:min-h-with-ad flex flex-col`}>
                    <OutLinks/>

                    <VerLangs verlang = {verlang} lang = {lang ? lang : ``} stub = {stub} version = {version ? version : ``} current = {current ? current : {
                        key: "",
                        value: ""
                    }}/>

                    <ThemeOptions/>


                    {!stub ? <>

                        <SearchNav version = {version ? version : ``} lang = {lang ? lang : ``}/>

                        <div className = {`flex-grow`}>
                            <div>
                                {
                                    navs && Object.keys(navs).map((key: any) => {
                                        if (typeof navs[key] === "string") {
                                            let path = navs[key].replace(/\.md/, "");
                                            return <NavItem version = {version ? version : ``} lang = {lang ? lang : ``} nav = {key} path = {path}
                                                            selected = {current ? path === current.value : false} key = {`/${version}/${lang}/${path}`} level = {0}/>
                                        } else {
                                            return <NavFolder version = {version ? version : ``} lang = {lang ? lang : ``} name = {key} nav = {navs[key]}
                                                              current = {current} key = {key} level = {0} parentExpanded = {true} parentNames = {[]} parentFolders = {parentFolders}/>
                                        }
                                    })
                                }
                            </div>
                        </div>

                    </> : <div className = {`flex-grow`}/>}


                </div>
            </SimpleBar>
            <div className = {`hidden md:block flex-none border-t border-gray-300 dark:border-dark-700 bg-dark-150 dark:bg-dark-850`} key = {current?.key}>

                    <DesktopAd id = {"side-nav-ad"} current = {current || {
                        key: new Date().toString(),
                        value: "value"
                    }} type = {"text"}/>

            </div>
        </div>

    </>)
}



