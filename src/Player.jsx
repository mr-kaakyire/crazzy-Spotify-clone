import React from 'react'
import Body from './Body'
import Footer from './Footer'
import Playlist from './Playlist'
import Sidebar from "./Sidebar"
import { useStateValue } from './StateProvider'



function Player({spotify}) {
  const [{playlist_id},dispatch]=useStateValue();
  
  return (
    <div className=''>
      <div className='flex'>
           <Sidebar/>
           {playlist_id?(<Playlist spotify={spotify}/>):(<Body spotify={spotify}/>)}
      </div> 
     
      <Footer spotify={spotify}/>
    </div>
  )
}


export default Player