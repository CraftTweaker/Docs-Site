import Markdown from "./markdown/Markdown";
import React, { ReactElement, useRef } from "react";
import { DocsMeta, PageContentProps, Verlang } from "util/Types";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { AD_REFRESH_RATE, MobileAd } from "./ads/Ads";

function PageContent(props: PageContentProps): ReactElement {

    const lastRender = useRef(0);
    setInterval(() => {
        lastRender.current = lastRender.current + 1;
    }, AD_REFRESH_RATE);

    return <div className = {`w-full lg:w-content`}>
        <div className = "" key = {lastRender.current}>
            <MobileAd id = {"top-home-ad"} current = {{
                name: new Date().toString(),
                path: "value"
            }} type = {"text"} className = {`w-full block lg:hidden h-32 sm:h-24 mt-4`}/>
        </div>
        <div className = {`w-10/12 lg:w-8/12 mx-auto my-4 mb-32 flex flex-col`}>

            <NextPrevNav meta = {props.meta} version = {props.version} language = {props.language}/>
            <div>
                <Markdown content = {props.content} version = {props.version} language = {props.language}/>
            </div>
            <NextPrevNav meta = {props.meta} version = {props.version} language = {props.language}/>
        </div>

    </div>;
}


function NextPrevNav(props: Verlang & { meta: DocsMeta }): ReactElement {
    const hasPrevious = props.meta.previous;
    const hasNext = props.meta.next;
    return <div className = {`flex select-none ${hasPrevious && hasNext ? `justify-between` : hasNext ? `justify-end` : ``}`}>
        {props.meta.previous ? <div className = {`max-w-48perc`}>

            <Link href = {`/${props.version}/${props.language}/${props.meta.previous.path}`}>

                <a className = {`flex text-gray-800 dark:text-gray-100`}>
                    <div className = {`group flex w-full`}>
                        <div className = "flex inline-block pr-2 mr-0 md:mr-1 border border-gray-500 dark:border-gray-700 bg-white dark:bg-black group-hover:bg-gray-200 dark:group-hover:bg-gray-800">
                            <ChevronLeftIcon className = {`my-auto inline-block w-4 h-4`}/>

                            <span className = "flex-shrink">
                                Previous
                            </span>
                        </div>
                        <span className = {`sr-only md:not-sr-only truncate`}>
                            {props.meta.previous.name}
                        </span>
                    </div>
                </a>

            </Link>

        </div> : <> </>}

        {props.meta.next ? <Link href = {`/${props.version}/${props.language}/${props.meta.next.path}`}>

            <a className = {`flex text-gray-800 dark:text-gray-100`}>

                <div className = {`group flex w-full`}>
                    <span className = {`sr-only md:not-sr-only truncate`}>{props.meta.next.name}</span>
                    <div className = "flex inline-block pl-2 ml-0 md:ml-1 border border-gray-500 dark:border-gray-700 bg-white dark:bg-black group-hover:bg-gray-200 dark:group-hover:bg-gray-800">
                         <span className = "flex-shrink">
                             Next
                         </span>

                        <ChevronRightIcon className = {`my-auto inline-block w-4 h-4`}/>
                    </div>
                </div>
            </a>

        </Link> : <> </>}
    </div>;
}


export default React.memo(PageContent);