import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import Layout from "../components/layout";
import fs from 'fs-extra';
import path from 'path';
import SideNav from "../components/SideNav";
import { NextPageContext } from "next";
import { DOCS_DEV, getTheme, SITE_DEV } from "../utils/Utils";
import { HasTheme, HasVerLang } from "../utils/Interfaces";
import { Router } from "next/router";
import { NextSeo } from "next-seo";

export default function Index({ theme, verlang }: HasTheme & HasVerLang) {

  function getFlag(lang: string) {

    // This handles lang -> flag, not great, but there isn't a proper solution
    if (lang === "en") {
      lang = "gb";
    } else if (lang === "ko") {
      lang = "kr";
    } else if (lang === "zh") {
      lang = "cn"
    } else if (lang === "ja") {
      lang = "jp";
    }
    return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/${lang}.svg`
  }


  const simpleBarRef = useRef(null);
  useEffect(() => {
    // Handles reseting simple bar's position
    const handleRouteChange = () => {
      // @ts-ignore
      simpleBarRef.current?.getScrollElement().scrollTo(0, 0);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    }

  }, []);


  let [selectedVersion, setVersion] = useState(Object.keys(verlang).sort((a, b) => b.localeCompare(a))[0]);

  const [showingNav, setShowingNav] = useState(false);

  return (<>
    <Layout theme = {theme} showingNav = {showingNav} setShowingNav = {setShowingNav} current = {{
      key: "CraftTweaker Documentation",
      value: "CraftTweaker Documentation"
    }}>

      <NextSeo
        title = {`CraftTweaker Documentation`}
        description = {`Documentation for the CraftTweaker Minecraft mod, information on how to use the ZenScript language and a central wiki for mods that rely on it.`}
        canonical = {`https://docs.blamejared.com/`}
        openGraph = {{
          type: `website`,
          url: `https://docs.blamejared.com/`,
          title: `CraftTweaker Documentation`,
          description: `Documentation for the CraftTweaker Minecraft mod, information on how to use the ZenScript language and a central wiki for mods that rely on it.`,
          images: [
            {
              url: `https://docs.blamejared.com/og_image.png`,
              width: 90,
              height: 92,
              alt: `CraftTweaker logo`,
            }
          ],
        }}
        additionalMetaTags = {[{
          property: 'keywords',
          content: `CraftTweaker,CraftTweaker docs,CraftTweaker documentation,CraftTweaker wiki,CraftTweaker mod`
        }, {
          property: 'charset',
          content: `utf-8`
        }]}
      />


      <div className = {`flex flex-row`}>
        <SideNav stub = {true} showingNav = {showingNav} parentFolders = {[]}/>
        <div className = {`w-full md:w-content`}>
          <SimpleBar className = {`mx-auto max-h-with-nav w-full`} ref = {simpleBarRef}>
              <div className = "container mx-auto text-center dark:text-dark-100">
                <div className = {`w-5/6 mx-auto`}>
                  <h1 className = "text-4xl mt-1 mb-3"> Select Version </h1>

                  <div className = {`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-2`}>
                    {Object.keys(verlang).sort((a, b) => b.localeCompare(a)).map(version =>
                      <div className = {`select-none w-full h-16 grid border border-gray-400 dark:border-dark-600 ${selectedVersion === version ? `ring ring-inset bg-blue-200 dark:bg-blue-900` : `cursor-pointer hover:ring bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-750`}`} onClick = {event => {
                        if (selectedVersion === version) {
                          return;
                        }
                        setVersion(version)
                      }}
                           key = {version}>
                        <p className = {`mx-auto my-auto text-xl font-semibold`}>
                          {version}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className = {`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-2 my-4`}>

                    {verlang[selectedVersion].map((lang: string) => {
                      return <div className = {`border border-gray-400 bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-750 hover:ring dark:border-dark-600`} key = {`${lang}-${selectedVersion}`}>
                        <Link href = {`/[version]/[lang]/[...slug]`} as = {`/${selectedVersion}/${lang}/index/`}>

                          <a> <img className = {`w-full`} src = {getFlag(lang)} alt = {lang}/>
                            <p className = {`text-xl font-semibold pt-2`}>Version: {selectedVersion}</p>
                            <p className = {`text-xl font-semibold pb-2`}>Language: {lang}</p>
                          </a>

                        </Link>

                      </div>
                    })}

                  </div>

                </div>
              </div>
          </SimpleBar>
        </div>
      </div>
    </Layout>
  </>)
}


export async function getServerSideProps(context: NextPageContext) {
  let { pageTheme, hljsStyle, lineNumbers } = getTheme(context);
  let verlang: any = {};
  if (DOCS_DEV) {
    verlang["0.00"] = ["en"];

  } else {
    let docsdir = path.join(process.cwd(), 'docs');
    let versionsInfo = fs.readdirSync(docsdir);
    for (let version of versionsInfo) {
      verlang[version] = fs.readdirSync(path.join(docsdir, version));
    }
  }


  return {
    props: {
      theme: {
        pageTheme,
        hljsStyle,
        lineNumbers
      },
      verlang
    },
  }
}