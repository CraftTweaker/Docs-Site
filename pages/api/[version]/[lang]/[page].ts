import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs-extra';
import path from "path";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
    const { version, lang, page } = req.query

    let docsDir = path.join(process.cwd(), 'docs');
    let versionDir = path.join(docsDir, <string>version);
    let langDir = path.join(versionDir, <string>lang);

    let reverseDocs = JSON.parse(fs.readFileSync(path.join(langDir, "docs_reverse_lookup.json"), "utf8"))

    let pageNames = Object.keys(reverseDocs);

    if (typeof page === "string") {
        let found = pageNames.filter(value => value.replace(/\.md/, "").substring(value.lastIndexOf("/") + 1).toLowerCase() === page.toLowerCase());
        if (found.length === 0) {
            res.end(JSON.stringify({ error: "Page not found!" }))
            return;
        }
        res.end(JSON.stringify({ pages: found }));
    } else {
        res.end(JSON.stringify({ error: "Only single pages are supported!" }))
    }
}