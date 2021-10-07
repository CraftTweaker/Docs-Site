import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { getContentDir, getDocsJson, getVersionAndLanguages } from "util/ContentUtil";
import { DocsMeta, SlugPageProps, SlugStaticProps, Verlang } from "util/Types";
import { ReactElement } from "react";
import Page from "./[...slug]";
import fs from "fs";
import path from "path";
import { ParsedUrlQuery } from "querystring";

export default function Home(props: SlugPageProps): ReactElement {

    return Page(props);
}


export async function getStaticProps(context: GetStaticPropsContext<SlugStaticProps>): Promise<GetStaticPropsResult<SlugPageProps>> {

    if (!context.params) {
        throw new Error("Invalid params!");
    }
    const { version, language } = context.params;
    let content = "";
    let meta: DocsMeta | undefined = undefined;
    const versions = getVersionAndLanguages();

    try {
        content = fs.readFileSync(path.join(getContentDir(version, language), "index") + ".md", "utf-8");
        meta = JSON.parse(fs.readFileSync(path.join(getContentDir(version, language), "index") + ".json", "utf-8"));
    } catch (e) {
        console.log(`Cannot build page: ${version}/${language}/index}`);
    }

    return {
        props: {
            version,
            language,
            content: content,
            nav: getDocsJson(version, language),
            meta: meta as DocsMeta,
            slug: "index",
            versions: versions.map(value => value.version),
            languages: versions.filter(value => value.version === version)[0].languages
        }
    };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<ParsedUrlQuery & Verlang>> {

    const paths: { params: ParsedUrlQuery & Verlang }[] = [];
    const versions = getVersionAndLanguages();

    versions.forEach(version => {
        version.languages.forEach(language => {
            paths.push({
                params: {
                    version: version.version,
                    language: language
                }
            });
        });
    });

    return {
        paths: paths,
        fallback: false
    };
}