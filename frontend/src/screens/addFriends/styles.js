export const styles = {
    box:{
        minHeight:"93vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    img:{
        width:"30%",
        mr:"5%"
    },
    searchInputBox:{
      width:"400px",
      my:"15px"
    },
    search:{
      display:"flex",
        justifyContent:"center",
        pl:"20px",
    },
    card:{
        display:"flex",
        justifyContent:"center",
        height:"500px",
        px:"10px",
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