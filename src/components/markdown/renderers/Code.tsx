import { PropsWithChildren, ReactElement, useState } from "react";
import { ReactMarkdownProps } from "react-markdown/lib/ast-to-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
    const [copied, setCopied] = useState(false);
    return <div className = {`w-full border border-gray-400 dark:border-black`}>
        <div className = {`pl-4 flex bg-gray-250 dark:bg-gray-850 text-gray-950 dark:text-gray-50`}
             style = {{}}>
            <div className = {`flex-grow my-auto`}>
                {language === "zenscript" ? "ZenScript" : language}
            </div>

            <CopyToClipboard
                onCopy = {() => {
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 1000);
                }}

                text = {children.join()}>
                <div className = {`h-full px-2 py-1.5 border-l border-gray-400 dark:border-black cursor-pointer group bg-gray-300 dark:bg-gray-800`}>
                    <div className = {`flex my-auto gap-x-1 ${copied ? `text-green-600 dark:text-green-500` : `group-hover:text-blue-600 dark:group-hover:text-blue-500`}`}>

                                    <span className = {`cursor-pointer my-auto`}>


                                        <svg className = {`w-5 h-5 ${!copied ? `group-hover:text-blue-700 dark:group-hover:text-blue-500` : ``}`} fill = "none" stroke = "currentColor"
                                             viewBox = "0 0 24 24"
                                             xmlns = "http://www.w3.org/2000/svg">
                                            <path strokeLinecap = "round" strokeLinejoin = "round" strokeWidth = {2}
                                                  d = {`M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2${copied ? `m-6 9l2 2 4-4` : ``}`}/>
                                        </svg>
                                    </span> <span>
                                        Copy
                                    </span>
                    </div>
                </div>
            </CopyToClipboard>

        </div>
        <SyntaxHighlighter
            language = {language}
            useInlineStyles = {false}
            className = {`border-t border-gray-400 dark:border-black`}
        >
            {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
    </div>;
}