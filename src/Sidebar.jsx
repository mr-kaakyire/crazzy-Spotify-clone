import React, { useEffect } from 'react'
import SidebarOption from './SidebarOption'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {useStateValue} from "./StateProvider";
import AddBoxIcon from '@mui/icons-material/AddBox';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MenuIcon from '@mui/icons-material/Menu';

function Sidebar() {
  const [{playlists,playlist_id},dispatch]=useStateValue();
  
  
  
 

  
  
  const handlePlaylistid=(id)=>{
    dispatch({
      type:"SET_PLAYLIST_ID",
      playlist_id:id
    })
    
  }

  const returnHome=()=>{
      dispatch({
        type:"SET_PLAYLIST_ID",
        playlist_id:null
      })
  }

 

 
  return (
    <div className='overflow-scroll scrollbar-hide  h-screen min-w-[230px] px-3 py-5 bg-black text-white '>
      
      <img className='h-10 mx-auto ' src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="" />
      
      <div className='flex-col space-y-8 mt-5 ml-2'>
        <div>
        <div onClick={()=>returnHome()}>
          <SidebarOption    title="Home" Icon={HomeOutlinedIcon}/>
        </div>
        <SidebarOption title="Search" Icon={SearchIcon}/>
        <SidebarOption title="Your Library" Icon={LibraryMusicIcon}/>

        </div>
       <div className='flex-col items-center justify-center space-y-2'>
        <div className='flex items-center  text-gray-500 hover:text-white space-x-2 -ml-1 ' >
            <AddBoxIcon style={{fontSize:"30px",}} />
            <h1 className='font-semibold'>Create Playlist</h1>
          </div>
          <div className='flex items-center text-gray-500 hover:text-white space-x-3' >
            <img className='object-contain h-[23px]  rounded-sm' src="https://community.spotify.com/t5/image/serverpage/image-id/104727iC92B541DB372FBC7/image-size/large?v=v2&px=999" alt="" />
            <h1 className='font-semibold'>Liked Songs</h1>
          </div>
          <div className='flex items-center text-gray-500 hover:text-white space-x-2' >
            <BookmarkIcon style={{color:"#159643",fontSize:"32px"}} className="-ml-[3px]" />
            <h1 className='font-semibold'>Your Episodes</h1>
          </div>
       </div>
      </div>
      <br />
      <strong className='p-3 text-[12px]'>PLAYLISTS</strong>
      <hr className=' border-gray-600 w-[90%] my-2 mx-auto' />
      {playlists?.items?.map((playlist)=>(
        <div key={playlist.id} onClick={()=>handlePlaylistid(playlist.id)}  >
          <SidebarOption title={playlist.name}/>
        </div>
      ))}
      
     
    </div>
  )
}
export default Sidebar
