'use client'
import Header from '@/components/Header/Header'
import GamePage from '@/components/Apps/WordGame/GamePage'
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


    const webpageSchema = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "Word Game",
        "description": "Engage in an exciting word game challenge on Randy Lee's website. Test your vocabulary skills and have fun!",
        "url": "https://www.randyclee.com/explore/categories-game"
    };

    const gameSchema = {
        "@context": "http://schema.org",
        "@type": "Game",
        "name": "Randy's Word Game",
        "description": "A challenging and fun word game to test your vocabulary and problem-solving skills.",
        "gamePlatform": "Web Browser",
        "publisher": "Randy Lee",
        "url": "https://www.randyclee.com/explore/categories-game"
    };

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
            "@id": "https://www.randyclee.com/explore",
            "name": "Explore"
        }
        },
        {
        "@type": "ListItem",
        "position": 3,
        "item": {
            "@id": "https://www.randyclee.com/explore/categories-game",
            "name": "Categories Game"
        }
        }
    ]
    };
      
    return (
    <div>
        <Header darkMode = {darkMode} toggleTheme = {toggleTheme}/>
        <GamePage darkMode = {darkMode}/>
        <Footer darkMode = {darkMode}/>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
        />

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
        />

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
    </div>
    )
}
