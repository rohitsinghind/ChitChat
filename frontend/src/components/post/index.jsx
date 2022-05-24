import React,{useState,useEffect} from 'react'
import { styles } from './styles';
import Moment from 'react-moment';
import { useSelector } from "react-redux";

import ListDialogbox from '../listDialogBox';
import CommentDialogbox from '../commentDialogbox';

import Box from '@mui/material/Box';
import { CardMedia } from '@mui/material';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';


export default function Post({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  createdAt,
  handleLike,
  deletePostHandler
}) {

  const [liked, setLiked] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openLikeList, setOpenLikeList] = useState(false)
  const [openCommentBox, setOpenCommentBox] = useState(false)

  return (
    <>
      <Paper variant="outlined" sx={styles.box}>
          <Box sx={styles.head}>
            <Avatar alt="" src={ownerImage} />
            <Typography sx={styles.name} >
               {ownerName}
            </Typography>
            {ownerId===user._id?
            <div style={styles.menuBtn}>
              <IconButton
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon/>
              </IconButton>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={()=>{deletePostHandler(postId);handleClose();}}>Delete</MenuItem>
              </Menu>
            </div>:""}
          </Box>
          <Typography sx={styles.caption} >
              {caption}
            </Typography>
          <CardMedia
              component="img"
              sx={styles.img}
              image={URL=postImage}
            />
            <Stack direction="row" spacing={2} sx={styles.BtnGrp}>
              {liked?
              <IconButton color="error" onClick={()=>{handleLike(postId);setLiked(!liked);}}>
                <FavoriteIcon/>
              </IconButton> :
              <IconButton onClick={()=>{handleLike(postId);setLiked(!liked);}}>
                <FavoriteBorderIcon/>
              </IconButton>
            }
              <IconButton onClick={()=>{setOpenCommentBox(true)}}>
                <ChatBubbleOutlineIcon/>
              </IconButton>
            </Stack>
            <Typography sx={styles.likeText} onClick={()=>{setOpenLikeList(true)}}>
              {likes.length} like
            </Typography>
            <Typography sx={styles.commentText} >
               {comments.length} comment
            </Typography>
            <Typography sx={styles.dateText} >
            <Moment fromNow>{createdAt}</Moment>
            </Typography>
      </Paper>
      <ListDialogbox
          open={openLikeList}
          setOpen={setOpenLikeList}
          heading={"Likes"}
          users={likes}
        />
      <CommentDialogbox
        open={openCommentBox}
        setOpen={setOpenCommentBox}
        postId={postId}
        comments={comments}
        ownerId={ownerId}
      />
    </>
  )
}
