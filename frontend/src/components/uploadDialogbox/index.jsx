import React,{useState,useEffect} from "react";
import { styles } from "./styles";

import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../store/Actions/Post";
import { loadUser } from "../../store/Actions/User";

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
import { CardMedia } from '@mui/material';
import Box from "@mui/material/Box";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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

export default function UploadDialogbox(props) {

const [image, setImage] = useState("");
const [caption, setCaption] = useState("")

const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
    handleClose();
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: "clearErrors" });
      console.log(error)
    }

    if (message) {
      dispatch({ type: "clearMessage" });
      console.log(message)
    }
  }, [dispatch, error, message]);


  const handleClose = () => {
    props.setOpen(false);
    setImage("");
    setCaption("")
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        maxWidth="sm"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <DialogContent sx={styles.box}>
            <Typography sx={styles.head}>
                Create new post
            </Typography>
            <Divider />
            {image === ""?<>
            <Box sx={styles.flex}>
            <CardMedia
              component="img"
              sx={styles.sampleImg}
              image={require("../../assets/images/uploadImg.jpg")}
            />
            </Box>
            <Box sx={styles.chooseBtn}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            </Box></>:<>
             <Box sx={styles.flex}>
             <CardMedia
               component="img"
               sx={styles.sampleImg}
               image={image}
             />
             </Box>
             <Divider light variant="fullWidth" />
          <Stack
            direction="row"
            sx={styles.captionInputBox}
          >
            <TextField
              InputProps={{ disableUnderline: true }}
              multiline
              fullWidth
              value={caption}
              variant="standard"
              placeholder="Add a caption"
              onChange={(event) => setCaption(event.target.value)}
            />
             <Button sx={styles.uploadBtn} variant="contained" endIcon={<CloudUploadIcon />} onClick={submitHandler} disabled={loading}>
              Upload
            </Button>
          </Stack>
             </>
            }
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
