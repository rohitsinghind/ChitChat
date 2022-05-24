export const styles = {
    box:{
        display:"flex",
        justifyContent:"start",
        alignItems:"center",
        my:"10px",
        py:"10px",
        width:"600px",
        position:"relative",
        '@media (max-width: 550px)': {
            width:"300px",
            '@media (max-width: 380px)': {
                width:"270px",
              },
          },
    },
    img:{
        width:"40px",
        height:"40px",
        ml:"20px"
    },
    name:{
        color:"#2D2D2D",
        fontFamily: "'Open Sans', sans-serif",
        fontWeight:600,
        fontSize:"20px",
        display:"flex",
        alignItems:"center",
        ml:"20px"
    },
    comment:{
        color:"#4D4D4D",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"17px",
        display:"flex",
        alignItems:"center",
        ml:"20px"
    },
    commentMobile:{
        color:"#4D4D4D",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"17px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        ml:"20px",
        mb:"10px"
    },
    deleteBtn:{
        position:"absolute",
        right:"20px"
    },
}