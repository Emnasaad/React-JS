import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';
import LikeButton from './LikeButton';
import DeleteScream from './DeleteScream';


//import IconButton
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


import {likeScream ,  unlikeScream, deleteScream} from '../redux/actions/dataActions';


// Redux
import { connect } from 'react-redux';
import MyButton from '../util/MyButton';

const styles = {
    card: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20 
      
      
      
      
    },
    image: {
      minWidth: 200
    },
    
    content: {
      padding: 25,
      objectFit: 'cover'
    }
   
    
   
  };

class Scream extends Component {
  likedScream = () => {
    if ( this.props.user.likes && this.props.user.likes.find(like => like.screamId=== this.props.scream.screamId))
    return true;
    else return false;
  };
   likeScream = () => {
     this.props.likeScream(this.props.scream.screamId);
   }
   unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  }

    render() {
      dayjs.extend(relativeTime)
      
      const {
        classes,
        scream: {
          body,
          createdAt,
          userImage,
          userHandle,
          screamId,
          likeCount,
          commentCount,
          

        },
        user: {
          authenticated,
          credentials: {handle}

        }
        
      } = this.props;
        

       const likeButton = !authenticated ? (
         <MyButton tip= "Like">
           <Link to= "/LoginProfile" >
             <FavoriteBorder color = "primary"/>
           </Link>

         </MyButton>
       ):(

        this.likedScream() ? (
               <MyButton tip="Undo like" onClick={this.unlikeScream}>
                 <FavoriteIcon color = "primary"/>
               </MyButton>
        ): (
          
          <MyButton tip="Like" onClick={this.likeScream}>
                 <FavoriteBorder color = "primary"/>
               </MyButton>
        )

       );

       const deleteButton = authenticated && userHandle === handle ? (
         <DeleteScream screamId = {screamId} />

       ): null


        return (
          <Card className={classes.card}>
                <CardMedia 
                image={userImage}
                title="Profile image" className={classes.image} />
                
                <CardContent className={classes.content}>
        <Typography variant="h5" component= {Link} to={`/user/${userHandle}`}>{userHandle}</Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant="body1">{body}</Typography>
                {likeButton}
        <span> {likeCount} Likes </span>
                <MyButton tip="comments">
                  <ChatIcon/> 
                </MyButton>
        <span>{commentCount} Comments</span>
                </CardContent>
            </Card>
        );
    }
}
    

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
};



const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unlikeScream

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
