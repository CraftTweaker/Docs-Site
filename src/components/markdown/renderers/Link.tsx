import React from "react";
import { default as NextLink } from "next/link";

export default function Link(props: React.AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element {
    const href = props.href || "";
    const children = props.children;
    if (href.startsWith("http")) {
        return <a className = {`link`} href = {href} target = {`_blank`} rel = {`noopener noreferrer`}>
            {children}
        </a>;
    }
    if (href.startsWith("#")) {
        return <a className = {`link`} href = {href}>
            {children}
        </a>;
    }
    return (
        <NextLink href = {`/[version]/[lang]/[...slug]`} as = {href}>

            <a className = {`link`}>
                {children}
            </a>

        </NextLink>
    );
}