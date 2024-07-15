'use client'
import { useRef, useState, useEffect } from 'react';
import { fetchResumeProjects } from '@/services/api/projectsApi';
import { fetchResumeWork } from '@/services/api/workSectionApi';

export default function Resume({darkMode}) {
  // State to track which section is currently active
  const [activeSection, setActiveSection] = useState(null);
  const [projects, setProjects] = useState([]);
  const [WorkHistory, setWorkHistory] = useState([]);

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  const loadData = async () => {
    const workData = await fetchResumeWork();
    setWorkHistory(workData);
    const projectData = await fetchResumeProjects();
    setProjects(projectData);
  };

  const resumeSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Randy Lee",
    "jobTitle": "Software Engineer",
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Queen's University",
        "sameAs": "http://www.queensu.ca"
      }
    ],
    "url": "https://www.randyclee.com",
    "sameAs": [
      "https://www.linkedin.com/in/randyclee",
      "https://www.github.com/randyclee"
    ],
    "knowsAbout": ["Software Engineering", "Computer Engineering", "Business", "Data Engineering", "Databases"],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Software Developer",
        "employmentType": "FULL_TIME",
        "organization": {
          "@type": "Organization",
          "name": "Bank of America"
        },
        "roleName": "Software Developer",
        "startDate": "2022-07",
        "endDate": "Present"
      },
      {
        "@type": "Occupation",
        "name": "Teaching Assistant",
        "roleName": "Teaching Assistant",
      },
      {
        "@type": "Occupation",
        "name": "Backend Development Intern",
        "roleName": "Backend Development Intern",
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Degree",
        "educationalLevel": "Bachelor's Degree",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Queen's University"
        }
      }
    ],
    "hasProject": [
      {
        "@type": "SoftwareApplication",
        "name": "Coursevent",
        "applicationCategory": "WebApplication",
        "creator": {
          "@type": "Person",
          "name": "Randy Lee"
        },
        "url": "http://www.coursevent.com",
        "description": "Class Marketplace Application with Social Elements"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Scobaby",
        "applicationCategory": "WebApplication",
        "creator": {
          "@type": "Person",
          "name": "Randy Lee",
          "url": "http://www.thescobaby.com",
          "description": "Kombucha eCommerce Site"
        },
      }
    ],
    "skill": [
      "Python",
      "Next.js",
      "JavaScript",
      "Tailwind",
      "React",
      "Business",
      "Databases",
      "SQL",
      "NoSQL"
    ]
  }

  // Refs for the sections and navigation buttons
  const sectionsRefs = {
    summary: useRef(null),
    workExperience: useRef(null),
    projects: useRef(null),
    education: useRef(null),
    skillsAwards: useRef(null),
  };

  const headerOffset = 64; 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -50% 0px',
        threshold: 0.4
      }
    );
    Object.values(sectionsRefs).forEach((ref) => {
        if (ref.current) {
          observer.observe(ref.current);
        }
    });


    return () => {
      Object.values(sectionsRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToSection = (section) => {
    const ref = sectionsRefs[section].current;
    if (ref) {
      const top = ref.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(section);
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Randy_Lee_Business_Resume.pdf'; 
    link.download = 'Randy_Lee_Resume.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (

    <div className={`flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-6 p-8 md:p-14 lg:px-20 lg:py-13 ${darkMode ? 'text-white bg-gray-800' : 'bg-white text-black'}`}>
      <aside className="col-span-1 lg:fixed lg:mt-16 lg:inset-y-0 lg:left-0 p-4 z-10 lg:h-screen flex flex-col items-center lg:w-1/3">
        <div className="space-y-2 w-full text-center  mb-2">
            <h1 className="text-4xl font-bold">Randy Lee</h1>
            <p className="text-lg">Software Engineer</p>
            <nav className="hidden md:block md:flex flex-col pt-5 mb-2 space-y-5">
                {Object.keys(sectionsRefs).map((section) => (
                <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`${
                        activeSection === section ? 'text-blue-600' : 'text-gray-500'
                    } hover:text-blue-600 w-full text-center`}
                >
                    {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                </button>
                ))}
            </nav>
        </div>
        <div className="p-4 w-full">
            <button
                className="w-full bg-blue-900 text-white py-2 px-4 rounded"
                onClick={downloadResume}
            >
                Download Resume
            </button>
        </div>
    </aside>

    <main className="col-span-2 lg:col-start-2 w-full">
            <section id="summary" ref={sectionsRefs.summary} className="mb-8">                
                <h2 className="text-xl font-bold mb-3">SUMMARY</h2>

                <div className="mb-6">
                <h3 className="text-md flex justify-between w-50%">
                    <span>Aspiring product manager with one year of full-time software engineering experience. I am a fast learner and hard worker with a strong interest in both software and business, constantly making projects that allow me to practice those skills. I studied computer engineering and have a certificate in business.</span>
                </h3>
                </div>
            </section>
            <section id="workExperience" ref={sectionsRefs.workExperience} className="mb-8">
              <h2 className="text-xl font-bold mb-3">WORK EXPERIENCE</h2>
              {WorkHistory.map((job) => (
                <div key={job._id} className="mb-6">
                  <h3 className="text-lg font-bold flex justify-between">
                    <span>{job.title}</span>
                    <span className="text-md font-normal">{job.time}</span>
                  </h3>
                  <p className="italic">{job.company}, {job.location}</p>
                  <ul className="list-disc ml-10 mr-10 mt-1">
                    {job.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section id="projects" ref={sectionsRefs.projects} className="mb-8">
              <h2 className="text-xl font-bold mb-3">PROJECTS</h2>
              {projects.filter(project => project.inResume).map((project) => (
                <div key={project.title} className="mb-6">
                  <h3 className="text-lg font-bold flex justify-between">
                    <span>{project.title}</span>
                    <span className="text-md font-normal">{project.year}</span>
                  </h3>
                  <p className="italic">{project.resumeHeading}</p>
                  <ul className="list-disc ml-10 mr-10 mt-1">
                    { project.resumePoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            
            <section id="education" ref={sectionsRefs.education} className="  mb-8">
            <h2 className="text-xl font-bold mb-3 ">EDUCATION</h2>
                <div className="mb-6">
                <h3 className="text-lg font-bold flex justify-between">
                    <span>Bachelor of Applied Science</span>
                    <span className="text-sm font-normal">Class of 2022</span>
                </h3>
                <p className="italic">Computer Engineering, Artificial Intelligence Stream</p>
                <p className="italic">Queen's University</p>
                </div>
                <div className="mb-6">
                <h3 className="text-lg font-bold flex justify-between">
                    <span>Certificate in Business</span>
                    <span className="text-sm font-normal">Class of 2022</span>
                </h3>
                <p className="italic">Queen's University</p>
                </div>
                <div className="mb-6">
                <h3 className="text-lg font-bold flex justify-between">
                    <span>Ontario Secondary School Diploma</span>
                    <span className="text-sm font-normal">Class of 2017</span>
                </h3>
                <p className="italic">St. Andrew's College</p>
                </div>
            </section>

            <section id="skillsAwards" ref={sectionsRefs.skillsAwards} className="mb-8">
                <h2 className="text-xl font-bold mb-3">SKILLS, CERTIFICATIONS, and AWARDS</h2>

                <div className="mb-2">
                    <p className="text-md "> <strong>Skills:</strong> Python, Next.js, JavaScript</p>
                </div>
                
                <div className="mb-2">
                    <p className="text-md"><strong>Certifications:</strong> Certificate in Business: Queen’s University (2022), Deep Learning Specialization: Coursera (2020)</p>
                </div>

                <div className="mb-2">
                    <p className="text-md"><strong>Awards:</strong> Dean’s List (2021), Marketing Excellence Award (2019), The Excellence Scholarship (2017)</p>
                </div>
            </section>

        </main>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeSchema) }}
            />
    </div>
  );
}
