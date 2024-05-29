import { FaExclamationCircle } from "react-icons/fa";

interface ComponentProps {
    message: string | undefined
}

const FormError = ({ message }: ComponentProps) => {
    if(!message) {
        return null;
    }
  return (
    <div className='bg-destructive/10 p-2 rounded-md w-full'>
        <p className='flex items-center text-destructive'><FaExclamationCircle className="h-4 w-4 mr-2" /> {message}!</p>
    </div>
  )
}

export default FormError;