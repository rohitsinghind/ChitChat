import React,{useState, useEffect} from 'react'
import { styles } from './styles'
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost } from '../../store/Actions/Post';
import { getFollowingPosts } from '../../store/Actions/User';

import Comment from './components/comment';

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

export default function CommentDialogbox({open, setOpen, postId, comments=[], ownerId}) {

  const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
      };

    const [comment, setComment] = useState("")

    const addCommentHandler = async (e) => {
      e.preventDefault();
      await dispatch(addCommentOnPost(postId, comment));
        dispatch(getFollowingPosts());
    };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <DialogContent>
            <Typography sx={styles.head}>
                Comments
            </Typography>
            <Divider />
            <Box sx={styles.box}>
            {comments?.length===0? <Typography sx={styles.noComments}>
                No comments yet
            </Typography>:
            comments?.map((user) => (
              <Comment 
                key={user._id}
                userId={user.user._id}
                name={user.user.name}
                avatar={user.user.avatar.url}
                comment={user.comment}
                ownerId={ownerId}
                postId={postId}
                commentId={user.commentId}
                setOpen={setOpen}
              />
              ))}
              </Box>
              <Divider light variant="fullWidth" />
          <Stack
            direction="row"
            sx={styles.commentInput}
          >
            <TextField
              InputProps={{ disableUnderline: true }}
              multiline
              fullWidth
              value={comment}
              variant="standard"
              placeholder="Add a comment"
              onChange={(event) => setComment(event.target.value)}
            />
             <Button sx={styles.postBtn} variant="contained" disabled={false} onClick={addCommentHandler}>
              post
            </Button>
          </Stack>
        </DialogContent>
      </BootstrapDialog>
    </>
  )
}
