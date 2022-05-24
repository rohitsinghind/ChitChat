import React,{useState, useEffect} from 'react'
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from "react-router-dom";
import { getUserPosts, getUserProfile, followAndUnfollowUser} from '../../store/Actions/User';
import { likePost,deletePost } from '../../store/Actions/Post';

import Navbar from '../../components/navbar';
import Post from '../../components/post';
import Footer from '../../components/footer';
import ListDialogbox from '../../components/listDialogBox';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardMedia } from '@mui/material';

export default function Profile() {

const dispatch = useDispatch();
const params = useParams();


const {
  user,
  loading: userLoading,
  error: userError,
} = useSelector((state) => state.userProfile);

const {user: me} = useSelector((state) => state.user);
const {loading, error, posts} = useSelector((state) => state.userPosts);
const {
  error: followError,
  message,
  loading: followLoading,
} = useSelector((state) => state.like);

const [open, setOpen] = useState(false)
const [isFollower, setIsFollower] = useState(false)
const [following, setFollowing] = useState(false);
const [myProfile, setMyProfile] = useState(false);

const followHandler = async () => {
  setFollowing(!following);
  await dispatch(followAndUnfollowUser(user._id));
  dispatch(getUserProfile(params.id));
};

useEffect(() => {
  dispatch(getUserPosts(params.id))
  dispatch(getUserProfile(params.id))
}, [dispatch, params.id])

useEffect(() => {
  if(me._id === params.id){
    setMyProfile(true);
  }
  if(user){
    user.followers.forEach((item)=>{
      if (item._id === me._id){
        setFollowing(true);
      }
      else{
        setFollowing(false)
      }
    })
  }
}, [user, me._id, params._id]);

const handleLike = async (post_Id) => {
  await dispatch(likePost(post_Id));
  dispatch(getUserPosts(params.id))
};

useEffect(()=>{
  dispatch(getUserPosts(params.id))
},[dispatch, params.id])

const deletePostHandler = async (post_Id) => {
  await dispatch(deletePost(post_Id));
  dispatch(getUserPosts(params.id))
  dispatch(getUserProfile(params.id))
};

const mediaQuery = window.matchMedia("(max-width: 550px)");

  return (
    <>
        <Container maxWidth="xl">
      <Navbar/>
      <Stack direction={mediaQuery.matches?"column":"row"} spacing={"10%"} alignItems='center' sx={styles.center}>
        <Box>
            <Avatar
              src={user?.avatar.url}
              sx={styles.profilePic}
            />
            <Typography sx={styles.userName}>
            {user?.name}
            </Typography>
          </Box>
          <Box>
            <Stack direction="row" spacing={mediaQuery.matches?2:5} divider={<div>|</div>} alignItems='center' justifyContent="center">
              <Stack alignItems='center'>
                <Typography sx={styles.text1}>
                {user?.posts.length}
                </Typography>
                <Typography sx={styles.text2}>
                  POSTS
                </Typography>
              </Stack>
              <Stack alignItems='center'>
                <Typography sx={styles.text1} onClick={()=>{setIsFollower(true); setOpen(true)}}>
                {user?.followers.length}
                </Typography>
                <Typography sx={styles.text2} onClick={()=>{setIsFollower(true); setOpen(true)}}>
                  FOLLOWERS
                </Typography>
              </Stack>
              <Stack alignItems='center'>
                <Typography sx={styles.text1} onClick={()=>{setIsFollower(false); setOpen(true)}}>
                {user?.following.length}
                </Typography>
                <Typography sx={styles.text2} onClick={()=>{setIsFollower(false); setOpen(true)}}>
                  FOLLOWINGS
                </Typography>
              </Stack>
            </Stack>
            {
              myProfile?"":
            
            <Stack
              direction="row"
              spacing={4}
              sx={styles.center}
            >
              <Button
                onClick={followHandler}
                disabled={followLoading}
                variant={'contained'}
                style={{width:"140px", background: following ? "gray" : "" }}
              >
               {following ? "Unfollow" : "Follow"}
              </Button>
              <Button
                variant="outlined"
                style={{width:"140px"}}
              >
                Message
              </Button>
            </Stack>
          }
            </Box>
            </Stack>
        <Box sx={styles.box}>
          
            {posts?.length===0?<div>
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
            </div>:<div>
          {loading ? <CircularProgress />:
          posts?.map((post)=>(
            loading? <CircularProgress/>:
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
              deletePostHandler={deletePostHandler}
            />
          
          ))
      }
      </div>}
        </Box>
      <Footer/>
      </Container>
      {
        isFollower?
        <ListDialogbox
          open={open}
          setOpen={setOpen}
          heading={"Followers"}
          users={user?.followers}
        />:
        <ListDialogbox
          open={open}
          setOpen={setOpen}
          heading={"Followings"}
          users={user?.following}
        />
      }
    </>
  )
}
