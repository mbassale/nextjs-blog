import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import classes from './layout.module.css';

const name = 'Marco Bassaletti';
export const siteTitle = 'Marco Bassaletti Personal Blog';

function Layout({ children, home }) {
    return (
        <React.Fragment>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Marco Bassaletti personal blog in Next.js" />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <CssBaseline />
            <Container fixed>
                <Grid container spacing={3} direction="column" justify="flex-start" alignItems="center">
                    <Grid item xs={12} className={classes.header}>
                        <img
                            src="/images/profile.jpg"
                            className={classes.headerImage}
                            alt={name}
                        />
                        <Typography variant="h3" component="h1">{name}</Typography>
                    </Grid>
                    <Grid item xs={12}>{children}</Grid>
                    {!home && (
                        <div className={classes.backToHome}>
                            <Link href="/">
                                <a>← Back to home</a>
                            </Link>
                        </div>
                    )}
                    <Grid item xs={12} className={classes.footer}>
                        &copy; { new Date().getFullYear() } - Marco Bassaletti. All rights reserved.
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default Layout;