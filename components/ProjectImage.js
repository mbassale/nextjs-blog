import * as React from 'react';
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import classes from './ProjectImage.module.css';

export default function ProjectImage({ image, onClick }) {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    const imageUrl = 'http://localhost:1337' + image.formats.medium.url;
    return (
        <React.Fragment>
            <img className={classes.image} src={imageUrl} alt={image.caption} onClick={handleClick}/>
            <GridListTileBar
                title={image.caption}
                actionIcon={
                    <IconButton aria-label={`info about ${image.title}`} className={classes.icon} onClick={handleClick}>
                        <InfoIcon />
                    </IconButton>
                }
            />
        </React.Fragment>
    );
}