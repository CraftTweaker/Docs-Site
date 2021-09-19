import { NextApiRequest, NextApiResponse } from "next";
import { getDocsJson } from "util/ContentUtil";

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
    const { version, language } = req.query as { version: string, language: string };
    let content = {};
    try {
        content = getDocsJson(version, language);
    } catch (e) {
        console.log(e);
    }
    res.json(content)
}