import React from 'react'
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';
import MuiLink from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({...theme.spreadIt}));


function StaticProfile({profile}) {
    // {profile:{handle, createdAt, imageUrl, bio, website, location}}
    const {handle, createdAt, imageUrl, bio, website, location}  = profile;
    const classes = useStyles();

    return (
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
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default StaticProfile
