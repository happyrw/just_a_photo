import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className='flex items-center justify-center p-2 h-[100vh]'>
      {children}
    </div>
  )
}

export default AuthLayout