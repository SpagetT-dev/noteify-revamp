'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, MotionPathPlugin } from 'gsap/all';
import { CloudIcon, PencilIcon, MagnifyingGlassIcon, UserGroupIcon, DocumentTextIcon, ShieldCheckIcon, LockClosedIcon, ShareIcon, ClockIcon, StarIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const pricingRef = useRef(null);
  const ctaRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Theme Handling
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Hero Section Animations
    gsap.fromTo(
      '.hero-text span',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.out',
      }
    );
    gsap.fromTo(
      '.hero-subtitle',
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        delay: 0.7,
        ease: 'elastic.out(1, 0.6)',
      }
    );
    gsap.fromTo(
      '.hero-button',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 1.3,
        ease: 'bounce.out',
      }
    );

    // Navbar Animations
    gsap.fromTo(
      '.nav-link',
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power3.out',
      }
    );
    gsap.to('.navbar', {
      scale: 0.95,
      y: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Micro-interactions for Navbar Links
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1.1, color: '#60a5fa', duration: 0.3 });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, color: isDarkMode ? '#e5e7eb' : '#ffffff', duration: 0.3 });
      });
    });

    // Parallax and Motion Path for Hero
    gsap.to('.hero-bg', {
      y: 300,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    gsap.to('.hero-button', {
      motionPath: {
        path: [{ x: 0, y: 0 }, { x: 10, y: -10 }, { x: 0, y: 0 }],
        curviness: 1.5,
      },
      duration: 3,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Features Section Animations
    gsap.fromTo(
      '.features-heading',
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: { trigger: '#features', start: 'top 70%' },
      }
    );
    gsap.fromTo(
      '.card',
      { opacity: 0, y: 50, rotation: -4 },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power4.out',
        scrollTrigger: { trigger: '#features', start: 'top 70%' },
      }
    );
    gsap.fromTo(
      '.feature-icon',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.6)',
        scrollTrigger: { trigger: '#features', start: 'top 70%' },
      }
    );
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.04, rotation: 2, duration: 0.5, ease: 'power3.out', boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, rotation: 0, duration: 0.5, ease: 'power3.out', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' });
      });
    });

    // Testimonials Section Animations
    gsap.fromTo(
      '.testimonials-heading',
      { opacity: 0, y: -60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: { trigger: '#testimonials', start: 'top 70%' },
      }
    );
    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.4,
        ease: 'power4.out',
        scrollTrigger: { trigger: '#testimonials', start: 'top 70%' },
      }
    );

    // Pricing Section Animations
    gsap.fromTo(
      '.pricing-heading',
      { opacity: 0, y: -80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'bounce.out',
        scrollTrigger: { trigger: '#pricing', start: 'top 70%' },
      }
    );
    gsap.fromTo(
      '.pricing-card',
      { opacity: 0, y: 50, rotation: 5 },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power4.out',
        scrollTrigger: { trigger: '#pricing', start: 'top 70%' },
      }
    );
    gsap.fromTo(
      '.pricing-icon',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.6)',
        scrollTrigger: { trigger: '#pricing', start: 'top 70%' },
      }
    );
    gsap.fromTo(
      '.popular-badge',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 0.7,
        ease: 'bounce.out',
        scrollTrigger: { trigger: '#pricing', start: 'top 70%' },
      }
    );
    document.querySelectorAll('.pricing-card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.04, y: -15, duration: 0.5, ease: 'power3.out', boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, y: 0, duration: 0.5, ease: 'power3.out', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' });
      });
    });

    // CTA Banner Animation
    gsap.fromTo(
      '.cta-banner',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: { trigger: '#cta', start: 'top 80%' },
      }
    );

    // Footer Animation
    gsap.fromTo(
      '.footer',
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: { trigger: 'footer', start: 'top 80%' },
      }
    );

    // Background Gradient Transitions
    gsap.to('body', {
      background: isDarkMode
        ? 'linear-gradient(180deg, #1e293b, #475569)'
        : 'linear-gradient(180deg, #1e40af, #60a5fa)',
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#features',
        start: 'top 50%',
        end: 'top 20%',
        scrub: true,
      },
    });
    gsap.to('body', {
      background: isDarkMode
        ? 'linear-gradient(180deg, #475569, #1e293b)'
        : 'linear-gradient(180deg, #60a5fa, #1e3a8a)',
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#pricing',
        start: 'top 50%',
        end: 'top 20%',
        scrub: true,
      },
    });

    // Cleanup
    return () => {
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.removeEventListener('mouseenter', () => {});
        link.removeEventListener('mouseleave', () => {});
      });
      document.querySelectorAll('.card').forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
      document.querySelectorAll('.pricing-card').forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isDarkMode]);

  return (
    <div className="relative min-h-screen font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500" ref={heroRef}>
      {/* Background */}
      <div className="hero-bg absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-500/30 dark:from-gray-900/50 dark:to-gray-700/30 z-[-1]" />

      {/* Navbar */}
      <nav className="navbar fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-blue-900/80 dark:bg-gray-800/80 backdrop-blur-lg text-white rounded-full px-8 py-4 flex items-center gap-8 shadow-xl transition-all duration-300">
        <Link href="#home" className="nav-link hover:text-blue-400 dark:hover:text-blue-300 transition-colors">Home</Link>
        <Link href="#features" className="nav-link hover:text-blue-400 dark:hover:text-blue-300 transition-colors">Features</Link>
        <Link href="#testimonials" className="nav-link hover:text-blue-400 dark:hover:text-blue-300 transition-colors">Testimonials</Link>
        <Link href="#pricing" className="nav-link hover:text-blue-400 dark:hover:text-blue-300 transition-colors">Pricing</Link>
        <Link href="#contact" className="nav-link hover:text-blue-400 dark:hover:text-blue-300 transition-colors">Contact</Link>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </button>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500">
            {Array.from('Noteify').map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-gray-300 dark:text-gray-200 mt-6 max-w-3xl mx-auto">
            Elevate your productivity with Noteify—crafted for seamless note-taking, collaboration, and organization.
          </p>
          <Link href="/login">
            <button className="hero-button mt-10 px-10 py-5 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-2xl hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-300 text-lg font-semibold">
              Get Started Free
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <h2 className="features-heading text-5xl md:text-6xl font-bold text-center text-gray-800 dark:text-gray-100 mb-20">Why Choose Noteify</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: CloudIcon, title: 'Seamless Sync', desc: 'Sync notes across all devices in real-time with secure cloud technology.' },
              { icon: PencilIcon, title: 'Rich Formatting', desc: 'Craft stunning notes with markdown, media embeds, and custom templates.' },
              { icon: MagnifyingGlassIcon, title: 'Smart Search', desc: 'Locate notes instantly with AI-driven search and tag-based filtering.' },
              { icon: LockClosedIcon, title: 'Robust Security', desc: 'Ensure data safety with end-to-end encryption and 2FA.' },
              { icon: ShareIcon, title: 'Easy Collaboration', desc: 'Share notes and folders securely with team members.' },
              { icon: ClockIcon, title: 'Version Control', desc: 'Track and revert changes with comprehensive version history.' },
            ].map((feature, index) => (
              <div key={index} className="card bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                <feature.icon className="feature-icon w-14 h-14 text-blue-500 dark:text-blue-400 mb-6" />
                <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-3">{feature.desc}</p>
                <Link href="#" className="learn-more mt-6 inline-block text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:underline font-medium">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-blue-50 dark:bg-gray-700" ref={testimonialsRef}>
        <div className="container mx-auto px-4">
          <h2 className="testimonials-heading text-5xl md:text-6xl font-bold text-center text-gray-800 dark:text-gray-100 mb-20">Loved by Our Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: 'Sarah M.', role: 'Designer', quote: 'Noteify revolutionized my workflow. The formatting and sync features are unmatched!' },
              { name: 'James T.', role: 'Developer', quote: 'Smart search and version history make Noteify a must-have for coders.' },
              { name: 'Emily R.', role: 'Team Lead', quote: 'Collaboration is effortless with Noteify’s secure sharing tools.' },
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic text-lg">"{testimonial.quote}"</p>
                <p className="mt-6 font-semibold text-gray-800 dark:text-gray-100 text-xl">{testimonial.name}</p>
                <p className="text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" ref={pricingRef}>
        <div className="container mx-auto px-4">
          <h2 className="pricing-heading text-5xl md:text-6xl font-bold text-center text-gray-800 dark:text-gray-100 mb-20">Find Your Perfect Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: DocumentTextIcon,
                title: 'Free',
                price: '$0',
                desc: 'Great for individuals exploring note-taking.',
                features: ['Basic note-taking', '5GB storage', 'Sync across 2 devices', 'Community support'],
              },
              {
                icon: UserGroupIcon,
                title: 'Pro',
                price: '$9',
                desc: 'Perfect for professionals needing advanced tools.',
                features: ['Rich formatting', '50GB storage', 'Sync across 5 devices', 'Offline access'],
                popular: true,
              },
              {
                icon: ShieldCheckIcon,
                title: 'Team',
                price: '$19',
                desc: 'Built for teams with collaboration needs.',
                features: ['Real-time collaboration', 'Unlimited storage', '24/7 support', 'Advanced security'],
              },
            ].map((plan, index) => (
              <div key={index} className="pricing-card bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 relative hover:shadow-2xl transition-all duration-300">
                {plan.popular && (
                  <div className="popular-badge absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 dark:bg-blue-400 text-white text-sm font-semibold px-6 py-2 rounded-full">
                    Most Popular
                  </div>
                )}
                <plan.icon className="pricing-icon w-14 h-14 text-blue-500 dark:text-blue-400 mb-6" />
                <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{plan.title}</h3>
                <p className="text-4xl font-bold text-blue-500 dark:text-blue-400 mt-4">
                  {plan.price}<span className="text-lg text-gray-600 dark:text-gray-300">/mo</span>
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-3">{plan.desc}</p>
                <ul className="mt-6 text-gray-600 dark:text-gray-300 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="choose-plan mt-8 px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 hover:px-9 transition-all duration-300 text-lg font-semibold">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="cta" className="py-24 bg-blue-600 dark:bg-blue-800 text-white" ref={ctaRef}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="cta-banner text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Productivity?</h2>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Join thousands of users who trust Noteify to organize their ideas and collaborate seamlessly.
          </p>
          <Link href="/login">
            <button className="px-10 py-5 bg-white text-blue-600 dark:text-blue-800 rounded-full shadow-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-lg font-semibold">
              Start Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-16 bg-blue-900 dark:bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-3xl font-bold">Noteify</h3>
              <p className="mt-4 text-gray-300">Your ultimate platform for note-taking and team collaboration.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Product</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="#features" className="hover:text-blue-300 transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-blue-300 transition-colors">Pricing</Link></li>
                <li><Link href="#testimonials" className="hover:text-blue-300 transition-colors">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Company</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="#about" className="hover:text-blue-300 transition-colors">About</Link></li>
                <li><Link href="#contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
                <li><Link href="#careers" className="hover:text-blue-300 transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Support</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="mailto:support@noteify.com" className="hover:text-blue-300 transition-colors">support@noteify.com</a></li>
                <li><a href="tel:+18001234567" className="hover:text-blue-300 transition-colors">+1 (800) 123-4567</a></li>
                <li><Link href="#faq" className="hover:text-blue-300 transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-12">© 2025 Noteify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}