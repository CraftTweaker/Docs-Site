import { ReactElement } from "react";

export default function Footer(): ReactElement {
    return <footer className = {`h-16 bg-darkBlue-900`}>
        <div className = {`container m-auto h-full flex justify-center gap-x-4 text-xl`}>
            <p className = {`my-auto`}>
                Discord
            </p>
            <p className = {`my-auto`}>
                Github
            </p>
            <p className = {`my-auto`}>
                Curseforge
            </p>
            <p className = {`my-auto`}>
                Patreon
            </p>

        </div>

    </footer>;
}