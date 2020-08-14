import React from 'react';
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
// Mui stuffs

const useStyles = makeStyles({
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image:{
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
});

function Scream({scream : {body, createdAt, userImage, userHandle,screamId, likeCount, commentCount}}) {
    const classes = useStyles();
    dayjs.extend(relativeTime);
    return (
        <Card className={classes.card}>
            <CardMedia
            className={classes.image}
            image = {userImage}
            title="Profile image"/>
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} color="primary" to={`/user/${userHandle}`}>{userHandle}</Typography>
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
            </CardContent>
        </Card>
    )
}

export {Scream}