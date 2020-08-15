import React, { useState, Fragment } from 'react';
// router-dom imports
import { Link } from 'react-router-dom';
// dayjs imports
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// Mui imporots
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { markNotificationsRead } from '../../redux/user/userActions';
import IconButton from '@material-ui/core/IconButton';

function Notifications() {

    const dispatch = useDispatch();
    const notifications = useSelector(state => state.user.notifications);
    dayjs.extend(relativeTime);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen=(event)=>{
        setAnchorEl(prevState=>event.target);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const onMenuOpened = () => {
        let unreadNotificationsIds = notifications
          .filter((not) => !not.read)
          .map((not) => not.notificationId);
        dispatch(markNotificationsRead(unreadNotificationsIds));
      };

    let notificationsIcon;

    if(notifications && notifications.length > 0){
        notifications.filter(not => not.read === false).length > 0
        ? (notificationsIcon = (
            <Badge badgeContent={notifications.filter(not=>not.read===false).length}
                color="secondary">
                <NotificationsIcon/>
            </Badge>
        )) : (notificationsIcon = <NotificationsIcon/>)
    } else {
        notificationsIcon = <NotificationsIcon/>
    }

    let notificationsMarkup = 
        notifications && notifications.length > 0 ? (
            notifications.map(not => {
                const verb = not.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? 'primary' : 'secondary';
                const icon = not.type === 'like' ? (
                    <FavoriteIcon color={iconColor} style={{marginRight: 10}}/>
                ) : (
                    <ChatIcon color={iconColor} style={{marginRight:10}}/>
                )
                return (
                    <MenuItem key={not.createdAt} onClick={handleClose}>
                        {icon}
                        <Typography 
                        component={Link}
                        variant="body1"
                        to={`/users/${not.recipient}/scream/${not.screamId}`}>
                            {not.sender} {verb} your scream {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick = {handleClose}>
                You have no notifications yet.
            </MenuItem>
        )


    return (
        <Fragment>
            <Tooltip placement="top" title="Notifications">
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleOpen}>
                    {notificationsIcon}
                </IconButton>
            </Tooltip>
            <Menu styles={{maxWidth:200}}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onEntered={onMenuOpened}>
            {notificationsMarkup}
            </Menu>
        </Fragment>
    )
}

export default Notifications
