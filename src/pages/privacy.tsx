import {Version} from "util/Types";
import {PropsWithChildren, ReactElement} from "react";
import Layout from "../components/Layout";
import {NextSeo} from "next-seo";
import Footer from "../components/Footer";

interface Props {
    title: string;
    multi?: boolean;
}

function Item({title, children, multi = false}: PropsWithChildren<Props>) {
    const id = title.toLocaleLowerCase().replace(/\s/g, "-").replace(/\?/, "");
    return (
            <div>
                <h2><a id = {id} href = {`#${id}`}>{title}</a></h2>

                {multi ? <> {children}</> : <p>{children}</p>}
            </div>
    );
}

function SmallItem({title, children, multi = false}: PropsWithChildren<Props>) {
    const id = title.toLocaleLowerCase().replace(/\s/g, "-").replace(/\?/, "");
    return (
            <div>
                <h3><a id = {id} href = {`#${id}`}>{title}</a></h3>

                {multi ? <> {children}</> : <p>{children}</p>}
            </div>
    );
}

export default function Privacy(props: { version: Version, versions: string[] }): ReactElement {

    return <Layout pageKey = "privacy" slug = "privacy"> <NextSeo
            title = {`CraftTweaker Documentation - Privacy`}
            description = {`Documentation for the CraftTweaker Minecraft mod, information on how to use the ZenScript language and a central wiki for mods that rely on it.`}
            canonical = {`https://docs.blamejared.com/`}
            openGraph = {{
                type: `website`,
                url: `https://docs.blamejared.com/`,
                title: `CraftTweaker Documentation`,
                description: `Documentation for the CraftTweaker Minecraft mod, information on how to use the ZenScript language and a central wiki for mods that rely on it.`,
                images: [
                    {
                        url: `https://docs.blamejared.com/og_image.png`,
                        width: 90,
                        height: 92,
                        alt: `CraftTweaker logo`
                    }
                ]
            }}
            additionalMetaTags = {[{
                property: "keywords",
                content: `CraftTweaker,CraftTweaker docs,CraftTweaker documentation,CraftTweaker wiki,CraftTweaker mod`
            }, {
                property: "charset",
                content: `utf-8`
            }]}
    /> <span data-ccpa-link = "1" className = "text-2xl text-center mx-auto underline"></span>
        <div className = "mx-auto max-w-prose prose prose-invert pt-4">


            <h1 className = "text-white text-3xl font-semibold font-brand border-b-2 tracking-wide mb-4 pb-4">
                Privacy Policy
            </h1>

            <p>
                This privacy policy applies to the CraftTweaker Documentation site, our website docs.blamejared.com, and other related services
                operated by us that link back to this policy. We reserve the right to revise, modify, and amend this policy at any time and in any
                manner.
            </p>
            <Item title = "Contact"> If you have any questions or concerns about our privacy policy or our related services you may contact us on
                our <a className = "link" href = "https://discord.blamejared.com" target = {`_blank`} rel = {`noopener noreferrer`}> Discord</a> server
            </Item>


            <Item title = "Personal Data"> In order to provide this service we collect personal data from users. We will only collect data that is
                necessary to provide a feature or service, including the continued maintenance and operation of this website. This data will be
                stored, processed, and shared as outlined in this privacy policy. </Item>

            <Item title = "Data Types" multi = {true}><p>We classify personal data into the following categories.</p>
                <SmallItem title = "Necessary Data"> We collect personal data as a natural consequence of providing a feature or service. For example,
                    our access logs may store IP addresses and the requests you make to our servers. We may also use cookies to store user
                    preferences. </SmallItem> <SmallItem title = "Processed Data"> Personal data that we collect may be processed to produce
                    anonymized aggregate data. For example we may use IP addresses and user agents to calculate the number of unique users based on
                    approximate geographical area. Another example would be tracking page views for different pages on the website. This data has been
                    depersonalized and can not be linked to an individual user. </SmallItem>

                <SmallItem title = "Third Party Data"> We integrate third party services that are governed by their own privacy policies. These third
                    party services operate independently and may collect and process personal data without our input or oversight. You can learn more
                    about these third party services in our detailed information section. </SmallItem> </Item>

            <Item title = "Retention Time" multi = {true}>
                <p>
                    We only retain personal data for the duration of time necessary to provide the related features and services unless a longer
                    retention period is required. A longer retention period may be required in the following situations.
                </p>
                <li>
                    Complying with legal or regulatory requirements.
                </li>
                <li>
                    Preventing fraud or abuse.
                </li>
                <li>
                    Financial record keeping.
                </li>
            </Item>

            <Item title = "Child Privacy"> We do not knowingly collect information from children under the age of 13. Children under the age of 13 are
                prohibited from using our services. If you learn that a child has provided us with personal information in violation of this policy
                you can alert us using a listed contact method. </Item>

            <Item title = "Sale & Transfer"> Personal data collected by this website will not be sold to third parties. In some cases we may share
                personal data with third parties when necessary to provide a feature or service. We may also share anonymized aggregate data which has
                been stripped of all personally identifying information and can not be linked to an individual user in any reasonable capacity. Third
                parties are subject to their own privacy policies. </Item>

            <Item title = "Detailed Data Usage" multi = {true}> <SmallItem title = "Analytics & Usage Data"> This website tracks a number of
                analytical data points. This data is used to help us monitor the platform for issues or abuse. This information may also be processed
                to create anonymized statistics that we use to improve or market our services. This data includes IP addresses, user agents, pages
                viewed, and activity timestamps. </SmallItem>

                <SmallItem title = "Google Services"> This website uses a number of services offered by Google. For example, we may embed a YouTube
                    video as part of our documentation on a project. We may also use Google Analytics to help monitor our site traffic. The Google
                    services are bound by Google's <a className = "link" href = "https://policies.google.com/privacy">privacy policy</a>. </SmallItem>

                <SmallItem title = "Discord"> This website uses Discord as the central hub for communication, discussion, and support. We may process
                    data from Discord to monitor and gauge activity over time. Discord is a third party service and is bound by their
                    own <a className = "link" href = "https://discord.com/privacy">privacy policy</a>. </SmallItem>

                <SmallItem title = "Cloudflare"> This website uses many Cloudflare services to improve the security and reliability of our services.
                    For example we use Cloudflare to cache and proxy our traffic which protects our servers from malicious attacks while improving the
                    general availability of our services. We also use Cloudflare to manage and provide our DNS records and manage our HTTPS
                    certificates. Cloudflare is bound by their <a className = "link" href = "https://www.cloudflare.com/en-ca/privacypolicy/">privacy
                        policy</a>. </SmallItem>

                <SmallItem title = "Github"> We use GitHub to host and manage the source for our services. GitHub is bound by
                    their <a className = "link" href = "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">privacy
                        policy</a>. </SmallItem>

                <SmallItem title = "Nitro"> This website uses Nitro to serve advertisements. Nitro is a third party service and is bound by their
                    own <a className = "link" href = "https://nitropay.com/privacy">privacy policy</a>. </SmallItem>

                <SmallItem title = "CurseForge"> We use CurseForge to host our Minecraft projects. Data, services, and downloads from CurseForge may
                    be embedded to enhance the user experience. CurseForge is owned and operated by Overwolf and is subject to
                    their <a className = "link" href = "https://www.overwolf.com/legal/privacy/">privacy policy</a>. </SmallItem>

                <SmallItem title = "Modrinth"> We use Modrinth to host our Minecraft projects. Data, services, and downloads from Modrinth may be
                    embedded to enhance the user experience. Modrinth is owned and operated by Rinth, Inc. and is subject to
                    their <a className = "link" href = "https://modrinth.com/legal/privacy">privacy policy</a>. </SmallItem>

            </Item>
        </div>
        <Footer/> </Layout>
}