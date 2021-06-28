import React, { PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";
import Clink from "./markdown/Clink";
import CodeBlock from "./markdown/CodeBlock";
import InlineCode from "./markdown/InlineCode";
import Table from "./markdown/Table";
import TableCell from "./markdown/TableCell";
import Heading from "./markdown/Heading";
import { ContentProps } from "../utils/Interfaces";
import directive from 'remark-directive'
// @ts-ignore
import normalizeHeadings from 'remark-normalize-headings';
import gfm from 'remark-gfm';
import Question from "./markdown/custom/Question";
import Answer from "./markdown/custom/Answer";
import RequiredMod from "./markdown/custom/RequiredMod";
import Group from "./markdown/custom/Group";
// @ts-ignore
import slug from 'remark-slug';
// @ts-ignore
import GithubSlugger from 'github-slugger';
import rehypeRaw from "rehype-raw";
import visit from "unist-util-visit";
import Deprecated from "./markdown/custom/Deprecated";

const directives: any = {
    question: (props: PropsWithChildren<any>, custom: any) => {
        return <Question props = {props}/>
    },
    answer: (props: PropsWithChildren<any>, custom: any) => {
        return <Answer props = {props}/>
    },
    requiredMod: (props: PropsWithChildren<any>, custom: any) => {
        return <RequiredMod props = {props}/>
    },
    group: (props: PropsWithChildren<any>, custom: any) => {
        return <Group props = {props} custom = {custom}/>;
    },
    deprecated: (props: PropsWithChildren<any>, custom: any) => {
        return <Deprecated props = {props}/>
    }
}

function reactMarkdownRemarkDirective() {
    return (tree: unknown) => {
        visit(
            // @ts-ignore
            tree,
            ["textDirective", "leafDirective", "containerDirective"],
            (node) => {

                node.data = {
                    hName: node.type.toLowerCase(),
                    // @ts-ignore
                    hProperties: {directiveName: node.name, ...node.attributes} ,
                    ...node.data
                };
                return node;
            }
        );
    };
}

export default function Content({ version, lang, page }: ContentProps) {

    const slugger = new GithubSlugger()

    function transform(url: string, image: boolean) {
        if (!url) {
            return ``;
        }
        if (url.startsWith("http")) {
            return url;
        }
        if (url.startsWith("#")) {
            return url;
        }
        if (!url.startsWith("/")) {
            return `../${url}`;
        }

        let newUrl = url.startsWith("/") ? url : `/${url}`;
        if (!image) {
            if (!newUrl.endsWith("/")) {
                newUrl += "/";
            }
        }
        return `/${version}/${lang}${newUrl}`;
    }

    const linkReferenceRenderer: (reference: any) => (string | any) = (reference: any) => {
        if (!reference.href) {
            if (!reference.children.length) {
                return `[][]`;
            }
            return <>[{reference.children}]</>;
        }
        return `[][]`
    };

    return <>
        <div id = "content" className = "markdown">
            <ReactMarkdown children = {page} skipHtml = {false} components = {{
                code: (props) => {
                    return props.inline ? <InlineCode {...props} children = {props.children}/> : <CodeBlock {...props} children = {props.children}/>
                },
                table: Table,
                td: (props) => {
                    return <TableCell {...props} children = {props.children}/>
                },
                th: (props) => {
                    return <TableCell {...props} children = {props.children}/>
                },
                a: ({ href, children }: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
                    return <Clink href = {href || ""} children = {children}/>
                },
                h1: (props) => {
                    return <Heading children = {props.children} level = {props.level} node = {props.node}/>;
                },
                h2: (props) => {
                    return <Heading children = {props.children} level = {props.level} node = {props.node}/>;
                },
                h3: (props) => {
                    return <Heading children = {props.children} level = {props.level} node = {props.node}/>;
                },
                h4: (props) => {
                    return <Heading children = {props.children} level = {props.level} node = {props.node}/>;
                },
                h5: (props) => {
                    return <Heading children = {props.children} level = {props.level} node = {props.node}/>;
                },
                h6: (props) => {
                    return <Heading children = {props.children} level = {props.level} node = {props.node}/>;
                },
                //@ts-ignore
                containerdirective: (props) => {
                    if (!directives.hasOwnProperty(props.directiveName)) {
                        return <>Invalid container directive! `{props.directiveName}`</>
                    }
                    return directives[props.directiveName](props, { headingId: slugger.slug(props.name) });
                },
                //@ts-ignore
                textdirective: props => {
                    // This feels super scuffed, will need to monitor it to make sure it is fine
                    return <>:{props.directiveName}</>;
                },
                //@ts-ignore
                leafdirective: props => {
                    if (!directives.hasOwnProperty(props.directiveName)) {
                        return <>Invalid leaf directive! `{props.directiveName}`</>
                    }

                    return directives[props.directiveName](props, { headingId: slugger.slug(props.name) });
                }
            }} transformLinkUri = {uri => transform(uri, false)} transformImageUri = {uri => transform(uri, true)} rehypePlugins = {[rehypeRaw]} remarkPlugins = {[gfm, reactMarkdownRemarkDirective, directive, normalizeHeadings, slug]}/>
        </div>
    </>
}
