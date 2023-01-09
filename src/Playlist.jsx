import React, { useEffect } from 'react'
import Header from './Header'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useStateValue } from './StateProvider';
import SongRow from './SongRow';


function Playlist({spotify}) {
  const [{playlist_id,playlist,color},dispatch]=useStateValue()
 
  useEffect(()=>{
    const color_array=["#222937","#9fb7ce","#af3b2c","#3a5961","#ba6e4a","#4f399b","#046551","#c5ae61","#b8b8b8","#b5b5b5","#ed7197","#cb8925","#5b5773"];
    const random_color=color_array[Math.floor(Math.random()*14)];
    dispatch({
      type:"SET_COLOR",
      color:random_color
    })
  },[playlist_id])

  const playPlaylist=()=>{
    spotify.play({
      context_uri:`spotify:playlist:${playlist_id}`,
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
  useEffect(()=>{
    spotify.getPlaylist(playlist_id).then(res=>{
      dispatch({
        type:"SET_PLAYLIST",
        playlist:res,


      })
    })
  },[playlist_id])
  return (
    <div style={{background:`linear-gradient(to bottom,${color} ,#000000)`}} className="flex-[1] sm:flex-[0.9] overflow-scroll scrollbar-hide text-white h-screen  py-3 ">
    <Header/>
    <div className='flex items-end  '>
      <img className='object-contain min-h-[192px]  max-h-[255px] shadow-3xl mx-5' src={playlist?.images[0].url} alt="" />
      <div className='flex-[1]'>
        <strong>PLAYLIST</strong>
        <h2 className='text-[80px] font-bold mb-3'>{playlist?.name}</h2>
        <p className='text-[15px] font-[600] text-[#b8bcc1]'>{playlist?.description}</p>
      </div>
    </div>
    <div className=' bg-gradient-to-b from-[#17161c]/50 via-[#121212] to-[#121212] my-10 p-2 pb-10'>
      <div className='flex items-center space-x-5 ml-8 mt-3'>
        <PlayCircleIcon onClick={()=>playPlaylist}  style={{fontSize:"65px",color:"#1ed760"}}  className="hover:transition-all ease-in-out delay-150 hover:scale-105" />
        <FavoriteBorderIcon fontSize='large' />
        <MoreHorizIcon fontSize='large'/>
      </div>
      {/* Lists of songs */}
      <div className='my-5 -mx-8 p-5 '>
        {playlist?.tracks.items.map((item,i)=>(
          <SongRow key={item.track.id} id={item.track.id} number={i+1} playSong={playSong} track={item.track}/>
        ))}

      </div>

    </div>
  </div>
  )
}

export default Playlist