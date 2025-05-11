import React from 'react';
import { useTheme } from '@/Context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        isDarkMode ? 'bg-gray-800 text-yellow-300' : 'bg-yellow-300 text-gray-800'
      }`}
    >
      {isDarkMode ? <FaSun size={30} /> : <FaMoon size={30} />}
    </button>
  );
};

export default ThemeToggle;