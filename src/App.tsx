import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FaSteam, FaDiscord, FaXbox } from 'react-icons/fa'
import { SiEpicgames } from 'react-icons/si'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import './App.css'

interface GamingProfile {
  platform: string;
  username: string;
  link?: string;
  icon: React.ReactNode;
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const gamingProfiles: GamingProfile[] = [
    {
      platform: 'Steam',
      username: 'juninfb',
      link: 'https://steamcommunity.com/id/juninfb/',
      icon: <FaSteam size={24} />
    },
    {
      platform: 'Epic Games',
      username: 'juninfb',
      icon: <SiEpicgames size={24} />
    },
    {
      platform: 'Xbox Game Pass',
      username: 'fabeneJR',
      icon: <FaXbox size={24} />
    },
    {
      platform: 'Discord',
      username: 'fabene',
      icon: <FaDiscord size={24} />
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_0zhdjeg',
        'template_fkbh4fq',
        {
          to_email: 'paulo.fabene@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'hNeTPqn9QgNhTXVy-'
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 z-50 hover:scale-110 transition-transform"
        aria-label="Toggle dark mode"
      >
        {isDark ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
      </button>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-20 px-4 relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Paulo Fabene Jr</h1>
          <p className="text-xl opacity-90">Full Stack Developer & Gaming Enthusiast</p>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
      </header>

      {/* Gaming Profiles Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-center dark:text-white"
          >
            Gaming Profiles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamingProfiles.map((profile, index) => (
              <motion.div
                key={profile.platform}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center transition-colors duration-200"
              >
                <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                  {profile.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{profile.platform}</h3>
                {profile.link ? (
                  <a 
                    href={profile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline mt-2"
                  >
                    {profile.username}
                  </a>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{profile.username}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 max-w-2xl"
        >
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Request a Quote</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Details
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                required
              />
            </div>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              >
                Failed to send message. Please try again later.
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  )
}

export default App
