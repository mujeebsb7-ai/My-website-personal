import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/mockData';

export default function CategoriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <section ref={containerRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pm-black mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Find the perfect prompts for your specific use case
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative p-8 rounded-3xl border border-gray-100 hover:border-transparent overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-card-hover"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Decorative Circle */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow`}
                >
                  <span className="text-3xl">{category.icon}</span>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-pm-black mb-2 group-hover:text-primary-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-500 mb-4">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-400">
                    {formatNumber(category.promptCount)} prompts
                  </span>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-1 text-primary-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Border Animation */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} 
                  style={{ 
                    background: `linear-gradient(white, white) padding-box, linear-gradient(to right, var(--tw-gradient-stops)) border-box`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
