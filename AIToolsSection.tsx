import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Image, Video, Mic, Sparkles } from 'lucide-react';

const tools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Text & Chat AI',
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10',
    promptCount: 12543,
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Image Generation',
    icon: Image,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-500/10',
    promptCount: 8932,
  },
  {
    id: 'dalle',
    name: 'DALL-E',
    description: 'Image Generation',
    icon: Sparkles,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-500/10',
    promptCount: 5621,
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: 'Image Generation',
    icon: Image,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/10',
    promptCount: 7845,
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Text & Chat AI',
    icon: MessageSquare,
    color: 'from-amber-600 to-orange-700',
    bgColor: 'bg-amber-600/10',
    promptCount: 3421,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Text & Chat AI',
    icon: Sparkles,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-500/10',
    promptCount: 2156,
  },
  {
    id: 'runway',
    name: 'Runway',
    description: 'Video Generation',
    icon: Video,
    color: 'from-cyan-500 to-sky-600',
    bgColor: 'bg-cyan-500/10',
    promptCount: 1823,
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'Audio & Voice',
    icon: Mic,
    color: 'from-gray-700 to-gray-900',
    bgColor: 'bg-gray-700/10',
    promptCount: 1245,
  },
];

export default function AIToolsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

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
            Popular AI Tools
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Browse prompts by your favorite AI models and tools
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
            >
              <div className="relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:shadow-card-hover overflow-hidden">
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`w-14 h-14 rounded-xl ${tool.bgColor} flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}
                >
                  <tool.icon className={`h-7 w-7 text-primary-500`} />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-pm-black mb-1 group-hover:text-primary-500 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {tool.description}
                </p>
                
                {/* Prompt Count */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600 group-hover:bg-primary-50 group-hover:text-primary-500 transition-colors">
                    {formatNumber(tool.promptCount)} prompts
                  </span>
                </div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-primary-500 font-semibold border-2 border-primary-500/20 rounded-xl hover:bg-primary-50 transition-colors"
          >
            View All Tools
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
