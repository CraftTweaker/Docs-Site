import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { getDocsJson, getVersionAndLanguages } from "util/ContentUtil";
import Layout from "components/Layout";
import React, { ReactElement, useContext, useState } from "react";
import Sidenav from "components/Sidenav";
import { SearchPageProps, SearchProps, SearchResults } from "util/Types";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { NavContext, VerLangContext } from "util/Context";
import Link from "next/link";
import axios from "axios";

export default function Page(props: SearchPageProps): ReactElement {

    const nav = useContext(NavContext);
    const version = props.version;
    const versions = props.versions;
    const language = props.language;
    const languages = props.languages;

    const [searchResults, setSearchResults] = useState<SearchResults>();

    return <VerLangContext.Provider value = {{
        version: version,
        versions: versions,
        language: language,
        languages: languages,
        hasInfo: true
    }}> <Layout>
        <div className = {`flex min-h-content max-w-screen`}>
            <Sidenav version = {props.version} language = {props.language} folder = {""} slug = {""} nav = {props.nav}/>
            <>
                <div className = {`w-full lg:w-content`}>
                    <div className = {`w-10/12 lg:w-8/12 mx-auto my-4 mb-32`}>
                        <div className = {`mx-auto grid grid-cols-1 lg:grid-cols-content`}>
                            <div className = {`w-11/12 lg:w-full p-4 pb-16 px-4 mx-auto text-black dark:text-gray-100`}>
                                <div className = {`w-5/6 mx-auto`}>
                                    <div className = {`text-center mb-2`}>
                                        <label className = "text-4xl" htmlFor = "main-search">Search</label>
                                    </div>
                                    <input disabled = {false} id = "main-search"
                                           className = "bg-gray-200 dark:bg-gray-800 block w-full p-2 border border-white dark:border-black"
                                           onChange = {(event) => {
                                               axios.get(`/api/search?v=${version}&lang=${language}&q=${event.target.value}&limit=5`).then(data => {
                                                   setSearchResults(data.data);
                                               }).catch(reason => {
                                                   console.log(reason);
                                                   setSearchResults(undefined);
                                               });
                                           }}/>


                                    {searchResults && <div className = {`bg-gray-100 dark:bg-gray-900 border border-white dark:border-black`}>
                                        {searchResults.error ? <> There was an error performing the search.
                                            Message: {JSON.stringify(searchResults.results[0])}</> : searchResults.count > 0 ? searchResults.results.map((value, index) =>

                                            <Link href = {(value.location.startsWith("/") ? value.location : `/${value.location}`).replace(/\.md/, "")}
                                                  key = {`${index}`}>

                                                <a className = {`px-2 block hover:bg-gray-300 dark:hover:bg-gray-800`}>

                                                    <div className = "py-1 pl-2">
                                                        <h2 className = "py-2 text-blue-700 dark:text-blue-300">
                                                            Page: {value.location.substring(0, value.location.lastIndexOf(".md")).substring(value.location.lastIndexOf("/") + 1)}
                                                        </h2>
                                                        <h4 className = "mt-0 mb-1 text-base">
                                                            <p>{value.text}</p>
                                                        </h4>
                                                    </div>

                                                </a>

                                            </Link>
                                        ) : (searchResults.count === 0 ? <div>
                                            <h4>No results found</h4></div> : <></>)}
                                    </div>}
                                </div>
                            </div>
                            <div className = {`flex flex-col justify-between`}>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <button className = {`fixed right-5 bottom-5 p-2 rounded bg-blue-800 cursor-pointer text-white shadow-lg border-2 border-white dark:border-black lg:hidden z-[5001]`} onClick = {() => {
                nav.toggleOpen();
            }}>

                {nav.open ? <XIcon className = {`h-12 w-12 mx-auto`}/> : <MenuIcon className = {`h-12 w-12 mx-auto`}/>}

            </button>
        </div>

    </Layout> </VerLangContext.Provider>;
}


export async function getStaticProps(context: GetStaticPropsContext<SearchProps>): Promise<GetStaticPropsResult<SearchPageProps>> {

    if (!context.params) {
        throw new Error("Invalid params!");
    }
    const { version, language } = context.params;
    const versions = getVersionAndLanguages();

    return {
        props: {
            version,
            language,
            nav: getDocsJson(version, language),
            versions: versions.map(value => value.version),
            languages: versions.filter(value => value.version === version)[0].languages
        }
    };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<SearchProps>> {

    const paths: { params: SearchProps }[] = [];
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