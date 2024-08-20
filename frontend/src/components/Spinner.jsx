import React from 'react'

const Spinner = () => {
  return (
    <div style={{height: "90vh"}} className='flex justify-center items-center h-100vh'>
    <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'></div>
    </div>
  )
}

export default Spinner