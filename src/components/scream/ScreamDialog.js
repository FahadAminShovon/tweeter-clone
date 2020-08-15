import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import MyButton from '../../util/MyButton';
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
import ChatIcon from '@material-ui/icons/Chat'
// Redux stuff
import { getScream } from '../../redux/data/dataActions';
import { useDispatch, useSelector } from 'react-redux';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const useStyles = makeStyles(theme => ({...theme.spreadIt,
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

function ScreamDialog({screamId, likedScream}) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const authenticated = useSelector(state => state.user.authenticated)
    const {loading} = useSelector(state => state.UI);
    const {body, createdAt, likeCount, commentCount, userImage, userHandle, comments} = useSelector(state => state.data.scream);
    const dispatch = useDispatch();

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
                <LikeButton
                    screamId = {screamId}
                    authenticated = {authenticated}
                    likedScream={likedScream}
                />
                <span>{likeCount} Likes </span>
                <MyButton tip="comments">
                    <ChatIcon color="primary"/>
                </MyButton>
                <span>{commentCount} comments</span>
            </Grid>
            <hr className={classes.visibleSeparator}/>
            <CommentForm screamId={screamId}/>
            <Comments comments={comments ? comments : []}/>
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
    screamId: PropTypes.string.isRequired,
    likedScream: PropTypes.func.isRequired
}

export default ScreamDialog
