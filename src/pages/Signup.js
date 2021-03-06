import React from 'react'
//Mui stuff
import AppIcon from '../images/icon.png';
// React router dom imports
import { Link, useHistory } from 'react-router-dom';

// Material ui imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
// customHook import
import useInput from '../hooks/useInput';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
// Action imports
import { signupUser } from '../redux';

const useStyles = makeStyles((theme) => ({...theme.spreadIt}));


function Signup() {
  const [email, emailBind] = useInput("");
  const [password, passwordBind] = useInput("");
  const [confirmPassword, ConfirmPasswordBind] = useInput("");
  const [handle, handleBind] = useInput("");
  let errors = useSelector(state => state.UI.errors);
  let loading = useSelector(state => state.UI.loading);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({email, password, confirmPassword, handle}, history));
  }

  const classes = useStyles();

  return (
    <Grid container className={classes.form}>
    <Grid item sm/>
    <Grid item sm xs={12}>
        <img src={AppIcon} alt="monkey" className={classes.image}/>
        <Typography variant="h2" className={classes.pageTitle}>
            Signup
        </Typography>
        <form noValidate onSubmit = {handleSubmit}>
            <TextField 
                id="email" 
                type="email" 
                label="Email"
                className={classes.TextField}
                helperText={errors.email}
                error={errors.email ? true : false}
                fullWidth
                {...emailBind}
                />
                <TextField 
                id="password" 
                type="password" 
                label="Password"
                className={classes.TextField}
                helperText={errors.email}
                error={errors.email ? true : false}
                fullWidth
                {...passwordBind}
                />
                <TextField 
                id="confirmPassword" 
                type="password" 
                label="Confirm Password"
                className={classes.TextField}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                fullWidth
                {...ConfirmPasswordBind}
                />
                <TextField 
                id="handle" 
                type="text" 
                label="Handle"
                className={classes.TextField}
                helperText={errors.handle}
                error={errors.handle ? true : false}
                fullWidth
                {...handleBind}
                />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                className={classes.button}
                disabled={loading}>
                    Signup
                    {loading && (
                        <CircularProgress size={30} className={classes.progress}/>
                    )}
            </Button>
            <br />

            <small>Already have an account ? Login <Link to="/login">here</Link></small>                        
        </form>
    </Grid>
    <Grid item sm/>
</Grid>
  );
}

export {Signup}
