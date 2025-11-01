
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ServiceCard({ title, description, icon, link, delay = 0, featured = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group cursor-pointer relative ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`
        glass rounded-2xl p-6 h-full relative overflow-hidden
        transition-all duration-500 group-hover:shadow-2xl
        ${featured ? 'border-2 border-primary/20' : ''}
      `}>
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon */}
        <div className="relative z-10">
          <div className={`
            rounded-2xl p-3 mb-4 inline-flex items-center justify-center
            transition-all duration-300 group-hover:scale-110
            ${featured 
              ? 'bg-gradient-to-r from-primary to-accent text-white w-16 h-16' 
              : 'glass text-primary w-12 h-12'
            }
          `}>
            <span className="text-xl">{icon}</span>
          </div>
          
          {/* Content */}
          <h3 className={`
            font-semibold mb-3 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent
            ${featured ? 'text-2xl' : 'text-xl'}
          `}>
            {title}
          </h3>
          
          <p className="text-slate-300 leading-relaxed mb-4">
            {description}
          </p>
          
          {/* CTA */}
          <Link 
            to={link}
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium group/link"
          >
            <span>Explore Service</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </Link>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
          <div className="absolute inset-[2px] rounded-2xl bg-slate-900" />
        </div>
      </div>
    </motion.div>
  )
}
