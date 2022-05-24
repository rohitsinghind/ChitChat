import React from 'react'
import { styles } from './styles';

import Typography from "@mui/material/Typography";
import Toolbar from '@mui/material/Toolbar';

export default function Footer() {
  return (
    <Toolbar sx={styles.toolbar}>
  
        <Typography
          variant='h6'
        >&copy;2022 ChitChat</Typography>
      
    </Toolbar>
  )
}