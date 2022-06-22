import React from 'react'

const Wrapper=(props)=> {
  return (
    <div className='xl:border-2 xl:border-slate-200 xl:rounded-sm xl:p-4 xl:pt-0'>
        <div className='flex justify-center mb-4'>
            <p className='text-2xl font-bold text-center xl:-mt-5 bg-white xl:px-4'>{props.title}</p>
        </div>
        {props.children}
    </div>
  )
}
export default Wrapper
