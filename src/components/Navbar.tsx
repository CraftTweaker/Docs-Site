import Link from "next/link";
import Image from "next/image";
import { ReactElement, useContext } from "react";
import NavbarOutlinks from "./ui/NavbarOutlinks";
import { VerLangContext } from "../util/Context";
import { useRouter } from "next/router";
import ReactModal from 'react-modal';

export default function Navbar(): ReactElement {

    const verLangs = useContext(VerLangContext);
    const router = useRouter();

    return <nav className = {`flex bg-blue-800 h-18 text-white shadow-md dark:shadow-none`}>
        <div className = {`flex justify-between px-4 w-full my-auto`}>
            <div className = {`flex gap-x-2`}>
                <Link href = {`/`} as = {`/`}>

                    <a className = "flex items-center gap-x-2 ml-2">

                        <Image width = {48} height = {48} src = "/crafttweaker.svg" alt = "crafttweaker_logo" priority = {true} loading = {`eager`}/>

                        <span className = "text-lg hidden sm:block">CraftTweaker Documentation</span>

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

                    <select className = {`p-2 bg-gray-100 text-black dark:text-white hover:bg-opacity-100 focus:bg-opacity-100 active:hover:bg-opacity-100 selectable`} defaultValue = {verLangs.language} onChange = {event => {
                        const value = event.currentTarget.value;
                        if (value === verLangs.language) {
                            return;
                        }
                        router.push(`/${verLangs.version}/${value}/index`);
                    }}>
                        {verLangs.languages.map(language => {
                            return <option key = {language} className = {`${verLangs.language === language ? `bg-teal-400 dark:bg-emerald-600` : `bg-white dark:bg-gray-700`}`} value = {language}>{language}</option>;
                        })}
                    </select>

                </div>}
            </div>

            <div className = {`flex gap-x-4`}>

                <Link href = {`/${verLangs.version}/${verLangs.language}/search`}>

                    <a className = {`my-auto bg-gray-100 text-black dark:text-white hover:bg-opacity-100 focus:bg-opacity-100 active:hover:bg-opacity-100 selectable  py-2 px-4`}> Search </a>

                </Link>

                <ReactModal
                    isOpen={true}
                    contentLabel="onRequestClose Example"
                    onRequestClose={() => {}}
                    className="Modal bg-red-500 blur-none z-[60000000]"
                    overlayClassName="blur bg-white bg-opacity-10 w-screen h-screen absolute top-0 left-0 z-[50000]"
                >
                    <p>Modal text!</p>
                    <button>Close Modal</button>
                </ReactModal>


                <NavbarOutlinks/>
            </div>
        </div>
    </nav>;

}