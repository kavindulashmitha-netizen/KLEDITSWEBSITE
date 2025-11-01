import React, { useState } from 'react'
import TemplateCard from '../components/TemplateCard'
import MultiStepForm from '../components/MultiStepForm'
import TestimonialCard from '../components/TestimonialCard'
import AnimatedSection from '../components/AnimatedSection'

export default function CVDesign() {
  const [orderingTemplate, setOrderingTemplate] = useState(null)
  const [activeTab, setActiveTab] = useState('all')

  const handleOrder = (idx) => {
    setOrderingTemplate(idx)
  }

  const templateCategories = ['all', 'professional', 'creative', 'modern', 'executive']
  
  // Template images array - just add this
  const templateImages = [
    '/templates/cv1.jpg',
    '/templates/cv2.jpg',
    '/templates/cv3.jpg',
    '/templates/cv4.jpg',
    '/templates/cv5.jpg',
    '/templates/cv6.jpg',
    '/templates/cv7.jpg',
    '/templates/cv8.jpg',
    '/templates/cv9.jpg',
    '/templates/cv10.jpg'
  ]

  const testimonials = [
    {
      name: "Suriya Sampath",
      role: "Customer",
      content: "Yaluwekge ekakui mage ekakui dekak hada gaththa good quality service .Thawa kenekta baya nathuwa recommend karanna puluwan.",
      rating: 5,
      avatar: "SS"
    },
    {
      name: "Kavindya Hiruni Senarathna",
      role: "Customer",
      content: "Thank you so much for preparing my CV. It’s really well done the formatting, layout, and the way the information is organized looks very professional. I believe this will be very helpful for my career..",
      rating: 5,
      avatar: "KHS"
    },
    {
      name: "Himashi Kavindya",
      role: "Customer",
      content: "ඇත්තටම හොද friendly service එකක් තියෙන්නේ මන් පලවෙනි වතාවට cv එකක් හදාගත්තේ එයාලගේ තියනවා google form එකක් එකෙන් ලෙසියෙන් details යවන්න පුලුවන් උනා ගොඩාක් ස්තූති",
      rating: 5,
      avatar: "HK"
    },
    {
      name: "Pradeep Kumara",
      role: "Customer",
      content: "Aththama Godak hodai.",
      rating: 5,
      avatar: "PK"
    }
  ]

  const features = [
    {
      title: "ATS Optimized",
      description: "Designed to pass through Applicant Tracking Systems",
      icon: "✅"
    },
    {
      title: "Professional Layouts",
      description: "Clean, modern designs that impress recruiters",
      icon: "🎨"
    },
    {
      title: "Quick Delivery",
      description: "Get your professionally designed CV within 48 hours",
      icon: "⚡"
    },
    {
      title: "Unlimited Revisions",
      description: "We perfect your CV until you're 100% satisfied",
      icon: "🔄"
    }
  ]

  return (
    <div className="space-y-16 pt-4">
      {/* Hero Section */}
      <AnimatedSection>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Professional <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CV Design</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Make a lasting impression with our professionally designed,  CV templates tailored to your industry and experience level. Stand out from hundreds of applicants
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="glass rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <div className="font-semibold text-white text-sm">{feature.title}</div>
                <div className="text-xs text-slate-400 mt-1">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Template Categories */}
      <AnimatedSection>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {templateCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === category
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                  : 'glass text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {category === 'all' ? 'All Templates' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Template Gallery - UPDATED: Added image prop */}
      <AnimatedSection>
        <section>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <TemplateCard 
                key={i} 
                title={`Professional ${i + 1}`} 
                image={templateImages[i]} // Added this line
                idx={i + 1} 
                onOrder={handleOrder}
                delay={i * 0.1}
              />
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-xl text-slate-300">Simple 3-step process to get your professional CV</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Choose Template", desc: "Browse our collection and select your favorite CV template" },
              { step: "02", title: "Fill Details", desc: "Complete the order form with your personal and professional information" },
              { step: "03", title: "Receive CV", desc: "Get your professionally designed CV delivered within 48 hours" }
            ].map((item, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300">{item.desc}</p>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-slate-600 hidden md:block" />
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection>
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">What Our Clients Say</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about our CV design services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
                avatar={testimonial.avatar}
                delay={index * 0.2}
              />
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
                Ready to Land Your Dream Job?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Start with a professional CV that gets you noticed. Choose from our templates and begin your journey today.
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-primary"
              >
                Browse All Templates
              </button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Order Modal */}
      {orderingTemplate !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOrderingTemplate(null)} />
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto glass rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-white">Order Template #{orderingTemplate}</h3>
                <p className="text-slate-300">Complete the form below to place your order</p>
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
            <MultiStepForm templateId={orderingTemplate} onClose={() => setOrderingTemplate(null)} />
          </div>
        </div>
      )}
    </div>
  )
}