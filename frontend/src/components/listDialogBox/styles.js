
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
        maxHeight:"600px",
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