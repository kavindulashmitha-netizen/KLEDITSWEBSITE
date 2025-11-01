import React, {useState} from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import emailjs from 'emailjs-com'

export default function Contact(){
  const [sending, setSending] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    service: ''
  })

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_4a4tiac',
    TEMPLATE_ID: 'template_mhamfl5', 
    PUBLIC_KEY: 'PWJU-gn-HwH94cRIC'
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSend = async (e) => {
    e.preventDefault()
    setSending(true)
    
    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || `Contact from ${formData.name}`,
          message: formData.message,
          service: formData.service
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      
      setSending(false)
      alert('🎉 Message sent successfully! We will reply within 24 hours.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        service: ''
      })
    } catch (error) {
      setSending(false)
      alert('❌ Failed to send message. Please try again or email us directly at kledits0325@gmail.com')
      console.error('EmailJS Error:', error)
    }
  }

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'kledits0325@gmail.com',
      description: 'Send us an email anytime',
      action: 'mailto:kledits0325@gmail.com'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '076 498 8206',
      description: 'Mon to Fri, 9am to 6pm',
      action: 'tel:+94764988206'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      details: '076 498 8206',
      description: 'Quick responses',
      action: 'https://wa.me/94764988206'
    },
    {
      icon: '📘',
      title: 'Facebook',
      details: 'Kledits',
      description: 'Connect with us on Facebook',
      action: 'https://www.facebook.com/share/1DDCzEVkXS/'
    },
    {
      icon: '📢',
      title: 'WhatsApp Channel',
      details: 'Kledits Channel',
      description: 'Follow our WhatsApp channel',
      action: 'https://whatsapp.com/channel/0029VbAnJfGGpLHVhmJa5e3W'
    },
    {
      icon: '📍',
      title: 'Location',
      details: 'Mathara, Sri Lanka',
      description: 'Remote services available',
      action: '#'
    }
  ]

  const services = [
    'CV Design',
    'Post Design',
    'Cover Page Design',
    'Other Service'
  ]

  return (
    <div className="space-y-16 pt-4">
      {/* Hero Section */}
      <AnimatedSection>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Get In <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </AnimatedSection>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <AnimatedSection>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">Let's Start a Conversation</h2>
                <p className="text-slate-300 text-lg">
                  Whether you need a professional CV, engaging social media posts, or stunning cover pages, 
                  we're here to help bring your vision to life.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass rounded-2xl p-6 block hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">{method.title}</h3>
                        <p className="text-primary font-medium mb-1">{method.details}</p>
                        <p className="text-slate-400 text-sm">{method.description}</p>
                      </div>
                      <div className="text-slate-400 group-hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Business Hours */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Business Hours</h3>
                <div className="space-y-2">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                    { day: 'Sunday', hours: 'Closed' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                      <span className="text-slate-300">{schedule.day}</span>
                      <span className="text-white font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <motion.form 
              onSubmit={handleSend}
              className="glass rounded-2xl p-8 space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your Name *</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Service Interested In</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                <input 
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Brief subject of your message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Your Message *</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Tell us about your project requirements..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.98 }}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending Message...
                  </span>
                ) : (
                  'Send Message 🚀'
                )}
              </motion.button>

              <p className="text-center text-slate-400 text-sm">
                We typically respond within 2-4 hours during business days
              </p>
            </motion.form>
          </AnimatedSection>
        </div>
      </div>

      {/* Map Section */}
      <AnimatedSection>
        <section className="container mx-auto px-4">
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Our Location</h3>
            <p className="text-slate-300 mb-6">Based in Mathara, Sri Lanka - Serving clients worldwide</p>
            <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <p className="text-white font-semibold">Interactive Map</p>
                <p className="text-slate-300 text-sm mt-2">Mathara, Southern Province, Sri Lanka</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}