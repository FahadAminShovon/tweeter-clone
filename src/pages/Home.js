import React, {useEffect } from 'react'
// Mui imports
import Grid from '@material-ui/core/Grid'
// Component imports
import {Scream} from '../components';
import {Profile} from '../components';
// redux-imports
import { getScreams } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import ScreamSkeleton from '../util/ScreamSkeleton';


function Home() {
    const {screams, loading} = useSelector(state => state.data);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getScreams());
    },[]);

    let recentScreamsMarkup = !loading ? (
        screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
    ): (
    <ScreamSkeleton/>
    )

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
