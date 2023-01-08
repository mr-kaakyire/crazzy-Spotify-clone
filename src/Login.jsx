import React from 'react'
import { loginUrl } from './spotify'

function Login() {
 
  return (
    <div className='grid place-items-center h-screen bg-black'>
        <img className='w-[100%]' src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="" />
        <a href={loginUrl} className='p-[10px] w-64 mx-auto bg-[#1db954] active:bg-[#17873f] rounded-3xl font-semibold  text-black decoration-0'>LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Login 