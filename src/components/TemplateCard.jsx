import React from 'react'
import { motion } from 'framer-motion'

export default function TemplateCard({ title, idx, onOrder, delay = 0, image }) {
  // All pricing options for every template
  const pricingOptions = [
    { label: "1 Page CV", price: "RS.500" },
    { label: "2 Page CV", price: "RS.650" },
    { label: "1 Page + Cover Letter", price: "RS.700" },
    { label: "2 Page + Cover Letter", price: "RS.800" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* Template Preview */}
      <div className="aspect-[3/4] bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {image ? (
          // Show template image if available
          <>
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOrder(idx)}
                className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full font-semibold shadow-lg"
              >
                Preview & Order
              </motion.button>
            </div>
          </>
        ) : (
          // Show placeholder if no image
          <>
            <div className="text-center p-6 relative z-10">
              <div className="text-2xl font-bold text-white mb-2">{title}</div>
              <div className="text-sm text-slate-300">Template #{idx}</div>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOrder(idx)}
                className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full font-semibold shadow-lg"
              >
                Preview & Order
              </motion.button>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-primary/20 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-accent/20 rounded-full group-hover:scale-150 transition-transform duration-500 delay-100" />
          </>
        )}
      </div>

      {/* Template Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-white">{title}</h3>
          <span className="text-xs glass rounded-full px-2 py-1 text-slate-300">
            #{idx}
          </span>
        </div>
        
        {/* All Pricing Options */}
        <div className="space-y-2 mb-4">
          {pricingOptions.map((option, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-slate-300">{option.label}</span>
              <span className="font-bold text-white bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {option.price}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-slate-700">
          <span className="text-xs text-slate-500">Professional Design</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOrder(idx)}
            className="text-primary hover:text-accent transition-colors font-medium text-sm"
          >
            Order Now →
          </motion.button>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
        <div className="absolute inset-[1px] rounded-2xl bg-slate-900" />
      </div>
    </motion.div>
  )
}