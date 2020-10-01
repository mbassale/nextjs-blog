import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import classes from './Certification.module.css';

export default function Certification({ certification }) {
    const certificateUrl = certification.certificate_file ? process.env.NEXT_PUBLIC_STRAPI_BASE_URL + certification.certificate_file.url : null;
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant={"subtitle2"} color="textSecondary" gutterBottom>
                    {certification.organization}
                </Typography>
                <Typography variant="subtitle1">
                    {certification.name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    {certification.from_date}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Link className={classes.link} href={certification.url} target="_blank" underline="none">Validate</Link>
                {certificateUrl ? (<Link className={classes.link} href={certificateUrl} target="_blank" underline="none">Download Certificate</Link>) : null}
            </CardActions>
        </Card>
    );
}