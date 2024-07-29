import React from 'react'

import { AuthForm } from '../components'


const Login = () => {
  return (
    <div className='card shadow-2xl min-h-[100vh] flex items-center justify-center' >
        <AuthForm formType={"login"} />
    </div>
  )
}

export default Login