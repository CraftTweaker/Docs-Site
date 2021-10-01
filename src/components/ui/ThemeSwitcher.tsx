import React, { ReactElement, useContext } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { ThemeContext } from "util/Context";

export default function ThemeSwitcher(props: {switcherClassName?: string | undefined; containerClassName?: string | undefined; textClassName?: string|undefined}): ReactElement {
    const theme = useContext(ThemeContext);

    return (
        <button className = {` md:p-0 cursor-pointer group dark:hover:text-diluv-500 select-none themeSwitcherContainer ${props.containerClassName ?? ""}`} onClick = {() => {
            theme.setTheme(theme.pageTheme === "dark" ? "light" : "dark");
        }} aria-label = {`Current theme is ${theme.pageTheme}. Press to toggle.`}>

            {theme.pageTheme === "dark" ? <SunIcon className = {`themeSwitcher ${props.switcherClassName ?? ""}`} width = {48} height = {48}/> :
                <MoonIcon className = {`themeSwitcher ${props.switcherClassName ?? ""}`} width = {48} height = {48}/>}

            <span className={props.textClassName ?? ""}>Toggle Theme</span>
        </button>
    );
}
