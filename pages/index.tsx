import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../contexts/auth";
import { CustomPage } from '../lib/custom-page';

const Landing: CustomPage = () => {
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { authenticate } = useAuth()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    await authenticate(password)
    router.push('/home')
  }

  return (
    <div className='grid place-items-center h-screen content-center '>
      <div>
        <form onSubmit={onSubmit} className='grid place-items-start w-72 shadow-lg p-8 bg-stone-50'>
          <h1 className='text-5xl font-bold font-["Poppins"] mb-2'>finimal</h1>
          <h1 className='text-sm text-stone-400 font-["Poppins"] mb-4'>The premier personal finance terminal</h1>
          {/* password field */}
          <label className="py-2 font-bold font-['Poppins'] text-xl w-full">token</label>
          <input className={`
            border-2 
            p-2
            font-["Poppins"]
            mb-4
            text-md
            w-full
            rounded-xl
            border-stone-200
            `}
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          {/* login button */}
          <input className='
            transition-all
            ease-in-out
            durration-300

            bg-stone-200
            text-stone-900
            px-4
            py-2
            font-["Poppins"]
            font-bold
            rounded-xl
            w-full

            hover:bg-cyan-600
            hover:text-red-50
          '
            type='submit'
            value='login'
          ></input>
        </form>
        <div className='h-64'></div>
      </div>
    </div>
  );
}

Landing.requiresAuth = false
Landing.redirectAuthenticatedTo = '/home'

export default Landing
