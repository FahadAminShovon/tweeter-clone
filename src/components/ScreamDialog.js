import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import MyButton from '../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
// icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
// Redux stuff
import { getScream } from '../redux/data/dataActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({...theme.spreadIt,
            invisibleSeparator: {
                border:"none",
                margin: 4
            },
            profileImage: {
                maxWidth: 200,
                height: 200,
                borderRadius: '50%',
                objectFit: 'cover'
            },
            dialogContent: {
                padding: 20
            },
            closeButton: {
                position: 'absolute',
                left: '90%'
            },
            expandButton: {
                position: 'absolute',
                left: '90%'
            },
            spinnerDiv:{
                textAlign: "center",
                margin: "50px 0"
            }
}))

function ScreamDialog({screamId}) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const {body, createdAt, likeCount, commentCount, userImage, userHandle} = useSelector(state => state.data.scream);
    const {loading} = useSelector(state => state.UI);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
        dispatch(getScream(screamId));
    }

    const handleClose = () => {
        setOpen(false);
    }

    const dialogMarkup = loading ? (
        <div className={classes.spinnerDiv}>
            <CircularProgress size = {200} thickness={2}/>
        </div>
    ) : (
        <Grid container spacing = {1}>
            <Grid item sm={5}>
                <img src={userImage} alt="Profile" className={classes.profileImage}/>
            </Grid>
            <Grid item sm={7}>
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/user/${userHandle}`}>
                    @{userHandle}
                </Typography>
                <hr className={classes.invisibleSeparator}/>
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h: mm a, MMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeparator}/>
                <Typography variant="body1">
                    {body}
                </Typography>
            </Grid>
        </Grid>
    )
    return (
        <>
        <MyButton tip = "Expand scream" onClick = {handleOpen} tipClassName={classes.expandButton}>
            <UnfoldMore color="primary"/>
        </MyButton>
        <Dialog  
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            >
            <MyButton 
            tip="Close" 
            onClick={handleClose} 
            tipClassName={classes.closeButton}>
            <CloseIcon/>
            </MyButton>
            <DialogContent className={classes.dialogContent}
            >
                {dialogMarkup}
            </DialogContent>
        </Dialog>
        </>
    )
}

ScreamDialog.propTypes = {
    screamId: PropTypes.string.isRequired
}

export default ScreamDialog
