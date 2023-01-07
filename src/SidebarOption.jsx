import React from 'react'

function SidebarOption({title,Icon}) {
  

  return (
    <div  className='flex items-center font-semibold  space-x-2 text-gray-500 h-8 cursor-pointer hover:text-white active:text-green-400 transition-all ease-in delay-100 active:textgreen'>
        {Icon && <Icon/>}
        {Icon? (<h4>{title}</h4>):(<p className='mt-3 ml-5 text-[14px]'>{title}</p>)}
        

    </div>
  )
}

export default SidebarOption