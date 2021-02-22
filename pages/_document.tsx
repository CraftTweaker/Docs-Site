import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang = {"en"}>

        <Head>
          <script async defer data-website-id="50e143af-e1f3-4c99-90c9-eb644de304c8" src="https://analytics.blamejared.com/umami.js"/>
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