import Head from 'next/head'
import Link from 'next/link';
import Layout, {siteTitle} from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export async function getStaticProps() {
    const res = await fetch('http://cms:1337/projects');
    const projects = await res.json();
    return {
        props: {
            projects
        }
    };
}

export default function Home({ projects }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <section className={utilStyles.headingMd}>
                <p className={utilStyles.textJustify}>
                    I'm a full-stack developer with more than a decade of experience, including software
                    development, cloud-computing server management, IT security, and implementing various online payment
                    gateways integrations (Authorize.Net, Stripe, Amazon Login & Pay, USA ePayments, Gravity Payments,
                    Braintree Payments, and 2CheckOut).
                </p>
                <p className={utilStyles.textJustify}>
                    Also I have deployed and managed apps on cloud computing platforms with
                    providers like Amazon, DigitalOcean, and Rackspace Cloud Computing.
                </p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Projects</h2>
                <ul className={utilStyles.list}>
                    {projects.map(({ id, title, summary }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/projects/${id}`}><a>{title}</a></Link><br />
                            {summary}
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}
