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
    noComments:{
      color:"#9c9c9c",
        fontFamily: "'Open Sans', sans-serif",
        fontSize:"22px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        mt:"100px"
    },
    commentInput:{
        width:"600px",
        mt:"10px"
    },
    postBtn:{
      width:"80px",
      borderRadius:"30px",
      background:"#0095f6"
    },
    box:{
        height:"500px",
        overflow:"scroll",
        overflowX:"hidden",
        "::-webkit-scrollbar": {
            width:'5px'
          },
          "::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px"
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "#555",
            borderRadius: "10px"
          },
          "::-webkit-scrollbar-track ": {
            background: "#f1f1f1",
            borderRadius: "10px"
          }
    }
}