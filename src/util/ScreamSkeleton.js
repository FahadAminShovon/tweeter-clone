import React, { Fragment } from 'react'
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';


const useStyles = makeStyles(theme => ({...theme.spreadIt,
    card:{
        display: 'flex',
        marginBottom: 20,
    },
    cardContent: {
        width: "100%",
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover'
    },
    handle: {
        width: 60,
        height: 18,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 7
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: "90%",
        marginBottom: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    },
    halfLine: {
        height: 15,
        width: "50%",
        marginBottom: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    },

}));

function ScreamSkeleton() {

    const classes = useStyles();
    const content = Array.from({ length: 5}).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg}/>
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}></div>
                <div className={classes.date}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.halfLine}></div>
            </CardContent>
        </Card>
    ))
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}



export default ScreamSkeleton
