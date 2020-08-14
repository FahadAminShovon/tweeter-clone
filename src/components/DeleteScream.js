import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import MyButton from '../util/MyButton'
import PropTypes from 'prop-types'
// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { deleteScream } from '../redux/data/dataActions';
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({...theme.spreadIt ,
        deleteButton : {
            position: 'absolute',
            top: "10%",
            left: "90%"
        }}));

function DeleteScream({screamId}) {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const deleteAndClose = () => {
        dispatch(deleteScream(screamId));
        handleClose();
    }

    const classes = useStyles();
    return (
        <>
           <MyButton tip="Delete Scream" 
           onClick={handleOpen}
           btnClassName={classes.deleteButton}>
            <DeleteOutline color="secondary"/>
           </MyButton> 
           <Dialog open={open}
           onClose = {handleClose}
           fullWidth
           maxWidth="sm"
           >
           <DialogTitle>
               Are you sure you want to delete this scream?
           </DialogTitle>
           <DialogActions>
               <Button onClick={handleClose} color="primary">
                   Cancel
               </Button>
               <Button onClick={deleteAndClose} color="secondary">
                    Delete
               </Button>
           </DialogActions>
           </Dialog>
        </>
    )
}

DeleteScream.propTypes = {
    screamId: PropTypes.string.isRequired
}



export default DeleteScream
