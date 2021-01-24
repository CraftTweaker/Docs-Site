import React from "react";

export default function RequiredMod({ props }: { props: any }) {
  if (!props.attributes.hasOwnProperty("buildIn")) {
    return <div className={`bg-red-500 border-2 border-red-500 rounded p-4 bg-opacity-25 my-2`}>
      <p>
        "buildIn" property missing from requiredMods!
      </p>
      <div className={`flex flex-col gap-y-1`}>
        {Object.keys(props.attributes).map(key => {
          return <p>"{key}": "{props.attributes[key]}"</p>;
        })}
      </div>
    </div>
  }
  let buildIn: boolean = props.attributes.buildIn === "true";
  let modLink: string = props.attributes.modLink ?? ``
  let requiredMod: string = props.attributes.requiredMod ?? ``;
  let requiredModLink: string = props.attributes.requiredModLink ?? ``;

  let bgClass = buildIn ? `bg-teal-500` : `bg-red-500`;
  let borderClass = buildIn ? `border-teal-500` : `border-red-500`;


  return <>
    <div className={`${bgClass} border-2 ${borderClass} rounded p-4 bg-opacity-25 my-2`}>
      {buildIn ? <div className={`flex gap-x-1`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
        </svg>
        {modLink.length > 0 ? <a className={`font-semibold`} href={modLink}> {props.children}</a> :
          <span className={`font-semibold`}> {props.children}</span>}
        has build in mod support! You don't need any other mods for this to work!
      </div> : <div className={`flex gap-x-1`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        {modLink.length > 0 ? <a className={`font-semibold`} href={modLink}> {props.children}</a> :
          <span className={`font-semibold `}> {props.children}</span>}
        does not does have build in Mod support, you will need {requiredModLink.length > 0 ?
        <a className={`font-semibold`} href={requiredModLink}> {requiredMod}</a> :
        <span className={`font-semibold`}> {requiredMod}</span>} for this to work!
      </div>}


    </div>
  </>
}