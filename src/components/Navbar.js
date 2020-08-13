import React from 'react'
// react router dom import
import {Link} from 'react-router-dom';

// import material ui stuff
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'


export default function Navbar() {
    return (
        <Appbar>
            <Toolbar className="nav-container">
                <Button color="inherit" component = {Link} to="/login">Login</Button>
                <Button color="inherit" component = {Link} to="/">Home</Button>
                <Button color="inherit" component = {Link} to="/signup">Signup</Button>
            </Toolbar>
        </Appbar>
    )
}
