import React from 'react';
// react router
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI stuff
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';
// Redux 
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({...theme.spreadIt}));

function Profile() {
    const classes = useStyles();;
    const {bio, createdAt, email, handle, imageUrl, location, userId, website} = useSelector(state => state.user.credentials);
    const {loading,authenticated} = useSelector(state => state.user);

    let profileMarkup = !loading ? (authenticated ? 
        (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">@{handle}</MuiLink>
                    
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <>
                            <LocationIcon color="primary"/> <span>{location}</span>
                            <hr/>
                        </>
                    )}
                    {website && (
                        <>
                            <LinkIcon color="primary"/> 
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}{website}
                            </a>
                            <hr/>
                        </>
                    )}
                    <CalenderToday color="primary"/>{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again.
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : ( <p>loading....</p>);

    return (
        profileMarkup
    )
}

export {Profile};