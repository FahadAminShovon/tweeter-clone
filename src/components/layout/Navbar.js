import React from 'react'
// react router dom import
import {Link} from 'react-router-dom';
import MyButton from '../../util/MyButton';
// import material ui stuff
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
// redux import
import { useSelector } from 'react-redux';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import PostScream from '../scream/PostScream';




function Navbar() {
    const authenticated = useSelector(state => state.user.authenticated)
    return (
        <Appbar>
            <Toolbar className="nav-container">
                {authenticated ? (
                    <>
                        <PostScream/>
                        <MyButton tip = "Home">
                            <Link to="/">
                                <HomeIcon/>
                            </Link>
                        </MyButton>
                        <MyButton tip="Notifications">
                            <Notifications/>
                        </MyButton>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component = {Link} to="/login">Login</Button>
                        <Button color="inherit" component = {Link} to="/">Home</Button>
                        <Button color="inherit" component = {Link} to="/signup">Signup</Button>
                    </>
                )}
            </Toolbar>
        </Appbar>
    )
}

export {Navbar}
