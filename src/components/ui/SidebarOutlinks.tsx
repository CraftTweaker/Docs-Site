import Github from "../icons/Github";
import Discord from "../icons/Discord";
import CurseForge from "../icons/CurseForge";
import ThemeSwitcher from "./ThemeSwitcher";
import { ReactElement } from "react";

export default function SidebarOutlinks(): ReactElement {
    return <div className = {`my-1 flex flex-col lg:hidden gap-x-2 pl-0.5`}>
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

            <ThemeSwitcher switcherClassName = {`ml-1.5 my-auto`} containerClassName={`p-1.5 flex gap-x-2 flex-grow h-9`} textClassName={`my-auto`}/>

        </div>
    </div>;
}