
export const styles = {
    head:{
        color:"#262626",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"18px",
        display:"flex",
        justifyContent:"center",
        cursor:"pointer",
        fontWeight:600,
        mb:"10px"
    },
    box:{
        // width:"40vw",
        '@media (max-width: 550px)': {
            width:"88%",
        }
    },
    sampleImg:{
        width:"50%",
        '@media (max-width: 550px)': {
            width:"100%",
            maxHeight:"380px"
        }
    },
    chooseBtn:{
        display:"flex",
        justifyContent:"center",
        mb:"50px"
    },
    uploadBtn:{
        width:"130px",
        borderRadius:"30px",
        background:"#0095f6"
      },
    captionInputBox:{
        mt:"10px"
    },
    flex:{
        display:"flex",
        justifyContent:"center",
    }
}