import React from 'react';
import PropTypes from 'prop-types'
// router-dom imports
import { Link } from 'react-router-dom';
// dayjs imports
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// Mui imporots
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography';
// icons
import ChatIcon from '@material-ui/icons/Chat';
//redux stuff
import { useSelector } from 'react-redux';
//utils
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';


const useStyles = makeStyles({
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image:{
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
});

function Scream({scream : {body, createdAt, userImage, userHandle,screamId, likeCount, commentCount}, openDialog}) {
    const classes = useStyles();
    dayjs.extend(relativeTime);
    const user = useSelector(state => state.user);
    const authenticated = user.authenticated;
    const handle = user.credentials.handle;
    const likedScream = () => user.likes && user.likes.find(like => like.screamId === screamId) ? true : false;

    const deleteButton = authenticated && userHandle === handle ? (
        <DeleteScream screamId = {screamId}/>
    ) : null


    return (
        <Card className={classes.card}>
            <CardMedia
            className={classes.image}
            image = {userImage}
            title="Profile image"/>
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} color="primary" to={`/users/${userHandle}`}>{userHandle}</Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
                <LikeButton
                    authenticated={authenticated}
                    likedScream={likedScream}
                    screamId={screamId}
                />
                <span>{likeCount} Likes </span>
                <MyButton tip="comments">
                    <ChatIcon color="primary"/>
                </MyButton>
                <span>{commentCount} comments</span>
                <ScreamDialog screamId={screamId} userHandle={userHandle} likedScream={likedScream} openDialog={openDialog}/>
            </CardContent>
        </Card>
    )
}

Scream.propTypes = {
    scream: PropTypes.object.isRequired ,
    openDialog: PropTypes.bool
}



export {Scream}