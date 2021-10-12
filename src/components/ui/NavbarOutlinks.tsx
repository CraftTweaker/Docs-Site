import Github from "../icons/Github";
import Discord from "../icons/Discord";
import CurseForge from "../icons/CurseForge";
import ThemeSwitcher from "./ThemeSwitcher";
import { ReactElement } from "react";

export default function NavbarOutlinks(): ReactElement {
    return <div className = {`my-auto hidden lg:flex gap-x-2 items-center`}>
        <a href = {`https://github.com/CraftTweaker/CraftTweaker`} className = {`p-1.5 hover:text-[#333333]`} target = {`_blank`} rel = {`noopener noreferrer`}>

            <span className={`sr-only`}>Github</span>
            <Github/>

        </a>

        <a href = {`https://discord.blamejared.com`} className = {`p-1.5 hover:text-[#5865F2]`} target = {`_blank`} rel = {`noopener noreferrer`}>

            <span className={`sr-only`}>Discord</span>
            <Discord/>

        </a>

        <a href = {`https://www.curseforge.com/minecraft/mc-mods/crafttweaker`} className = {`p-1.5 hover:text-[#F16436]`} target = {`_blank`} rel = {`noopener noreferrer`}>

            <span className={`sr-only`}>CurseForge</span>
            <CurseForge/>

        </a>


        <ThemeSwitcher switcherClassName = {`mx-auto my-auto w-full`} containerClassName = {`h-10`} textClassName = {`sr-only`}/>
    </div>;
}