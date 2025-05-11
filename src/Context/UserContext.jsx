'use client';
import React, { useState, useEffect } from 'react';

import User  from '@/components/ui/User';
import axios from 'axios';
import { LuSearchCode } from "react-icons/lu";
import { useTheme } from "@/Context/ThemeContext";

const UserContext = () => {
    const [person, setPerson] = useState([]);
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
                    setPerson(res.data.data1); 
                    console.log("User fetched successfully:", person);
                    
                    
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
    
  return (
    <div><User person={person} /></div>
  )
}

export default UserContext