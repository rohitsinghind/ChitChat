export const styles = {
    box:{
        width:"100%",
        mt:"20px",
    },
    head: {
        p:"10px",
        display:"flex",
        alignItems:"center",
        position:"relative",
    },
    name:{
        ml:"15px",
        color:"#1D1D1D",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"17px",
        display:"flex",
        alignItems:"center",
        fontWeight:600,
    },
    menuBtn:{
        position:"absolute",
        right:"10px"
    },
    caption:{
        ml:"20px",
        mb:"10px",
        color:"#1D1D1D",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"17px",
        display:"flex",
        alignItems:"center",
    },
    img:{
        width:"100%",
        minWidth:"600px",
        maxHeight:"600px",
        '@media (max-width: 550px)': {
            minWidth:"100%",
            maxHeight:"450px",
          },
    },
    BtnGrp:{
        m:"20px",
        '@media (max-width: 550px)': {
            m:"4px"
          },
    },
    likeText:{
        ml:"20px",
        mb:"10px",
        color:"#2D2D2D",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"12px",
        fontWeight:600,
        cursor:"pointer",
        height:"22px",
        '@media (max-width: 550px)': {
            mb:"0px",
          },
        '&:hover':{
            color:"#546f83",
            fontSize:"13px",
        }
    },
    commentText:{
        ml:"20px",
        mb:"10px", 
        color:"#2D2D2D",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"12px",
        '@media (max-width: 550px)': {
            mb:"5px",
          },
    },
    dateText:{
        ml:"20px",
        mb:"20px",
        color:"#2D2D2D",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"12px",
        '@media (max-width: 550px)': {
            mb:"10px",
          },
    },

  };