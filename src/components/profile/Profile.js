import React, { useRef } from 'react';
// react router
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// components import
import {EditDetails} from './EditDetails'
// MUI stuff
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
// Redux 
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { uploadImage, logoutUser} from '../../redux';
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';


const useStyles = makeStyles((theme) => ({...theme.spreadIt}));

function Profile() {
    const classes = useStyles();;
    // email, userId
    const {bio, createdAt, handle, imageUrl, location, website} = useSelector(state => state.user.credentials);
    const {loading,authenticated} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const fileRef = useRef();


    const handleImageChange = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        dispatch(uploadImage(formData));
    }

    const handleEditPicture = () => {
        fileRef.current.click();
    }

    let profileMarkup = !loading ? (authenticated ? 
        (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input
                        ref = {fileRef}
                        type="file" 
                        id="imageInput"
                        hidden="hidden"
                        onChange={handleImageChange}
                        />
                        <MyButton tip="Edit profile picture" onClick={handleEditPicture} btnClassName="button">
                            <EditIcon color="primary"/>
                        </MyButton>
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
                <MyButton tip="Logout" onClick={() => dispatch(logoutUser())}>
                    <KeyboardReturn color="primary"/>
                </MyButton>
                <EditDetails/>
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
        )) : ( <ProfileSkeleton/>);

    return (
        profileMarkup
    )
}

export {Profile};