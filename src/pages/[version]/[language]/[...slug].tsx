import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { collectPages, getContentDir, getDocsJson, getReverseDocsJson, getVersionAndLanguages } from "util/ContentUtil";
import Layout from "components/Layout";
import React, { ReactElement, useContext } from "react";
import fs from "fs";
import path from "path";
import Sidenav from "components/Sidenav";
import { SlugPageProps, SlugStaticProps } from "../../../util/Types";
import { MenuIcon } from "@heroicons/react/outline";
import { NavContext } from "../../../util/Context";
import PageContent from "../../../components/PageContent";

export default function Page(props: SlugPageProps): ReactElement {

    const nav = useContext(NavContext);

    return <Layout>
        <div className = {`flex min-h-content max-w-screen`}>
            <Sidenav version = {props.version} language = {props.language} folder = {props.folder} slug = {props.slug}/>
            <PageContent content = {props.content} version = {props.version} language = {props.language}/>
            <button className = {`fixed right-10 bottom-10 p-2 rounded bg-blue-800 cursor-pointer text-white shadow-lg border-2 border-white dark:border-black lg:hidden`} onClick = {() => {
                nav.toggleOpen();
            }}>
                <MenuIcon className = {`h-12 w-12 mx-auto`}/>
            </button>
        </div>
    </Layout>;
}


export async function getStaticProps(context: GetStaticPropsContext<SlugStaticProps>): Promise<GetStaticPropsResult<SlugPageProps>> {

    if (!context.params) {
        throw new Error("Invalid params!");
    }
    const { version, language, slug } = context.params;
    let content = "";
    let folder = "";
    try {
        content = fs.readFileSync(path.join(getContentDir(version, language), ...slug) + ".md", "utf-8");
        folder = getReverseDocsJson(version, language)[path.join(...slug) + ".md"].join("/");
    } catch (e) {
        console.log(`Cannot build page: ${version}/${language}/${slug.join("/")}`);
    }

    return {
        props: {
            version,
            language,
            content: content,
            folder: folder,
            slug: slug.join("/")
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
                        slug: page.value.replace(/\.md/, "").split("/")
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