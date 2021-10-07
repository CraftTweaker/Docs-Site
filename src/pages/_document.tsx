// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from "next/document";
import React, { ReactElement } from "react";
import ThemeScriptTag from "../util/Darkmode";
import { SITE_DEV } from "../util/EnvUtil";

class MyDocument extends Document {
    render(): ReactElement {
        return (
            <Html lang = {"en"}>

                <Head>
                    {!SITE_DEV &&
                    <script async defer data-website-id = "50e143af-e1f3-4c99-90c9-eb644de304c8" src = "https://analytics.blamejared.com/umami.js"/> &&
                    <script async src = "https://media.ethicalads.io/media/client/ethicalads.min.js"/>}

                </Head>

                <ThemeScriptTag/>

                <body className = {`bg-gray-100 dark:bg-gray-950 `}>
                <Main/>

                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
