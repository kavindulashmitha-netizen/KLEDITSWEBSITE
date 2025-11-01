import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import ServiceCard from '../components/ServiceCard'
import MultiStepForm from '../components/MultiStepForm'

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const observerRef = useRef(null)

  useEffect(() => {
    const element = countRef.current
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (element) {
      observer.observe(element)
      observerRef.current = observer
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const startAnimation = () => {
    let start = 0
    const increment = target / (duration / 16) // 60fps

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.ceil(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }

  return (
    <span ref={countRef}>
      {count}{suffix}
    </span>
  )
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [orderingTemplate, setOrderingTemplate] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const slides = [
    {
      id: 1,
      title: "Professional CV Designs",
      description: "Professional CV, modern CV templates",
      gradient: "from-blue-500/20 to-purple-600/20",
      icon: "📄",
      image: "/cv10.jpg"
    },
    {
      id: 2,
      title: "Creative Graphic Designs",
      description: "Eye-catching social media posts and marketing materials",
      gradient: "from-green-500/20 to-cyan-600/20",
      icon: "🎨",
      image: "/Grapic.jpg"
    },
    {
      id: 3,
      title: "Educational Tutorials",
      description: "Professional tutorials and educational materials",
      gradient: "from-orange-500/20 to-red-600/20",
      icon: "📚",
      image: "/tute.jpg"
    },
    {
      id: 4,
      title: "KL Edits Brand",
      description: "Your trusted partner for professional design services",
      gradient: "from-purple-500/20 to-pink-600/20",
      icon: "⭐",
      image: "/logo.jpg"
    }
  ]

  // Updated portfolio items with actual design photos
  const portfolioItems = [
    {
      id: 1,
      title: "Modern CV Template",
      category: "CV Design",
      description: 'Professional CV design with modern layout and clean typography.',
      image: "/cv9.jpg",
      tags: ['Popular', 'Executive', 'Professional'],
      type: 'cv'
    },
    {
      id: 2,
      title: "Professional CV",
      category: "CV Design", 
      description: 'Creative resume design for designers and creative professionals.',
      image: "/cv7.jpg",
      tags: ['Executive', 'Professional'],
      type: 'cv'
    },
    {
      id: 3,
      title: "Executive CV",
      category: "CV Design",
      description: 'Executive-level CV design for senior professionals and managers.',
      image: "/cv3.jpg",
      tags: ['Executive', 'Professional'],
      type: 'cv'
    },
    {
      id: 4,
      title: "Executive CV",
      category: "CV Design",
      description: 'Executive-level CV design for senior professionals and managers.',
      image: "/cv2.jpg",
      tags: ['Executive', 'Professional'],
      type: 'cv'
    },
    {
      id: 5,
      title: "Business Post",
      category: "Grapic Design",
      description: 'Engaging Facebook post design for brand promotion.',
      image: "/design4.jpg",
      tags: ['Social Media', 'Engaging'],
      type: 'other'
    },
    {
      id: 6,
      title: "Class Post",
      category: "Grapic Design",
      description: 'Professional Class post design.',
      image: "/design5.jpg",
      tags: ['Face Book', 'Professional'],
      type: 'other'
    },
    {
      id: 7,
      title: "Tute Cover",
      category: "Cover Design",
      description: 'Professional Tute cover page for corporate documents.',
      image: "/design7.jpg",
      tags: ['Tute', 'Class'],
      type: 'other'
    },
    {
      id: 8,
      title: "Handbill Design",
      category: "Grapic Design",
      description: 'Creative handbill peper for your business.',
      image: "/design8.png",
      tags: ['Attractive', 'Creative'],
      type: 'other'
    }
  ]

  const services = [
    {
      title: 'CV Design',
      description: 'Modern, Professional CVs tailored to your profile and career goals. Stand out from the competition with professionally designed resumes that get you noticed.',
      icon: '📄',
      link: '/cv-design',
      featured: true
    },
    {
      title: 'Post Design',
      description: 'Eye-catching social media posts optimized for engagement and brand consistency. Perfect for businesses and influencers.',
      icon: '📱',
      link: '/post-design'
    },
    {
      title: 'Cover Page Design',
      description: 'Professional cover pages that make your documents stand out. Ideal for Your Class Tutorial  and professional portfolios.',
      icon: '📑',
      link: '/cover-design'
    }
  ]

  const stats = [
    { number: '50+', label: 'Happy Clients', target: 50, suffix: '+' },
    { number: '98%', label: 'Success Rate', target: 98, suffix: '%' },
    { number: '24/7', label: 'Support', target: 24, suffix: '/7' },
    { number: '10+', label: 'Templates', target: 10, suffix: '+' }
  ]

  // WhatsApp number - update with your actual number
  const whatsappNumber = '94764988206'
  const whatsappMessage = (item) => `Hello! I'm interested in ordering your "${item.title}" ${item.category} service. Please provide me with more details.`

  // Function to handle order button click
  const handleOrderClick = (item) => {
    if (item.type === 'cv') {
      // Open CV order form
      setOrderingTemplate(item.id)
    } else {
      // Open WhatsApp for other services
      const message = encodeURIComponent(whatsappMessage(item))
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
    }
  }

  // Preload images for faster slideshow
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach(slide => {
        const img = new Image()
        img.src = slide.image
      })
      setIsLoading(false)
    }

    preloadImages()
  }, [])

  // Auto slide every 4 seconds
  useEffect(() => {
    if (isLoading) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [slides.length, isLoading])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="space-y-20 pt-4">
      {/* Hero Section with Slideshow */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float delay-2000" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                  Your{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Professional
                  </span>{' '}
                  Design Partner
                </h1>
                <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed">
                  We are ready to provide you with the CV, class post, tutoring cover page you need at the lowest price and with good quality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link to="/cv-design" className="btn-primary text-center">
                    Explore CV Templates
                  </Link>
                  <Link to="/contact" className="btn-secondary text-center">
                    Get Free Consultation
                  </Link>
                </div>

                {/* Stats with Animated Counters */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        <AnimatedCounter 
                          target={stat.target} 
                          duration={2000} 
                          suffix={stat.suffix}
                        />
                      </div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
            
            {/* Slideshow Section */}
            <AnimatedSection delay={0.3}>
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="glass rounded-3xl p-6 aspect-square relative overflow-hidden">
                  {/* Slideshow Container */}
                  <div className="relative h-full w-full rounded-2xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ 
                          duration: 0.4,
                          ease: "easeInOut" 
                        }}
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${slides[currentSlide].gradient} flex flex-col items-center justify-center p-8`}
                      >
                        {/* Slide Content */}
                        <div className="text-center text-white relative z-10 w-full">
                          {/* Large Image Container */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                              delay: 0.1, 
                              duration: 0.5,
                              ease: "easeOut"
                            }}
                            className="mb-6 flex justify-center"
                          >
                            <img 
                              src={slides[currentSlide].image} 
                              alt={slides[currentSlide].title} 
                              className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl object-cover border-4 border-white/30 shadow-2xl"
                              loading="eager"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                const fallback = document.createElement('div')
                                fallback.className = 'w-64 h-64 lg:w-80 lg:h-80 rounded-2xl glass flex items-center justify-center text-6xl mx-auto mb-6'
                                fallback.innerHTML = slides[currentSlide].icon
                                e.target.parentNode.appendChild(fallback)
                              }}
                            />
                          </motion.div>
                          
                          <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ 
                              delay: 0.2,
                              duration: 0.4 
                            }}
                            className="text-2xl lg:text-3xl font-bold mb-3"
                          >
                            {slides[currentSlide].title}
                          </motion.h3>
                          <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ 
                              delay: 0.3,
                              duration: 0.4 
                            }}
                            className="text-lg lg:text-xl text-white/80 max-w-md mx-auto"
                          >
                            {slides[currentSlide].description}
                          </motion.p>
                        </div>

                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full"></div>
                          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full"></div>
                          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full"></div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-20"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-20"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-4 h-4 rounded-full transition-all ${
                            index === currentSlide 
                              ? 'bg-white scale-125' 
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      x: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute top-2 left-2 w-6 h-6 bg-primary/30 rounded-full"
                  />
                  <motion.div
                    animate={{ 
                      y: [0, 15, 0],
                      x: [0, -10, 0]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-accent/30 rounded-full"
                  />
                </div>

                {/* Slideshow Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 rounded-b-3xl overflow-hidden">
                  <motion.div
                    key={currentSlide}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Services</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Comprehensive design solutions tailored to elevate your professional presence 
              and help you achieve your career goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
                featured={service.featured}
                delay={index * 0.2}
              />
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Portfolio Section with Actual Design Photos */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Portfolio</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Browse through our collection of professionally crafted designs that have 
              helped clients achieve their goals and stand out from the competition.
            </p>
          </div>
          
          {/* Portfolio Grid with Actual Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.target.style.display = 'none'
                      const fallback = document.createElement('div')
                      fallback.className = 'w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white'
                      fallback.innerHTML = `
                        <div class="text-center">
                          <div class="text-2xl">📷</div>
                          <div class="text-sm mt-2">${item.title}</div>
                        </div>
                      `
                      e.target.parentNode.appendChild(fallback)
                    }}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                        <p className="text-slate-300 text-xs mt-1">{item.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <span className="inline-block px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">
                            {item.category}
                          </span>
                          {item.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="inline-block px-2 py-1 bg-white/10 text-white rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Order Now Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOrderClick(item)
                          }}
                          className={`w-full mt-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                            item.type === 'cv' 
                              ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {item.type === 'cv' ? '📄 Order CV' : '💬 Order via WhatsApp'}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-xs">{item.category}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.type === 'cv' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {item.type === 'cv' ? 'CV Template' : 'Other Service'}
                    </span>
                  </div>
                  
                  {/* Quick Order Button (Visible without hover) */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOrderClick(item)}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition-all ${
                      item.type === 'cv' 
                        ? 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20'
                        : 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
                    }`}
                  >
                    {item.type === 'cv' ? 'Order Now' : 'Order via WhatsApp'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                Ready to Design Your Professional Design With Us?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Let's create something amazing together. Get started with our professional 
                design services today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cv-design" className="btn-primary">
                  Start Your Order
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CV Order Form Modal */}
      {orderingTemplate !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOrderingTemplate(null)} />
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto glass rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Order {portfolioItems.find(item => item.id === orderingTemplate)?.title}
                </h3>
                <p className="text-slate-300">Complete the form below to place your CV order</p>
              </div>
              <button 
                onClick={() => setOrderingTemplate(null)}
                className="glass w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <MultiStepForm 
              templateId={orderingTemplate} 
              onClose={() => setOrderingTemplate(null)} 
            />
          </div>
        </div>
      )}
    </div>
  )
}