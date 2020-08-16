import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import noImg from '../images/no-img.png';

// Mui
import Paper from '@material-ui/core/Paper';
// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles(theme => ({...theme.spreadIt,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin: '0px auto 7px auto',
    },
    fullLine: {
        height: 15,
        backgroundColor: `rgba(0, 0, 0, 0.6)`,
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: `rgba(0, 0, 0, 0.6)`,
        width: '50%',
        marginBottom: 10
    }
}));

function ProfileSkeleton() {

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img 
                    src={noImg} 
                    alt="profile" 
                    className="profile-image"
                    />
                </div>
                <div className="profile-details">
                    <div className={classes.handle}/>
                    <hr/>
                    <div className={classes.fullLine}/>
                    <div className={classes.fullLine}/>
                    <hr/>
                    <LocationIcon color="primary"/> <span>Location</span><br/>
                    <LinkIcon color="primary"/>https://website.com<br/>
                    <hr/>
                    <CalenderToday color="primary"/>Joined date
                </div>
            </div>
        </Paper>
    )
}

export default ProfileSkeleton
