import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Scream } from '../components';
// MUI
import Grid from '@material-ui/core/Grid';
import { getAnyUserData } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import StaticProfile from '../components/profile/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton';


function User({match:{params:{handle, screamId}}}) {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const [screamIdParam, setScreamIdParam] = useState(null);
    const {screams, loading} = useSelector(state => state.data);


    useEffect(() => {
        if(screamId)setScreamIdParam(screamId);
        dispatch(getAnyUserData(handle));
        axios.get(`/user/${handle}`)
            .then(res => {
                setProfile(res.data.user);
            })
            .catch(err => console.log(err));
    },[])

    const screamsMarkup = loading ? (
       <ScreamSkeleton/>
    ) : (screams === null ? (
        <p>No screams from this user.</p>
    ) : !screamIdParam ?  (
        screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
    ) : (
        screams.map(scream => {
            if(scream.screamId !== screamIdParam){
                return  <Scream key={scream.screamId} scream={scream}/>;
            }
            else {
                return <Scream key={scream.screamId} scream={scream} openDialog={true}/>
            }
        })
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
