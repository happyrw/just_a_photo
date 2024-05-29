import React from 'react'
// import LoginForm from '../_components/login-form'
import GoogleButton from '../_components/google-button'

const SignInPage = () => {
  return (
    <div className='w-full md:w-[600px] bg-white px-5 sm:px-10 rounded-md py-[20px]'>
      <h1 className='text-[17px] font-bold'>Sign in</h1>
      <p className='text-sm text-slate-600'>To continue to just a photo</p>
      <GoogleButton />
      {/* <LoginForm /> */}
    </div>
  )
}

export default SignInPage