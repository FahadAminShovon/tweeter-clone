import React, { useState } from 'react'
// redux imports
import { postScream } from '../../redux';
// hooks import
import useInput from '../../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
// MUI imoprts
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../../util/MyButton';
import { clearError } from '../../redux/UI/UIActions';


const useStyles = makeStyles((theme) => ({...theme.spreadIt,
    submitButton: {
        position: 'relative',
        progress: 'spinner',
        float: 'right',
        marginTop: '10px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
}));

function PostScream() {
    const [open, setOpen] = useState(false);
    const [body, bodyBind] = useInput('');
    const {loading, errors} = useSelector(state => state.UI);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        dispatch(clearError());
        setOpen(false);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(postScream({body}, handleClose));
    }

    return (
        <>
            <MyButton tip="Post a scream!" onClick={handleOpen}>
                <AddIcon/>
            </MyButton>
            <Dialog 
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            >
                <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
                <DialogTitle>Post a new Scream</DialogTitle>
                <DialogContent>
                    <form onSubmit = {handleSubmit}>
                        <TextField
                        {...bodyBind}
                        type="text"
                        label="SCREAM!!"
                        multiline
                        rows="3"
                        placeholder="Scream at your fellow friends"
                        error={errors.body? true : false}
                        helperText={errors.body}
                        className={classes.textField}
                        fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary"
                            className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && <CircularProgress size={30} className={classes.progressSpinner}/>}
                            </Button>
                    </form>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default PostScream
