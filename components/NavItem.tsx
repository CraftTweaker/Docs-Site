import Link from "next/link";
import React from "react";
import { NavItemProps } from "../utils/Interfaces";

export default function NavItem({ version, lang, path, selected, nav, level }: NavItemProps) {
  return <>
    <Link href = {`/[version]/[lang]/[...slug]`} as = {`/${version}/${lang}/${path}/`} key = {`/${version}/${lang}/${path}`}>

      <a key = {`/${version}/${lang}/${path}`} style = {{ paddingLeft: `${level + 1}rem` }} className = {`pr-2 py-1 block select-none ${selected ? `bg-blue-900 text-white` : `hover:bg-gray-400 dark-hover:bg-dark-700`}`}>{nav.replace("&#58;", ":")}</a>

    </Link>
  </>
}
