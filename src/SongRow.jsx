import React from 'react'

function SongRow({track,number,id,playSong}) {
  return (
    <div onClick={()=>playSong(id)} className=' p-2 pl-10 w-[95%] mx-auto flex items-center   text-white cursor-pointer rounded-sm hover:bg-[#6c6c6c]/60'>
        <p className='mr-5'>{number}</p>
        <img className="h-10 w-10" src={track.album.images[0].url}  alt="" />
        <div className='ml-5'>
            <h1 className='text-sm sm:text-lg'>{track.name}</h1>
            <p className=' hidden sm:inline text-sm font-semibold  text-gray-500'>{track.artists.map((artists)=> artists.name).join(",")}
              {" "}  {track.album.name}
            </p>
        </div>
    </div>
  )
}

export default SongRow