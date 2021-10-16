import Github from "../icons/Github";
import Discord from "../icons/Discord";
import CurseForge from "../icons/CurseForge";
import ThemeSwitcher from "./ThemeSwitcher";
import { ReactElement, useContext } from "react";
import { VerLangContext } from "../../util/Context";
import { useRouter } from "next/router";

export default function SidebarOutlinks(): ReactElement {
    const verLangs = useContext(VerLangContext);
    const router = useRouter();

    return <div className = {`my-1 flex flex-col lg:hidden gap-x-2 pl-0.5`}>

        <div className = {`flex gap-x-2 p-1.5`}>
            <label htmlFor = {`sidenav-version-select`} className = {`my-auto`}> Version: </label>
            <select id = {`sidenav-version-select`} className = {`p-2 bg-gray-100 text-black dark:text-white hover:bg-opacity-100 focus:bg-opacity-100 active:hover:bg-opacity-100 selectable  my-auto`} defaultValue = {verLangs.version} onChange = {event => {
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
        </div>
        <div className = {`flex gap-x-2 p-1.5`}>
            <label htmlFor = {`sidenav-language-select`} className = {`my-auto`}> Language: </label>
            <select id = {`sidenav-language-select`} className = {`p-2 bg-gray-100 text-black dark:text-white hover:bg-opacity-100 focus:bg-opacity-100 active:hover:bg-opacity-100 selectable`} defaultValue = {verLangs.language} onChange = {event => {
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
        </div>
        <a href = {`https://github.com/CraftTweaker/CraftTweaker`} className = {`p-1.5 flex gap-x-2 group h-8`} target = {`_blank`} rel = {`noopener noreferrer`}>

            <div className = {`group-hover:text-[#CCCCCC] dark:group-hover:text-[#333333] my-auto`}>
                <Github/>
            </div>

            Github

        </a>

        <a href = {`https://discord.blamejared.com`} className = {`p-1.5 flex gap-x-2 group h-8`} target = {`_blank`} rel = {`noopener noreferrer`}>

            <div className = {`group-hover:text-[#5865F2] my-auto`}>
                <Discord/>
            </div>

            Discord

        </a>

        <a href = {`https://www.curseforge.com/minecraft/mc-mods/crafttweaker`} className = {`p-1.5 flex gap-x-2 group`} target = {`_blank`} rel = {`noopener noreferrer`}>
            <div className = {`group-hover:text-[#F16436] my-auto`}>
                <CurseForge/>
            </div>

            CurseForge

        </a>


        <div className = {`flex gap-x-2`}>

            <ThemeSwitcher switcherClassName = {`my-auto`} containerClassName = {`p-1.5 flex gap-x-2 flex-grow h-9`} textClassName = {`my-auto`}/>

        </div>
    </div>;
}