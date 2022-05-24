export const styles = {
    box: {
        minHeight: '55vh',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    center:{
        display:"flex",
        justifyContent:"center",
        margin: "50px 0px"
    },
    profilePic:{
        width:"200px",
        height:"200px"
    },
    noPostImg:{
        width:"40%",
    },
    noPosttext:{
        color:"#9c9c9c",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"34px",
        display:"flex",
        justifyContent:"center",
        mt:"20px",
    },

    userName:{
        color:"#2D2D2D",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"24px",
        fontWeight:700,
        display:"flex",
        justifyContent:"center",
        cursor:"pointer",
        mt:"20px"
    },
    text1:{
        color:"#2D2D2D",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"28px",
        fontWeight:700,
        '@media (max-width: 550px)': {
            fontSize:"24px",
          },
    },
    text2:{
        color:"#2D2D2D",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"17px",
        cursor:"pointer",
        '@media (max-width: 550px)': {
            fontSize:"15px",
          },
        '&:hover':{
            color:"#546f83",
            fontWeight:600
        }
    },
}