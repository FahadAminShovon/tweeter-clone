import React from 'react'
//Mui stuff
import {makeStyles} from '@material-ui/core/styles';
import AppIcon from '../images/icon.png';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

// customHook import
import useInput from '../hooks/useInput';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
// action imports
import { loginUser } from '../redux';

const useStyles = makeStyles((theme) => ({...theme.spreadIt}));

const Login = () => {
  const [email, emailBind] = useInput("");
  const [password, passwordBind] = useInput("");
  let errors = useSelector(state => state.UI.errors);
  let loading = useSelector(state => state.UI.loading);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({email,password},history));
  }

  return (
    <Grid container className={classes.form}>
    <Grid item sm/>
    <Grid item sm xs={12}>
        <img src={AppIcon} alt="monkey" className={classes.image}/>
        <Typography variant="h2" className={classes.pageTitle}>
            Login
        </Typography>
        <form noValidate onSubmit = {handleSubmit}>
            <TextField 
                id="email" 
                type="email" 
                label="Email"
                className= {classes.textField}
                helperText={errors.email}
                error={errors.email ? true : false}
                fullWidth
                {...emailBind}
                />
                <TextField 
                id="password" 
                type="password" 
                label="Password"
                className= {classes.textField}
                helperText={errors.password}
                error={errors.password ? true : false}
                fullWidth
                {...passwordBind}
                />
                {
                    errors.general && (
                        <Typography variant="body2" 
                    className= {classes.customError}>
                        {errors.general}
                    </Typography>
                    )
                }
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                className= {classes.button}
                disabled={loading}>
                    Login
                    {loading && (
                        <CircularProgress size={30} className= {classes.progress}/>
                    )}
            </Button>
            <br />

            <small>Don't have an account ? Sign up <Link to="/signup">here</Link></small>                        
        </form>
    </Grid>
    <Grid item sm/>
</Grid>
  );
}

export {Login}
