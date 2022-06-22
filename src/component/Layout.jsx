import React from 'react'
import { Link } from 'react-router-dom'

const Layout = (props) => {
  return (
      <div className='bg-slate-100 px-4 xl:px-16'>
        <div className='w-full min-h-screen bg-white py-7 px-4 xl:py-16 xl:pl-10'>
              <div className='text-5xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-lime-500 to-lime-500'>Todo List</div>
            <div className='text-lg border-l-4 font-bold border-cyan-600 pl-3 my-3'>
                <Link to={'/'}>HOME</Link>
              </div>
            <div className='flex flex-col gap-6'>
                {props.children}
            </div>  
        </div>    
    </div>
  )
}

export default Layout