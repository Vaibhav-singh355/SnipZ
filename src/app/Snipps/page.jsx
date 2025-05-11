"use client";

import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Ai from "@/components/Ai";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/Context/ThemeContext";

import UserContext from "@/Context/UserContext";

// Lazy load the Context component
const Context = lazy(() => import("@/Context/Context"));

// Skeleton loader component
const SkeletonLoader = ({ isDarkMode }) => (
    <div className="animate-pulse space-y-4">
        <div className={`h-4 rounded w-3/4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className={`h-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className={`h-4 rounded w-5/6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
    </div>
);

const Page = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState("");
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const storedId = sessionStorage.getItem("id");
        if (storedId) {
            setId(storedId);
        }
        // Simulate loading delay
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`min-h-screen w-full p-4 sm:p-6 md:p-6 ${
                    isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
                }`}
            >
                <div className="flex justify-between items-center mb-4">
                    <Navbar /> 
                    
                    
                    
                </div>
                <Ai />
                <div className="flex flex-col">
                    <div className={`min-h-min w-full px-4 ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    } rounded-lg shadow-lg`}>
                        <div className="p-4">
                            {isLoading ? (
                                <SkeletonLoader isDarkMode={isDarkMode} />
                            ) : (
                                <Suspense fallback={<SkeletonLoader isDarkMode={isDarkMode} />}>
                                    <Context />
                                </Suspense>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Page;