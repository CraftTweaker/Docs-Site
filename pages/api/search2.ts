import url from 'url';
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@elastic/elasticsearch";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
    let version: string = req.query["v"] as string;
    let lang: string = req.query["lang"] as string;
    let query: string = req.query["q"] as string;
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

    const indexName = `docs.blamejared.com-${version}-${lang}`;
    const elastiClient: Client = new Client({ node: 'http://192.168.0.4:9200' })
    if (!await elastiClient.ping().then((value: any) => {
        return Promise.resolve(true);
    }).catch((reason: any) => {
        console.error('Elastisearch: Cannot access the Elastisearch cluster!');
        return Promise.resolve(false);
    })) {
        res.status(500).end({ error: `Error connecting to Elastisearch cluster!` })
        return;
    }

    const indexExists = await elastiClient.indices.exists({ index: indexName });
    if (!indexExists.body) {
        res.status(400).send({ error: `Index: ${indexName} not found!` });
        return;
    }

    let body = {
        size: limit,
        from: 0,
        query: {
            multi_match: {
                query: query,
                fields: ["text", "pageName^10"]
            }
        }
    }

    const results = await elastiClient.search({ index: indexName, body: body, type: 'search' })
        .then((response: any) => {
            let hits = response.body.hits;
            let totalCount = hits.total.value;
            let count = hits.hits.length;
            let results = hits.hits.map((hit: any) => {
                let source = hit._source;
                source.location = url.parse(`/${version}/${lang}${source.location.startsWith(`/`) ? `` : `/`}${source.location}`).pathname;
                return source;
            });
            return Promise.resolve({ totalCount, count, results });
        })
        .catch((err: string) => {
            console.log(err)
            return Promise.resolve(err);
        });


    res.send(results);
}