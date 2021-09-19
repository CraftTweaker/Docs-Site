import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { getContentDir } from "../../../../util/ContentUtil";

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
    const { version, language, slug } = req.query as { version: string, language: string, slug: string[] };
    let content = "Error getting file!";
    try {
        content = fs.readFileSync(path.join(getContentDir(version, language), ...slug) + ".md", "utf-8");
    } catch (e) {
        console.log(`Cannot build page: ${version}/${language}/${slug.join("/")}`);
        console.log(e)
    }
    res.end(content);
}