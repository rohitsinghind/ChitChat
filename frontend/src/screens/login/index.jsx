import React,{useState, useEffect} from 'react'
import { styles } from './styles';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {loginUser} from "../../store/Actions/User"

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { CardMedia } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

export default function Login() {

  const [creds, setCreds] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();

  const {error} = useSelector((state)=> state.user);

  const handleChange = (key) => {
    key.preventDefault();
    setCreds({ ...creds, [key.target.id]: key.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(creds.email, creds.password))
  }

  useEffect(() => {
    if(error){
      dispatch({type: "clearErrors"});
    }
  }, [error,dispatch])
  

  return (
    <>
     <Container maxWidth="xl">
      <Navbar/>
        <Box sx={styles.box}>
          <CardMedia
              component="img"
              sx={styles.img}
              image={require("../../assets/images/loginImg.jpg")}
            />
            <div>
            <Paper variant="outlined" sx={{ p: 4 }}>
            <Typography
                sx={styles.textLogo} >
                ChitChat
            </Typography>
            <TextField
          id="email"
          label="Enter your Email"
          placeholder="Email"
          value={creds.email || ''}
          onChange={handleChange}
          sx={styles.center}
        />
        <div style={styles.center}>
        <FormControl variant="outlined" sx={{mt:2, width: '28ch'}}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
            placeholder="*****"
            type={showPassword ? 'text' : 'password'}
            value={creds.password || ''}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        </div>
        <div style={styles.center}>
        <Button 
        variant="contained" 
        sx={styles.loginBtn} 
        onClick={loginHandler}
        >Log in
        </Button>
        </div>
        <Divider sx={styles.divider}/>
        <Typography
                sx={styles.forgotPasswordText} >
                Forgot Password?
            </Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 4 ,mt:0.75}}>
            <Typography
                sx={styles.signupText1} >
                Don't have an account? <Link to="/signup" style={{textDecoration:'none'}}><Typography
                sx={styles.signupText2} >
                Sign up
            </Typography></Link>
            </Typography>
            </Paper>
            </div>
            <Box>
          </Box>
        </Box>
      <Footer/>
      </Container>
    </>
  )
}
