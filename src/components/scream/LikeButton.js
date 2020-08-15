import React from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//Icons 
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { likeScream, unlikeScream } from '../../redux';
import { useDispatch } from 'react-redux';

function LikeButton({authenticated, likedScream, screamId}) {

    const dispatch = useDispatch();

    const likeButton = !authenticated ? (
        <Link to="/login">
            <MyButton tip="Like">
                <FavoriteBorder color="primary"/>
            </MyButton>
        </Link>
        
    ) : (
        likedScream() ? ( 
            <MyButton 
            tip="Undo like"
            onClick={() => dispatch(unlikeScream(screamId))}
            >
                <Favorite color="primary"/>
            </MyButton>
        ) : (
            <MyButton 
            tip="Like"
            onClick={() => dispatch(likeScream(screamId))}
            >
                <FavoriteBorder color="primary"/>
            </MyButton>
        )
    )
    return (
        likeButton
    )
}

LikeButton.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    screamId: PropTypes.string.isRequired,
    likedScream: PropTypes.func.isRequired
}

export default LikeButton
