import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, ShoppingCart, Sparkles, Check } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Browse & Discover',
    description: 'Explore thousands of curated prompts for every AI tool and use case. Filter by category, tool, or popularity.',
    icon: Search,
    features: ['50,000+ prompts', 'Advanced filters', 'Free previews'],
  },
  {
    number: '02',
    title: 'Purchase & Download',
    description: 'Buy with confidence using our secure payment system. Get instant access to your purchased prompts.',
    icon: ShoppingCart,
    features: ['Secure payments', 'Instant delivery', 'Money-back guarantee'],
  },
  {
    number: '03',
    title: 'Use & Create',
    description: 'Copy the prompt, paste into your AI tool, and watch the magic happen. Start creating amazing content.',
    icon: Sparkles,
    features: ['One-click copy', 'Works with all AI tools', 'Regular updates'],
  },
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-20 bg-pm-bg-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pm-black mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Start using AI prompts in 3 simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-primary-500/30 hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 px-4 py-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full">
                    <span className="text-white font-bold text-sm">Step {step.number}</span>
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/10 flex items-center justify-center mb-6 mt-2"
                  >
                    <step.icon className="w-8 h-8 text-primary-500" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-pm-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.2 + featureIndex * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-500" />
                        </div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Decorative Dot */}
                  <div className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-primary-500 rounded-full" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
