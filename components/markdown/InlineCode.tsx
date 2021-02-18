import React from "react";
import { HasChildren } from "../../utils/Interfaces";

export default function InlineCode({ children }: HasChildren) {
  return <>
    <code className = {`text-black dark:text-white inline bg-white dark:bg-dark-800 rounded p-1.5 border border-gray-300 dark:border-dark-700`}>
      {children}
    </code>
  </>
}