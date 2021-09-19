import Link from "next/link";
import ThemeSwitcher from "./ui/ThemeSwitcher";
import Image from "next/image";
import { ReactElement } from "react";

export default function Navbar(): ReactElement {

    return <nav className = {`flex bg-blue-800 h-18 text-white shadow-md dark:shadow-none`}>
        <div className = {`flex justify-between px-4 w-full my-auto`}>
            <div>
                <Link href = {`/`} as = {`/`}>

                    <a className = "flex items-center gap-x-2 ml-2">

                        <Image width = {48} height = {48} src = "/crafttweaker.svg" alt = "crafttweaker_logo" priority = {true} loading = {`eager`}/>

                        <span className = "text-lg hidden sm:block">CraftTweaker Documentation</span>

                    </a>

                </Link>
            </div>

            <div className = {`my-auto flex gap-x-2 items-center`}>
                <p className = {`text-lg`}>
                    Account
                </p>
                <ThemeSwitcher/>
            </div>
        </div>
    </nav>;

}