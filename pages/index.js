import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion, useScroll, useTransform, useAnimationControls } from "framer-motion";
import { FaPen, FaChartLine, FaUsers, FaRocket, FaBrain, FaLock, FaCloud } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const controls = useAnimationControls();
  const particleRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme !== theme) setTheme(savedTheme);
    else {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    controls.start({ rotate: theme === "dark" ? 180 : 0 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [0, -15, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const handleGetStarted = () => router.push("/dashboard");

  const particlesInit = async (engine) => {
    await loadFull(engine);
    particleRef.current = engine;
  };

  const particlesLoaded = (container) => {
    console.log("Particles loaded", container);
  };

  return (
    <div className={`min-h-screen select-none overflow-x-hidden transition-colors duration-700 ${theme === "dark" ? "bg-gradient-to-br from-[#0A1D37] via-[#1A4068] to-[#2D5F8B]" : "bg-gradient-to-br from-[#E6F0FA] via-[#F0F5FF] to-[#D1E0F0]"} relative`}>
      <Head>
        <title>Noteify - The Pinnacle of Productivity</title>
        <meta name="description" content="Noteify redefines productivity with AI-driven insights, real-time collaboration, and limitless customization." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        @layer base {
          html, body {
            @apply bg-noteify-bg-light text-noteify-text-dark;
            overflow-x: hidden;
          }
          h1 {
            @apply text-4xl md:text-5xl font-extrabold;
          }
          h2 {
            @apply text-3xl md:text-4xl font-bold;
          }
          p {
            @apply text-sm md:text-base leading-relaxed;
          }
          .card {
            @apply p-8 rounded-2xl bg-white/10 dark:bg-gray-800/80 border border-gray-200/10 dark:border-gray-700/50 transition-all duration-300 flex flex-col items-center text-center min-h-[350px] justify-between relative;
          }
          .card:hover {
            @apply bg-white/20 dark:bg-gray-700/60 shadow-lg transform scale-105;
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-pulse-grow {
            animation: pulse-grow 2s infinite;
          }
          @keyframes pulse-grow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .force-visible {
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
          }
        }
      `}</style>

      {/* Particles covering the whole page */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          background: { color: { value: theme === "dark" ? "#0A1D37" : "#E6F0FA" } },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: theme === "dark" ? "#4CAF50" : "#1E90FF" },
            links: {
              color: theme === "dark" ? "#4CAF50" : "#1E90FF",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: { enable: true },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 right-0 bg-white/10 dark:bg-black/20 backdrop-blur-md py-4 px-6 z-50 shadow-md border-b border-white/5 dark:border-black/10"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1
            whileHover={{ scale: 1.05, color: theme === "dark" ? "#4CAF50" : "#1E90FF" }}
            className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"} tracking-tight`}
          >
            Noteify
          </motion.h1>
          <nav className="flex items-center space-x-8">
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05, color: theme === "dark" ? "#4CAF50" : "#1E90FF", y: -2 }}
              className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"} hover:text-white transition-all duration-200`}
            >
              Features
            </motion.a>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05, color: theme === "dark" ? "#4CAF50" : "#1E90FF", y: -2 }}
              className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"} hover:text-white transition-all duration-200`}
            >
              Pricing
            </motion.a>
            <motion.a
              href="#blog"
              whileHover={{ scale: 1.05, color: theme === "dark" ? "#4CAF50" : "#1E90FF", y: -2 }}
              className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"} hover:text-white transition-all duration-200`}
            >
              Blog
            </motion.a>
            
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20 z-20">
        <motion.div
          style={{ y: parallaxY }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center relative"
        >
          <motion.h1
            variants={itemVariants}
            className={`text-4xl md:text-5xl font-extrabold ${theme === "dark" ? "text-white" : "text-gray-800"} bg-gradient-to-r from-[#1E90FF] to-[#4CAF50] bg-clip-text text-transparent drop-shadow-lg`}
          >
            Welcome to Noteify
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className={`text-base md:text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mt-6 mb-12 max-w-2xl mx-auto leading-relaxed`}
          >
            Noteify transforms productivity with AI insights, real-time collaboration, and infinite customization. Designed for innovators, it turns chaos into clarity.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(30, 144, 255, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-[#1E90FF] to-[#4CAF50] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-[#1864AB] hover:to-[#3D8B40] transition-all duration-300 shadow-xl"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: theme === "dark" ? "#2D3748" : "#EDF2F7", color: theme === "dark" ? "#4CAF50" : "#1E90FF" }}
              whileTap={{ scale: 0.95 }}
              className={`border-2 ${theme === "dark" ? "border-gray-600 bg-gray-800 text-gray-200" : "border-gray-300 bg-white text-gray-700"} px-8 py-3 rounded-lg font-semibold text-lg hover:${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} transition-all duration-300`}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-transparent relative z-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`text-3xl md:text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"} mb-10 bg-gradient-to-r from-[#1E90FF]/70 to-[#4CAF50]/70 bg-clip-text text-transparent`}
          >
            Unleash Limitless Possibilities
          </motion.h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: FaPen, title: "Smart Note-Taking", desc: "Rich text, embeds, AI suggestions, and device sync." },
              { icon: FaChartLine, title: "Dynamic Workspaces", desc: "Custom databases, kanban, charts, and analytics." },
              { icon: FaUsers, title: "Collaboration", desc: "Live editing, permissions, version history, and resolution." },
              { icon: FaRocket, title: "AI Power", desc: "Task prioritization, analytics, and workflow automation." },
              { icon: FaBrain, title: "Insights", desc: "NLP for ideas, summaries, and recommendations." },
              { icon: FaLock, title: "Security", desc: "Encryption, SSO, two-factor auth, and compliance." },
              { icon: FaCloud, title: "Cloud Sync", desc: "Cross-device sync, offline access, and unlimited storage." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
                className="card flex flex-col items-center text-center"
              >
                <feature.icon className={`text-4xl mb-4 ${theme === "dark" ? "text-[#4CAF50]" : "text-[#1E90FF]"} animate-float`} />
                <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"} mb-2`}>{feature.title}</h3>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6 bg-transparent relative z-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`text-3xl md:text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"} mb-10 bg-gradient-to-r from-[#1E90FF]/70 to-[#4CAF50]/70 bg-clip-text text-transparent`}
          >
            Flexible Pricing Plans
          </motion.h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { title: "Free", price: "$0", desc: "Basic notes, 2GB storage, community support.", features: ["Notes", "Sync", "Support"] },
              { title: "Pro", price: "$12/mo", desc: "Advanced tools, 50GB storage, priority support.", features: ["Databases", "AI", "Offline", "Support"] },
              { title: "Enterprise", price: "Custom", desc: "Unlimited features, 1TB storage, dedicated support.", features: ["Security", "Integrations", "Manager", "Users"] },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="pricing-card card flex flex-col items-center text-center min-h-[350px] p-8 relative hover-glow"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"} mb-3`}>{plan.title}</h3>
                    <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"} mb-4`}>{plan.price}</p>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-6`}>{plan.desc}</p>
                    <ul className={`text-left ${theme === "dark" ? "text-gray-300" : "text-gray-600"} space-y-2 mb-6`}>
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <span className="w-2 h-2 bg-[#4CAF50] rounded-full mr-2 animate-pulse-grow"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: theme === "dark" ? "#2D3748" : "#EDF2F7" }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-2.5 rounded-lg font-semibold ${theme === "dark" ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-all duration-200 mt-auto`}
                  >
                    Choose Plan
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0A1D37] relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h4 className="text-xl font-bold mb-3 text-white">Noteify</h4>
            <p className="text-sm text-gray-400">Empowering productivity for innovators worldwide.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h4 className="text-xl font-bold mb-3 text-white">Discover</h4>
            <ul className="space-y-2 text-sm">
              {["Features", "Pricing", "Blog", "Docs", "Tutorials"].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ x: 3, color: "#4CAF50" }}
                    className="text-gray-300 hover:text-[#4CAF50] transition-all duration-200"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h4 className="text-xl font-bold mb-3 text-white">Community</h4>
            <div className="flex flex-col gap-2">
              <motion.a
                href="#"
                whileHover={{ scale: 1.15, color: "#4CAF50" }}
                className="text-xl text-gray-400 hover:text-white transition-all duration-200"
              >
                𝕏
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.15, color: "#4CAF50" }}
                className="text-xl text-gray-400 hover:text-white transition-all duration-200"
              >
                📷
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.15, color: "#4CAF50" }}
                className="text-xl text-gray-400 hover:text-white transition-all duration-200"
              >
                🔗
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h4 className="text-xl font-bold mb-3 text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              {["Help Center", "Contact", "FAQs", "Status"].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    whileHover={{ x: 3, color: "#4CAF50" }}
                    className="text-gray-300 hover:text-[#4CAF50] transition-all duration-200"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h4 className="text-xl font-bold mb-3 text-white">Newsletter</h4>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition-all duration-200 mb-2"
            />
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#1E90FF" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 rounded-lg bg-[#1E90FF] text-white font-semibold hover:bg-[#1864AB] transition-all duration-200"
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-400 mt-8"
        >
          © 2025 Noteify. All rights reserved. Built with passion.
        </motion.p>
      </footer>
    </div>
  );
}