import { Node } from "unist";
import { visit } from "unist-util-visit";
import { Tree } from "util/Types";
import { Plugin } from "unified";

const classNames = {
    table: `markdown-table`,
    td: `markdown-td`,
    th: `markdown-th`,
    tr: `markdown-tr group`,
    thead: `markdown-thead`,
    inlineHeader: "markdown-inline-header",
    content: `markdown-content`
};

export function RemarkTable(): Plugin {
    return function transformer(tree: Node) {

        visit(tree, "table", visitor);


        function setClassName(node: Tree, className: string): void {
            node.data = node.data || {};
            node.data.hProperties = node.data.hProperties || {};
            node.data.hProperties.className = className;
        }

        function visitor(node: Tree) {

            setClassName(node, classNames.table);

            const [thead, ...tbody] = node.children as [thead: Tree, tbody: Tree];
            setClassName(thead, classNames.thead);
            thead.children.forEach(th => {
                setClassName(th, classNames.th);
            });
            tbody.forEach((tr) => {
                setClassName(tr, classNames.tr);
                tr.children.forEach((td: Tree, index: number) => {
                    setClassName(td, classNames.td);
                    if (td.children.length === 0) {


                        td.children = [
                            {
                                type: "text",
                                // Zero width space for the height
                                // @ts-ignore
                                value: "​"
                            }
                        ];
                    }
                    if (!thead.children[index]) {
                        console.error(`Invalid table in file!`);
                        return;
                    }
                    td.children = [
                        {
                            type: "div",
                            children: thead.children[index].children,
                            data: {
                                hProperties: {
                                    className: classNames.inlineHeader
                                }
                            }
                        },
                        {
                            type: "paragraph",
                            children: td.children,
                            data: {
                                hName: "span",
                                hProperties: {
                                    className: classNames.content
                                }
                            }
                        }
                    ];
                });
            });
        }


    };
}