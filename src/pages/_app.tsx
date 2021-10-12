import "css/index.css";
import "css/nprogress.css";
import "css/markdown.css";
import "css/code.css";
import "css/table.css";
import type { AppProps } from "next/app";
import { NavContext, ThemeContext } from "util/Context";
import { ReactElement, useEffect, useState } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import { ThemeValues } from "../util/Types";
import { saveTheme } from "../util/ThemeUtil";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => {
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps): ReactElement {

    const [theme, setTheme] = useState<ThemeValues>(`light`);
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [folders, setFolders] = useState<string[]>(["nav"]);

    useEffect(() => {
        setTheme((localStorage.getItem(`pageTheme`) || `light`) as ThemeValues);
    }, []);
    return <ThemeContext.Provider value = {{
        pageTheme: theme,
        setTheme: (pageTheme) => {
            setTheme(pageTheme);
            saveTheme(pageTheme);
        }
    }}>

        <NavContext.Provider value = {{
            folders: folders,
            open: navOpen,
            addFolder: name => {
                if (!folders.some(value => value === name)) {
                    setFolders(prevState => [...prevState, name]);
                }
            },
            removeFolder: name => {
                setFolders(prevState => prevState.filter(value => value !== name));
            },
            clearFolders: () => {
                setFolders(["nav"]);
            },
            setOpen: (state: boolean) => {
                setNavOpen(state);
            },
            toggleOpen: () => {
                setNavOpen(!navOpen);
            },
            isOpen: (folder: string) => {
                return folders.some(other => other === folder);
            }
        }}>

            <Component {...pageProps} />

        </NavContext.Provider>

    </ThemeContext.Provider>;

}

export default MyApp;
