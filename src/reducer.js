export const initialState={
    user:null,
    token:null,
    playlists:[],
    playing: false,
    played:null,
    item:null,
    discover_weekly:null,
    playlist_id:null,
    playlist:null,
    greeting:"",
    color:null
    

    


}

const reducer=(state,action)=>{
   
    
    switch (action.type) {
        case "SET_COLOR":
          return{
            ...state,
            color:action.color
          }
        case "SET_USER":
          return {
            ...state,
            user: action.user,
          };
    
        case "SET_PLAYING":
          return {
            ...state,
            playing: action.playing,
          };
    
        case "SET_ITEM":
          return {
            ...state,
            item: action.item,
          };
    
        case "SET_DISCOVER_WEEKLY":
          return {
            ...state,
            discover_weekly: action.discover_weekly,
          };
    
        case "SET_TOP_ARTISTS":
          return {
            ...state,
            top_artists: action.top_artists,
          };
    
        case "SET_TOKEN":
          return {
            ...state,
            token: action.token,
          };
    
        case "SET_PLAYLIST_ID":
          return {
            ...state,
            playlist_id: action.playlist_id,
          };
        case "SET_PLAYLIST":
          return{
            ...state,
            playlist:action.playlist
          }
        case "SET_PLAYLISTS":
          return {
            ...state,
            playlists: action.playlists,
          };
        case "SET_GREETING":
          return{
            ...state,
            greeting:action.greeting
          }  
        case "SET_PLAYED":
            return{
                ...state,
                played:action.played
            }
        default:
          return state;
      }
}
export default reducer;