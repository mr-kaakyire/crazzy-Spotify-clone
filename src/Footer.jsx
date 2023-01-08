import React, { useEffect, useState } from 'react'
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import { Grid,Slider } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import { useStateValue } from './StateProvider';
import { PauseCircleFilledOutlined } from '@mui/icons-material';


function Footer({spotify}) {
  const [{item,playing,played},dispatch]=useStateValue();
  const [volume,setVolume]=useState(50)
  const num_render=0
  
  
  
  
  

  const handleVolume=(e)=>{
    setVolume(e.target.value)
    spotify.setVolume(volume)
  }
  
 

 
  useEffect(()=>{
  
   const timeOut=setTimeout(()=>{
    spotify.getMyCurrentPlaybackState().then((res)=>{
      
      dispatch({
        type:"SET_PLAYING",
        playing:res.is_playing
      })
      dispatch({
          type:"SET_ITEM",
          item:res.item,
      })
      
      const percentage=(res?.progress_ms/res?.item.duration_ms)*100;
      
      
      const progressBar=document.querySelector("article");
      progressBar.style.width=`${percentage}%`
      
    
     
    })
   },1000)

   return ()=>{
    clearTimeout(timeOut)
  }
  
 })

  useEffect(()=>{
    spotify.getMyRecentlyPlayedTracks().then((res)=>{
    
      dispatch({
        type:"SET_PLAYED",  
        played:res.items[0].track
      })
  })
  },[])

 
  const handlePlayPause=()=>{
    if(playing){
      spotify.pause();
      dispatch({
        type:"SET_PLAYING",
        playing:false,
      })
    }else{
      spotify.play();
      dispatch({
        type:"SET_PLAYING",
        playing:true
      })
    }
  }

  const skipNext=()=>{
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((res)=>{
      dispatch({
        type:"SET_ITEM",
        item:res.item
      })
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    })
  }

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((res) => {
      dispatch({
        type: "SET_ITEM",
        item: res.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
      
    });
  };
 
  return (
    <div style={{boxShadow:" 0px 1px 0px 0px rgba(209,198,198,0.1) inset"}} className='fixed flex items-center   border-t-gray-600 justify-between bottom-0 h-[90px] w-screen bg-[#181818] text-white p-5 '>
      {/* Footer left */}
      <div className='flex-[0.3] flex items-center max-w-[300px]'>
        <img className='object-contain mr-5 h-12 w-12 rounded-sm' src={item?(item?.album.images[0].url):(played?.album.images[0].url)} alt="" />
        <div>
          <h4 className='font-bold text-xs sm:text-sm'>{item?(item.name):(played?.name)}</h4>
          <p className='sm:inline hidden text-xs text-gray-400'>{item?(item.artists.map((artist)=>(artist.name)).join(", ")):(played?.artists.map((artist)=>(artist.name)).join(", "))}</p>
        </div>
      </div>
      {/* Footer center */}
      <div className='flex-[0.5]   flex-col justify-center max-w-xs items-center  text-white'>
       <div className='flex justify-center items-center mx-auto '> 
        
        <ShuffleIcon className='active:text-white text-green-500' />
        <SkipPreviousRoundedIcon onClick={skipPrevious} className='hover:text-white text-gray-400 ' fontSize='large'/>
        {playing?(
          <PauseCircleFilledOutlined onClick={handlePlayPause} fontSize="large" className='active:transform active:scale-90'/>
        ):(
          <PlayCircleIcon onClick={handlePlayPause} className='active:transform active:scale-90  ' fontSize='large'/>

        )}
        <SkipNextRoundedIcon onClick={skipNext} className='hover:text-white text-gray-400' fontSize='large'/>
        <RepeatIcon className='active:text-white text-green-500'/>
        </div>
       <article className='progress-bar max-w-[150px] ml-10 sm:ml-0 sm:max-w-[300.8px] mt-5'/>
      </div>
      {/* Footer right */}
      <div className='flex-[0.2] flex  justify-between items-center text-white'>
        <Grid container spacing={1}>
          <Grid item className='hidden sm:inline'>
              <PlaylistPlayIcon/>
          </Grid>
          <Grid  item className='hidden sm:inline'> 
            <VolumeDownIcon  />
          </Grid>
          <Grid  item xs>
            <Slider  value={volume} name="volume" onChange={handleVolume}  size='small' />
          </Grid>
          <Grid item className='hidden sm:inline'>
            <VolumeUpIcon/>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Footer