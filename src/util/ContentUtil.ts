import { SITE_DEV } from "./EnvUtil";
import path from "path";
import fs from "fs";
import { Nav, Docs, Page, Version, DocsReverseLookup } from "./Types";

export function getBaseDir(): string {
    return process.cwd();
}

export function getDocsDir(): string {
    return path.join(getBaseDir(), SITE_DEV ? `../docs` : `./docs`);
}

export function getVersions(): string[] {

    return fs.readdirSync(getDocsDir()).sort((a, b) => b.localeCompare(a));
}

export function getVersionDir(version: string): string {
    return path.join(getDocsDir(), version);
}

export function getLanguageDir(version: string, language: string): string {
    return path.join(getVersionDir(version), language);
}

export function getContentDir(version: string, language: string): string {
    return path.join(getLanguageDir(version, language), "content");
}

export function getVersion(version: string): Version {

    return {
        version: version,
        languages: getLanguages(version)
    };
}

export function getLanguages(version: string): string[] {
    return fs.readdirSync(getVersionDir(version));
}

export function getVersionAndLanguages(): Version[] {
    return getVersions().map(version => ({
        version,
        languages: getLanguages(version)
    } as Version));
}

export function getDocsJson(version: string, language: string): Docs {
    return JSON.parse(fs.readFileSync(path.join(getLanguageDir(version, language), "docs.json"), "utf-8"));
}

export function getReverseDocsJson(version: string, language: string): DocsReverseLookup {
    return JSON.parse(fs.readFileSync(path.join(getLanguageDir(version, language), "docs_reverse_lookup.json"), "utf-8"));
}

export function collectPages(doc: Nav, done: Page[] = []): Page[] {

    done = done || [];

    for (const docKey in doc) {
        const val = doc[docKey];
        if (typeof val === "object") {
            done = collectPages(val, done);
        } else {
            done.push({ key: docKey, value: val });
        }
    }
    return done;
}