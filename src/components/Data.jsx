'use client';
import { CodeBlock } from "@/components/ui/code-block";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

import React, { useState,useEffect } from 'react';
import axios from 'axios';


const Data = ({snips=[]}) => {
    console.log(snips); // Debugging line to check the snips data
    const [Id, setId] = useState("");
    
        // Retrieve ID from sessionStorage after component mounts
        useEffect(() => {
            const storedId = sessionStorage.getItem("id");
            if (storedId) {
                setId(storedId);
            }
        }, []);
    
    const del=async(id)=>{
        axios.delete(`  http://localhost:3000/api/Delete?id=${id}&uid=${Id}`).then((res)=>{
           toast.error(res.data.message) // Reload the page to reflect the deletion
           
        })
    }

    
  return (
    <div className='p-4 sm:p-6 md:p-10 '>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 font-stretch-expanded secondary text-center '> Your Snippets</h1>
         
         {snips.length===0 ? (
            <p className="text-center text-2xl font-bold secondary text-gray-400">No snippet available</p>
            
         ):(
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                {snips.map((snip) => (
            <div key={snip._id} className='mb-4 bg-white shadow-2xl md:max-xl: rounded-2xl border-2 solid p-4 sm:p-6 md:p-8'>
                
                <h2 className='text-xl sm:text-2xl font-extrabold text-purple-600 secondary mb-2 flex justify-between items-center'>{snip.title} <span className="bg-white text-red-700 rounded-4xl p-1 transform hover:scale-120 "><button onClick={()=>del(snip._id)}> <FaTrash />  </button>

                
                </span></h2>
                <span className="text-red-600">
                <ToastContainer autoClose={2000}  onClose={()=>{
                                                window.location.reload( );
                                            }} />
                                             </span>
                
                <p className='text-gray-500 text-base sm:text-lg font-bold mb-3'>{snip.description}</p>
                
                <CodeBlock
                    language="javascript"
                    code={snip.body}
                    filename={snip.title}
                    highlightLines={[1, 2]}
                />
               
            </div>
            ))}
        </div>
            
         )}
        
    </div>
  )
}

export default Data