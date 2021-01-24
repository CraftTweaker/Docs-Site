import fs from 'fs-extra';
import path from 'path'
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../../components/layout";
import { LearnProps, PageQuery } from "../../../../utils/Interfaces";
import { NextPageContext } from "next";
import { DOCS_DEV, getTheme } from "../../../../utils/Utils";
import { Router } from "next/router";
import SideNav from "../../../../components/SideNav";
import LearnNav from "../../../../components/learn/LearnNav";
import SimpleBar from "simplebar-react";
import Content from "../../../../components/Content";
// import Question from "../../../../components/learn/Question";


const Page = ({ theme, version, lang, current, navs, page, verlang, learn, currentConcept }: LearnProps) => {
  const [showingNav, setShowingNav] = useState(false);
  useEffect(() => {
    setShowingNav(false);
  }, [current]);
  const simpleBarRef = useRef(null);
  useEffect(() => {
    // Handles reseting simple bar's position
    const handleRouteChange = () => {
      // @ts-ignore
      simpleBarRef.current?.getScrollElement().scrollTo(0, 0);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);


  return (
    <Layout theme={theme} showingNav={showingNav} setShowingNav={setShowingNav}
            current={{ key: JSON.stringify(current), value: JSON.stringify(current) }}>

      <div className="flex flex-row">
        <div className={`flex`}>
          <SideNav
            version={version}
            lang={lang}
            navs={navs}
            current={{
              key: "search",
              value: "search",
            }}
            verlang={verlang}
            stub={false}
            showingNav={showingNav}
            parentFolders={[]}
          />
          <LearnNav learn={learn} current={current} lang={lang} version={version}/>
        </div>
        <div className={`w-full md:w-content`}>
          <SimpleBar className={`mx-auto max-h-with-nav w-full`} ref={simpleBarRef}>
            <div className={``}>
              <div className={`w-11/12 md:w-full pt-4 pb-16 px-4 mx-auto dark:text-dark-100`}>
                <div className={`w-5/6 mx-auto`}>
                  <h1 className="text-4xl text-center">Learn</h1>
                  <div className={`flex`}>
                    <Content page={page as string} version={version} lang={lang}/>
                  </div>

                  {/*<Question question={currentConcept.question} key={currentConcept.slug}/>*/}
                </div>
              </div>
            </div>
          </SimpleBar>
        </div>
      </div>

    </Layout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  let { pageTheme, hljsStyle } = getTheme(context);
  let { lang, slug, version } = context.query as unknown as PageQuery;

  if (!slug) {
    slug = ['index']
  }
  let learnDir = path.join(process.cwd(), 'docs');
  let versionDir = path.join(learnDir, version);
  let langDir = path.join(versionDir, lang);
  let dvlDir = path.join(langDir, 'learn');

  let page = path.join(dvlDir, slug.join("/"));
  let learnJsonLocation: string;
  learnJsonLocation = path.join(langDir, "learn.json");

  if (DOCS_DEV) {
    learnDir = path.join(path.join(process.cwd(), '../'), "learn");
    page = path.join(learnDir, slug.join("/"));
    learnJsonLocation = path.join(path.join(process.cwd(), "../"), "learn.json");
  }


  if (context.req && context.res) {
    if (slug[slug.length - 1].indexOf(".") !== -1) {
      context.res.end(fs.readFileSync(page));
      return {
        props: { slug: slug }
      }
    }
    if (!fs.existsSync(page + ".md")) {
      context.res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      context.res.end();
      return {
        props: { none: "" }
      }
    }
  }
  let docsJsonLocation: string;

  if (DOCS_DEV) {
    docsJsonLocation = path.join(path.join(process.cwd(), '../'), "docs.json");
  } else {
    docsJsonLocation = path.join(langDir, "docs.json");
  }

  let docsJson = fs.readFileSync(docsJsonLocation, "utf8");
  let docs = JSON.parse(docsJson)["nav"];

  let learnJson = fs.readFileSync(learnJsonLocation, "utf8");

  let learn = JSON.parse(learnJson);


  let versionsInfo: string[];
  let verlang: any = {};
  if (DOCS_DEV) {
    verlang["0.00"] = ["en"];
  } else {
    versionsInfo = fs.readdirSync(learnDir);
    for (let version of versionsInfo) {
      verlang[version] = fs.readdirSync(path.join(learnDir, version));
    }
  }

  let currentConcept = {};
  for (let learnObj of learn.learn) {
    let categories = learnObj.categories;
    for (let cat of categories) {
      if (cat.slug === slug[0]) {
        for (let concept of cat.concepts) {
          if (concept.slug === slug[1]) {
            currentConcept = concept;
          }
        }
      }
    }
  }

  return {
    props: {
      theme: {
        pageTheme,
        hljsStyle
      },
      version: version,
      lang: lang,
      navs: docs,
      learn: learn.learn,
      current: slug,
      page: fs.readFileSync(page + ".md", 'utf-8'),
      verlang,
      currentConcept
    },
  }
}

export default Page





