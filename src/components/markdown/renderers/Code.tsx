import { PropsWithChildren, ReactElement } from "react";
import { ReactMarkdownProps } from "react-markdown/lib/ast-to-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import zenscript from "highlightjs-zenscript";

SyntaxHighlighter.registerLanguage("zenscript", zenscript);

type CodeProps = JSX.IntrinsicElements["code"]
    & ReactMarkdownProps
    & { inline?: boolean }

export default function Code(props: CodeProps): ReactElement {

    return props.inline ? <InlineCode {...props}/> : <CodeBlock {...props}/>;
}

export function InlineCode(props: PropsWithChildren<unknown>): ReactElement {

    return <code className = {`break-words text-black dark:text-white bg-gray-950 bg-opacity-[0.10] dark:bg-gray-100 dark:bg-opacity-[0.15] p-1 border border-white dark:border-black`}>
        {props.children}
    </code>;
}


function CodeBlock({ children, className }: CodeProps): ReactElement {
    const language = (className || "").replace("language-", "").trim();
    return <div className = {`w-full border border-gray-400 dark:border-black`}>
        <SyntaxHighlighter
            language = {language}
            useInlineStyles = {false}
        >
            {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
    </div>;
}