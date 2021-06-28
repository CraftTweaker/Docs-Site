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
import { ReactBaseProps, ReactMarkdownProps, ReactNode } from "react-markdown/src/ast-to-react";

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

function isDark(style: any) {

    switch (style) {
        case a11yDark:
        case agate:
        case anOldHope:
        case androidstudio:
        case atomOneDark:
        case codepenEmbed:
        case darcula:
        case dracula:
        case gml:
        case hopscotch:
        case hybrid:
        case irBlack:
        case isblEditorDark:
        case monokaiSublime:
        case monokai:
        case obsidian:
        case ocean:
        case qtcreatorDark:
        case railscasts:
        case rainbow:
        case solarizedDark:
        case sunburst:
        case vs2015:
        case xt256:
        case zenburn:
            return true;
        default:
            return false;
    }
}

function modifyBrightness(hex: string, isDark: boolean, percent: number): string {

    if (!isDark) {
        percent = -10;
    }
    if (hex === "white") {
        hex = "#FFFFFF";
    }
    if (hex === "black") {
        hex = "#000000"
    }

    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (hex.length == 3) {
        hex = hex.replace(/(.)/g, '$1$1');
    }

    let r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    function getHex(value: number): string {
        if (isDark) {
            return ((0 | (1 << 8) + value + (255 - value) * percent / 100).toString(16)).substr(1);
        }
        return ((0 | (1 << 8) + value + (value) * percent / 100).toString(16)).substr(1);
    }

    return '#' +
        getHex(r) +
        getHex(g) +
        getHex(b);
}

function CodeBlock({ children, className }: CodeBlockProps): JSX.Element {

    let language = (className || "").replace("language-", "").trim();
    const theme = useContext(ThemeContext);
    let [copied, setCopied] = useState(false);
    let hljsStyle = getStyle(theme.hljsStyle === "default" ? theme.pageTheme === `dark` ? "sunburst" : "vs" : theme.hljsStyle);

    return <div className = {``}>
        <SimpleBar forceVisible = {"x"} autoHide = {false}>
            <div className = {`border border-gray-400 dark:border-dark-700 mb-2`}>
                <div className = {`pl-4  flex`}
                     style = {{
                         backgroundColor: modifyBrightness(hljsStyle.hljs.background || "#FFFFFF", isDark(hljsStyle), 10),
                         color: modifyBrightness(hljsStyle.hljs.color || "#000000", isDark(hljsStyle), 10)
                     }}>
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
                        <div className = {`h-full px-2 py-1.5 border-l border-gray-400 dark:border-dark-700 cursor-pointer group`} style = {{
                            backgroundColor: modifyBrightness(hljsStyle.hljs.background || "#FFFFFF", isDark(hljsStyle), 20),
                            color: modifyBrightness(hljsStyle.hljs.color || "#000000", isDark(hljsStyle), 20)
                        }}>
                            <div className = {`flex my-auto gap-x-1 ${copied ? `text-green-600 dark:text-green-500` : `group-hover:text-blue-600 dark:group-hover:text-blue-500`}`}>

                                    <span className = {`cursor-pointer my-auto`}
                                          style = {{ color: !copied ? hljsStyle.hljs.color : undefined }}>

                                        <svg className = {`w-5 h-5 ${!copied ? `group-hover:text-blue-600 dark:group-hover:text-blue-500` : ``}`} fill = "none" stroke = "currentColor"
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
                <SyntaxHighlighter className = {`whitespace-pre-wrap border-t border-gray-400 dark:border-dark-700`}
                                   language = {language}
                                   wrapLongLines = {false}
                                   style = {hljsStyle}
                                   showLineNumbers = {theme.lineNumbers}
                                   customStyle = {{ padding: "1rem" }}
                                   children = {String(children).replace(/\n$/, '')}/>
            </div>
        </SimpleBar>
    </div>
}

export default CodeBlock;