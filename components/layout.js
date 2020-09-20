import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";

const name = 'Marco Bassaletti';
export const siteTitle = 'Marco Bassaletti Personal Blog';

const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: '2rem'
    },
    headerImage: {
        width: '8rem',
        height: '8rem',
        margin: '0 auto',
        borderRadius: '9999px'
    },
    backToHome: {
        width: '100%',
        textAlign: 'left',
        margin: '3rem 0 0'
    },
    footer: {
        width: '100%',
        textAlign: 'center',
        borderTop: 'darkblue 1px solid',
        paddingTop: '1.5rem !important',
        paddingLeft: '12px',
        paddingRight: '12px',
        marginTop: '1rem',
        marginBottom: '1rem'
    }
}));

function Layout({ children, home }) {
    const classes = useStyles();
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