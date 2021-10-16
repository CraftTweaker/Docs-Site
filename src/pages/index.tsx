import { GetStaticPropsResult } from "next";
import { getVersion, getVersions } from "util/ContentUtil";
import { Version } from "util/Types";
import { ReactElement } from "react";
import VersionIndex from "./[version]";

export default function Home(props: { version: Version, versions: string[] }): ReactElement {

    return VersionIndex(props);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ version: Version, versions: string[] }>> {
    return {
        props: {
            version: getVersion(getVersions()[0]),
            versions: getVersions()
        }
    };
}