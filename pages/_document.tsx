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
          <script
            async
            src = {"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"}
          />
          <script
            dangerouslySetInnerHTML = {{
              __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "ca-pub-7211841189345460",
                   enable_page_level_ads: true
              });
                `
            }}
          />


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