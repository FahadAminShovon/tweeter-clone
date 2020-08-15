import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
// Mui stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useInput from '../../hooks/useInput';
import { submitComment } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({...theme.spreadIt}));

function CommentForm({screamId}) {
    const classes = useStyles();
    const [body, bodyBind, setBody] = useInput('');
    const dispatch = useDispatch();
    const {errors} = useSelector(state=>state.UI);
    const authenticated = useSelector(state => state.user.authenticated);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitComment(screamId,{body}, setBody))
    }
    
    const commentFormMarkup = authenticated ? (
        <Grid item sm={12} style={{textAlign:'center'}}>
            <form onSubmit={handleSubmit}>
                <TextField
                    {...bodyBind}
                    type="text"
                    label="Comment on scream"
                    error={errors.comment? true : false}
                    helperText={errors.comment}
                    fullWidth
                    className={classes.TextField}
                />
                <Button type="submit" 
                variant="contained"
                color="primary"
                className={classes.button}>
                    Submit
                </Button>
                <hr className={classes.visibleSeparator}/>
            </form>
        </Grid>
    ) : null

    return commentFormMarkup;
}

CommentForm.propTypes = {
    screamId: PropTypes.string.isRequired
}

export default CommentForm;
