'use client'
import Header from '@/components/Header/Header'
import React, { Suspense, lazy } from 'react';
const VotePage = lazy(() => import('@/components/Vote/VotePage'));
import Footer from '@/components/Footer/Footer'
import { useState, useEffect } from 'react';

export default function Home() {
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
                "@id": "https://www.randyclee.com/vote",
                "name": "vote"
            }
            }
        ]
        };


    return (
    <div>
        <Header darkMode = {darkMode} toggleTheme = {toggleTheme}/>
        <VotePage darkMode = {darkMode}/>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Footer darkMode = {darkMode}/>
    </div>
    )
}
