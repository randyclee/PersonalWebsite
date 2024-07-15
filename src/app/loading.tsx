'use client'
import React from 'react';
import { useState, useEffect,  } from 'react';
import Header from '@/components/Header/Header'

export default function Load() {

  const [darkMode, setDarkMode] = useState(true); 

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = sessionStorage.getItem('darkMode');
      if (savedMode !== null) {
        setDarkMode(savedMode === 'true');
      }
    }
  }, []);

  return (
    
    <div>

      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

    </div>
  )
}
