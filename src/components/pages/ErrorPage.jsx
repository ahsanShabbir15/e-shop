import React from 'react'
import errorImg from '../../assets/404.avif'
const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='text-red-600 text-4xl font-bold'>404 Something went wrong</p>
      <img src={errorImg} alt="" className='h-[80vh] object-contain' />
    </div>
  );
  
}

export default ErrorPage
