"use client";
import UserContext from "@/Context/UserContext";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BiLogOut, BiMenu } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import { TiDocumentAdd } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTheme } from "@/Context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false); // For mobile nav toggle
    const { isDarkMode } = useTheme();
    const [snip, setSnip] = useState({
        title: "",
        description: "",
        body: ""
    });
    const [id, setId] = useState("");
    const [Submit, setSubmit] = useState("Submit");

    useEffect(() => {
        const storedId = sessionStorage.getItem("id");
        if (storedId) {
            setId(storedId);
        }
    }, []);

    const handleLogout = async () => {
        try {
            sessionStorage.removeItem("id");
            setOpenModal(false);
            toast.success("Logging out... Please wait!");
            router.push("/");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!snip.title || !snip.description || !snip.body) {
            toast.error("Please fill in all fields");
            return;
        }
        try {
            const res = await axios.post(" http://localhost:3000/api/AddSnip", { ...snip, id: id });
            setSubmit("Submitting...");
            setTimeout(() => {
                setSubmit("Submit");
            }, 2000);
            setSnip({
                title: "",
                description: "",
                body: ""
            });
            toast.success(res.data.message);
            setIsOpen(false);
        } catch (error) {
            toast.warn("Error: " + error.response?.data?.message || error.message);
        }
    };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`max-h-screen w-full p-4 sm:p-6 md:p-8 ${
                        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
                    }`}
                >
                    <div className="w-full flex flex-col md:flex-row justify-between items-center">
                        {/* Logo and Mobile Menu Button */}
                        <div className="flex w-full md:w-auto justify-between items-center">
                            <button onClick={() => router.push("/")}>
                                <div className="h-20 w-auto bg-gradient-to-r from-purple-600 to-purple-500 md:w-[200] mb-4 md:mb-0 text-white flex items-center justify-center rounded-2xl shadow-xl transform transition duration-500 ">
                                    <h1 className="text-6xl font-extrabold p-3">SnipZ</h1>
                                </div>
                            </button>
                            {/* Hamburger menu for mobile */}
                            <button
                                className="md:hidden ml-2 p-2 rounded focus:outline-none border-2 border-purple-400 hover:bg-purple-100 transition"
                                onClick={() => setNavOpen(!navOpen)}
                                aria-label="Toggle navigation"
                            >
                                <BiMenu size={36} className="text-purple-700" />
                            </button>
                        </div>
                        {/* Desktop Nav */}
                        <div className="hidden md:flex w-auto justify-around items-center gap-2">
                            <button
                                onClick={() => setOpenModal(true)}
                                className={`${isDarkMode ? 'bg-red-800 hover:bg-red-700' : 'bg-red-700 hover:bg-red-500'} md:px-4 text-white font-extrabold rounded-2xl py-2 px-2 focus:outline-none focus:shadow-outline flex items-center transition md:mr-7 mr-3 duration-500 hover:scale-105`}
                            >
                                <span className="md:mr-2.5 mr-2"><BiLogOut size={24} /></span>
                                Logout
                            </button>
                            <button
                                onClick={() => setIsOpen(true)}
                                className={`${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-[#655ade] hover:bg-purple-500'} text-white font-extrabold rounded-2xl py-2 px-2 focus:outline-none focus:shadow-outline flex items-center transition duration-500 hover:scale-105`}
                            >
                                <TiDocumentAdd size={24} />Add Snippet
                            </button>
                            <ToastContainer autoClose={2000} onClose={() => {
                                window.location.reload();
                            }} />
                            <div className="ml-8 mr-8">
                                <ThemeToggle  />
                            </div>
                            <div className="ml-0">
                                <UserContext /> 
                            </div>
                        </div>
                    </div>
                    {/* Mobile Nav */}
                    {navOpen && (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
        className="flex flex-col md:hidden w-full mt-4 gap-4"
    >
        <motion.div
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="flex items-center justify-between mb-4 bg-gradient-to-r from-purple-100 via-white to-purple-200 dark:from-purple-900 dark:via-gray-900 dark:to-purple-800 rounded-xl shadow-lg p-4 border border-purple-200"
        >
            <div className="flex-1 flex items-center gap-1">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: -8 }}
                    whileTap={{ scale: 0.95, rotate: 8 }}
                    className="transition-all"
                >
                    <ThemeToggle />
                </motion.div>
                <span className="mx-2 h-6 w-px bg-purple-300 dark:bg-purple-700 rounded-full"></span>
                <motion.div
                   
                    className="transition-all"
                >
                    <UserContext />
                </motion.div>
            </div>
        </motion.div>
        <button
            onClick={() => setOpenModal(true)}
            className={`${isDarkMode ? 'bg-red-800 hover:bg-red-700' : 'bg-red-700 hover:bg-red-500'} text-white font-extrabold rounded-2xl py-2 px-2 focus:outline-none focus:shadow-outline flex items-center transition duration-500 hover:scale-105`}
        >
            <span className="mr-2"><BiLogOut size={24} /></span>
            Logout
        </button>
        <button
            onClick={() => setIsOpen(true)}
            className={`${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-[#655ade] hover:bg-purple-500'} text-white font-extrabold rounded-2xl py-2 px-2 focus:outline-none focus:shadow-outline flex items-center transition duration-500 hover:scale-105`}
        >
            <TiDocumentAdd size={24} />Add Snippet
        </button>
    </motion.div>
)}
                </motion.div>
            </AnimatePresence>

            <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="right" className={`w-full sm:w-[600px] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                <DrawerHeader title="Add New Snippet" />
                <DrawerItems>
                    <form onSubmit={handleSend} className="space-y-6 p-4">
                        <div>
                            <label className={`block font-mono text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`} htmlFor="title">
                                Title
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 font-bold leading-tight focus:outline-none focus:shadow-outline ${
                                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'
                                }`}
                                id="title"
                                value={snip.title}
                                onChange={(e) => setSnip({ ...snip, title: e.target.value })}
                                type="text"
                                placeholder="Enter title..."
                                style={{
                                    border: `2px solid ${isDarkMode ? '#8b5cf6' : '#655ade'}`,
                                    transition: "transform 0.3s ease",
                                    boxShadow: "0px 5px 10px rgba(128, 0, 128, 0.2)"
                                }}
                            />
                        </div>
                        <div>
                            <label className={`block font-mono text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`} htmlFor="description">
                                Description
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 font-bold leading-tight focus:outline-none focus:shadow-outline ${
                                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'
                                }`}
                                id="description"
                                value={snip.description}
                                onChange={(e) => setSnip({ ...snip, description: e.target.value })}
                                type="text"
                                placeholder="Enter description..."
                                style={{
                                    border: `2px solid ${isDarkMode ? '#8b5cf6' : '#655ade'}`,
                                    transition: "transform 0.3s ease",
                                    boxShadow: "0px 5px 10px rgba(128, 0, 128, 0.2)"
                                }}
                            />
                        </div>
                        <div>
                            <label className={`block font-mono text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`} htmlFor="body">
                                Code
                            </label>
                            <textarea
                                className={`shadow appearance-none border rounded w-full py-2 px-3 h-64 font-bold leading-tight focus:outline-none focus:shadow-outline ${
                                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'
                                }`}
                                id="body"
                                value={snip.body}
                                onChange={(e) => setSnip({ ...snip, body: e.target.value })}
                                placeholder="Write your code here..."
                                style={{
                                    border: `2px solid ${isDarkMode ? '#8b5cf6' : '#655ade'}`,
                                    transition: "transform 0.3s ease",
                                    boxShadow: "0px 5px 10px rgba(128, 0, 128, 0.2)"
                                }}
                            />
                        </div>
                        <div>
                            <button
                                className={`${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-[#655ade] hover:bg-purple-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transform transition duration-500 hover:scale-105`}
                                type="submit"
                            >
                                {Submit}
                            </button>
                        </div>
                    </form>
                </DrawerItems>
            </Drawer>

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className={`mx-auto mb-4 h-14 w-14 ${isDarkMode ? 'text-gray-400' : 'text-white'}`} />
                        <h3 className={`mb-5 text-lg font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                            Are you sure you want to Logout?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="red" onClick={handleLogout}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default Navbar;