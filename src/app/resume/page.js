'use client'
import Header from '@/components/Header/Header'
import React, { Suspense, lazy } from 'react';
const Resume = lazy(() => import('@/components/Resume/Resume'));
import Footer from '@/components/Footer/Footer'
import { useState, useEffect } from 'react';

export default function Home() {
    const [darkMode, setDarkMode] = useState(true); 

    const breadcrumbSchema = {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
            "@type": "ListItem",
            "position": 1,
            "item": {
                "@id": "https://www.randyclee.com/",
                "name": "Home"
            }
            },
            {
            "@type": "ListItem",
            "position": 2,
            "item": {
                "@id": "https://www.randyclee.com/resume",
                "name": "Resume"
            }
            }
        ]
        };

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
        <Header darkMode = {darkMode} toggleTheme = {toggleTheme}/>
        <Resume darkMode = {darkMode}/>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Footer darkMode = {darkMode}/>
    </div>
    )
}
