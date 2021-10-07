import fs from "fs-extra";
import path from "path";
import lunr from "lunr";
import url from "url";
import { NextApiRequest, NextApiResponse } from "next";
import { SearchDoc } from "../../util/Types";


export default async function search(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const version: string = req.query["v"] as string;
    const lang: string = req.query["lang"] as string;
    const query: string = req.query["q"] as string;
    let limit: number = req.query["limit"] as unknown as number;
    if (!version || !lang || !query) {
        res.status(400).send({
            message: "Requires version (v), language (lang) and query (q), limit (limit) (optional)",
            example: "?v=1.12&lang=en&q=item&limit=5",
            given: {
                version: `${version}`,
                lang: `${lang}`,
                query: `${query}`,
                limit: `${limit}`
            }
        });
        return;
    }
    if (!limit || limit === 0) {
        limit = 5;
    }
    if (query.length < 3) {
        res.status(400).send({ error: "Minimum search query is 3 characters!" });
        return;
    }

    const docsDir = path.join(process.cwd(), "docs");

    const validVersions = fs.readdirSync(docsDir);
    if (validVersions.indexOf(version) === -1) {
        res.status(400).send({ error: `No version found for: '${version}'` });
        return;
    }
    const versionDir = path.join(docsDir, version);
    const validLangs = fs.readdirSync(versionDir);
    if (validLangs.indexOf(lang) === -1) {
        res.status(400).send({ error: `No language found for: '${lang}'` });
        return;
    }
    const langDir = path.join(versionDir, lang);


    const searchIndex = path.join(langDir, "search_index.json");
    const data = fs.readJsonSync(searchIndex);
    const documents: { [key: string]: SearchDoc } = {};
    let index;
    // check if an index is provided first
    if (data.idx) {
        index = lunr.Index.load(data.idx);
        for (let i = 0; i < data.docs.length; i++) {
            const doc = data.docs[i];
            documents[doc.key] = doc;
        }
    } else {
        index = lunr(function () {
            this.field("title");
            this.field("text");
            this.field("location");
            this.ref("key");
            for (let i = 0; i < data.docs.length; i++) {
                const doc = data.docs[i];
                this.add(doc);
                documents[doc.key] = doc;
            }
        });
    }
    // Strip the fuzzyness
    // query.replace(/~\d*/, "");
    // Makes the search a bit more greedy, may need to adjust number in the future
    // query += "~1";
    let results;
    try {
        results = index.search(query);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.log(err);
        res.send({ error: true, count: 1, results: [{ title: "Error While searching", text: err.message }] });
        return;
    }

    const returned = [];
    for (const index in results) {
        if (limit > 0 || limit === -1) {
            if (limit !== -1) {
                limit--;
            }
            const doc = documents[results[index].ref];
            doc.location = url.parse(`/${version}/${lang}${doc.location.startsWith(`/`) ? `` : `/`}${doc.location}`).pathname || "invalid_location";
            returned.push(doc);
        } else {
            break;
        }
    }

    res.send({ count: returned.length, totalCount: results.length, results: returned });
}