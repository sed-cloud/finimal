import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../contexts/auth";
import { useNotification } from "../contexts/notification";
import { CustomPage } from '../lib/custom-page';


const Landing: CustomPage = () => {
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { authenticate } = useAuth()
  const { showNotification } = useNotification()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    authenticate(password).then((result) => {
      if (result) {
        router.push('/home')
      } else {
        showNotification('Invalid Entry Token Provided')
      }
    })
  }

  return (
    <div className='grid place-items-center h-screen content-center '>
      <div>
        <form onSubmit={onSubmit} className='grid place-items-start w-72 shadow-lg p-8 bg-white rounded-lg'>
          <h1 className='text-5xl font-bold font-["Poppins"] mb-2'>finimal</h1>
          <h1 className='text-sm text-stone-400 font-["Poppins"] mb-4'>the personal finance terminal designed to minimize your finances</h1>
          {/* password field */}
          <label className="py-2 font-bold font-['Poppins'] text-xl w-full">token</label>
          <input className={`
            border-stone-200
            p-2
            font-["Poppins"]
            mb-4
            text-md
            w-full
            rounded-xl
            border-2

            focus:border-stone-700
            focus:outline-none
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
