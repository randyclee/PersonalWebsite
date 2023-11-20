'use client'
import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header/Header'
import Game from '@/components/Home/Game'
import AboutMe from '@/components/Home/AboutMe'
import ContactForm from '@/components/Home/ContactForm'
import UpButton from '@/components/Footer/UpButton'
import More from '@/components/Home/More'
import ProjectCarousel from '@/components/Home/ProjectCarousel'
import WorkHistory from '@/components/Home/WorkHistory'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  const [showFooter, setShowFooter] = useState(false);
  const aboutMeRef = useRef(null);
  const downButtonRef = useRef(null);
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

  const scrollToAboutMe = () => {
    aboutMeRef.current?.scrollIntoView({ behavior: 'smooth' });
    console.log("clicked")
  };

  useEffect(() => {
    const handleScroll = () => {
      if (downButtonRef.current) {
        const { bottom } = downButtonRef.current.getBoundingClientRect();
        setShowFooter(bottom < 0); 
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mySchema ={
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Randy Lee",
    "description": "Randy Lee is a software engineer with a passion for business and technology. He is based in Toronto, Ontario",
    "url": "https://www.randyclee.com",
    "sameAs": [
      "https://www.linkedin.com/in/randyclee",
      "https://www.github.com/randyclee"
    ],
    "jobTitle": "Software Engineer",
    "alumniOf": "Queen’s University",
    "knowsAbout": ["Software Engineering", "Computer Engineering", "Business", "Data Engineering", "Databases"],
    "skill": ["Python", "Next.js", "JavaScript", "Tailwind", "React", "Business", "Databases", "SQL", "NoSQL"],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Engineer",
      "yearsInOccupation": "2",
      "mainEntityOfPage": "https://www.randyclee.com/resume"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Bachelors of Applied Science",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Queen’s University"
        }
      }
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.randyclee.com",
    "name": "Randy Lee's Personal Website",
    "author": {
      "@type": "Person",
      "name": "Randy Lee",
      "url": "https://www.randyclee.com"
    },
    "description": "Randy Lee's personal website showcasing his software engineering projects, work history, skills and has some apps to use.",
    "publisher": {
      "@type": "Person",
      "name": "Randy Lee"
    }
  };


  return (
    
    <div>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mySchema) }}
      />

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <Game darkMode={darkMode} toggleTheme={toggleTheme} scrollToAboutMe={scrollToAboutMe} downButtonRef = {downButtonRef}/>
      <div ref={aboutMeRef}> 
        <AboutMe darkMode={darkMode}/>
      </div>
      <ProjectCarousel darkMode={darkMode}/>
      <WorkHistory darkMode = {darkMode}/>
      <ContactForm darkMode={darkMode}/>
      <UpButton onScrollToTop={scrollToTop} isButtonVisible={showFooter} darkMode={darkMode}/>
      <More darkMode={darkMode}/>
      <Footer darkMode={darkMode}/>
    </div>
  )
}
