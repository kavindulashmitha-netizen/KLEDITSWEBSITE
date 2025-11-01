
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  const currentYear = new Date().getFullYear()
  
  const services = [
    { name: 'CV Design', path: '/cv-design' },
    { name: 'Post Design', path: '/post-design' },
    { name: 'Cover Page Design', path: '/cover-design' }
  ]

  const company = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Portfolio', path: '/' }
  ]

  return (
    <footer className="glass-dark border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg glass flex items-center justify-center font-bold text-lg">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  KL
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  KL Edits
                </h3>
                <p className="text-sm text-slate-300">Professional Design Services</p>
              </div>
            </div>
            <p className="text-slate-400 max-w-md">
              Transforming your professional presence with stunning CV designs, 
              engaging social media posts, and professional cover pages that make you stand out.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {currentYear} KL Edits. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
