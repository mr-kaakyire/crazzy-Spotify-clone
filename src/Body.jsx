import React, { useEffect } from 'react'
import Header from './Header'
import { useStateValue } from './StateProvider'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from './SongRow';
import SpotifyPlayer from 'react-spotify-player';
import axios from 'axios';


function Body({spotify}) {
  const [{discover_weekly,token,color},dispatch]=useStateValue();
  
  
  useEffect(()=>{
    const color_array=["#222937","#9fb7ce","#af3b2c","#3a5961","#ba6e4a","#4f399b","#046551","#c5ae61","#b8b8b8","#b5b5b5","#ed7197","#cb8925","#5b5773"];
    const random_color=color_array[Math.floor(Math.random()*14)];
    dispatch({
      type:"SET_COLOR",
      color:random_color
    })
  },[])
  

  
  const playPlaylist=(id)=>{
    spotify.play({
      context_uri:`spotify:playlist:${discover_weekly?.id}`,
    }).then((res)=>{
      spotify.getMyCurrentPlayingTrack().then((res)=>{
        
        dispatch({
          type:"SET_ITEM",
          item:res.item,
        });
        dispatch({
          type:"SET_PLAYING",
          playing:true,
        });
      })
    })

 
  }
  const playSong=(id)=>{
    spotify.play({
      uris:[`spotify:track:${id}`]
    })
    .then((res)=>{
      spotify.getMyCurrentPlayingTrack().then((res)=>{
        dispatch({
          type:"SET_ITEM",
          item:res.item
        })
        dispatch({
          type:"SET_PLAYING",
          playing:true
        })
      })
    })
  }
  return (
    <div style={{background:`linear-gradient(to bottom,${color} ,#000000)`}} className='flex-[0.9] overflow-y-scroll overflow-x-hidden scrollbar-hide text-white h-screen  py-3'>
      <Header spotify={spotify}/>
      <div className='flex items-end  '>
        <img className='object-contain min-h-[192px]  max-h-[255px] shadow-3xl mx-5' src={discover_weekly?.images[0]?.url} alt="" />
        <div className='flex-[1]'>
          <strong>PLAYLIST</strong>
          <h2 className=' text-[80px] font-bold mb-3'>{discover_weekly?.name}</h2>
          <p className='text-[15px] font-[600] text-[#b8bcc1]'>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className=' bg-gradient-to-b from-[#17161c]/50 via-[#121212] to-[#121212] mt-10  p-5  pb-10'>
        <div className='flex items-center space-x-5 ml-8 mt-3'>
          <PlayCircleIcon onClick={playPlaylist} style={{fontSize:"65px",color:"#1ed760"}}  className="hover:transition-all ease-in-out delay-150 hover:scale-105" />
          <FavoriteBorderIcon fontSize='large' />
          <MoreHorizIcon fontSize='large'/>
        </div>
        {/* Lists of songs */}
        <div className='my-5 -mx-8 p-5  '>
          {discover_weekly?.tracks.items.map((item,i)=>(
            <SongRow key={item.track.id} number={i+1} playSong={playSong} track={item.track}/>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Body