import _ from 'lodash';
import React from "react";
import Head from 'next/head';
import Layout from '../components/layout';
import Grid from '@material-ui/core/Grid';
import Project from "../components/project";
import utilStyles from '../styles/utils.module.css';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Link from '@material-ui/core/Link';
import LinkIcon from "@material-ui/icons/Link";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import remark from "remark";
import html from "remark-html";
import Certification from "../components/Certification";
import Course from "../components/Course";

export async function getStaticProps() {
    // get projects
    const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_BASE_URL + '/projects');
    const projects = await res.json();

    // get profile data
    const res2 = await fetch(process.env.NEXT_PUBLIC_STRAPI_BASE_URL + '/profiles/1');
    const profile = await res2.json();
    const description = await remark().use(html).process(profile.description)
    const descriptionHtml = description.toString();

    const certificationsResult = await fetch(process.env.NEXT_PUBLIC_STRAPI_BASE_URL + '/certifications');
    const certifications = _.orderBy(await certificationsResult.json(), ['from_date'], ['desc']);

    const coursesResult = await fetch(process.env.NEXT_PUBLIC_STRAPI_BASE_URL + '/courses');
    const courses = _.orderBy(await coursesResult.json(), ['course_date'], ['desc']);

    return {
        props: {
            profile,
            profileDescriptionHtml: descriptionHtml,
            projects,
            certifications,
            courses
        }
    };
}

export default function Home({ profile, profileDescriptionHtml, projects, certifications, courses }) {
    const siteTitle = `${profile.first_name} ${profile.last_name}`;
    return (
        <Layout home siteTitle={siteTitle} siteDescription={profile.description}>
            <Head>
                <title>{siteTitle}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <section className={utilStyles.headingMd}>
                <div className={utilStyles.textJustify} dangerouslySetInnerHTML={{ __html: profileDescriptionHtml }} />
            </section>
            <section className={utilStyles.headingMd}>
                <h2 className={utilStyles.headingLg}>Profiles</h2>
                <List component="nav" aria-label="main mailbox folders">
                    {profile.profile_links.map(profileLink => (
                        <ListItem key={profileLink.id} button component={Link} href={profileLink.url} target="_blank">
                            <ListItemIcon>
                                <LinkIcon />
                            </ListItemIcon>
                            <ListItemText className={utilStyles.profileLink} primary={profileLink.title} secondary={profileLink.url} />
                        </ListItem>
                    ))}
                </List>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Projects</h2>
                <Grid container spacing={3} direction="row" justify="center" alignItems="stretch">
                    {projects.map(project => (
                        <Grid key={project.id} item xs={12} md={6} lg={4}>
                            <Project project={project} />
                        </Grid>
                    ))}
                </Grid>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Certifications</h2>
                <Grid container spacing={3} direction="row" justify="center" alignItems="stretch">
                    {certifications.map(certification => (
                        <Grid key={certification.id} item xs={12} md={6} lg={4}>
                            <Certification certification={certification} />
                        </Grid>
                    ))}
                </Grid>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Courses</h2>
                <Grid container spacing={3} direction="row" justify="center" alignItems="stretch">
                    {courses.map(course => (
                        <Grid key={course.id} item xs={12} md={6} lg={4}>
                            <Course course={course} />
                        </Grid>
                    ))}
                </Grid>
            </section>
        </Layout>
    )
}
