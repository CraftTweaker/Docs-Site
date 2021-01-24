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

import visit from 'unist-util-visit'
import h from 'hastscript'

import gfm from 'remark-gfm';
import Question from "./markdown/learn/Question";
import Answer from "./markdown/learn/Answer";


const directives: any = {
  question: (props: PropsWithChildren<any>) => {
    return <Question props={props}/>
  },
  answer: (props: PropsWithChildren<any>) => {
    return <Answer props={props}/>
  }
}

export default function Content({ version, lang, page }: ContentProps) {

  let headingId = { current: 0 }

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

  // This plugin is just an example! You can handle directives however you please!
  function htmlDirectives() {
    return transform

    function transform(tree: any) {
      console.log(">>>");
      console.log(tree);
      visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], ondirective)
    }

    function ondirective(node: any) {
      var data = node.data || (node.data = {})
      var hast = h(node.name, node.attributes)

      data.hName = hast.tagName
      data.hProperties = hast.properties
    }
  }

  return <>
    <div id="content" className="markdown pb-3 w-full">
      <ReactMarkdown source={page} escapeHtml={false} renderers={{
        code: CodeBlock,
        inlineCode: InlineCode,
        linkReference: linkReferenceRenderer,
        table: Table,
        tableCell: TableCell,
        link: Clink,
        heading: (props) => {
          headingId.current = headingId.current + 1;
          return Heading(props, headingId.current);
        },
        containerDirective: (props) => {
          if(!directives.hasOwnProperty(props.name)){
            return <>Invalid container directive! `{props.name}`</>
          }
          return directives[props.name](props);
        },
        textDirective: props => {
          if(!directives.hasOwnProperty(props.name)){
            return <>Invalid text directive! `{props.name}`</>
          }
          return directives[props.name](props);
        },
        leafDirective: props => {
          if(!directives.hasOwnProperty(props.name)){
            return <>Invalid leaf directive! `{props.name}`</>
          }
          return directives[props.name](props);
        }
      }} transformLinkUri={uri => transform(uri, false)} transformImageUri={uri => transform(uri, true)} plugins={[gfm, directive]}/>
    </div>
  </>
}
