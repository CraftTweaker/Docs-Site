import React from "react";
import { HasChildren } from "../../utils/Interfaces";

export default function InlineCode({ children }: HasChildren) {
  return <>
    <code className = {`text-black dark:text-white inline bg-gray-200 dark:bg-dark-800 rounded p-1.5 border border-gray-400 dark:border-dark-700`}>
      {children}
    </code>
  </>
}