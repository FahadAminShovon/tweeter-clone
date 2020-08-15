import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Scream } from '../components';
// MUI
import Grid from '@material-ui/core/Grid';
import { getAnyUserData } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import StaticProfile from '../components/profile/StaticProfile';


function User({match:{params:{handle}}}) {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const {screams, loading} = useSelector(state => state.data);

    useEffect(() => {
        dispatch(getAnyUserData(handle));
        axios.get(`/user/${handle}`)
            .then(res => {
                setProfile(res.data.user);
            })
            .catch(err => console.log(err));
    },[])

    const screamsMarkup = loading ? (
        <p>Loading data...</p>
    ) : (screams === null ? (
        <p>No screams from this user.</p>
    ) : (
        screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
    ))


    return (
        <Grid container spacing={1}>
            <Grid item sm={8} xs={12}>
                {screamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {profile && <StaticProfile profile={profile}/>}
            </Grid>
        </Grid>
    )
}


export  {User}