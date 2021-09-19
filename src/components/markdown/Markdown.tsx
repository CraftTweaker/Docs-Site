import gfm from "remark-gfm";
import slug from "remark-slug";
import ReactMarkdown from "react-markdown";
import { ReactElement } from "react";
import Code from "components/markdown/renderers/Code";
import Group from "./renderers/custom/Group";
import directive from "remark-directive";
import { ContainerDirective, DirectiveFields, LeafDirective } from "mdast-util-directive/complex-types";
import { DirectiveProps } from "../../util/Types";
import GithubSlugger from "github-slugger";
import { RemarkTable } from "./plugins/RemarkTable";
import RemarkDirective from "./plugins/RemarkDirective";
import Link from "./renderers/Link";
import Heading from "./renderers/Heading";
import RequiredMod from "./renderers/custom/RequiredMod";
import Deprecated from "./renderers/Deprecated";

const directives: Record<string, (props: DirectiveProps<DirectiveFields>, custom: any) => ReactElement> = {
    group(props, custom) {
        return <Group props = {props as DirectiveProps<ContainerDirective>} custom = {custom}/>;
    },
    requiredMod(props) {
        return <RequiredMod props = {props as DirectiveProps<LeafDirective>}/>;
    },
    deprecated(props) {
        return <Deprecated props={props as DirectiveProps<LeafDirective>}/>
    }
};


export default function Markdown(props: { content: string, version: string, language: string }): ReactElement {

    const slugger = new GithubSlugger();

    const linkTarget = (href: string) => {

        if (!href) {
            return ``;
        }
        if (href.startsWith("http") || href.startsWith("#")) {
            return href;
        }
        if (!href.startsWith("/")) {
            return `../${href}`;
        }

        const newUrl = href.startsWith("/") ? href : `/${href}`;
        // if (!image) {
        //     if (!newUrl.endsWith("/")) {
        //         newUrl += "/";
        //     }
        // }
        return `/${props.version}/${props.language}${newUrl}`;
    };


    return <div id = "content" className = "markdown">
        <ReactMarkdown skipHtml = {false} remarkPlugins = {[gfm, RemarkDirective, directive, slug, RemarkTable]} transformLinkUri = {linkTarget} components = {{
            code: Code,
            a: Link,
            h1: Heading,
            h2: Heading,
            h3: Heading,
            h4: Heading,
            h5: Heading,
            h6: Heading,
            containerdirective(props: DirectiveProps<ContainerDirective>) {
                if (!(props.name in directives)) {
                    return <>Invalid container directive! `{props.name}`</>;
                }
                return directives[props.name](props, { headingId: slugger.slug(props.attributes?.name || "") });
            },
            textdirective(props) {
                return <>:{props.name}</>;
            },
            leafdirective(props) {
                if (!(props.name in directives)) {
                    return <>Invalid leaf directive! `{props.name}`</>;
                }

                return directives[props.name](props, { headingId: slugger.slug(props.attributes?.name || "") });
            }
        }}>
            {props.content}
        </ReactMarkdown>
    </div>;
}