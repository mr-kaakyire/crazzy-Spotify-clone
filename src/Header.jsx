import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Avatar } from '@mui/material';
import { useStateValue } from './StateProvider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ArrowDropUp } from '@mui/icons-material';

function Header({spotify}) {
  const [{user,token,greeting},dispatch]=useStateValue();
  const [dropDown,setDropDown]=useState(false);
  
  function truncate(string,n){
    return string.length > n ? string.substr(0,n-1)+'...':string

    }
  const handleLogout=()=>{
    dispatch({
      type:"SET_TOKEN",
      token:""
    })
  }
  const timeStamp =Date.now();
  const date=new Date(timeStamp);
  const hour=date.getHours()
  
  
  
  
  useEffect(()=>{
    
     
      if(hour<12){
        dispatch({
          type:"SET_GREETING",
          greeting:"Good Morning"
        })
      }else if(12<=hour && hour<18){
        dispatch({
          type:"SET_GREETING",
          greeting:"Good Afternoon"
        })
      }else {
        dispatch({
          type:"SET_GREETING",
          greeting:"Good Evening"
        })
      }
    
  },[])
  
  
  return (
    <div className='flex items-center justify-between mb-8'>
        {/* Header leftt */}
        <div>
          <p className='font-semibold text-[20px] sm:text-[28px] ml-32 sm:ml-5'>{greeting}</p>
        </div>
        {/* Header Right */}
      
          <div onClick={()=>setDropDown(!dropDown)} className='flex items-center h-fit space-x-2 bg-black rounded-3xl pr-2 mr-2 cursor-pointer hover:bg-[#000000]/60'>
            <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
            <h4 className='hidden sm:inline'>{truncate(`${user?.display_name}`,10)}</h4>
            {dropDown?(<ArrowDropUp/>):(<ArrowDropDownIcon/>)}
          </div>
          {dropDown?(
             <div className=' absolute right-3 top-10 flex-col  space-y-3 bg-[#282828] w-44 h-fit px-5 z-20 py-3 rounded-lg mt-5'>
             <p>Account</p>
             <p>Profile</p>
             <p>Settings</p>
             <p>Downloads</p>
             <hr className='border-gray-600 mx-auto' />
             <p onClick={handleLogout} className='text-green-400 active:text-white cursor-pointer'>Logout</p>
           </div>
          ):("")}
         
      
        
        
    </div>
  )
}

export default Header