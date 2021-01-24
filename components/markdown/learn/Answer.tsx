import React from "react";

export default function Answer({ props }: { props: any }) {
  // TODO pass in a callback that is like, check correctness
  console.log(props);
  return <>

        {props.children}
  </>
}