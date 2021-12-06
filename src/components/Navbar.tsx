import Link from "next/link";
import Image from "next/image";
import { ReactElement, useContext } from "react";
import NavbarOutlinks from "./ui/NavbarOutlinks";
import { VerLangContext } from "../util/Context";
import { useRouter } from "next/router";
import { NavbarProps } from "../util/Types";
import axios from "axios";

export default function Navbar(props: NavbarProps): ReactElement {

    const verLangs = useContext(VerLangContext);
    const router = useRouter();

    return <nav className = {`flex bg-blue-800 h-18 text-white shadow-md dark:shadow-none`}>
        <div className = {`flex justify-between px-4 w-full my-auto`}>
            <div className = {`flex gap-x-2`}>
                <Link href = {`/`} as = {`/`}>

                    <a className = "flex items-center gap-x-2 ml-2">

                        <Image width = {48} height = {48} src = "/crafttweaker.svg" alt = "crafttweaker_logo" priority = {true} loading = {`eager`}/>

                        <span className = "text-lg hidden sm:block">CraftTweaker Documentation</span> <span className = "text-lg block sm:hidden">CraftTweaker Docs</span>

                    </a>

                </Link>

                {verLangs.hasInfo && <div className = {`my-auto flex gap-x-2 hidden lg:flex `}>
                    <select className = {`p-2 bg-gray-100 text-black dark:text-white hover:bg-opacity-100 focus:bg-opacity-100 active:hover:bg-opacity-100 selectable`} defaultValue = {verLangs.version} onChange = {event => {
                        const value = event.currentTarget.value;
                        if (value === verLangs.version) {
                            return;
                        }
                        router.push(`/${value}/${verLangs.language}/index`);
                    }}>
                        {verLangs.versions.map(version => {
                            return <option key = {version} className = {`${verLangs.version === version ? `bg-teal-400 dark:bg-emerald-600` : `bg-white dark:bg-gray-700`}`} value = {version}>{version}</option>;
                        })}

                    </select>

                    <select className = {`p-2 bg-gray-100 text-black dark:text-white hover:bg-opacity-100 focus:bg-opacity-100 active:hover:bg-opacity-100 selectable`} defaultValue = {verLangs.language} onChange = {async event => {
                        const value = event.currentTarget.value;
                        if (value === verLangs.language) {
                            return;
                        }
                        let validPage = await axios.get(`/${verLangs.version}/${value}/${props.slug}.md`).then(() => {
                            return Promise.resolve(true);
                        }).catch(() => {
                            return Promise.resolve(false);
                        });

                        if (validPage) {
                            await router.push(`/${verLangs.version}/${value}/${props.slug}`);
                        } else {
                            await router.push(`/${verLangs.version}/${value}/index`);
                        }

                    }}>
                        {verLangs.languages.map(language => {
                            return <option key = {language} className = {`${verLangs.language === language ? `bg-teal-400 dark:bg-emerald-600` : `bg-white dark:bg-gray-700`}`} value = {language}>{language}</option>;
                        })}
                    </select>

                </div>}
            </div>

            <div className = {`flex gap-x-4`}>

                <NavbarOutlinks/>
            </div>
        </div>
    </nav>;

}