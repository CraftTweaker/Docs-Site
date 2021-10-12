import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { collectPages, getContentDir, getDocsJson, getVersionAndLanguages } from "util/ContentUtil";
import Layout from "components/Layout";
import React, { ReactElement, useContext } from "react";
import fs from "fs";
import path from "path";
import Sidenav from "components/Sidenav";
import { DocsMeta, SlugPageProps, SlugStaticProps } from "util/Types";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { NavContext, VerLangContext } from "util/Context";
import PageContent from "components/PageContent";
import { NextSeo } from "next-seo";

export default function Page(props: SlugPageProps): ReactElement {

    const nav = useContext(NavContext);

    const version = props.version;
    const versions = props.versions;
    const language = props.language;
    const languages = props.languages;

    return <VerLangContext.Provider value={{
        version: version,
        versions: versions,
        language: language,
        languages: languages,
        hasInfo: true
    }}><Layout>
        <NextSeo
            title={`${props.meta.current.name} - CraftTweaker Documentation`}
            description={props.meta.shortDescription ?? `Documentation for the CraftTweaker Minecraft mod, information on how to use the ZenScript language and a central wiki for mods that rely on it.`}
            canonical={`https://docs.blamejared.com/${version}/${language}/${props.slug}/`}
            openGraph={{
                type: `website`,
                url: `https://docs.blamejared.com/${version}/${language}/${props.slug}/`,
                title: `${props.meta.current.name} - CraftTweaker Documentation`,
                description: props.meta.shortDescription ?? `Documentation for the CraftTweaker Minecraft mod, information on how to use the ZenScript language and a central wiki for mods that rely on it.`,
                images: [
                    {
                        url: `https://docs.blamejared.com/og_image.png`,
                        width: 90,
                        height: 92,
                        alt: `CraftTweaker logo`
                    }
                ]
            }}
            additionalMetaTags={[{
                property: "keywords",
                content: `CraftTweaker,CraftTweaker docs,CraftTweaker documentation,CraftTweaker wiki,CraftTweaker ${props.meta.current.name},CraftTweaker Docs ${props.meta.current.name},${props.meta.current.name},CraftTweaker mod`
            }, {
                property: "charset",
                content: `utf-8`
            }]}
        />
        <div className={`flex min-h-content max-w-screen`}>
            <Sidenav version={props.version} language={props.language} folder={props.meta.folders.join("/")} slug={props.slug} nav={props.nav}/>
            <PageContent content={props.content} version={props.version} language={props.language} meta={props.meta}/>
            <button
                className={`fixed right-5 bottom-5 p-2 rounded bg-blue-800 cursor-pointer text-white shadow-lg border-2 border-white dark:border-black lg:hidden z-[5001]`}
                onClick={() => {
                    nav.toggleOpen();
                }}>
                {nav.open ? <XIcon className={`h-12 w-12 mx-auto`}/> : <MenuIcon className={`h-12 w-12 mx-auto`}/>}

            </button>
        </div>
    </Layout></VerLangContext.Provider>;
}


export async function getStaticProps(context: GetStaticPropsContext<SlugStaticProps>): Promise<GetStaticPropsResult<SlugPageProps>> {

    if (!context.params) {
        throw new Error("Invalid params!");
    }
    const { version, language, slug } = context.params;
    let content = "";
    let meta: DocsMeta | undefined = undefined;
    const versions = getVersionAndLanguages();

    try {
        content = fs.readFileSync(path.join(getContentDir(version, language), ...slug) + ".md", "utf-8");
        meta = JSON.parse(fs.readFileSync(path.join(getContentDir(version, language), ...slug) + ".json", "utf-8"));
    } catch (e) {
        console.log(`Cannot build page: ${version}/${language}/${slug.join("/")}`);
    }

    return {
        props: {
            version,
            language,
            content: content,
            nav: getDocsJson(version, language),
            meta: meta as DocsMeta,
            slug: slug.join("/"),
            versions: versions.map(value => value.version),
            languages: versions.filter(value => value.version === version)[0].languages
        }
    };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<SlugStaticProps>> {

    const paths: { params: SlugStaticProps }[] = [];
    const versions = getVersionAndLanguages();

    versions.forEach(version => {
        version.languages.forEach(language => {
            const docsJson = getDocsJson(version.version, language);
            const nav = docsJson["nav"];
            collectPages(nav).forEach(page => {
                paths.push({
                    params: {
                        version: version.version,
                        language: language,
                        slug: page.path.replace(/\.md/, "").split("/")
                    }
                });
            });

        });
    });

    return {
        paths: paths,
        fallback: false
    };
}