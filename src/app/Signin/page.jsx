"use client"
import axios from 'axios'
import next from 'next'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'



const page = () => {
    const router=useRouter()
  const [user, setuser] = useState({
        
    email: "",
    password: ""
})
const send = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/api/Auth",user).then((res)=>{
        console.log(res.data)
        console.log(res.data.data._id)
        sessionStorage.setItem("id",res.data.data._id)

        setuser({
            
            email: "",
            password: ""
        })
        alert(res.data.message)
        router.push("/Snipps")
    })
        
    }

return (
<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
    <h1 className='text-3xl font-bold mb-4'>Sign Up</h1>
    <form className='bg-white p-6 rounded shadow-md w-96'>
       
        <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='email' value={user.email} onChange={(e)=>setuser({...user,email:e.target.value})} type='email' placeholder='Email' />
        </div>
        <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='password' value={user.password} onChange={(e)=>setuser({...user,password:e.target.value})} type='password' placeholder='Password' />
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full' type='submit' onClick={send}>Sign Up</button>
</form>
</div>
)
}

export default page