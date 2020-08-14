import React, { useState, useEffect } from 'react'
import axios from 'axios';
// Mui imports
import Grid from '@material-ui/core/Grid'
// Component imports
import {Scream} from '../components';
import {Profile} from '../components';


function Home() {
    const [screams, setScreams] = useState(null);

    useEffect(() => {
        axios.get('/screams')
            .then(res => {
                setScreams(res.data);
            })
    },[]);

    let recentScreamsMarkup = screams ? (
        screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
    ): <p>Loading ...</p>

    return (
        <Grid container spacing={1}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile/>
            </Grid>
        </Grid>
    )
}

export {Home}
