import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Home() {
  const [theme, setTheme] = useState("dark"); // Default to dark
  const router = useRouter();

  // Apply theme and persist it
  useEffect(() => {
    // On initial load, check localStorage for saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme);
    } else {
      // Apply the current theme to the document
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const handleStartForFree = () => {
    router.push("/");
  };

  return (
    <div className={`min-h-screen transition-colors duration-500`}>
      <Head>
        <title>Noteify - Timeless Productivity</title>
        <meta name="description" content="A workspace of unparalleled clarity and elegance." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg py-4 px-6 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Noteify
          </motion.h1>
          <nav className="flex items-center space-x-8">
            {["About", "Features", "Pricing"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05, color: theme === "dark" ? "#A3A3A3" : "#6B7280" }}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-500"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-gray-900">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Timeless Productivity
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Noteify brings clarity to your chaos—where notes, tasks, and ideas unite in a workspace designed for focus and elegance.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartForFree}
              className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Start for Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 px-6 py-3 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About Noteify
          </motion.h3>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Noteify redefines productivity with a minimalist, powerful workspace. Built to streamline your thoughts and amplify your creativity—simple yet profound.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Our Story
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Designed for Mastery
          </motion.h3>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Tools that empower you to work smarter, not harder—crafted with precision and purpose.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: "📝",
                title: "Rich Notes",
                desc: "Capture ideas with rich text, images, and embeds—synced instantly across devices.",
              },
              {
                icon: "📊",
                title: "Dynamic Databases",
                desc: "Organize projects with customizable tables, boards, and filters—built for flexibility.",
              },
              {
                icon: "👥",
                title: "Real-Time Collaboration",
                desc: "Work together seamlessly with live editing, comments, and version history.",
              },
              {
                icon: "📄",
                title: "Smart Templates",
                desc: "Kickstart your work with pre-built layouts for notes, plans, and trackers.",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)" }}
                className="p-6 bg-gray-50 dark:bg-gray-950 rounded-lg transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-3xl text-gray-500 dark:text-gray-400 mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Pricing That Fits
          </motion.h3>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
          >
            From solo creators to growing teams—choose a plan that scales with you.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                title: "Free",
                price: "$0",
                desc: "Unlimited notes, basic collaboration, and core features—forever free.",
                color: "gray-500",
              },
              {
                title: "Pro",
                price: "$8/mo",
                desc: "Advanced editing, unlimited databases, and priority support for power users.",
                color: "gray-600",
              },
              {
                title: "Team",
                price: "$15/user/mo",
                desc: "Enhanced security, team permissions, and premium features for collaboration.",
                color: "gray-700",
              },
            ].map((plan) => (
              <motion.div
                key={plan.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.05)" }}
                className={`p-6 bg-white dark:bg-gray-900 rounded-lg border-t-2 border-${plan.color} dark:border-${plan.color} transition-all duration-300`}
              >
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{plan.title}</h4>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{plan.price}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{plan.desc}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={plan.title === "Free" ? handleStartForFree : null}
                  className={`bg-${plan.color} dark:bg-${plan.color} text-white px-6 py-2 rounded-md font-medium hover:bg-${plan.color}-600 dark:hover:bg-${plan.color}-600 transition-all duration-300`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-white dark:bg-gray-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Noteify</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Clarity in every note, purpose in every task.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              {["About", "Features", "Pricing"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              {["𝕏", "📷", "🔗"].map((icon) => (
                <motion.a
                  key={icon}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Newsletter</h4>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-md text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-3 bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Subscribe
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-600 dark:text-gray-400 mt-12"
        >
          © 2025 Noteify. All rights reserved.
        </motion.p>
      </footer>
    </div>
  );
}

// Updated CSS in your global stylesheet (e.g., globals.css)
export const globalStyles = `
  :root {
    --gray-50: #F9FAFB;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-300: #D1D5DB;
    --gray-400: #9CA3AF;
    --gray-500: #6B7280;
    --gray-600: #4B5563;
    --gray-700: #374151;
    --gray-800: #1F2A44;
    --gray-900: #111827;
    --gray-950: #0D121C;
  }

  /* Light Theme */
  .light {
    background-color: var(--gray-50);
    color: var(--gray-900);
  }

  .light .bg-white {
    background-color: #FFFFFF;
  }

  .light .bg-gray-50 {
    background-color: var(--gray-50);
  }

  .light .bg-gray-100 {
    background-color: var(--gray-100);
  }

  /* Dark Theme */
  .dark {
    background-color: var(--gray-950);
    color: var(--gray-100);
  }

  .dark .bg-gray-900 {
    background-color: var(--gray-900);
  }

  .dark .bg-gray-950 {
    background-color: var(--gray-950);
  }

  .dark .bg-gray-800 {
    background-color: var(--gray-800);
  }

  /* Reset defaults and ensure no system interference */
  html, body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Disable system theme detection */
  @media (prefers-color-scheme: dark) {
    html:not(.light):not(.dark) {
      background-color: var(--gray-950);
      color: var(--gray-100);
    }
  }

  @media (prefers-color-scheme: light) {
    html:not(.light):not(.dark) {
      background-color: var(--gray-50);
      color: var(--gray-900);
    }
  }
`;