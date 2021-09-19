import { ParsedUrlQuery } from "querystring";
import { ContainerDirective, DirectiveFields, LeafDirective, TextDirective } from "mdast-util-directive/complex-types";
import { Parent } from "unist";
import { EmbeddedHastFields } from "mdast-util-to-hast/lib";
import { Directive } from "micromark-extension-directive/lib/html";


export interface Verlang {
    version: string;
    language: string;
}

export interface Version {
    version: string;
    languages: string[];
}

export interface Docs {
    nav: Nav;
}

export type DocsReverseLookup = { [key: string]: string[] };

export type Nav = { [key: string]: Nav };

export interface Page {
    key: string;
    value: string;
}

export type ThemeValues = `light` | `dark`;


export interface SlugStaticProps extends ParsedUrlQuery, Verlang {
    slug: string[];
}

export interface SlugPageProps extends Verlang {
    content: string;
    folder: string;
    slug: string;
}

export interface PageContentProps extends Verlang {
    content: string;
}

export interface SideNavProps extends Verlang {
    folder: string;
    slug: string;
}

interface NavProps {
    name: string;
    path: string;
    level: number;
    isCurrent: (path: string) => boolean;
}

export interface SideNavFolderProps extends Verlang, NavProps {
    nav: Nav;
    root: boolean;
    initialOpen?: boolean;
}

export interface SideNavItemProps extends Verlang, NavProps {
    current: boolean;
}

export type DirectiveProps<T extends DirectiveFields> = T

export type Tree = Parent<Tree, EmbeddedHastFields>;
export type DirectiveTree = Parent<DirectiveTree, EmbeddedHastFields> & Directive;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "containerdirective": DirectiveProps<ContainerDirective>;
            "textdirective": DirectiveProps<TextDirective>;
            "leafdirective": DirectiveProps<LeafDirective>;
        }
    }
}