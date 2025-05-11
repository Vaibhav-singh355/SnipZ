"use client";

import {  Modal, ModalBody, ModalHeader,ThemeProvider  } from "flowbite-react";
import { Fa6 } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Menu, X } from "lucide-react"
import Link from "next/link"
import { LuUserPlus } from "react-icons/lu";
import { useRouter } from "next/navigation"
import axios from "axios";

const First = () => {
  const [Submit, setSubmit] = useState("Submit")
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false);
 

  function onCloseModal() {
    setOpenModal(false);
   
  }


  const [openModal1, setOpenModal1] = useState(false);
  

  function onCloseModal1() {
    setOpenModal1(false);
    
  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const companyName = "PurpleWave"
  const currentYear = new Date().getFullYear()

  // Features data
  const features = [
    {
      title: "Intuitive Dashboard",
      description: "Access all your code and save in one beautifully designed interface.",
      delay: 0.1,
    },
    {
      title: "Advanced Analytics",
      description: "Access all  your code with our comprehensive analytic tools.",
      delay: 0.3,
    },
    {
      title: "Seamless Integration",
      description: "Connect with your AI and code without any hassle.",
      delay: 0.5,
    },
  ]

  //auth
  const [user1, setuser1] = useState({
        
    email: "",
    password: ""
})
const send1 = async (e) => {
    e.preventDefault()
    
    await axios.post("https://snip-z-vaibhav0dev-five.vercel.app/api/Auth",user1).then((res)=>{
        console.log(res.data)
        console.log(res.data.data._id)
        sessionStorage.setItem("id",res.data.data._id)
        
       

        setuser1({
            
            email: "",
            password: ""
        })
       
          setOpenModal1(false);
          
      
        toast(res.data.message);
        router.push("/Snipps")
       
    }).catch(()=>{
      if(!user1.email ||!user1.password) {
        toast("Please fill all fields");}
       
      else{
        toast.error("Invalid Credentials")
        setuser1({
            
            email: "",
            password: ""
        })
        setOpenModal1(false);
      }
        
    })}
  

    //add user
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const send = async (e) => {
    e.preventDefault();
   
    if(!user.name ||!user.email ||!user.password) {
      toast("Please fill all fields");
      return;
    }
    try {
      await axios.post("https://snip-z-vaibhav0dev-five.vercel.app/api/AddUser", user).then((res) => {
        toast(res.data.message);
        setOpenModal(false);
      setOpenModal1(true)
      setuser({
        name: "",
        email: "",
        password: ""
      });
      
    }).catch(() => {
      toast.error("user already exists");
      setuser({
        name: "",
        email: "",
        password: ""
      })
      
    })
    
      
      
    } catch (error) {
      toast("Error adding user");
      setuser({
        name: "",
        email: "",
        password: ""
      })
      
    }
  };

  return (
    <div className="max-h-screen bg-white  ">

      {/* Header */}

<ToastContainer autoClose={2000}  />

      {/* Hero Section */}
      <section className="relative  bg-gradient-to-r from-purple-500 to-blue-500 text-black overflow-hidden px-5 py-10 md:px-10 md:py-24">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >

              <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9 }}
              >
                <span className="text-2xl font-extrabold ">Welcome to</span>
                <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-6xl md:text-9xl">
                  Snip<span className="text-white">Z</span>
                </h1>
                <p className="text-3xl text-black font-extrabold mt-2">Code Smart,Code Fast</p>
              </motion.div>
              <motion.p
                className="text-2xl text-white font-extrabold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Transform your Code to Innovation with Snip<span className="text-white">Z</span>
              </motion.p>

              {/*Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="grid grid-cols-2 gap-5">
                  <div className="card flex justify-content-center ">
                    <button onClick={() => setOpenModal(true)} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-xl border-2 focus:outline-none focus:shadow-outline w-full transform transition duration-500 hover:scale-105"
                    ><span className="text-2xl flex justify-between items-center "> <span className="md:mr-1.5"><LuUserPlus /></span> Sign up</span></button>
                    <Modal show={openModal} size="md" className="bg-amber-400" onClose={onCloseModal} popup>
                      <ModalHeader />
                      <ModalBody>
                        <div className="space-y-6">
                          <h3 className="text-2xl font-bold  dark:text-white">Sign Up to our platform</h3>
                          <div className="mb-6">
                            <label
                              className="block text-white text-sm font-bold mb-2"
                              htmlFor="username"
                            >
                              Username
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                              id="username"
                              value={user.name}
                              onChange={(e) => setuser({ ...user, name: e.target.value })}
                              type="text"
                              placeholder="Username"
                              style={{
                                border: "2px solid #655ade",
                                transition: "transform 0.3s ease",
                                boxShadow: "0px 5px 10px rgba(128, 0, 128, 0.2)"
                              }}
                            />
                          </div>
                          <div>
                            <div className="mb-6">
                              <label
                                className="block text-white text-sm font-bold mb-2"
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                value={user.email}
                                onChange={(e) => setuser({ ...user, email: e.target.value })}
                                type="email"
                                placeholder="Email"
                                style={{
                                  border: "2px solid #655ade",
                                  transition: "transform 0.3s ease",
                                  boxShadow: "0px 5px 10px rgba(128, 0, 128, 0.2)"
                                }}
                              />
                            </div>
                            <div className="mb-6">
                              <label
                                className="block text-white text-sm font-bold mb-2"
                                htmlFor="password"
                              >
                                Password
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                value={user.password}
                                onChange={(e) => setuser({ ...user, password: e.target.value })}
                                type="password"
                                placeholder="Password"
                                style={{
                                  border: "2px solid #655ade",
                                  transition: "transform 0.3s ease",
                                  boxShadow: "0px 5px 10px rgba(128, 0, 128, 0.2)"
                                }}
                              />
                            </div>
                           
                          </div>
                          <div className="w-full">
                            <button
                              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transform transition duration-500 hover:scale-105"
                              type="submit"
                              onClick={send}
                            >
                              Sign Up
                            </button>
                          </div>

                        </div>
                      </ModalBody>
                    </Modal>
                  </div>



                  <div className="card flex justify-content-center ">
                    <button onClick={() => setOpenModal1(true)} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-xl border-2 focus:outline-none focus:shadow-outline w-full transform transition duration-500 hover:scale-105"
                    ><span className="text-2xl">Sign in</span></button>
                    <Modal show={openModal1} size="md" className="bg-amber-400" onClose={onCloseModal1} popup  >
                      <ModalHeader />
                      <ModalBody >
                        <div className="space-y-6 rounded-2xl shadow-2xl">
                          <h3 className="text-2xl font-bold  dark:text-white">Sign in to our platform</h3>
                          
                          <div>
                            <div className="mb-6">
                              <label
                                className="block text-white text-sm font-bold mb-2"
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                value={user1.email}
                                onChange={(e) => setuser1({ ...user1, email: e.target.value })}
                                type="email"
                                placeholder="Email"
                                style={{
                                  border: "2px solid #655ade",
                                  transition: "transform 0.3s ease",
                                  boxShadow: "0px 5px 10px rgba(128, 0, 128, 0.2)"
                                }}
                              />
                            </div>
                            <div className="mb-6">
                              <label
                                className="block text-white text-sm font-bold mb-2"
                                htmlFor="password"
                              >
                                Password
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                value={user1.password}
                                onChange={(e) => setuser1({ ...user1, password: e.target.value })}
                                type="password"
                                placeholder="Password"
                                style={{
                                  border: "2px solid #655ade",
                                  transition: "transform 0.3s ease",
                                  boxShadow: "0px 5px 10px rgba(128, 0, 128, 0.2)"
                                }}
                              />
                            </div>
                           
                          </div>
                          <div className="w-full">
                            <button
                              className="bg-[#655ade]  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transform transition duration-500 hover:scale-105"
                              type="submit"
                              onClick={send1}
                            >
                              Sign in
                            </button>
                          </div>

                        </div>
                      </ModalBody>
                    </Modal>
                  </div>
                </div>

              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative"
            >
              <div className="relative mx-auto w-full max-w-lg">
                {/* Animated background elements */}
                <motion.div
                  className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-purple-200/50 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 8,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-20 -right-10 h-60 w-60 rounded-full bg-purple-300/40 blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 10,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />

                {/* Dashboard mockup */}
                <motion.div
                  className="relative rounded-xl bg-white p-2 shadow-2xl ring-1 ring-purple-100/80"
                  initial={{ y: 20 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 8,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center justify-between border-b border-purple-200 p-2">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="h-4 w-40 rounded-full bg-purple-100"></div>
                  </div>
                  <div className="p-4">
                    <div className="grid gap-4">
                      <div className="h-10 w-full rounded-md bg-purple-50"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 rounded-md bg-purple-100"></div>
                        <div className="h-24 rounded-md bg-purple-100"></div>
                      </div>
                      <div className="h-32 rounded-md bg-purple-50"></div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-12 rounded-md bg-purple-200"></div>
                        <div className="h-12 rounded-md bg-purple-100"></div>
                        <div className="h-12 rounded-md bg-purple-300"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated wave */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            clipPath:
              "polygon(0% 100%, 0% 0%, 5% 20%, 10% 0%, 15% 10%, 20% 0%, 25% 20%, 30% 0%, 35% 10%, 40% 0%, 45% 20%, 50% 0%, 55% 20%, 60% 0%, 65% 20%, 70% 0%, 75% 10%, 80% 0%, 85% 30%, 90% 0%, 95% 20%, 100% 0%, 100% 100%)",
          }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-10 bg-white">
        <div className="container px-5">
          <motion.div
            className="text-center mb-16 "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl font-extrabold text-purple-900 mb-4">Powerful Features</h2>
            <p className="text-purple-700/70 max-w-2xl mx-auto font-bold">
              Our platform offers a new innovative way to code.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-purple-50 rounded-xl p-6 border border-purple-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.5 }}
              >
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <div className="h-6 w-6 rounded-full bg-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-2">{feature.title}</h3>
                <p className="text-purple-700/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
    </div>
  )
}
export default First;