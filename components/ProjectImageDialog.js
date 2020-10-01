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
        const imageUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL + image.formats.large.url;
        imageElement = (
            <div className={classes.content}>
                <div className={classes.navigationColumnLeft}>
                    <ButtonBase className={[classes.navigationButton, classes.leftNavigationButton].join(' ')} disableTouchRipple={true} onClick={handlePreviousImage}>
                        <LeftIcon className={classes.leftNavigationIcon} />
                    </ButtonBase>
                </div>
                <img className={classes.image} src={imageUrl} alt={image.caption} />
                <div className={classes.navigationColumnRight}>
                    <ButtonBase className={[classes.navigationButton, classes.rightNavigationButton].join(' ')} disableTouchRipple={true} onClick={handleNextImage}>
                        <RightIcon className={classes.rightNavigationIcon} />
                    </ButtonBase>
                </div>
            </div>
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
