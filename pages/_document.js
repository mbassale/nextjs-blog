import Document, {Html, Head, Main, NextScript} from 'next/document'
import React from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="stylesheet" href="/css/initial.css" />
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument;
