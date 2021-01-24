import fs from "fs-extra";
import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import { Router, useRouter } from "next/router";
import path from "path";
import React, { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import Layout from "../../../../components/layout";
import SideNav from "../../../../components/SideNav";
import { LearnProps, SearchPageQuery } from "../../../../utils/Interfaces";
import { DOCS_DEV, getTheme } from "../../../../utils/Utils";
import LearnNav from "../../../../components/learn/LearnNav";

const Index = ({ theme, version, lang, navs, verlang, parentFolders, learn, current }: LearnProps) => {
  const [showingNav, setShowingNav] = useState(false);
  const router = useRouter();
  const simpleBarRef = useRef(null);
  useEffect(() => {
    // Handles reseting simple bar's position
    const handleRouteChange = () => {
      // @ts-ignore
      simpleBarRef.current?.getScrollElement().scrollTo(0, 0);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
  }, []);

  learn.map((section) => {
    console.log(section);
  });

  return (
    <Layout theme={theme} showingNav={showingNav} setShowingNav={setShowingNav} current={{ key: "Learn", value: "Learn" }}>
      <NextSeo
        title={`Learn - CraftTweaker Documentation`}
        description={`Documentation for the CraftTweaker Minecraft mod, information on how to use the ZenScript language and a central wiki for mods that rely on it.`}
        canonical={`https://docs.blamejared.com/${version}/${lang}/search/`}
        openGraph={{
          type: `website`,
          url: `https://docs.blamejared.com/${version}/${lang}/search/`,
          title: `Search - CraftTweaker Documentation`,
          description: `Documentation for the CraftTweaker Minecraft mod, information on how to use the ZenScript language and a central wiki for mods that rely on it.`,
          images: [
            {
              url: `https://docs.blamejared.com/og_image.png`,
              width: 90,
              height: 92,
              alt: `CraftTweaker logo`,
            },
          ],
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content: `CraftTweaker,CraftTweaker docs,CraftTweaker documentation,CraftTweaker wiki,CraftTweaker mod`,
          },
          {
            property: "charset",
            content: `utf-8`,
          },
        ]}
      />

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
            parentFolders={parentFolders}
          />
          <LearnNav learn={learn} version={version} lang={lang} current={[]}/>
        </div>
        <div className={`w-full md:w-content`}>
          <SimpleBar className={`mx-auto max-h-with-nav w-full`} ref={simpleBarRef}>
            <div className={``}>
              <div className={`w-11/12 md:w-full pt-4 pb-16 px-4 mx-auto dark:text-dark-100`}>
                <div className={`w-5/6 mx-auto`}>
                  <h1 className="text-4xl text-center">Learn</h1>
                  <div className={`flex`}>{/* <div className={`flex-grow bg-red-500`}>Content</div> */}</div>
                </div>
              </div>
            </div>
          </SimpleBar>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  let { pageTheme, hljsStyle } = getTheme(context);

  let { lang, version } = (context.query as unknown) as SearchPageQuery;

  let docsDir = path.join(process.cwd(), "docs");
  let versionDir = path.join(docsDir, version);
  let langDir = path.join(versionDir, lang);
  let docsJsonLocation: string;
  let docsJsonReversedLocation: string;
  let learnJsonLocation: string;

  if (DOCS_DEV) {
    docsJsonLocation = path.join(path.join(process.cwd(), "../"), "docs.json");
    docsJsonReversedLocation = path.join(path.join(process.cwd(), "../"), "docs_reverse_lookup.json");
    learnJsonLocation = path.join(path.join(process.cwd(), "../"), "learn.json");
  } else {
    docsJsonLocation = path.join(langDir, "docs.json");
    docsJsonReversedLocation = path.join(langDir, "docs_reverse_lookup.json");
    learnJsonLocation = path.join(langDir, "learn.json");
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
    versionsInfo = fs.readdirSync(docsDir);
    for (let version of versionsInfo) {
      verlang[version] = fs.readdirSync(path.join(docsDir, version));
    }
  }

  return {
    props: {
      theme: {
        pageTheme,
        hljsStyle,
      },
      version: version,
      lang: lang,
      navs: docs,
      verlang,
      parentFolders: [],
      learn: learn.learn,
      current: "Learn"
    },
  };
}

export default Index;
