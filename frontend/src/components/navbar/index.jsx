import React,{useState, useEffect} from 'react'
import { styles } from './styles';
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logoutUser } from '../../store/Actions/User';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {CardMedia} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import UploadDialogbox from '../uploadDialogbox';
import EditProfileDialogbox from '../editProfileDialogbox';
import DeleteDialogbox from '../deleteDialogbox';

export default function Navbar() {

  const dispatch = useDispatch();

  let location = useLocation();
  let navigate = useNavigate();

  const {
    user,
    isAuthenticated
  } = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(logoutUser());
    dispatch(loadUser())
  };

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mediaQuery = window.matchMedia("(max-width: 550px)");

  return (
    <>
    <UploadDialogbox open={open} setOpen={setOpen} />
    <EditProfileDialogbox open={openEdit} setOpen={setOpenEdit} />
    <DeleteDialogbox open={openDelete} setOpen={setOpenDelete} />
      <AppBar position="static" color='transparent'>
        <Toolbar>
        <CardMedia
          component="img"
          sx={styles.logo}
          image={require("../../assets/images/logo.png")}
        />
          <Typography sx={styles.logoText}>
            ChitChat
          </Typography>
          {!isAuthenticated?"":
          mediaQuery.matches? <>
          <IconButton size="large" edge="end" id="fade-button"
                aria-controls={open2 ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open2 ? 'true' : undefined}
                onClick={handleClick}
                sx={{ml:"20px"}}
                >
              <MoreVertIcon />
            </IconButton>
            <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open2}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={()=>{setOpenEdit(true)}}>Edit Profile</MenuItem>
                <MenuItem onClick={()=>{setOpenDelete(true)}}>Delete my account</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
          </>:
          <Box sx={styles.buttons}> 
            <IconButton size="large" sx={{color:`${location.pathname === "/"?"#005dab":"#545454"}`}} onClick={()=>{navigate("/")}}>
                <HomeIcon />
            </IconButton>
            <IconButton  size="large"  sx={{color:`${open === true ?"#005dab":"#545454"}`}} onClick={() => {
                setOpen(true);
              }}>
                <AddIcon />
            </IconButton>
            <IconButton size="large" edge="end" sx={{color:`${location.pathname === "/friends"?"#005dab":"#545454"}`}} onClick={()=>{navigate("/friends")}}>
              <PersonAddIcon />
            </IconButton>
            <IconButton size="large" edge="end" sx={{border:`${location.pathname === `/user/${user?._id}`?"1px solid #005dab":""}`,ml:"22px",}} onClick={()=>{navigate(`/user/${user?._id}`)}}>
            <Avatar alt="" src={user?.avatar.url} sx={{height:"25px",width:"25px",m:"-10px"}}/>
            </IconButton>
            <IconButton size="large" edge="end" id="fade-button"
                aria-controls={open2 ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open2 ? 'true' : undefined}
                onClick={handleClick}
                sx={{ml:"20px"}}
                >
              <MoreVertIcon />
            </IconButton>
            <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open2}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={()=>{setOpenEdit(true)}}>Edit Profile</MenuItem>
                <MenuItem onClick={()=>{setOpenDelete(true)}}>Delete my account</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
          </Box>}
        </Toolbar>
      </AppBar>
    </>
  )
}
