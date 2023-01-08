import React, { useState } from 'react'
import Body from './Body'
import Footer from './Footer'
import Playlist from './Playlist'
import Sidebar from "./Sidebar"
import { useStateValue } from './StateProvider'
import { loginUrl } from './spotify'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearIcon from '@mui/icons-material/Clear';


function Player({spotify}) {
  const [{playlist_id},dispatch]=useStateValue();
  var [showSidebar,setShowSidebar]=useState(false)
  console.log(showSidebar)

  

  var display=null
  var color=null
  {showSidebar? display=" inline sm:inline absolute sm:relative z-20 sm:z-0 flex-[0.1]":display="hidden sm:inline absolute sm:relative z-20 sm:z-0 flex-[0.1]"}
  {showSidebar? color="white":color="black"}

  
 
  
  return (
    <div >
      {showSidebar?(<ClearIcon fontSize='large' style={{color:`${color}`}} onClick={()=>setShowSidebar(!showSidebar)} className=' inline sm:hidden  absolute top-4 z-30'/>)
      :(<MoreHorizIcon fontSize='large' style={{color:`${color}`}} onClick={()=>setShowSidebar(!showSidebar)} className=' inline sm:hidden  absolute top-4 z-30'/>
)}


      <div className='flex '>
            <div className={display}>
            <Sidebar/>
            </div>

           {playlist_id?(<Playlist spotify={spotify}/>):(<Body spotify={spotify}/>)}
      </div> 
     
      <Footer spotify={spotify}/>
    </div>
  )
}


export default Player