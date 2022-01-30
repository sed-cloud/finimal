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
    <div className='grid place-items-center h-screen content-center'>
      <h1 className='text-5xl font-bold font-["Poppins"] mb-32'>Personal Finance Application</h1>
      <div>
        <form onSubmit={onSubmit} className='grid place-items-start w-72'>
          {/* password field */}
          <label className="p-2 font-bold font-['Poppins'] text-xl text-center w-full">password</label>
          <input className={`
            rounded-xl
            border-2 
            p-2
            font-["Poppins"]
            mb-2
            text-md
            w-full
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

            rounded-3xl
            border-cyan-600
            border-2
            px-8
            py-2
            font-bold
            font-["Poppins"]
            bg-cyan-600
            text-cyan-50
            my-4
            w-full
            text-xl

            hover:bg-cyan-700
            hover:border-cyan-700
            hover:rounded-xl

            active:bg-cyan-500
            active:border-cyan-500
            active:rounded-md


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
