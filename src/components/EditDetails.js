import React, { useState, useEffect } from 'react'
// redux imports
import { editUserDetails } from '../redux';
// hooks import
import useInput from '../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
// MUI imoprts
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// icons
import EditIcon from '@material-ui/icons/Edit';
import MyButton from '../util/MyButton';


const useStyles = makeStyles((theme) => ({...theme.spreadIt, button:{float:"right"}}));

function EditDetails() {
    const [bio, bioBind, setBio] = useInput('');
    const [website, websiteBind, setWebsite] = useInput('');
    const [location, locationBind, setLocation] = useInput('');
    const [open, setOpen] = useState(false);
    const credentials = useSelector(state => state.user.credentials);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        mapUserDetailsToState();
    },[])

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }
    
    const handleSubmit = () => {
        const userDetails = {
            bio,
            website,
            location
        }
        dispatch(editUserDetails(userDetails));
        handleClose();
        
    }

    const mapUserDetailsToState = () => {
        setBio(credentials.bio ? credentials.bio : '');
        setWebsite(credentials.website ? credentials.website : '');
        setLocation(credentials.location ? credentials.location : '');
    } 

    return (
        <>
            <MyButton tip="Edit Details" onClick={handleOpen} btnClassName={classes.button}>
                <EditIcon color="primary"/>
            </MyButton>
            <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm">
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            {...bioBind}
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself"
                            className={classes.TextField}
                            fullWidth
                        />
                        <TextField
                            {...websiteBind}
                            type="text"
                            label="Website"
                            placeholder="Your personal/professional website"
                            className={classes.TextField}
                            fullWidth
                        />
                        <TextField
                            {...locationBind}
                            type="text"
                            label="Location"
                            placeholder="Where you live"
                            className={classes.TextField}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={handleClose}
                    color="primary">
                        Cancel
                    </Button>
                    <Button 
                    onClick={handleSubmit}
                    color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export {EditDetails}