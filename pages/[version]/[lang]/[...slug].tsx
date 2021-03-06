import fs from 'fs-extra';
import path from 'path'
import React, { useEffect, useRef, useState } from "react";
import SimpleBar from 'simplebar-react';

import ArticleNav from "../../../components/ArticleNav";
import Content from "../../../components/Content";
import Layout from "../../../components/layout";
import SideNav from "../../../components/SideNav";
import { NavObject, PageProps, PageQuery } from "../../../utils/Interfaces";
import { NextPageContext } from "next";
import { DOCS_DEV, getTheme, walk, walkDev } from "../../../utils/Utils";
import { Router } from "next/router";
import { NextSeo } from "next-seo";
import { AD_REFRESH_RATE, MobileAd } from "../../../components/ads/Ads";


const Page = ({ theme, version, lang, previous, current, next, navs, page, verlang, parentFolders }: PageProps) => {
    current = current || {key: "ERROR", value: "ERROR"}
    const [showingNav, setShowingNav] = useState(false);
    useEffect(() => {
        setShowingNav(false);
    }, [current]);
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
        };
    }, []);
    const lastRender = useRef(0);
    setInterval(args => {
        lastRender.current = lastRender.current+1;
    }, AD_REFRESH_RATE)
    return (
        <Layout theme = {theme} showingNav = {showingNav} setShowingNav = {setShowingNav} current = {current}>

            <NextSeo
                title = {`${current.key} - CraftTweaker Documentation`}
                description = {`Documentation for the CraftTweaker Minecraft mod, information on how to use the ZenScript language and a central wiki for mods that rely on it.`}
                canonical = {`https://docs.blamejared.com/${version}/${lang}/${current.value}/`}
                openGraph = {{
                    type: `website`,
                    url: `https://docs.blamejared.com/${version}/${lang}/${current.value}/`,
                    title: `${current.key} - CraftTweaker Documentation`,
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
                    content: `CraftTweaker,CraftTweaker docs,CraftTweaker documentation,CraftTweaker wiki,CraftTweaker ${current.value},CraftTweaker Docs ${current.value},${current.value},CraftTweaker mod`
                }, {
                    property: 'charset',
                    content: `utf-8`
                }]}
            />


            <div className = "flex">

                <SideNav version = {version} lang = {lang} navs = {navs} current = {current} verlang = {verlang} stub = {false} showingNav = {showingNav} parentFolders = {parentFolders}/>

                <div className = {`w-full md:w-content`}>
                    <SimpleBar className = {`mx-auto max-h-with-nav w-full`} ref = {simpleBarRef}>

                        <div className = {`grid grid-cols-1 lg:grid-cols-content`}>
                            <div className = {`flex flex-col justify-between`}>
                                <div className = "w-full px-4 mx-auto h-28 sm:h-24 md:hidden" key = {lastRender.current}>

                                    <MobileAd id = {"top-page-ad"} current = {{
                                        key: new Date().toString(),
                                        value: "value"
                                    }} type = {"text"}/>

                                </div>
                            </div>
                            <div className = {`w-11/12 p-4 mx-auto text-black dark:text-dark-100 bg-dark-150 dark:bg-dark-850 border border-gray-300 dark:border-dark-700 my-4`}>
                                <ArticleNav version = {version} lang = {lang} previous = {previous} next = {next}/>
                                <Content version = {version} lang = {lang} page = {page}/>
                                <ArticleNav version = {version} lang = {lang} previous = {previous} next = {next}/>
                            </div>
                        </div>
                    </SimpleBar>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: NextPageContext) {
    let { pageTheme, hljsStyle, lineNumbers } = getTheme(context);
    let { lang, slug, version } = context.query as unknown as PageQuery;

    if (!slug) {
        slug = ['index']
    }
    let docsDir = path.join(process.cwd(), 'docs');
    let versionDir = path.join(docsDir, version);
    let langDir = path.join(versionDir, lang);
    let dvlDir = path.join(langDir, 'docs');
    let page = path.join(dvlDir, slug.join("/"));

    if (DOCS_DEV) {
        docsDir = path.join(path.join(process.cwd(), '../'), "docs");
        page = path.join(docsDir, slug.join("/"));
    }


    if (context.req && context.res) {
        if (slug[slug.length - 1].indexOf(".") !== -1) {
            context.res.end(fs.readFileSync(page));
            return {
                props: { slug: slug }
            }
        }
        if (!fs.existsSync(page + ".md")) {
            context.res.writeHead(404, {
                'Content-Type': 'text/html; charset=utf-8',
            })
            context.res.end();
            return {
                props: { none: "" }
            }
        }
    }
    let docsJsonLocation: string;
    let docsJsonReversedLocation: string;

    if (DOCS_DEV) {

        docsJsonLocation = path.join(path.join(process.cwd(), '../'), "docs.json");
        docsJsonReversedLocation = path.join(path.join(process.cwd(), '../'), "docs_reverse_lookup.json");
        let reversed = walkDev(JSON.parse(fs.readFileSync(docsJsonLocation, "utf-8"))["nav"], {}, [])
        fs.writeJSONSync(docsJsonReversedLocation, reversed);
    } else {
        docsJsonLocation = path.join(langDir, "docs.json");
        docsJsonReversedLocation = path.join(langDir, "docs_reverse_lookup.json");
    }

    let docsJson = fs.readFileSync(docsJsonLocation, "utf8");
    let docsJsonReversed = fs.readFileSync(docsJsonReversedLocation, "utf8");
    let docs = JSON.parse(docsJson)["nav"];
    let docsReversed = JSON.parse(docsJsonReversed);

    let filePaths = walk(docs, []);
    let previous: (NavObject | undefined) = undefined;
    let current: (NavObject | undefined) = undefined;
    let next: (NavObject | undefined) = undefined;

    let parentFolders: string[] = [];

    filePaths.forEach(obj => {
        if (current && !next) {
            next = obj;
            next.value = next.value.replace(/\.md/, "/");

        }
        if (obj.value === slug.join("/") + ".md") {
            current = obj;
            current.value = current.value.replace(/\.md/, "");
            parentFolders = docsReversed[current.value + ".md"] || [];
        }
        if (!current) {
            previous = obj;
            previous.value = previous.value.replace(/\.md/, "/");
        }
    });

    let versionsInfo: string[];
    let verlang: any = {};
    if (DOCS_DEV) {
        verlang["0.00"] = ["en"];
    } else {
        versionsInfo = fs.readdirSync(docsDir);
        for (let version of versionsInfo) {
            verlang[version] = fs.readdirSync(path.join(docsDir, version));
        }
    }

    return {
        props: {
            theme: {
                pageTheme,
                hljsStyle,
                lineNumbers
            },
            version: version,
            lang: lang,
            previous: previous ?? false,
            current: current,
            next: next ?? false,
            navs: docs,
            page: fs.readFileSync(page + ".md", 'utf-8'),
            parentFolders,
            verlang
        },
    }
}

export default Page





