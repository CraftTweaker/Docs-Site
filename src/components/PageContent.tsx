import Markdown from "./markdown/Markdown";
import React, { ReactElement } from "react";
import { PageContentProps } from "../util/Types";

function PageContent(props: PageContentProps): ReactElement {

    return <div className = {`w-full lg:w-content`}>

        <div className = {`w-10/12 lg:w-8/12 mx-auto mb-32`}>

            <div>
                <Markdown content = {props.content} version = {props.version} language = {props.language}/>
            </div>
        </div>

    </div>;
}

export default React.memo(PageContent);