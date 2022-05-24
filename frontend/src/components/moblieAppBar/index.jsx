import React,{useState, useEffect} from 'react'
import { styles } from './styles';
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../store/Actions/User';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';

import UploadDialogbox from '../uploadDialogbox';

export default function MobileAppBar() {

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

  const [value, setValue] = useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);

  const mediaQuery = window.matchMedia("(max-width: 550px)");

  return (
    <>
    <UploadDialogbox open={open} setOpen={setOpen} />
    {!isAuthenticated||!mediaQuery.matches?"":
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation sx={{ width: "100%" }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        value="recents"
        icon={<HomeIcon
          onClick={()=>{navigate("/")}}
        />}
      />
      <BottomNavigationAction
        value="favorites"
        icon={<AddIcon 
          onClick={() => {
            setOpen(true);
          }}
        />}
      />
      <BottomNavigationAction
        value="nearby"
        icon={<PersonAddIcon 
          onClick={()=>{navigate("/friends")}}
        />}
      />
      <BottomNavigationAction value="folder" icon={<Avatar sx={{height:"30px", width:"30px"}} alt="" src={user?.avatar.url}/>} onClick={()=>{navigate(`/user/${user?._id}`)}}/>
    </BottomNavigation>
    </Paper>}
    </>
  );
}
