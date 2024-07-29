import React from 'react'
import { AuthForm } from '../components'


const Signup = () => {
  return (
    <div className='card shadow-2xl min-h-[100vh] flex items-center justify-center' >
    <AuthForm formType={"signup"} />
</div>
  )
}

export default Signup