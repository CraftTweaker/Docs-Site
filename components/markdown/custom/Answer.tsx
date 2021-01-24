import React from "react";

export default function Answer({ props }: { props: any }) {
  // Just needs to render the answer, the logic is handled in Question.tsx
  return <>
        {props.children}
  </>
}