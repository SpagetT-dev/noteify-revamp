'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CloudIcon, PencilIcon, MagnifyingGlassIcon, UserGroupIcon, DocumentTextIcon, ShieldCheckIcon, LockClosedIcon, ShareIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);

  useEffect(() => {
    // Hero Section Animations
    gsap.fromTo(
      '.hero-text span',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
    gsap.fromTo(
      '.hero-subtitle',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.5,
        ease: 'elastic.out(1, 0.5)',
      }
    );
    gsap.fromTo(
      '.hero-button',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 1,
        ease: 'bounce.out',
      }
    );
    gsap.to('.hero-button', {
      scale: 1.1,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      paused: true,
      onHover: () => gsap.play(),
      onHoverEnd: () => gsap.pause(),
    });

    // Navbar Animations
    gsap.fromTo(
      '.nav-link',
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power2.out',
      }
    );
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1, color: '#64748b', duration: 0.1 });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, color: '#fff', duration: 0.3 });
      });
    });

    // Features Section Animations
    gsap.fromTo(
      '.features-heading',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#features', start: 'top 80%' },
      }
    );
    gsap.fromTo(
      '.card',
      { opacity: 0, y: 30, rotation: -5 },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#features', start: 'top 80%' },
      }
    );
    gsap.fromTo(
      '.feature-icon',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'bounce.out',
        scrollTrigger: { trigger: '#features', start: 'top 80%' },
      }
    );
    gsap.fromTo(
      '.learn-more',
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#features', start: 'top 80%' },
      }
    );
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { rotation: 3, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotation: 0, duration: 0.3, ease: 'power2.out' });
      });
    });

    // Pricing Section Animations
    gsap.fromTo(
      '.pricing-heading',
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'bounce.out',
        scrollTrigger: { trigger: '#pricing', start: 'top 80%' },
      }
    );
    gsap.fromTo(
      '.pricing-card',
      { opacity: 0, y: 30, rotation: 5 },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#pricing', start: 'top 80%' },
      }
    );
    gsap.fromTo(
      '.pricing-icon',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: '#pricing', start: 'top 80%' },
      }
    );
    gsap.fromTo(
      '.popular-badge',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        ease: 'bounce.out',
        scrollTrigger: { trigger: '#pricing', start: 'top 80%' },
      }
    );
    gsap.fromTo(
      '.choose-plan',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#pricing', start: 'top 80%' },
      }
    );
    document.querySelectorAll('.choose-plan').forEach((btn) => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        paused: true,
      });
      btn.addEventListener('mouseenter', () => gsap.play());
      btn.addEventListener('mouseleave', () => gsap.pause());
    });

    // Background Color Transitions
    gsap.to('body', {
      backgroundColor: '#94a3b8',
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
      backgroundColor: '#64748b',
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#pricing',
        start: 'top 50%',
        end: 'top 20%',
        scrub: true,
      },
    });

    // Cleanup event listeners
    return () => {
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.removeEventListener('mouseenter', () => {});
        link.removeEventListener('mouseleave', () => {});
      });
      document.querySelectorAll('.card').forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
      document.querySelectorAll('.choose-plan').forEach((btn) => {
        btn.removeEventListener('mouseenter', () => {});
        btn.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div className="bg-slate-400 font-inter transition-colors duration-500 select-none" ref={heroRef}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@300;500&display=swap');

        .dynamic-island {
          background-color: rgba(141, 214, 219, 0.83);
          color: #fff;
          border-radius: 9999px;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          box-shadow: 0 10px 6px rgba(129, 121, 121, 0.2);
          transition: all 0.3s ease;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          width: fit-content;
        }
        .dynamic-island:hover {
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .hero-text {
          font-size: 3rem;
          line-height: 1.2;
          font-weight: 700;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(to right, rgb(141, 214, 219), rgb(141, 214, 219));
        }
        @media (min-width: 768px) {
          .hero-text {
            font-size: 4.5rem;
          }
        }
        .card, .pricing-card {
          background-color: #fff;
          border-radius: 1rem;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          transform: translateY(0);
          transition: all 0.5s ease;
        }
        .card:hover, .pricing-card:hover {
          transform: scale(1.05);
        }
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* Dynamic Island Navbar */}
      <nav className="fixed top-4 z-50 dynamic-island">
        <a href="#home" className="nav-link transition-colors">
          Home
        </a>
        <a href="#features" className="nav-link transition-colors">
          Features
        </a>
        <a href="#pricing" className="nav-link transition-colors">
          Pricing
        </a>
        <a href="#contact" className="nav-link transition-colors">
          Contact
        </a>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center">
          <h1 className="hero-text">
            {Array.from('Noteify').map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-700 mt-4 max-w-2xl mx-auto">
            Capture your thoughts, organize your life, and boost productivity with
            the ultimate note-taking experience.
          </p>
          <Link href="/login">
            <button className="hero-button mt-8 px-8 bg-gradient-to-r from-[#8dd6db] to-[#8dd6db] py-3 text-white rounded-full shadow-lg hover:px-10 transition-all duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="min-h-screen flex items-center justify-center py-20"
        ref={featuresRef}
      >
        <div className="container mx-auto px-4">
          <h2 className="features-heading text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Noteify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <CloudIcon className="feature-icon w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">
                Seamless Sync
              </h3>
              <p className="text-gray-600 mt-2">
                Effortlessly access your notes on any device—phones, tablets, or
                desktops—with real-time cloud synchronization powered by secure
                servers.
              </p>
              <a
                href="#"
                className="learn-more mt-4 inline-block text-indigo-600 hover:underline"
              >
                Learn More
              </a>
            </div>
            <div className="card">
              <PencilIcon className="feature-icon w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">
                Rich Formatting
              </h3>
              <p className="text-gray-600 mt-2">
                Craft stunning notes with markdown support, embedded images, code
                snippets, and customizable templates for every project.
              </p>
              <a
                href="#"
                className="learn-more mt-4 inline-block text-indigo-600 hover:underline"
              >
                Explore Formatting
              </a>
            </div>
            <div className="card">
              <MagnifyingGlassIcon className="feature-icon w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">
                Smart Search
              </h3>
              <p className="text-gray-600 mt-2">
                Instantly locate any note with AI-driven search, including
                handwriting recognition and tag-based filtering for ultimate
                organization.
              </p>
              <a
                href="#"
                className="learn-more mt-4 inline-block text-indigo-600 hover:underline"
              >
                Try Search
              </a>
            </div>
            <div className="card">
              <LockClosedIcon className="feature-icon w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">
                Enhanced Security
              </h3>
              <p className="text-gray-600 mt-2">
                Keep your notes safe with end-to-end encryption and two-factor
                authentication for peace of mind.
              </p>
              <a
                href="#"
                className="learn-more mt-4 inline-block text-indigo-600 hover:underline"
              >
                Discover Security
              </a>
            </div>
            <div className="card">
              <ShareIcon className="feature-icon w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">
                Easy Sharing
              </h3>
              <p className="text-gray-600 mt-2">
                Collaborate effortlessly by sharing notes or folders with team
                members via secure links or direct invites.
              </p>
              <a
                href="#"
                className="learn-more mt-4 inline-block text-indigo-600 hover:underline"
              >
                Share Now
              </a>
            </div>
            <div className="card">
              <ClockIcon className="feature-icon w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">
                Version History
              </h3>
              <p className="text-gray-600 mt-2">
                Track changes and restore previous versions of your notes with a
                comprehensive version history feature.
              </p>
              <a
                href="#"
                className="learn-more mt-4 inline-block text-indigo-600 hover:underline"
              >
                Explore Versions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="min-h-screen flex items-center justify-center py-20"
        ref={pricingRef}
      >
        <div className="container mx-auto px-4">
          <h2 className="pricing-heading text-4xl font-bold text-center text-gray-800 mb-12">
            Pricing Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="pricing-card">
              <DocumentTextIcon className="pricing-icon w-12 h-12 text-[#8dd6db] mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">Free</h3>
              <p className="text-3xl font-bold text-[#8dd6db] mt-4">
                $0<span className="text-base text-gray-600">/mo</span>
              </p>
              <p className="text-gray-600 mt-2">
                Perfect for casual users who need basic note-taking features.
              </p>
              <ul className="mt-4 text-gray-600 space-y-2">
                <li>Basic note-taking with text support</li>
                <li>5GB cloud storage</li>
                <li>Access to community forums</li>
                <li>Sync across 2 devices</li>
              </ul>
              <button className="choose-plan mt-6 px-6 py-2 bg-[#8dd6db] text-white rounded-full hover:px-7 transition-all duration-300">
                Choose Plan
              </button>
            </div>
            <div className="pricing-card relative">
              <div className="popular-badge absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#8dd6db] text-white text-sm font-semibold px-4 py-1 rounded-full">
                Most Popular
              </div>
              <UserGroupIcon className="pricing-icon w-12 h-12 text-[#8dd6db] mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">Pro</h3>
              <p className="text-3xl font-bold text-[#8dd6db] mt-4">
                $9<span className="text-base text-gray-600">/mo</span>
              </p>
              <p className="text-gray-600 mt-2">
                Ideal for professionals needing advanced tools and storage.
              </p>
              <ul className="mt-4 text-gray-600 space-y-2">
                <li>Advanced markdown and rich media</li>
                <li>50GB cloud storage</li>
                <li>Sync across 5 devices</li>
                <li>Offline mode access</li>
              </ul>
              <button className="choose-plan mt-6 px-6 py-2 bg-[#8dd6db] text-white rounded-full hover:px-7 transition-all duration-300">
                Choose Plan
              </button>
            </div>
            <div className="pricing-card">
              <ShieldCheckIcon className="pricing-icon w-12 h-12 text-[#8dd6db] mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">Team</h3>
              <p className="text-3xl font-bold text-[#8dd6db] mt-4">
                $19<span className="text-base text-gray-600">/mo</span>
              </p>
              <p className="text-gray-600 mt-2">
                Built for teams with collaboration and security needs.
              </p>
              <ul className="mt-4 text-gray-600 space-y-2">
                <li>Real-time collaboration tools</li>
                <li>Unlimited cloud storage</li>
                <li>24/7 dedicated support</li>
                <li>Sync across unlimited devices</li>
                <li>Advanced security features</li>
              </ul>
              <button className="choose-plan mt-6 px-6 py-2 bg-[#8dd6db] text-white rounded-full hover:px-7 transition-all duration-300">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}