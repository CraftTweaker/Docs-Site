import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from "react";
import { DOCS_DEV, SITE_DEV } from "../utils/Utils";

class MyDocument extends Document {

  render() {
    return (
      <Html lang = {"en"}>

        <Head>
          {!SITE_DEV && !DOCS_DEV && <script async defer data-website-id="50e143af-e1f3-4c99-90c9-eb644de304c8" src="https://analytics.blamejared.com/umami.js"/>}
        </Head>
        <body>
        <Main/>

        <NextScript/>
        </body>

      </Html>
    )
  }
}

export default MyDocument