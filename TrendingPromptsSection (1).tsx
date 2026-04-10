import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Star, Eye, ShoppingCart, ArrowRight, MessageSquare, Image, Sparkles, Mic, Video } from 'lucide-react';
import { trendingPrompts } from '@/data/mockData';

const toolIcons: Record<string, React.ElementType> = {
  'ChatGPT': MessageSquare,
  'Midjourney': Image,
  'DALL-E': Sparkles,
  'Stable Diffusion': Image,
  'Claude': MessageSquare,
  'Gemini': Sparkles,
  'Runway': Video,
  'ElevenLabs': Mic,
};

const toolColors: Record<string, string> = {
  'ChatGPT': 'from-emerald-500 to-teal-600',
  'Midjourney': 'from-violet-500 to-purple-600',
  'DALL-E': 'from-rose-500 to-pink-600',
  'Stable Diffusion': 'from-amber-500 to-orange-600',
  'Claude': 'from-amber-600 to-orange-700',
  'Gemini': 'from-blue-500 to-indigo-600',
  'Runway': 'from-cyan-500 to-sky-600',
  'ElevenLabs': 'from-gray-700 to-gray-900',
};

export default function TrendingPromptsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <section ref={containerRef} className="py-20 bg-pm-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-pm-black mb-4">
              Trending Now
            </h2>
            <p className="text-lg text-gray-500">
              Most popular prompts this week
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-primary-500 font-semibold hover:text-primary-600 transition-colors"
          >
            View All Prompts
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingPrompts.map((prompt, index) => {
            const ToolIcon = toolIcons[prompt.tool.name] || MessageSquare;
            const isFavorite = favorites.has(prompt.id);
            
            return (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Link to={`/prompt/${prompt.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-hover transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4 }}
                        src={prompt.thumbnail}
                        alt={prompt.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Tool Badge */}
                      <div className="absolute top-3 left-3">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${toolColors[prompt.tool.name]} text-white text-xs font-medium`}>
                          <ToolIcon className="w-3.5 h-3.5" />
                          {prompt.tool.name}
                        </div>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-3 right-3">
                        {prompt.isFree ? (
                          <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-lg">
                            FREE
                          </span>
                        ) : (
                          <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-pm-black text-xs font-semibold rounded-lg">
                            ${prompt.price}
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <motion.button
                        onClick={(e) => toggleFavorite(prompt.id, e)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${
                            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                          }`}
                        />
                      </motion.button>

                      {/* Quick View */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-3 left-3 right-14 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <button className="w-full py-2 bg-white/90 backdrop-blur text-pm-black text-sm font-medium rounded-lg hover:bg-white transition-colors">
                          Quick View
                        </button>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Title */}
                      <h3 className="font-semibold text-pm-black mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                        {prompt.title}
                      </h3>

                      {/* Rating & Sales */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-pm-black">{prompt.rating}</span>
                          <span className="text-sm text-gray-400">({prompt.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-sm">{formatNumber(prompt.sales)}</span>
                        </div>
                      </div>

                      {/* Seller */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <img
                            src={prompt.seller.avatar}
                            alt={prompt.seller.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="text-sm text-gray-600">{prompt.seller.name}</span>
                          {prompt.seller.verified && (
                            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{formatNumber(prompt.views)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
