import React from 'react'
import { loginUrl } from './spotify'

function Login() {
 
  return (
    <div className='grid place-items-center h-screen bg-black'>
        <img className='w-[100%]' src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="" />
        
          <a className='p-[10px]  px-12 flex items-center justify-center bg-[#1db954] active:bg-[#17873f] active:scale-105 rounded-3xl font-[600]  text-[#373737] decoration-0' href={loginUrl}>LOGIN WITH SPOTIFY</a>
        
        
    </div>
  )
}

export default Login 