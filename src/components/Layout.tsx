import React, { ReactElement, useEffect } from "react";
import Navbar from "./Navbar";
import { initGA, pageView } from "../util/Analytics";
import Footer from "./Footer";

export default function Layout({ children, pageKey, slug }: React.PropsWithChildren<{ pageKey: string, slug:string }>): ReactElement {

    useEffect(() => {
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true;
        }
        pageView();
    }, [pageKey]);

    return <div className = {`min-h-screen flex flex-col text-black dark:text-gray-50`}>
        <header className = {`sticky top-0 z-[5000]`}>
            <Navbar slug={slug}/>
        </header>
        <main className="flex-grow flex flex-col">
            {children}
        </main>
    </div>;
}