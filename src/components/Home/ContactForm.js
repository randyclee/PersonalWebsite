import { useState } from 'react';

export default function ContactForm({darkMode}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:your-email@example.com?subject=Contact from ${name}&body=${message}%0A%0AFrom: ${name} (${email})`;
    window.location.href = mailtoLink;
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Randy",
    "description": "Get in touch with Randy for business inquiries or collaborations."
  }

  return (
    <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-gradient-to-l from-black via-gray-900 to-black text-white' : 'bg-gradient-to-l from-white via-gray-100 to-white text-black'}`}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className={`p-8 ${darkMode ? "":"bg-white"}  shadow-2xl rounded-md md:w-[60vw] w-[80vw] `}>
        <h2 className="text-3xl font-bold text-center mb-8">Contact Me For Any Inquiries!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">  
          <div>
            <textarea
              className={`w-full p-2 border border-gray-300 rounded-md ${darkMode ? "bg-gray-600 text-white":"bg-white text-black"}`}
              placeholder="Your Message"
              required
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
              <input
                className={`w-full p-2 border border-gray-300 rounded-md ${darkMode ? "bg-gray-600 text-white":"bg-white text-black"}`}
                type="text"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-2/3 px-2">
              <input
                className={`w-full p-2 border border-gray-300 rounded-md ${darkMode ? "bg-gray-600 text-white":"bg-white text-black"}`}
                type="email"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
