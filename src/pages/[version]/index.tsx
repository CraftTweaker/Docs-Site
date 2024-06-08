import {GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult} from "next";
import {getVersion, getVersions} from "util/ContentUtil";
import Layout from "components/Layout";
import {Version} from "util/Types";
import Image from "next/image";
import {ReactElement} from "react";
import {NextSeo} from "next-seo";
import Footer from "../../components/Footer";
import {VersionSelectAd} from "../../components/ads/Ad";

export default function VersionIndex(props: { version: Version, versions: string[] }): ReactElement {

    return <Layout pageKey = {`${props.version}`} slug = "">

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
                            alt: `CraftTweaker logo`
                        }
                    ]
                }}
                additionalMetaTags = {[{
                    property: "keywords",
                    content: `CraftTweaker,CraftTweaker docs,CraftTweaker documentation,CraftTweaker wiki,CraftTweaker mod`
                }, {
                    property: "charset",
                    content: `utf-8`
                }]}
        />
        <div className = {`flex flex-grow mb-16`}>

            <div className = {`flex-grow`}>

                <div className = {`container w-5/6 mx-auto flex flex-col gap-y-4`}>
                    <div className = {`flex flex-col gap-y-2 mt-4`}>
                        <h2 className = {`text-5xl text-center`}>
                            Select Version
                        </h2>

                        <div className = {`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-2`}>
                            {props.versions.map(version => {
                                        return props.version.version !== version ?

                                                <a key = {version} className = {`versionButton`} href = {`/${version}`}>

                                                    <p className = {`versionText`}>
                                                        {version}
                                                    </p>

                                                </a>

                                                : <div className = {`versionButtonSelected`} key = {version}>
                                                    <p className = {`versionText`}>
                                                        {version}
                                                    </p>
                                                </div>;
                                    }
                            )}
                        </div>
                    </div>
                    <VersionSelectAd/>

                    <div className = {`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2`}>
                        {props.version.languages.map(lang => {
                            return <a key = {`${props.version.version}-${lang}`} href = {`/${props.version.version}/${lang}/index`}>
                                <div className = {`group component selectable w-full flex flex-col text-center`}>
                                    <div>
                                        <Image src = {`https://blamejared.com/svg/flags/${lang}.svg`} alt = {lang} width = {564} height = {423}
                                               layout = {`responsive`} className = {`dark:brightness-[80%]`} priority = {true} loading = {`eager`}/>
                                    </div>
                                    <div className = {`flex flex-col text-xl gap-y-1 py-2 select-none font-semibold`}>
                                        <p>Version: {props.version.version}</p>
                                        <p>Language: {lang}</p>
                                    </div>
                                </div>
                            </a>;
                        })}
                    </div>
                </div>

            </div>

        </div>
        <span data-ccpa-link = "1" className = "text-2xl text-center mx-auto underline mb-2"></span>

        <Footer/> </Layout>;
}


export async function getStaticProps(context: GetStaticPropsContext<{ version: string }>): Promise<GetStaticPropsResult<{
    version: Version,
    versions: string[]
}>> {

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
            return {params: {version: value}};
        }),
        fallback: false
    };
}