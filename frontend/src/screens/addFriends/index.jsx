import React, {useState, useEffect} from 'react'
import { styles } from './styles';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../../store/Actions/User';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import User from '../../components/user';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { CardMedia } from '@mui/material';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';


export default function AddFriends() {

  const [name, setName] = useState("")

  const { users, loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  useEffect(() => {
    dispatch(getAllUsers(name))
  }, [dispatch])


  // document.onkeydown = checkKey;

  // function checkKey(e) {

  //   e = e || window.event;

  //   if (e.keyCode == '13') {
  //     submitHandler()
  //   }
  // }

  const mediaQuery = window.matchMedia("(max-width: 550px)");

  return (
    <>
    <Container maxWidth="xl">
      <Navbar/>
        <Box sx={styles.box}>
          {mediaQuery.matches?"":
        <CardMedia
              component="img"
              sx={styles.img}
              image={require("../../assets/images/addFriends.jpg")}
            />}
          <Paper  sx={styles.card}>
            <div>
            <Stack
            direction="row"
            sx={styles.searchInputBox}
          >
            <TextField
              InputProps={{ disableUnderline: true }}
              fullWidth
              value={name}
              sx={styles.search}
              variant="standard"
              placeholder="Search"
              onChange={(event) => setName(event.target.value)}
            />
             <IconButton  onClick={submitHandler} disabled={loading}>
              <SearchIcon /> 
            </IconButton >
          </Stack>
          <Divider />
            {
            users?.map((user) => (
              <User 
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
              ))}
            </div>
          </Paper  >
        </Box>
        <Footer/>
      </Container>
    </>
  )
}
