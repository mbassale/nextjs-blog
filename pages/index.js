import Head from 'next/head'
import Link from 'next/link';
import Layout, {siteTitle} from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
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
        </Layout>
    )
}
