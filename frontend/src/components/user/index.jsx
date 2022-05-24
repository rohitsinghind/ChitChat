import React from 'react'
import { styles } from './styles';
import { Link } from "react-router-dom";

import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";

export default function User({ userId, name, avatar }) {
  return (
    <>
    <Link to={`/user/${userId}`} style={{textDecoration:"none"}}>
    <Card sx={styles.box}>
        <Avatar alt="" src={avatar} sx={styles.img}/>
        <Typography sx={styles.name}>{name}</Typography>
    </Card>
    </Link>
    </>
  )
}
