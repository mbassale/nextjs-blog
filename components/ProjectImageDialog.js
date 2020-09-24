import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloseIcon from '@material-ui/icons/Close';
import LeftIcon from '@material-ui/icons/ChevronLeftRounded';
import RightIcon from '@material-ui/icons/ChevronRightRounded';
import Slide from '@material-ui/core/Slide';
import classes from './ProjectImageDialog.module.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ image, open, onClose, onNextImage, onPreviousImage}) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handlePreviousImage = () => {
        if (onPreviousImage) {
            onPreviousImage();
        }
    };

    const handleNextImage = () => {
        if (onNextImage) {
            onNextImage();
        }
    };

    let imageElement = null;
    if (image && image.formats) {
        const imageUrl = 'http://localhost:1337' + image.formats.large.url;
        imageElement = (
            <Grid container spacing={0} direction="row" justify="space-around" alignItems="stretch" className={classes.content}>
                <Grid item className={classes.navigationColumn}>
                    <ButtonBase className={classes.navigationButton} onClick={onPreviousImage}>
                        <LeftIcon fontSize="large" />
                    </ButtonBase>
                </Grid>
                <Grid item>
                    <img className={classes.image} src={imageUrl} alt={image.caption} />
                </Grid>
                <Grid item className={classes.navigationColumn}>
                    <ButtonBase className={classes.navigationButton} onClick={onNextImage}>
                        <RightIcon fontSize="large" />
                    </ButtonBase>
                </Grid>
            </Grid>
        );
    }

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {image ? image.caption : null}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        Close
                    </Button>
                </Toolbar>
            </AppBar>
            {imageElement}
        </Dialog>
    );
}
