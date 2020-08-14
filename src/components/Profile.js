import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({...theme.spreadIt}));

function Profile() {
    const classes = useStyles();
    return (
        <div>
            ...profile
        </div>
    )
}

export {Profile};