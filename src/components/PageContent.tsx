import Markdown from "./markdown/Markdown";
import React, {ReactElement} from "react";
import {DocsMeta, PageContentProps, Verlang} from "util/Types";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import Footer from "./Footer";

function PageContent(props: PageContentProps): ReactElement {

    return <div className = "flex-grow w-full flex flex-col">
        <div className = "flex w-full flex-grow">
            <div className = {`w-full lg:w-content flex-grow flex-col`}>
                {/*<div className = "my-2 lg:my-0">*/}
                {/*    <MobileAd/>*/}
                {/*</div>*/}
                <div className = {`w-10/12 lg:w-8/12 mx-auto my-4 mb-32 flex flex-col`}>

                    <NextPrevNav meta = {props.meta} version = {props.version} language = {props.language}/>
                    <div>
                        <Markdown content = {props.content} version = {props.version} language = {props.language}/>
                    </div>
                    <NextPrevNav meta = {props.meta} version = {props.version} language = {props.language}/>
                </div>
            </div>

        </div>
        <Footer/>
    </div>;
}


function NextPrevNav(props: Verlang & { meta: DocsMeta }): ReactElement {
    const hasPrevious = props.meta.previous;
    const hasNext = props.meta.next;
    return <div className = {`flex select-none ${hasPrevious && hasNext ? `justify-between` : hasNext ? `justify-end` : ``}`}>
        {props.meta.previous ? <div className = {`max-w-48perc`}>

            <a className = {`flex text-gray-800 dark:text-gray-100`} href = {`/${props.version}/${props.language}/${props.meta.previous.path}`}>
                <div className = {`group flex w-full`}>
                    <div className = "flex inline-block pr-2 mr-0 md:mr-1 border border-gray-500 dark:border-gray-700 bg-white dark:bg-black group-hover:bg-gray-200 dark:group-hover:bg-gray-800 items-center">
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

        </div> : <> </>}

        {props.meta.next ?

                <a className = {`flex text-gray-800 dark:text-gray-100`} href = {`/${props.version}/${props.language}/${props.meta.next.path}`}>

                    <div className = {`group flex w-full`}>
                        <span className = {`sr-only md:not-sr-only truncate`}>{props.meta.next.name}</span>
                        <div className = "flex inline-block pl-2 ml-0 md:ml-1 border border-gray-500 dark:border-gray-700 bg-white dark:bg-black group-hover:bg-gray-200 dark:group-hover:bg-gray-800 items-center">
                         <span className = "flex-shrink">
                             Next
                         </span>

                            <ChevronRightIcon className = {`my-auto inline-block w-4 h-4`}/>
                        </div>
                    </div>
                </a>

                : <> </>}
    </div>;
}


export default React.memo(PageContent);