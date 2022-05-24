import React, {useState,useEffect} from 'react'
import { styles } from './styles';
import {useDispatch, useSelector} from "react-redux"
import { getFollowingPosts, loadUser } from '../../store/Actions/User';
import { likePost } from '../../store/Actions/Post';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Post from '../../components/post';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { CardMedia } from '@mui/material';
import Typography from "@mui/material/Typography";


export default function Home() {  

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLike = async (post_Id) => {
    await dispatch(likePost(post_Id));
      dispatch(getFollowingPosts());
  };

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  useEffect(()=>{
    dispatch(getFollowingPosts());
  },[dispatch])

  return (
    <>
     <Container maxWidth="xl">
      <Navbar/>
        <Box sx={styles.box}>
        {posts?.length===0?
        <div>
          <div style={styles.center}>
        <CardMedia
              component="img"
              sx={styles.noPostImg}
              image={require("../../assets/images/noPost.jpg")}
            />
          </div>
            <Typography sx={styles.noPosttext}>
            No Post yet
            </Typography>
            </div>
            :
          <div>
          {loading ? <CircularProgress />:
          posts?.map((post)=>(
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              createdAt={post.createdAt}
              handleLike={handleLike}
            />
          ))
      }
      </div>}
        </Box>
      <Footer/>
      </Container>
    </>
  )
}
