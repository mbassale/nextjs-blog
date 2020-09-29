import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import classes from './Certification.module.css';

export default function Course({ course }) {
    const certificateUrl = course.certificate_file ? 'http://localhost:1337' + course.certificate_file.url : null;
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant={"subtitle2"} color="textSecondary" gutterBottom>
                    {course.organization}
                </Typography>
                <Typography variant="subtitle1">
                    {course.name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    {course.course_date}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Link className={classes.link} href={course.url} target="_blank" underline="none">Validate</Link>
                {certificateUrl ? (<Link className={classes.link} href={certificateUrl} target="_blank" underline="none">Download Certificate</Link>) : null}
            </CardActions>
        </Card>
    );
}