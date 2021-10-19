import Layout from "../components/Layout";
import React, { ReactElement } from "react";
import Link from "next/link";

export default function Error(): ReactElement {
    return <Layout pageKey = "error">
        <div className = {`flex min-h-screen`}>

            <div className = {`flex-grow`}>

                <div className = {`container w-5/6 mx-auto flex flex-col gap-y-4`}>
                    <div className = {`flex flex-col gap-y-4 mt-4`}>
                        <h1 className = {`text-4xl text-center`}>
                            <p>
                                Error 500 - Something went wrong on our side. Sorry about that!
                            </p>


                        </h1>
                        <Link href = {"/"}>

                            <a className = {`text-4xl text-center text-blue-700 dark:text-blue-400 hover:underline`}>
                                <h2>
                                    Click here to go back to the main page.
                                </h2>
                            </a>

                        </Link>
                    </div>

                </div>

            </div>

        </div>
    </Layout>;
}