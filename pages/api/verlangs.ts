import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs-extra';
import path from "path";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
    let verlangs: any = {};
    let docsDir = path.join(process.cwd(), 'docs');

    fs.readdirSync(docsDir).forEach(version => {
        let langauges: string[] = [];
        fs.readdirSync(path.join(docsDir, version)).forEach(language => {
            langauges.push(language);
        })
        verlangs[version] = langauges;
    })

    res.end(JSON.stringify(verlangs));
}