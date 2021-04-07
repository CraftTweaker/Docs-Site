import React, { useContext, useState } from "react";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
    a11yDark,
    a11yLight,
    agate,
    androidstudio,
    anOldHope,
    arduinoLight,
    atomOneDark,
    atomOneLight,
    codepenEmbed,
    colorBrewer,
    darcula,
    docco,
    dracula,
    foundation,
    github,
    githubGist,
    gml,
    googlecode,
    hopscotch,
    hybrid,
    irBlack,
    isblEditorDark,
    isblEditorLight,
    magula,
    monoBlue,
    monokai,
    monokaiSublime,
    obsidian,
    ocean,
    purebasic,
    qtcreatorDark,
    qtcreatorLight,
    railscasts,
    rainbow,
    routeros,
    solarizedDark,
    solarizedLight,
    sunburst,
    vs,
    vs2015,
    xcode,
    xt256,
    zenburn
} from 'react-syntax-highlighter/dist/cjs/styles/hljs/index';
import SimpleBar from "simplebar-react";
import { ThemeContext } from "../layout";
import zenscript from 'highlightjs-zenscript';
import { CodeBlockProps } from "../../utils/Interfaces";

SyntaxHighlighter.registerLanguage('zenscript', zenscript);


export function listStyles(): any {
    return {
        a11yDark, a11yLight, agate, anOldHope,
        androidstudio, arduinoLight, atomOneDark, atomOneLight,
        codepenEmbed, colorBrewer, darcula, docco,
        dracula, foundation, githubGist, github,
        gml, googlecode, hopscotch, hybrid,
        irBlack, isblEditorDark, isblEditorLight,
        magula, monoBlue, monokaiSublime, monokai,
        obsidian, ocean, purebasic, qtcreatorDark,
        qtcreatorLight, railscasts, rainbow, routeros,
        solarizedDark, solarizedLight, sunburst, vs,
        vs2015, xcode, xt256, zenburn
    };
}

function getStyle(name: string): any {
    return listStyles()[name];
}

function CodeBlock({ language, value }: CodeBlockProps) {

    const theme = useContext(ThemeContext);

    let [copied, setCopied] = useState(false);
    let hljsStyle = getStyle(theme.hljsStyle === "default" ? theme.pageTheme === `dark` ? `a11yDark` : `a11yLight` : theme.hljsStyle);
    return (<div className = {`relative group`}>
            <SimpleBar forceVisible = {"x"} autoHide = {false} direction = {'x'}>
                <div className = {`group`}>
                    <SyntaxHighlighter className = {`whitespace-pre-wrap border border-gray-400 dark:border-dark-700`} language = {language} style = {hljsStyle} showLineNumbers = {theme.lineNumbers}>
                        {value}
                    </SyntaxHighlighter>

                </div>

            </SimpleBar>
            <div className = {`absolute right-0 -top-5 px-1 border-l border-t border-r border-gray-400 dark:border-dark-700 dark:bg-dark-150 bg-dark-850 ${!copied ? `hidden` : ``} group-hover:block`} style = {{ backgroundColor: hljsStyle.hljs.background }}>
                <div className = {`flex flex-col gap-y-1`}>

                    <CopyToClipboard
                        onCopy = {() => {
                            setCopied(true);
                            setTimeout(() => {
                                setCopied(false);
                            }, 1000);
                        }}

                        text = {value}>

              <span className = {`${copied ? `text-green-500` : `hover:text-blue-500`} w-5 cursor-pointer`} style = {{ color: !copied ? hljsStyle.hljs.color : undefined }}>
                {copied ? <svg className = "w-5 h-5" fill = "none" stroke = "currentColor" viewBox = "0 0 24 24" xmlns = "http://www.w3.org/2000/svg">
                    <path strokeLinecap = "round" strokeLinejoin = "round" strokeWidth = {2} d = "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg> : <svg className = "w-5 h-5" fill = "none" stroke = "currentColor" viewBox = "0 0 24 24" xmlns = "http://www.w3.org/2000/svg">
                    <path strokeLinecap = "round" strokeLinejoin = "round" strokeWidth = {2} d = "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                }
              </span>

                    </CopyToClipboard>

                </div>
            </div>
        </div>
    );
}

export default CodeBlock;