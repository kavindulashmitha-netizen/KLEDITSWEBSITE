import React, { useState, useEffect } from 'react'
import PortfolioGrid from '../components/PortfolioGrid'
import AnimatedSection from '../components/AnimatedSection'
import ServiceCard from '../components/ServiceCard'

export default function PostDesign() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Updated portfolio items with new categories and additional business templates
  const portfolioItems = [
    // Class Posts (3 items)
    {
      id: 1,
      title: 'Class Post 1',
      category: 'Class Post',
      description: 'Professional class post design perfect for educational institutions and tutors.',
      image: '/images/graphic1.jpg',
      features: ['Education Focused', 'Clear Information', 'Professional Layout', 'Student Friendly'],
      tags: ['Trending']
    },
    {
      id: 2,
      title: 'Class Post 2',
      category: 'Class Post',
      description: 'Professional class post design perfect for educational institutions and tutors.',
      image: '/images/graphic2.jpg',
      features: ['Education Focused', 'Clear Information', 'Professional Layout', 'Student Friendly'],
      tags: ['New']
    },
    {
      id: 3,
      title: 'Class Post 3',
      category: 'Class Post',
      description: 'Professional class post design perfect for educational institutions and tutors.',
      image: '/images/graphic3.jpg',
      features: ['Education Focused', 'Clear Information', 'Professional Layout', 'Student Friendly'],
      tags: ['Popular']
    },
    // Banners (2 items)
    {
      id: 4,
      title: 'Banner 1',
      category: 'Banner',
      description: 'Eye-catching banner design to promote your business and events.',
      image: '/images/graphic4.jpg',
      features: ['Large Format Ready', 'High Resolution', 'Attention Grabbing', 'Brand Consistent'],
      tags: ['Trending']
    },
    {
      id: 5,
      title: 'Banner 2',
      category: 'Banner',
      description: 'Eye-catching banner design to promote your business and events.',
      image: '/images/graphic5.jpg',
      features: ['Large Format Ready', 'High Resolution', 'Attention Grabbing', 'Brand Consistent'],
      tags: ['New']
    },
    // Hand Bills (1 item)
    {
      id: 6,
      title: 'Hand Bill 1',
      category: 'Hand Bill',
      description: 'Attractive hand bill design for effective marketing and promotions.',
      image: '/images/graphic6.jpg',
      features: ['Compact Design', 'Cost Effective', 'Easy Distribution', 'High Impact'],
      tags: ['Popular']
    },
    // Bill Books (2 items)
    {
      id: 7,
      title: 'Bill Book 1',
      category: 'Bill Book',
      description: 'Professional bill book design for businesses and organizations.',
      image: '/images/graphic7.jpg',
      features: ['Professional Layout', 'Organized Format', 'Business Ready', 'Customizable'],
      tags: ['Trending']
    },
    {
      id: 8,
      title: 'Bill Book 2',
      category: 'Bill Book',
      description: 'Professional bill book design for businesses and organizations.',
      image: '/images/graphic8.jpg',
      features: ['Professional Layout', 'Organized Format', 'Business Ready', 'Customizable'],
      tags: ['New']
    },
    // Business Posts (3 items - added 2 more)
    {
      id: 9,
      title: 'Business Post 1',
      category: 'Business Post',
      description: 'Professional business post design for corporate communications and marketing.',
      image: '/images/graphic9.jpg',
      features: ['Corporate Design', 'Brand Alignment', 'Professional Appeal', 'Marketing Ready'],
      tags: ['New']
    },
    {
      id: 10,
      title: 'Business Post 2',
      category: 'Business Post',
      description: 'Modern business post design for social media marketing and promotions.',
      image: '/images/graphic10.jpg',
      features: ['Modern Design', 'Social Media Ready', 'Engaging Layout', 'Brand Consistent'],
      tags: ['Trending']
    },
    {
      id: 11,
      title: 'Business Post 3',
      category: 'Business Post',
      description: 'Professional corporate post design for business announcements and updates.',
      image: '/images/graphic11.jpg',
      features: ['Corporate Style', 'Professional Layout', 'Business Focused', 'High Quality'],
      tags: ['Popular']
    },
    // Menu Card (1 item)
    {
      id: 12,
      title: 'Menu Card 1',
      category: 'Menu Card',
      description: 'Attractive menu card design for restaurants and food businesses.',
      image: '/images/graphic12.jpg',
      features: ['Appetizing Design', 'Easy to Read', 'Restaurant Style', 'Customer Friendly'],
      tags: ['Popular']
    }
  ]

  const services = [
    {
      title: 'Class Posts',
      description: 'Professional class post designs for educational purposes',
      icon: '📚',
      price: 'Starting from LKR 600'
    },
    {
      title: 'Banner',
      description: 'Attractive and Quality banner designs',
      icon: '🪧',
      price: 'Starting from LKR 800'
    },
    {
      title: 'Hand Bill Design',
      description: 'Professional Attractive and Quality hand bills',
      icon: '📄',
      price: 'Starting from LKR 700'
    },
    {
      title: 'Bill Book',
      description: 'Create Order and Quality bill books',
      icon: '📒',
      price: 'Starting from LKR 800'
    },
    // New Services
    {
      title: 'Business Post',
      description: 'Professional business post designs for corporate needs',
      icon: '💼',
      price: 'Starting from LKR 750'
    },
    {
      title: 'Menu Card',
      description: 'Attractive menu card designs for restaurants',
      icon: '📋',
      price: 'Starting from LKR 900'
    }
  ]

  const process = [
    {
      step: "01",
      title: "Consultation",
      description: "We discuss your design needs, brand identity, and specific requirements"
    },
    {
      step: "02",
      title: "Design Creation",
      description: "Our designers create professional designs tailored to your needs"
    },
    {
      step: "03",
      title: "Revisions",
      description: "We refine the designs based on your feedback until perfect"
    },
    {
      step: "04",
      title: "Delivery",
      description: "Receive your optimized designs ready for printing or digital use"
    }
  ]

  // Updated Customer Testimonials with avatars
  const testimonials = [
    {
      id: 1,
      name: "Pubudu Tharanga",
      role: "Customer",
      company: "",
      rating: 5,
      comment: "Good service",
      avatar: "PT",
      service: "Business Post",
      avatarColor: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Madura Kokila",
      role: "Customer",
      company: "",
      rating: 5,
      comment: "Recommend ❤️ Qulity ekata vadak karagnn puluvan hodama thanak",
      avatar: "MK",
      service: "Class Post",
      avatarColor: "from-pink-500 to-pink-600"
    },
    {
      id: 3,
      name: "Madura Kokila",
      role: "Customer",
      company: "",
      rating: 5,
      comment: "Maru service ❤️😍...Tute හදාගන්න Fb post හදාගන්න Highly Recommend ....",
      avatar: "MK",
      service: "Facebook Post",
      avatarColor: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      name: "ලක්ශාන් මලිදු",
      role: "Customer",
      company: "",
      rating: 5,
      comment: "Highly recommended. Good service",
      avatar: "ලම",
      service: "Banner",
      avatarColor: "from-green-500 to-green-600"
    },
    {
      id: 5,
      name: "Chandika Disanayaka",
      role: "Customer",
      company: "",
      rating: 5,
      comment: "Very good service",
      avatar: "CD",
      service: "Hand Bill",
      avatarColor: "from-orange-500 to-orange-600"
    }
  ]

  // Updated categories for filter buttons
  const categories = ['all', 'Class Post', 'Banner', 'Hand Bill', 'Bill Book', 'Business Post', 'Menu Card']

  // WhatsApp order function
  const handleWhatsAppOrder = (template) => {
    const phoneNumber = '94764988206'
    const message = `Hello! I'm interested in ordering this template: ${template.title} (${template.category}). Please provide more details.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  // Function to handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    handleWhatsAppOrder(template)
  }

  // Slideshow functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % portfolioItems.length)
      }, 4000) // Change slide every 4 seconds
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, portfolioItems.length])

  // Testimonial auto-slide
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change testimonial every 5 seconds
    return () => clearInterval(testimonialInterval)
  }, [testimonials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < rating ? 'text-yellow-400' : 'text-gray-600'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  // Avatar component with gradient background
  const Avatar = ({ name, initials, color }) => {
    return (
      <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${color} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
        {initials}
      </div>
    )
  }

  return (
    <div className="space-y-16 pt-4">
      {/* Hero Section */}
      <AnimatedSection>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            KL EDIT <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Graphic Design</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Get class posts, banners, handbills, bill books, business posts, and menu cards for your business or organization with high quality and excellent finish at the lowest price.
          </p>
          
          {/* Platform Stats - Updated with new categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { platform: 'Class Post', color: 'from-pink-500 to-purple-600' },
              { platform: 'Banner', color: 'from-blue-500 to-blue-700' },
              { platform: 'Business Post', color: 'from-green-500 to-green-600' },
              { platform: 'Menu Card', color: 'from-orange-500 to-orange-600' }
            ].map((item, index) => (
              <div key={index} className="glass rounded-xl p-4 text-center">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-white text-sm">
                    {item.platform === 'Class Post' ? '📚' : 
                     item.platform === 'Banner' ? '🪧' : 
                     item.platform === 'Business Post' ? '💼' : '📋'}
                  </span>
                </div>
                <div className="font-semibold text-white text-sm">{item.platform}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section - Updated with 6 services in 3 columns */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Graphic Design Services</h2>
            <p className="text-xl text-slate-300">High quality, reasonable price, excellence</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="glass rounded-2xl p-6 group hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-lg">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-slate-300 mb-3">{service.description}</p>
                    <div className="text-primary font-semibold">{service.price}</div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const message = `Hello! I'm interested in ${service.title} service. Please provide more details.`
                    const encodedMessage = encodeURIComponent(message)
                    window.open(`https://wa.me/94764988206?text=${encodedMessage}`, '_blank')
                  }}
                  className="w-full mt-4 py-2 rounded-lg glass border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Template Slideshow Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-white">Featured Templates</h2>
            <p className="text-xl text-slate-300">Browse our popular design templates</p>
          </div>

          {/* Slideshow Container */}
          <div className="relative glass rounded-2xl overflow-hidden mb-8">
            <div className="relative h-80 md:h-96">
              {portfolioItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Image Side - Square Size */}
                    <div className="md:w-1/2 h-64 md:h-full relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    
                    {/* Content Side */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full">
                          {item.category}
                        </span>
                        <span className="px-3 py-1 bg-primary/80 text-white text-sm rounded-full">
                          {item.tags[0]}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{item.title}</h3>
                      <p className="text-slate-300 mb-6">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white/10 text-slate-300 text-sm rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => handleTemplateSelect(item)}
                        className="w-full md:w-auto py-3 px-8 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                      >
                        <span>📱</span>
                        Order via WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all"
            >
              ›
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {portfolioItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all"
            >
              {isAutoPlaying ? '❚❚' : '▶'}
            </button>
          </div>
        </section>
      </AnimatedSection>

      {/* Portfolio Section with Square Templates */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Graphic Design Portfolio</h2>
            <p className="text-xl text-slate-300">Browse through our collection of professional graphic designs</p>
          </div>
          
          {/* Updated Category Filter with new categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary to-accent text-white'
                    : 'glass text-slate-300 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Custom Portfolio Grid with Square Templates and Hover Effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portfolioItems
              .filter(item => activeCategory === 'all' || item.category === activeCategory)
              .map((item) => (
                <div 
                  key={item.id} 
                  className="glass rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer relative"
                  style={{ aspectRatio: '1' }} // Square container
                >
                  {/* Template Image - Square */}
                  <div className="relative w-full h-full overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay with Order Button */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTemplateSelect(item)
                        }}
                        className="py-3 px-6 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 flex items-center gap-2"
                      >
                        <span>📱</span>
                        Order Now
                      </button>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-accent/90 text-white text-sm rounded-full">
                        {item.category}
                      </span>
                    </div>
                    
                    {/* Tag Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-primary/80 text-white text-xs rounded-full">
                        {item.tags[0]}
                      </span>
                    </div>
                  </div>
                  
                  {/* Template Title - Only show on hover or always visible? Let's keep it always visible but minimal */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold text-center">{item.title}</h3>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Design Process</h2>
            <p className="text-xl text-slate-300">Simple and efficient process to get your perfect graphic designs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center relative group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-slate-300 text-sm">{step.description}</p>
                
                {/* Connecting Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-slate-600" />
                )}
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Customer Feedback Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">What Our Customers Say</h2>
            <p className="text-xl text-slate-300">Don't just take our word for it - hear from our satisfied clients</p>
          </div>

          {/* Testimonial Slider */}
          <div className="relative glass rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === currentTestimonial
                      ? 'opacity-100 block'
                      : 'opacity-0 hidden'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Customer Avatar */}
                    <div className="flex-shrink-0">
                      <Avatar 
                        name={testimonial.name} 
                        initials={testimonial.avatar} 
                        color={testimonial.avatarColor}
                      />
                    </div>

                    {/* Testimonial Content */}
                    <div className="flex-1 text-center md:text-left">
                      <StarRating rating={testimonial.rating} />
                      <blockquote className="text-lg text-slate-300 mb-6 italic">
                        "{testimonial.comment}"
                      </blockquote>
                      <div className="text-white">
                        <div className="font-semibold text-xl">{testimonial.name}</div>
                        <div className="text-slate-300">{testimonial.role}</div>
                        {testimonial.service && (
                          <div className="text-primary text-sm mt-1">Service: {testimonial.service}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
              >
                ‹
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
              >
                ›
              </button>
            </div>
          </div>

          {/* Additional Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="glass rounded-2xl p-6 group hover:shadow-xl transition-all duration-300">
                <StarRating rating={testimonial.rating} />
                <blockquote className="text-slate-300 mb-4 text-sm italic">
                  "{testimonial.comment}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar 
                    name={testimonial.name} 
                    initials={testimonial.avatar} 
                    color={testimonial.avatarColor}
                    size="small"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                Ready to Get Professional Graphic Designs?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join our satisfied customers and let's create professional designs that will make your business stand out and drive real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    const message = "Hello! I'm interested in your graphic design services. Please provide more information."
                    const encodedMessage = encodeURIComponent(message)
                    window.open(`https://wa.me/94764988206?text=${encodedMessage}`, '_blank')
                  }}
                  className="btn-primary"
                >
                  Start Your Order
                </button>
                <button 
                  onClick={() => {
                    const message = "Hello! I'd like a free consultation about graphic design services."
                    const encodedMessage = encodeURIComponent(message)
                    window.open(`https://wa.me/94764988206?text=${encodedMessage}`, '_blank')
                  }}
                  className="btn-secondary"
                >
                  Get Free Consultation
                </button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}