"use client"
import React, { useState } from 'react'
import { Drawer, DrawerHeader, DrawerItems, Tooltip } from "flowbite-react";
import { GiArtificialIntelligence } from "react-icons/gi";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const Ai = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ques, setQues] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generate = async (e) => {
    e.preventDefault();
    if (!ques.trim()) return; // Prevent empty submissions

    setIsLoading(true);
    setAnswer('');

    try {
      const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_AI_KEY}`, {
        contents: [{ parts: [{ text: ques }] }]
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Failed to generate content:', error);
      setAnswer('An error occurred while generating the response. Please try again.');
    } finally {
      setIsLoading(false);
      setQues('');
    }
  }

  const handleClose = () => setIsOpen(false);

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#655ade] hover:bg-purple-500 fixed bottom-4 md:right-12 right-4 text-white font-extrabold rounded-2xl py-2 px-2 focus:outline-none focus:shadow-outline w-auto sm:w-auto flex justify-around items-baseline transform transition duration-500 hover:scale-105 z-50"
      >
        <Tooltip content="Ask AI" style="light">
          <span><GiArtificialIntelligence size={44}/></span>
        </Tooltip>
      </button>
      
      <Drawer open={isOpen} onClose={handleClose} position="left" className="w-full sm:w-[400px]">
        <DrawerHeader title="AI Assistant" />
        <DrawerItems>
          <div className='p-2'>
            <textarea 
              readOnly 
              value={isLoading ? 'Generating response...' : answer}
              placeholder='AI response will appear here'
              className='text-white bg-gray-800 border-2 border-[#655ade] p-4 w-full h-[400px] rounded-md resize-none'
            />
          </div>
          <form onSubmit={generate} className="space-y-6 p-4">
            <div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 font-bold text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Question"
                type="text"
                placeholder="Write your question here..."
                value={ques}
                onChange={(e) => setQues(e.target.value)}
                style={{
                  border: "2px solid #655ade",
                  transition: "transform 0.3s ease",
                  boxShadow: "0px 5px 10px rgba(128, 0, 128, 0.2)"
                }}
              />
            </div>
            <div>
              <button
                className="bg-[#655ade] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/3  transform transition duration-500 hover:scale-105"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Submit'}
              </button>
            </div>
          </form>
        </DrawerItems>
      </Drawer>
    </div>
  )
}

export default Ai