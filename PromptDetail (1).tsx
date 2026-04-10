import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  Heart, Star, Share2, ShoppingCart, Check, 
  MessageSquare, Image, Sparkles, ChevronLeft, ChevronRight, Copy, CheckCircle2,
  Shield, Zap, Clock, Download
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
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

// Import Video and Mic icons
import { Video, Mic } from 'lucide-react';

const reviews = [
  {
    id: 1,
    user: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop' },
    rating: 5,
    date: '2 days ago',
    content: 'This prompt is absolutely amazing! It helped me create stunning images for my marketing campaign. Highly recommend!',
  },
  {
    id: 2,
    user: { name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop' },
    rating: 5,
    date: '1 week ago',
    content: 'Worth every penny. The prompt is well-structured and produces consistent results. Will definitely buy more from this creator.',
  },
  {
    id: 3,
    user: { name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop' },
    rating: 4,
    date: '2 weeks ago',
    content: 'Great prompt! Works as described. Just wish there were a few more variations included.',
  },
];

const faqs = [
  {
    question: 'What AI tools does this prompt work with?',
    answer: 'This prompt is specifically designed for ChatGPT and works with all versions including GPT-3.5 and GPT-4.',
  },
  {
    question: 'Can I use this for commercial projects?',
    answer: 'Yes! All prompts purchased on PromptMarket come with a commercial license. You can use them for personal and commercial projects.',
  },
  {
    question: 'How do I get support if I have issues?',
    answer: 'You can contact the seller directly through our messaging system, or reach out to our support team for assistance.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 7-day money-back guarantee if the prompt does not work as described.',
  },
];

export default function PromptDetail() {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  useInView(containerRef, { once: true, margin: '-50px' });
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'faq'>('description');
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the prompt (in real app, fetch from API)
  const prompt = trendingPrompts.find(p => p.id === id) || trendingPrompts[0];
  const ToolIcon = toolIcons[prompt.tool.name] || MessageSquare;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.description || 'Sample prompt content');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const previewImages = [
    prompt.thumbnail,
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop',
  ];

  return (
    <div className="min-h-screen bg-pm-bg-light">
      <Navigation />
      
      <div ref={containerRef} className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-6"
          >
            <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/marketplace" className="hover:text-primary-500 transition-colors">Marketplace</Link>
            <span>/</span>
            <span className="text-pm-black">{prompt.title}</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={previewImages[currentImageIndex]}
                    alt={prompt.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? previewImages.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === previewImages.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur text-white text-sm rounded-full">
                    {currentImageIndex + 1} / {previewImages.length}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {previewImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index ? 'border-primary-500' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                {/* Tab Headers */}
                <div className="flex border-b border-gray-100">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'reviews', label: `Reviews (${reviews.length})` },
                    { id: 'faq', label: 'FAQ' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 py-4 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-primary-500 border-b-2 border-primary-500'
                          : 'text-gray-500 hover:text-pm-black'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'description' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-pm-black mb-3">About this Prompt</h3>
                        <p className="text-gray-600 leading-relaxed">
                          {prompt.description || 'This is a premium prompt designed to help you get the most out of your AI tool. It has been carefully crafted and tested to ensure consistent, high-quality results every time.'}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-pm-black mb-3">What\'s Included</h3>
                        <ul className="space-y-2">
                          {[
                            'Detailed prompt template',
                            'Usage instructions',
                            'Example outputs',
                            'Tips for best results',
                            'Free updates',
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-600">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-pm-black mb-3">Compatible With</h3>
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${toolColors[prompt.tool.name]} text-white`}>
                            <ToolIcon className="w-5 h-5" />
                            {prompt.tool.name}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Rating Summary */}
                      <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-pm-black">{prompt.rating}</div>
                          <div className="flex items-center gap-1 justify-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(prompt.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{prompt.reviews} reviews</div>
                        </div>
                        <div className="flex-1 space-y-1">
                          {[5, 4, 3, 2, 1].map(stars => (
                            <div key={stars} className="flex items-center gap-2">
                              <span className="text-sm text-gray-500 w-4">{stars}</span>
                              <Star className="w-4 h-4 text-gray-300" />
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400 rounded-full"
                                  style={{ width: `${Math.random() * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Review List */}
                      <div className="space-y-6">
                        {reviews.map(review => (
                          <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                            <div className="flex items-start gap-4">
                              <img
                                src={review.user.avatar}
                                alt={review.user.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium text-pm-black">{review.user.name}</span>
                                  <span className="text-sm text-gray-400">{review.date}</span>
                                </div>
                                <div className="flex items-center gap-1 mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                                <p className="text-gray-600">{review.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'faq' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      {faqs.map((faq, index) => (
                        <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                          <h4 className="font-medium text-pm-black mb-2">{faq.question}</h4>
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Purchase Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 space-y-6"
              >
                {/* Purchase Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6">
                    {prompt.isFree ? (
                      <span className="text-3xl font-bold text-green-500">FREE</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-pm-black">${prompt.price}</span>
                        <span className="text-gray-400 line-through">${(prompt.price * 1.5).toFixed(2)}</span>
                        <span className="text-green-500 text-sm font-medium">33% off</span>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {prompt.isFree ? 'Get for Free' : 'Buy Now'}
                    </motion.button>
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`flex-1 py-3 border-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                          isFavorite
                            ? 'border-red-500 text-red-500 bg-red-50'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
                        {isFavorite ? 'Saved' : 'Save'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
                      >
                        <Share2 className="w-5 h-5" />
                        Share
                      </motion.button>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="space-y-3 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Shield className="w-5 h-5 text-green-500" />
                      Secure payment
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Zap className="w-5 h-5 text-primary-500" />
                      Instant delivery
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock className="w-5 h-5 text-blue-500" />
                      7-day money-back guarantee
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Download className="w-5 h-5 text-purple-500" />
                      Free updates included
                    </div>
                  </div>
                </div>

                {/* Seller Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={prompt.seller.avatar}
                      alt={prompt.seller.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-pm-black">{prompt.seller.name}</span>
                        {prompt.seller.verified && (
                          <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">Top Rated Seller</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="font-bold text-pm-black">4.9</div>
                      <div className="text-xs text-gray-400">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-pm-black">1.2k</div>
                      <div className="text-xs text-gray-400">Sales</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-pm-black">98%</div>
                      <div className="text-xs text-gray-400">Response</div>
                    </div>
                  </div>
                  <button className="w-full py-3 border-2 border-primary-500 text-primary-500 font-medium rounded-xl hover:bg-primary-50 transition-colors">
                    Contact Seller
                  </button>
                </div>

                {/* Preview Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h4 className="font-semibold text-pm-black mb-4">Preview</h4>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-600 font-mono line-clamp-4">
                      {prompt.description || 'Act as an expert in [field] and help me create a comprehensive [output] that includes [specific requirements]. Make sure to [additional instructions]...'}
                    </p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="w-full py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy Preview
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
