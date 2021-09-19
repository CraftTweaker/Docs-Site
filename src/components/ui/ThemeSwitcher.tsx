import React, { ReactElement, useContext } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { ThemeContext } from "util/Context";

export default function ThemeSwitcher(): ReactElement {
    const theme = useContext(ThemeContext);

    return (
        <button className = {`p-1.5 md:p-0 cursor-pointer hover:text-diluv-600 dark:hover:text-diluv-500 select-none`} onClick = {() => {
            theme.setTheme(theme.pageTheme === "dark" ? "light" : "dark");
        }} aria-label = {`Current theme is ${theme.pageTheme}. Press to toggle.`}>
            {theme.pageTheme === "dark" ? <SunIcon className = {`themeSwitcher`} width = {48} height = {48}/> :
                <MoonIcon className = {`themeSwitcher`} width = {48} height = {48}/>}
        </button>
    );
}
