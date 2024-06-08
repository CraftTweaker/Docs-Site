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
                <ul>
                    <li>
                        Complying with legal or regulatory requirements.
                    </li>
                    <li>
                        Preventing fraud or abuse.
                    </li>
                    <li>
                        Financial record keeping.
                    </li>
                </ul>
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

            <Item title = "For California Residents: CCPA Information" multi = {true}>

                <SmallItem title = "Rights and Choices"> The CCPA provides consumers located in the state of California with certain rights regarding
                    their personal information and data. The following section describes those rights and explains how to exercise them: </SmallItem>

                <SmallItem title = "Access to Specific Information and Data Portability Rights" multi = {true}>
                    <p>
                        You have the right to request that the company disclose certain information to you about our collection and use of your
                        personal information over the past 12 months. Once we receive and confirm your verifiable consumer request (as described in
                        the section "Exercising Access, Data Portability, and Deletion Rights"), we will disclose to you:
                    </p>
                    <ul>
                        <li>The categories of personal information we collected about you.</li>
                        <li>The categories of sources for the personal information we collected about you.</li>
                        <li>Our business or commercial purpose for collecting or selling that personal information.</li>
                        <li>The categories of third parties with whom we share that personal information.</li>
                        <li>The specific pieces of personal information we collected about you (also called data portability request)</li>
                        <li>If we sold or disclose your personal information for a business purpose, two separate lists disclosing:
                            <ul>
                                <li>Sales, identifying the personal information categories that each category of recipient purchased, and</li>
                                <li>Disclosures for a business purpose, identifying the personal information categories that each category of
                                    recipient obtained
                                </li>
                            </ul>
                        </li>

                    </ul>
                </SmallItem>

                <SmallItem title = "Non-Discrimination" multi = {true}>
                    <p>We will not discriminate against you for exercising any of your CCPA rights. Unless permitted by the CCPA, we will not:</p>
                    <ul>
                        <li>Deny you goods or services.</li>
                        <li>Charge you different prices or rates for goods or services, including through granting discounts or imposing penalties.
                        </li>
                        <li>Provide you a different level or quality of goods or services.</li>
                        <li>Suggest that you may receive a different price or rate for goods or services or a different level of quality of goods or
                            services.
                        </li>
                    </ul>
                    <p>Any CCPA-permitted financial incentive we offer will reasonably relate to your value and contain written terms that describe
                        the program’s material aspects.</p>
                </SmallItem>

                <SmallItem title = "Exercising Access, Data Portability, and Deletion Rights" multi = {true}>
                    <p>To exercise the access, data portability, and deletion rights described above, please submit a verifiable consumer request to
                        us by emailing us at <a href = "mailto:jluboff8@gmail.com">jluboff8@gmail.com</a></p>
                    <p>Only you, or a person registered with the California Secretary of State that you authorize to act on your behalf, may make a
                        verifiable consumer request related to your personal information. You may also make a verifiable consumer request on behalf of
                        your minor child.</p>
                    <p>You may only make a verifiable consumer request for access of data portability twice within a 12-month period. The verifiable
                        consumer request must:</p>
                    <ul>
                        <li>Provide sufficient information that allows us to reasonably verify you are the person about whom we collected personal
                            information or an authorized representative.
                        </li>
                        <li>Describe your request with sufficient detail that allows us to properly understand, evaluate, and respond to it.</li>
                    </ul>
                    <p>We cannot respond to your request or provide you with personal information if we cannot verify your identity or authority to
                        make the request and confirm the personal information relates to you.</p>
                    <p>Making a verifiable consumer request does not require you to create an account with us. We will only use personal information
                        provided in a verifiable consumer request to verify the requestor’s identity or authority to make the request.</p>
                </SmallItem>

                <SmallItem title = "Information We Collect" multi = {true}>

                    <p>Our websites, emails (with your consent, where required by law), and other products, services and platforms collect information
                        that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked,
                        directly or indirectly, with a particular consumer or device (“personal information”). In particular, our websites, apps,
                        emails, and other products, services and platforms may have collected the following categories of personal information from
                        its consumers within the last twelve (12) months:</p>

                    <table>
                        <thead>
                        <tr>
                            <th>Category</th>
                            <th>Collected</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>A. Identifiers</td>
                            <td>YES</td>
                        </tr>
                        <tr>
                            <td>B. Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e))
                            </td>
                            <td>YES</td>
                        </tr>
                        <tr>
                            <td>C. Protected classification characteristics under California or federal law</td>
                            <td>NO</td>
                        </tr>
                        <tr>
                            <td>D. Commercial information.</td>
                            <td>YES</td>
                        </tr>
                        <tr>
                            <td>E. Biometric information.</td>
                            <td>NO</td>
                        </tr>
                        <tr>
                            <td>F. Internet or other similar network activity.</td>
                            <td>YES</td>
                        </tr>
                        <tr>
                            <td>G. Geolocation data.</td>
                            <td>YES</td>
                        </tr>
                        <tr>
                            <td>H. Sensory data.</td>
                            <td>NO</td>
                        </tr>
                        <tr>
                            <td>I. Professional or employment-related information.</td>
                            <td>NO</td>
                        </tr>
                        <tr>
                            <td>J. Inferences drawn from other personal information.</td>
                            <td>YES</td>
                        </tr>
                        </tbody>
                    </table>

                    <p>Personal information does not include:</p>
                    <ul>
                        <li>Publicly available information from government records.</li>
                        <li>Deidentified or aggregated consumer information.</li>
                        <li>Information excluded from the CCPA’s scope, like:
                            <ul>
                                <li>health or medical information covered by the Health Insurance Portability and Accountability Act of 1996 (HIPAA)
                                    and the California Confidentiality of Medical Information Act (CMIA) or clinical trial data;
                                </li>
                                <li>personal information covered by certain sector-specific privacy laws, including the Fair Credit Reporting Act
                                    (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California Financial Information Privacy Act (FIPA), and the Driver’s
                                    Privacy.
                                </li>
                            </ul>
                        </li>

                    </ul>

                </SmallItem>

                <SmallItem title = "Use of Personal Information">

                    <p>We may use or disclose the personal information we collect for one or more of the following business purposes:</p>


                    <ul>
                        <li>To fulfill or meet the reason you provided the information. For example, if you share your name and contact information to
                            request a newsletter or ask a question about our products or services, we will use that personal information to respond to
                            your inquiry. If you provide your personal information to purchase a product or service, we or our third-party service
                            providers will use that information to process your payment and facilitate delivery. We may also save your information to
                            facilitate new product or service orders and requests.
                        </li>
                        <li>To provide, support, personalize, and develop our websites, emails, and other products, services and platforms.</li>
                        <li>To create, maintain, customize, and secure your account with us.</li>
                        <li>To process your requests, purchases, transactions, and payments and prevent transactional fraud.</li>
                        <li>To provide you with support and to respond to your inquiries, including investigating and addressing your concerns and
                            monitoring and improving our responses.
                        </li>
                        <li>To personalize your website, apps, emails, or other product, service or platform experience and to deliver content and
                            product and service offerings relevant to your interests, including targeted offers and ads through our websites, apps,
                            emails, and other products, services and platforms.
                        </li>
                        <li>To help maintain the safety, security, and integrity of our websites, apps, emails, and other products, services and
                            platforms, databases and other technology assets, and business.
                        </li>
                        <li>For testing, research, analysis, and product development, including to develop and improve our websites, apps, emails, and
                            other products, services and platforms.
                        </li>
                        <li>To respond to law enforcement requests and as required by applicable law, court order, or governmental regulations.</li>
                        <li>As described to you when collecting your personal information or as otherwise set forth in the CCPA.</li>
                        <li>To evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of
                            some or all of the Company’s assets, whether as a going concern or as part of bankruptcy, liquidation, or similar
                            proceeding, in which personal information held by the Company about our Website users is among the assets transferred.
                        </li>
                    </ul>

                    <p>
                        The Company will not collect additional categories of personal information or use the personal information we collected for
                        materially different, unrelated, or incompatible purposes without providing you notice.
                    </p>

                </SmallItem>

                <SmallItem title = "Sharing Personal Information" multi = {true}>
                    <p>The Company may disclose your personal information to a third-party for a business purpose or sell your personal information,
                        subject to your right to opt-out of those sales (see ‘Sales of Personal Information’ below). When we disclose personal
                        information for a business purpose, we enter a contract that describes the purpose and requires the recipient to both keep
                        that personal information confidential and not use it for any purpose except performing the contract. The CCPA prohibits third
                        parties who purchase the personal information we hold from reselling it unless you have received explicit notice and an
                        opportunity to opt-out of further sales (see ‘Sales of Personal Information’ below).</p>

                    <p>We may share your personal information with the following categories of third parties:</p>

                    <ul>
                        <li>Subsidiaries and affiliates.</li>
                        <li>Contractors and service providers.</li>
                        <li>Data aggregators.</li>
                        <li>Third parties with whom we partner to offer products and services to you.</li>
                    </ul>
                </SmallItem>

                <SmallItem title = "Disclosures of Personal Information for a Business Purpose" multi = {true}>
                    <p>In the preceding twelve (12) months, the Company has disclosed the following categories of personal information for a business
                        purpose:</p>

                    <ul>
                        <li>[Category A: Identifiers.]</li>
                        <li>[Category B: California Customer Records personal information categories.]</li>
                        <li>[Category F: Internet or other similar network activity.]</li>
                        <li>[Category G: Geolocation Data.]</li>
                        <li>[Category K: Inferences drawn from other personal information.]</li>
                    </ul>
                </SmallItem>

                <SmallItem title = "Sales of Personal Information">
                    In the preceding twelve (12) months, the company has not sold any personal information.
                </SmallItem>

            </Item>
        </div>
        <Footer/> </Layout>
}