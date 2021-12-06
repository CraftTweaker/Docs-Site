import { DirectiveTree } from "../../../util/Types";
import { visit } from "unist-util-visit";
import { Directive } from "micromark-extension-directive/lib/html";
import { Plugin } from "unified";

export default function RemarkDirective(): Plugin {
    return function transformer(tree: DirectiveTree) {
        visit(tree, ["textDirective", "leafDirective", "containerDirective"], visitor);

        function visitor(node: DirectiveTree & Directive) {

            node.data = {
                hName: node.type.toLowerCase(),
                hProperties: { name: node.name, attributes: JSON.stringify(node.attributes) },
                ...node.data
            };
        }
    };
}