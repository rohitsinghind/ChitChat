import React from 'react'
import { styles } from './styles';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from '../../../../store/Actions/Post';
import { getFollowingPosts, getUserPosts } from '../../../../store/Actions/User';

import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function Comment({ userId, name, avatar, comment, ownerId, postId, commentId}) {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandle = () => {
    dispatch(deleteCommentOnPost(postId, commentId));

    if (ownerId===user._id) {
      dispatch(getUserPosts(user._id));
    } else {
      dispatch(getFollowingPosts());
    }
  };

  return (
    <>
        
            <Card sx={styles.box}>
              <Avatar alt="" src={avatar} sx={styles.img}/>
                <Link to={`/user/${userId}`} style={{textDecoration:"none"}}>
                  <Typography sx={styles.name}>{name} : </Typography>
                </Link>
                <Typography sx={styles.comment}>{comment}</Typography>
                {(user._id===ownerId || user._id===userId)?
                <IconButton  variant="outlined" color="error" sx={styles.deleteBtn} onClick={deleteCommentHandle}>
                  <DeleteForeverIcon />
                </IconButton >:""}
            </Card>
        
    </>
  )
}
