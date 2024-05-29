import { CheckCircle } from 'lucide-react';
import React from 'react'

interface ComponentProps {
    message: string | undefined
}

const FormSuccess = ({ message }: ComponentProps) => {
    if(!message) {
        return null;
    }
  return (
    <div className='p-2 bg-emerald-500/15 rounded-md w-full'>
        <p className='text-emerald-500 flex items-center'><CheckCircle className='h-4 w-4 mr-2' />{message}!</p>
    </div>
  )
}

export default FormSuccess;