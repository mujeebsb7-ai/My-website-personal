import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Award, TrendingUp, Check } from 'lucide-react';
import { creators } from '@/data/mockData';

const CreatorCard = ({ creator }: { creator: typeof creators[0] }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex-shrink-0 w-72 bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-500/30 hover:shadow-card-hover transition-all duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
          />
          {creator.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-pm-black flex items-center gap-1">
            {creator.name}
            {creator.verified && (
              <Award className="w-4 h-4 text-primary-500" />
            )}
          </h3>
          <p className="text-sm text-gray-500">{creator.topCategory}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
            <Star className="w-4 h-4 fill-yellow-500" />
            <span className="font-bold text-sm">{creator.rating}</span>
          </div>
          <span className="text-xs text-gray-400">Rating</span>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-primary-500 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="font-bold text-sm">{formatNumber(creator.sales)}</span>
          </div>
          <span className="text-xs text-gray-400">Sales</span>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="font-bold text-sm text-pm-black mb-1">
            {creator.prompts}
          </div>
          <span className="text-xs text-gray-400">Prompts</span>
        </div>
      </div>

      {/* CTA */}
      <button className="w-full py-2.5 text-sm font-medium text-primary-500 border border-primary-500/20 rounded-xl hover:bg-primary-50 transition-colors">
        View Profile
      </button>
    </motion.div>
  );
};

export default function FeaturedCreatorsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Split creators into two rows
  const row1 = creators.slice(0, 5);
  const row2 = creators.slice(5, 10);

  return (
    <section ref={containerRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pm-black mb-4">
            Top Creators
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Meet our best-selling prompt engineers
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="hover-pause">
        {/* Row 1 - Scroll Left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-6"
        >
          <div className="flex animate-marquee-left">
            {[...row1, ...row1, ...row1].map((creator, index) => (
              <div key={`row1-${creator.id}-${index}`} className="mx-3">
                <CreatorCard creator={creator} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Row 2 - Scroll Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative"
        >
          <div className="flex animate-marquee-right">
            {[...row2, ...row2, ...row2].map((creator, index) => (
              <div key={`row2-${creator.id}-${index}`} className="mx-3">
                <CreatorCard creator={creator} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* View All Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-primary-500 font-semibold border-2 border-primary-500/20 rounded-xl hover:bg-primary-50 transition-colors"
          >
            View All Creators
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
