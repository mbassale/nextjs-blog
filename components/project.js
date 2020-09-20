import React from 'react';
import classes from './project.module.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function Project({ project }) {
    const firstImage = project.images[0];
    let thumbnailUrl = null;
    if (firstImage && firstImage.formats) {
        const thumbnailImage = firstImage.formats.small;
        thumbnailUrl = 'http://localhost:1337' + thumbnailImage.url;
    }
    return (
        <Card className={classes.root}>
            <CardActionArea href={`/projects/${project.id}`}>
                <CardMedia
                    className={classes.media}
                    image={thumbnailUrl}
                    title={project.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">{project.title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{project.summary}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
