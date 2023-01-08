
import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import {useStateValue} from "./StateProvider";


const spotify = new SpotifyWebApi();

function App() {
  const [{user,token,playlists},dispatch]=useStateValue();
  
  
    useEffect(()=>{
        
        const hash=getTokenFromUrl()
        window.location.hash=""
        const _token=hash.access_token;
        
        if(_token){
          dispatch({
            type:"SET_TOKEN",
            token:_token
          })
          
          

          spotify.setAccessToken(_token);

         
          spotify.getMe().then(user=>{
            dispatch({
              type:"SET_USER",
              user:user
            })
            
          })
          spotify.getUserPlaylists().then((playlists)=>{
            dispatch({
              type:"SET_PLAYLISTS",
              playlists:playlists,
            })
           const discover_weekly = playlists?.items.find((playlist)=>playlist.name==="Discover Weekly")
           discover_weekly?( 
            spotify.getPlaylist(discover_weekly.id).then((res)=>{
                dispatch({
                  type:"SET_DISCOVER_WEEKLY",
                  discover_weekly:res
                })
            })
            
          ):(
          spotify.getPlaylist(playlists?.items[0].id).then((res)=>{
            dispatch({
              type:"SET_DISCOVER_WEEKLY",
              discover_weekly:res
            })
        })
          )
           
           
          })
          
        }
       
        
    },[])
   



  return (
    <div className="app">
      {
        token?(
          <Player  spotify={spotify}/>
        ):(
          <Login/>
        )
      }
   
    </div>
  );
}


export default App;

