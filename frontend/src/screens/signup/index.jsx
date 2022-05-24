import React,{useState, useEffect} from 'react'
import { styles } from './styles';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../../store/Actions/User';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { CardMedia } from '@mui/material';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
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

export default function Signup() {

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState("");
  const [creds, setCreds] = useState({name:'', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (key) => {
    key.preventDefault();
    setCreds({ ...creds, [key.target.id]: key.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(creds.name, creds.email, creds.password, avatar));
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error]);


  return (
    <>
     <Container maxWidth="xl">
      <Navbar/>
        <Box sx={styles.box}>
            <div>
            <Paper variant="outlined" sx={{ p: 4 }}>
            <Typography
                sx={styles.textLogo} >
                ChitChat
            </Typography>
            <div style={styles.imgInputBox}>
            <Avatar
          src={avatar}
          alt="User"
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
          id="email"
          label="Enter your Email"
          placeholder="Email"
          value={creds.email || ''}
          onChange={handleChange}
          sx={styles.center}
        />
        <div style={styles.center}>
        <FormControl variant="outlined" sx={{mt:2, width: '35ch'}}>
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
        <Button variant="contained" sx={styles.loginBtn} onClick={submitHandler}>Sign up</Button>
        </div>
        <Divider sx={styles.divider}/>
        <div style={styles.center}>
        <Typography
                sx={styles.policyText} >
                By signing up, you agree to our Terms and Data Policy .
            </Typography>
            </div>
            </Paper>
            <Paper variant="outlined" sx={{ p: 4 ,mt:0.75}}>
            <Typography
                sx={styles.signupText1} >
                Have an account? <Link to="/" style={{textDecoration:'none'}}><Typography
                sx={styles.signupText2} >
                Log in
            </Typography>
            </Link>
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
