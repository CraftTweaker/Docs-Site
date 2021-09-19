import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { getVersion, getVersions } from "util/ContentUtil";
import Layout from "components/Layout";
import { Version } from "util/Types";
import Image from "next/image";
import React, { ReactElement } from "react";
import Link from "next/link";


export default function VersionIndex(props: { version: Version, versions: string[] }): ReactElement {

    return <Layout>
        <div className = {`flex min-h-screen`}>

            <div className = {`flex-grow`}>

                <div className = {`container w-5/6 mx-auto flex flex-col gap-y-4`}>
                    <div className = {`flex flex-col gap-y-2 mt-4`}>
                        <h2 className = {`text-5xl text-center`}>
                            Select Version
                        </h2>
                        <div className = {`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-2`}>
                            {props.versions.map(version => {
                                    return props.version.version !== version ? <Link href = {`/${version}`} key = {version}>

                                        <a key = {version} className = {`versionButton`}>

                                            <p className = {`versionText`}>
                                                {version}
                                            </p>

                                        </a>

                                    </Link> : <div className = {`versionButtonSelected`} key = {version}>
                                        <p className = {`versionText`}>
                                            {version}
                                        </p>
                                    </div>;
                                }
                            )}
                        </div>
                    </div>

                    <div className = {`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-64`}>
                        {props.version.languages.map(lang => {
                            return <Link key = {`${props.version.version}-${lang}`} href = {`/${props.version.version}/${lang}/index`}>

                                <a>
                                    <div className = {`group component selectable w-full flex flex-col text-center`}>
                                        <Image src = {`https://blamejared.com/svg/flags/${lang}.svg`} alt = {lang} width = {300} height = {225} layout = {`responsive`} className = {`dark:brightness-[80%]`} priority = {true} loading = {`eager`}/>
                                        <div className = {`flex flex-col text-xl gap-y-1 py-2 select-none font-semibold`}>
                                            <p>Version: {props.version.version}</p>
                                            <p>Language: {lang}</p>
                                        </div>
                                    </div>
                                </a>

                            </Link>;
                        })}
                    </div>
                </div>

            </div>

        </div>
    </Layout>;
}


export async function getStaticProps(context: GetStaticPropsContext<{ version: string }>): Promise<GetStaticPropsResult<{ version: Version, versions: string[] }>> {

    const version = context.params?.version;
    if (!version) {
        throw new Error("Invalid version!");
    }
    return {
        props: {
            version: getVersion(version),
            versions: getVersions()
        }
    };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    return {
        paths: getVersions().map(value => {
            return { params: { version: value } };
        }),
        fallback: false
    };
}