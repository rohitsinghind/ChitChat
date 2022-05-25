import React,{useState, useEffect} from 'react'
import { styles } from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../store/Actions/User';

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

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

export default function EditProfileDialogbox({open, setOpen}) {

    const dispatch = useDispatch();

    const {
        user
      } = useSelector((state) => state.user);

      useEffect(() => {
        dispatch(loadUser())
      }, [dispatch])

  const handleClose = () => {
    setOpen(false);
  };

  const [avatar, setAvatar] = useState(user?.avatar.url);
  const [creds, setCreds] = useState({name:user?.name, phoneNumber:user?.email});

  const handleChange = (key) => {
    key.preventDefault();
    setCreds({ ...creds, [key.target.id]: key.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(creds.name, creds.phoneNumber, avatar));
    dispatch(loadUser());
    setOpen(false);
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
                Edit Profile
            </Typography>
            <Divider />
            <Box sx={styles.box}>
            <div style={styles.imgInputBox}>
            <Avatar
          src={avatar}
          alt=""
          sx={{ height: "70px", width: "70px",mr:"20px" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
            <TextField
          id="name"
          label="Enter your Name"
          placeholder="Name"
          value={creds.name || ''}
          onChange={handleChange}
          sx={styles.name}
        />
            <TextField
          id="phoneNumber"
          label="Enter your Phone Number"
          placeholder="Phone Number"
          type="number"
          value={creds.phoneNumber || ''}
          onChange={handleChange}
          sx={styles.center}
        />
        <div style={styles.center}>
        <Button variant="contained" sx={styles.loginBtn} onClick={submitHandler}>Update</Button>
        </div>
              </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}