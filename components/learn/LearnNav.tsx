import { LearnSection } from "../../utils/Interfaces";
import React from "react";
import SimpleBar from "simplebar-react";
import Link from "next/link";

export default function LearnNav({ learn, current, version, lang }: { learn: LearnSection[]; current: string[], version: string, lang: string }) {
  return (
    <div className={`h-with-nav w-full md:w-72 bg-gray-200 dark:bg-dark-850 dark:border-dark-500 p-1 dark:text-dark-100`}>
      <SimpleBar className={`h-full`}>
        {learn.map((section) => {
          return (
            <div className={`ml-1`} key={section.name}>
              <h4 className={`text-dark-500 font-bold uppercase`}>{section.name}</h4>
              <div>
                {section.categories.map((category) => {
                  return (
                    <div key={category.slug}>
                      <div className={`inline-block`}>{category.name}</div>
                      <div className={`ml-1`}>
                        {category.concepts.map((concept, index) => {
                          return (
                            <div key={concept.slug} className={`ml-1`}>
                              <Link href={`/${version}/${lang}/learn/${category.slug}/${concept.slug}`}>
                                <a className={`flex`}>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 6.3499998 6.3499998"
                                  >
                                    {index !== category.concepts.length - 1 ? <path
                                      style={{
                                        fill: "none",
                                        stroke: "currentcolor",
                                        strokeWidth: "0.5px",
                                        strokeLinecap: "butt",
                                        strokeLinejoin: "miter"
                                      }}
                                      d="M 3.1747983,1.5885545 V 6.3499999"
                                      id="path62"/> : <></>}
                                    <path
                                      style={{
                                        fill: "none",
                                        stroke: "currentcolor",
                                        strokeWidth: "0.5px",
                                        strokeLinecap: "butt",
                                        strokeLinejoin: "miter"
                                      }}
                                      d="M 3.1747983,4.6610058e-4 V 1.5885545 l 1.5835675,1.5864521 h 1.5926676"
                                      id="path40"/>
                                  </svg>
                                  <span className={`ml-1 ${current[1] === concept.slug ? `text-blue-400` : ``}`}>{concept.name}</span>
                                </a>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </SimpleBar>
    </div>
  );
}
