'use client';
import React, { useState, useEffect } from 'react';
import Data from '@/components/Data';
import User  from '@/components/ui/User';
import axios from 'axios';
import { LuSearchCode } from "react-icons/lu";
import { useTheme } from "@/Context/ThemeContext";

const Context = () => {
    const [snips, setSnips] = useState([]);
   
    const [filteredSnips, setFilteredSnips] = useState([]);
    const [id, setId] = useState("");
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const storedId = sessionStorage.getItem("id");
        if (storedId) {
            setId(storedId);
        }
    }, []);

    const fetchall = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/AllSnips?id=${id}`);
            if (res.data && res.data.data) {
                
                
                setSnips(res.data.data);
                setFilteredSnips(res.data.data);
            } else {
                console.log("No snips found for this user.");
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchall();
        }
    }, [id]);

    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        const filtered = snips.filter((snip) => 
            snip.title.toLowerCase().includes(search) ||
            snip.description.toLowerCase().includes(search) ||
            snip.body.toLowerCase().includes(search)
        );
        setFilteredSnips(filtered);
    }

    return (
        <div className={`p-2 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className='flex justify-center items-center mb-4'>
                <span>
                    <LuSearchCode 
                        size={44}   
                        className={isDarkMode ? 'text-white' : 'text-gray-600'} 
                    />
                </span>
                <input 
                    type="text" 
                    placeholder='Search snippet...' 
                    className={`h-[40px] w-[900px] px-1  font-bold rounded-2xl border-4 ml-0 mr-3
                        ${isDarkMode 
                            ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-200' 
                            : 'bg-white text-gray-600 border-black placeholder-gray-600'
                        }
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    `}
                    onChange={handleSearch}
                />
            </div>
            <Data snips={filteredSnips} />
            
            {/* Only render User if person exists */}
        </div>
    );
};

export default Context;