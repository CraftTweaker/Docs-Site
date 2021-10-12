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
                    <link rel = "apple-touch-icon" sizes = "180x180" href = "/apple-touch-icon.png?v=1"/>
                    <link rel = "icon" type = "image/png" sizes = "32x32" href = "/favicon-32x32.png?v=1"/>
                    <link rel = "icon" type = "image/png" sizes = "192x192" href = "/android-chrome-192x192.png?v=1"/>
                    <link rel = "icon" type = "image/png" sizes = "16x16" href = "/favicon-16x16.png?v=1"/>
                    <link rel = "manifest" href = "/site.webmanifest?v=1"/>
                    <link rel = "mask-icon" href = "/safari-pinned-tab.svg?v=1" color = "#075985"/>
                    <link rel = "shortcut icon" href = "/favicon.ico?v=1"/>
                    <meta name = "msapplication-TileColor" content = "#075985"/>
                    <meta name = "msapplication-TileImage" content = "/mstile-144x144.png?v=1"/>
                    <meta name = "theme-color" content = "#ffffff"/>
                </Head>

                <ThemeScriptTag/>

                <body className = {`bg-gray-100 dark:bg-gray-950`}>
                <Main/>

                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
