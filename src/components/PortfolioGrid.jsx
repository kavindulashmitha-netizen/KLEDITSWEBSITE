
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PortfolioGrid({ items, columns = 4, category = 'all' }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeCategory, setActiveCategory] = useState(category)

  // Filter items by category if needed
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory)

  const categories = ['all', ...new Set(items.map(item => item.category))]

  // Map column numbers to Tailwind classes
  const gridColumns = {
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5'
  }

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                : 'glass text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <motion.div 
        layout
        className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns[columns] || 'lg:grid-cols-4'} gap-6`}
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-xl overflow-hidden cursor-pointer group relative"
              onClick={() => setSelectedItem(item)}
            >
              {/* ... rest of the component remains the same ... */}
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center relative overflow-hidden">
                <div className="text-center p-4 z-10">
                  <div className="text-lg font-semibold mb-2 text-white">{item.title}</div>
                  <div className="text-xs text-slate-300 bg-black/30 rounded-full px-3 py-1 inline-block">
                    {item.category}
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* View Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Details
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300 line-clamp-2">{item.description}</p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                <div className="absolute inset-[1px] rounded-xl bg-slate-900" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal - rest of the component remains the same */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            {/* ... modal content ... */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
