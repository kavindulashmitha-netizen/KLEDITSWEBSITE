import React, { useState, useEffect, useRef } from 'react'
import PortfolioGrid from '../components/PortfolioGrid'
import AnimatedSection from '../components/AnimatedSection'

export default function CoverDesign() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [designCount, setDesignCount] = useState(0)
  const [satisfactionCount, setSatisfactionCount] = useState(0)
  const [priceCount, setPriceCount] = useState(0)
  const [countersStarted, setCountersStarted] = useState(false)
  const statsRef = useRef(null)

  // Only 3 Tute Cover templates
  const portfolioItems = [
    {
      id: 1,
      title: 'Tute Cover Design 1',
      category: 'Tute Cover',
      description: 'Professional tute cover design perfect for educational materials and study notes.',
      image: '/images/tute-cover1.jpg',
      features: [
        'Education Focused',
        'Professional Layout',
        'Fully Editable',
        'Print Ready'
      ],
      tags: ['Best Seller']
    },
    {
      id: 2,
      title: 'Tute Cover Design 2',
      category: 'Tute Cover',
      description: 'Modern tute cover design with clean layout for academic purposes.',
      image: '/images/tute-cover2.jpg',
      features: [
        'Modern Design',
        'Clean Layout',
        'Customizable',
        'Student Friendly'
      ],
      tags: ['New']
    },
    {
      id: 3,
      title: 'Tute Cover Design 3',
      category: 'Tute Cover',
      description: 'Creative tute cover design to make your study materials stand out.',
      image: '/images/tute-cover3.jpg',
      features: [
        'Creative Design',
        'Eye Catching',
        'Professional',
        'Easy to Edit'
      ],
      tags: ['Popular']
    }
  ]

  const tuteCoverFeatures = [
    {
      title: 'Professional Design',
      description: 'Clean and professional layout suitable for all educational materials.',
      icon: '🎓',
      uses: ['Study Notes', 'Assignments', 'Project Reports', 'Thesis Covers']
    },
    {
      title: 'Fully Customizable',
      description: 'Easy to edit and customize according to your subject and preferences.',
      icon: '✏️',
      uses: ['Change Colors', 'Edit Text', 'Add Logo', 'Modify Layout']
    },
    {
      title: 'Print Ready',
      description: 'High quality designs ready for printing with perfect dimensions.',
      icon: '🖨️',
      uses: ['More Sizes', 'High Resolution', 'CMYK Format', 'Bleed Marks']
    },
    {
      title: 'Quick Delivery',
      description: 'Get your tute cover design delivered within 24 hours.',
      icon: '⚡',
      uses: ['24h Delivery', 'Fast Revisions', 'Quick Support', 'Instant Download']
    }
  ]

  // Single pricing plan for Tute Cover
  const pricing = [
    {
      plan: 'Tute Cover Design',
      price: 'LKR 800',
      features: [
        'Professional Tute Cover Design',
        '2 Revision Rounds',
        '24-Hour Delivery',
        'Fully Editable Files',
        'Print Ready Format',
        'Source Files Included'
      ],
      popular: true
    }
  ]

  // Only Madura Kokila's feedback
  const testimonials = [
    {
      id: 1,
      name: "Madura Kokila",
      role: "Customer",
      comment: "Recommend ❤️ Qulity ekata vadak karagnn puluvan hodama thanak",
      avatar: "MK",
      service: "Tute Cover",
      avatarColor: "from-pink-500 to-pink-600"
    }
  ]

  // Count animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true)
          
          // Animate design count (3+)
          let designStart = 0
          const designEnd = 3
          const designDuration = 1500
          const designStepTime = designDuration / designEnd
          
          const designTimer = setInterval(() => {
            designStart += 1
            setDesignCount(designStart)
            if (designStart >= designEnd) {
              clearInterval(designTimer)
            }
          }, designStepTime)

          // Animate satisfaction count (100%)
          let satisfactionStart = 0
          const satisfactionEnd = 100
          const satisfactionDuration = 2000
          const satisfactionStepTime = satisfactionDuration / satisfactionEnd
          
          const satisfactionTimer = setInterval(() => {
            satisfactionStart += 1
            setSatisfactionCount(satisfactionStart)
            if (satisfactionStart >= satisfactionEnd) {
              clearInterval(satisfactionTimer)
            }
          }, satisfactionStepTime)

          // Animate price count (800)
          let priceStart = 0
          const priceEnd = 800
          const priceDuration = 1800
          const priceIncrement = Math.ceil(priceEnd / (priceDuration / 50)) // Update every 50ms
          
          const priceTimer = setInterval(() => {
            priceStart += priceIncrement
            if (priceStart > priceEnd) {
              priceStart = priceEnd
            }
            setPriceCount(priceStart)
            if (priceStart >= priceEnd) {
              clearInterval(priceTimer)
            }
          }, 50)
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [countersStarted])

  // WhatsApp order function
  const handleWhatsAppOrder = (template) => {
    const phoneNumber = '94764988206'
    const message = `Hello! I'm interested in ordering this tute cover design: ${template.title}. Please provide more details.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  // Avatar component
  const Avatar = ({ name, initials, color }) => {
    return (
      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
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
            KL EDIT <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Tute Cover Design</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Get professional tute cover designs for your study materials, assignments, and educational documents at an affordable price. Make your study materials stand out!
          </p>
          
          {/* Quick Stats with Animation */}
          <div ref={statsRef} className="grid grid-cols-3 gap-4 mb-8">
            {[
              { 
                number: `${designCount}+`, 
                label: 'Design Templates',
                icon: '🎨'
              },
              { 
                number: `${satisfactionCount}%`, 
                label: 'Satisfaction',
                icon: '⭐'
              },
              { 
                number: `LKR ${priceCount}`, 
                label: 'Fixed Price',
                icon: '💵'
              }
            ].map((stat, index) => (
              <div key={index} className="glass rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg">{stat.icon}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1 transition-all duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Why Choose Our Tute Cover Designs?</h2>
            <p className="text-xl text-slate-300">Professional designs tailored for students and educational purposes</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tuteCoverFeatures.map((feature, index) => (
              <div key={index} className="glass rounded-2xl p-6 group hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-lg">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-300 mb-4">{feature.description}</p>
                    <div className="space-y-1">
                      {feature.uses.map((use, useIndex) => (
                        <div key={useIndex} className="flex items-center gap-2 text-sm text-slate-400">
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {use}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Portfolio Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Tute Cover Designs</h2>
            <p className="text-xl text-slate-300">Choose from our professional tute cover templates</p>
          </div>
          
          {/* Custom Portfolio Grid with Square Templates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <div 
                key={item.id} 
                className="glass rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer relative"
                style={{ aspectRatio: '1' }}
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
                      onClick={() => handleWhatsAppOrder(item)}
                      className="py-3 px-6 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 flex items-center gap-2"
                    >
                      <span>📱</span>
                      Order via WhatsApp
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
                
                {/* Template Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-semibold text-center">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Pricing Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Simple & Affordable Pricing</h2>
            <p className="text-xl text-slate-300">Get professional tute cover designs at an unbeatable price</p>
          </div>
          
          <div className="max-w-md mx-auto">
            {pricing.map((plan, index) => (
              <div 
                key={index} 
                className={`glass rounded-2xl p-6 relative transition-all duration-300 ${
                  plan.popular 
                    ? 'border-2 border-primary shadow-xl scale-105' 
                    : 'hover:shadow-lg hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.plan}</h3>
                  <div className="text-3xl font-bold text-primary mb-1">{plan.price}</div>
                  <div className="text-slate-400 text-sm">per tute cover</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-slate-300">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => {
                    const message = "Hello! I'm interested in your tute cover design service. Please provide more information."
                    const encodedMessage = encodeURIComponent(message)
                    window.open(`https://wa.me/94764988206?text=${encodedMessage}`, '_blank')
                  }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg'
                      : 'glass border border-white/10 text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Order Now via WhatsApp
                </button>
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
            <p className="text-xl text-slate-300">Hear from satisfied customers who used our tute cover designs</p>
          </div>

          <div className="glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Customer Avatar */}
              <div className="flex-shrink-0">
                <Avatar 
                  name={testimonials[0].name} 
                  initials={testimonials[0].avatar} 
                  color={testimonials[0].avatarColor}
                />
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg text-slate-300 mb-6 italic">
                  "{testimonials[0].comment}"
                </blockquote>
                <div className="text-white">
                  <div className="font-semibold text-xl">{testimonials[0].name}</div>
                  <div className="text-slate-300">{testimonials[0].role}</div>
                  <div className="text-primary text-sm mt-1">Service: {testimonials[0].service}</div>
                </div>
              </div>
            </div>
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
                Ready to Get Your Professional Tute Cover?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Get a professionally designed tute cover that makes your study materials stand out at an affordable price of just LKR 800.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    const message = "Hello! I want to order a tute cover design. Please help me get started."
                    const encodedMessage = encodeURIComponent(message)
                    window.open(`https://wa.me/94764988206?text=${encodedMessage}`, '_blank')
                  }}
                  className="btn-primary"
                >
                  Order Tute Cover
                </button>
                <button 
                  onClick={() => {
                    const message = "Hello! I have questions about tute cover designs. Can you help?"
                    const encodedMessage = encodeURIComponent(message)
                    window.open(`https://wa.me/94764988206?text=${encodedMessage}`, '_blank')
                  }}
                  className="btn-secondary"
                >
                  Get More Info
                </button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}