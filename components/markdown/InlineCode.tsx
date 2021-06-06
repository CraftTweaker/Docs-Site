import React from "react";
import { HasChildren } from "../../utils/Interfaces";

export default function InlineCode({ children }: HasChildren) {
  return <>
    <code className = {`text-black dark:text-white inline bg-white dark:bg-dark-950 rounded px-2 py-1 border border-gray-300 dark:border-dark-700`}>
      {children}
    </code>
  </>
}