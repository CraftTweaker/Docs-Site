import {ReactElement} from "react";
import Link from "next/link";

export default function Footer(): ReactElement {
    return <footer className = {`h-16 border-t border-gray-300 dark:border-gray-700`}>
        <div className = {`container m-auto h-full flex justify-center gap-x-4 text-xl`}>

                <a className = {`my-auto`} href = "/privacy">

                    Privacy

                </a>


        </div>

    </footer>;
}