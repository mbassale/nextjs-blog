import React, { useState } from 'react';
import Layout from '../../components/layout';
import Head from 'next/head';
import remark from 'remark';
import html from 'remark-html';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';
import PasswordIcon from '@material-ui/icons/CardMembership';
import ProjectImage from '../../components/ProjectImage';
import ProjectImageDialog from '../../components/ProjectImageDialog';
import classes from './[id].module.css';

export default function Project({ project, descriptionHtml }) {

    const [showImageDialog, setShowImageDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const getSelectedImageIndex = () => {
        if (selectedImage && project.images && project.images.length > 0) {
            return project.images.findIndex(image => image.id === selectedImage.id);
        }
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowImageDialog(true);
    };

    const handleImageDialogClose = () => {
        setShowImageDialog(false);
    }

    const handleNextImage = () => {
        const selectedImageIndex = getSelectedImageIndex();
        if (selectedImageIndex >= 0) {
            let nextImageIndex = selectedImageIndex + 1;
            if (nextImageIndex >= project.images.length) {
                nextImageIndex = 0;
            }
            setSelectedImage(project.images[nextImageIndex]);
        }
    };

    const handlePreviousImage = () => {
        const selectedImageIndex = getSelectedImageIndex();
        if (selectedImageIndex >= 0) {
            let previousImageIndex = selectedImageIndex - 1;
            if (previousImageIndex < 0) {
                previousImageIndex = project.images.length - 1;
            }
            setSelectedImage(project.images[previousImageIndex]);
        }
    };

    const repositoryListItem = project.repository_url ? (
        <ListItem button component={Link} href={project.repository_url} target="_blank">
            <ListItemIcon>
                <LinkIcon />
            </ListItemIcon>
            <ListItemText primary="Github Repository" secondary={project.repository_url} />
        </ListItem>
    ) : null;

    const projectListItem = project.project_url ? (
        <ListItem button component={Link} href={project.project_url} target="_blank">
            <ListItemIcon>
                <LinkIcon />
            </ListItemIcon>
            <ListItemText primary="Project" secondary={project.project_url} />
        </ListItem>
    ) : null;

    const credentialsListItem = project.credential ? (
        <ListItem button component={Link} href={project.project_url} target="_blank">
            <ListItemIcon>
                <PasswordIcon />
            </ListItemIcon>
            <ListItemText primary="Credentials" secondary={`Email: ${project.credential.email} Password: ${project.credential.password}`} />
        </ListItem>
    ) : null;

    return (
        <Layout>
            <Head>
                <title>Project: {project.title}</title>
            </Head>
            <h3>{ project.title }</h3>
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            <List component="nav" aria-label="main mailbox folders">
                {repositoryListItem}
                {projectListItem}
                {credentialsListItem}
            </List>
            {project.images.length > 0 ? (
                <GridList cellHeight={400} className={classes.gridList} cols={2}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Screenshots</ListSubheader>
                    </GridListTile>
                    {project.images.map((image) =>
                        <GridListTile key={image.id} cols={1}>
                            <ProjectImage image={image} onClick={() => handleImageClick(image)} />
                        </GridListTile>)}
                </GridList>
                ) : null }
            <ProjectImageDialog image={selectedImage} open={showImageDialog} onClose={handleImageDialogClose}
                                onNextImage={handleNextImage} onPreviousImage={handlePreviousImage} />
        </Layout>
    );
}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:1337/projects');
    const projects = await res.json();
    return {
        paths: projects.map(project => {
            return {
                params: {
                    id: project.id.toString()
                }
            };
        }),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const res = await fetch('http://localhost:1337/projects/' + params.id);
    const project = await res.json();
    const description = await remark().use(html).process(project.description)
    const descriptionHtml = description.toString();
    return {
        props: {
            project,
            descriptionHtml,
        }
    };
}
