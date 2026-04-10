import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, Grid3X3, List, SlidersHorizontal, 
  Heart, Star, Eye, ShoppingCart, ChevronDown, X,
  MessageSquare, Image, Sparkles, Mic, Video
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trendingPrompts, categories, aiTools } from '@/data/mockData';

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

const sortOptions = [
  { value: 'trending', label: 'Trending' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'sales', label: 'Most Popular' },
];

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: 'free', label: 'Free' },
  { value: 'under-5', label: 'Under $5' },
  { value: '5-10', label: '$5 - $10' },
  { value: '10-25', label: '$10 - $25' },
  { value: 'over-25', label: 'Over $25' },
];

export default function Marketplace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedSort, setSelectedSort] = useState('trending');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
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

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTool(null);
    setSelectedPriceRange('all');
    setSearchQuery('');
  };

  const activeFiltersCount = [
    selectedCategory,
    selectedTool,
    selectedPriceRange !== 'all' ? selectedPriceRange : null,
    searchQuery ? 'search' : null,
  ].filter(Boolean).length;

  // Filter prompts
  const filteredPrompts = trendingPrompts.filter(prompt => {
    if (searchQuery && !prompt.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory && prompt.category !== selectedCategory) {
      return false;
    }
    if (selectedTool && prompt.tool.name !== selectedTool) {
      return false;
    }
    if (selectedPriceRange === 'free' && !prompt.isFree) {
      return false;
    }
    if (selectedPriceRange === 'under-5' && (prompt.isFree || prompt.price >= 5)) {
      return false;
    }
    if (selectedPriceRange === '5-10' && (prompt.price < 5 || prompt.price > 10)) {
      return false;
    }
    if (selectedPriceRange === '10-25' && (prompt.price < 10 || prompt.price > 25)) {
      return false;
    }
    if (selectedPriceRange === 'over-25' && prompt.price <= 25) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-pm-bg-light">
      <Navigation />
      
      {/* Hero Banner */}
      <div className="pt-20 bg-gradient-to-br from-pm-black via-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Browse AI Prompts
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Discover 50,000+ premium prompts for ChatGPT, Midjourney, DALL-E, and more
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-pm-black placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="appearance-none px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl text-pm-black focus:outline-none focus:border-primary-500 cursor-pointer"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-500 hover:bg-gray-50'} transition-colors`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-500 hover:bg-gray-50'} transition-colors`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-pm-black"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="hidden md:block w-64 flex-shrink-0"
          >
            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-semibold text-pm-black mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-50 text-primary-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span className="flex-1">{category.name}</span>
                    <span className="text-xs text-gray-400">{formatNumber(category.promptCount)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Tools */}
            <div className="mb-8">
              <h3 className="font-semibold text-pm-black mb-4">AI Tools</h3>
              <div className="space-y-2">
                {aiTools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(selectedTool === tool.name ? null : tool.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedTool === tool.name
                        ? 'bg-primary-50 text-primary-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.color }} />
                    <span className="flex-1">{tool.name}</span>
                    <span className="text-xs text-gray-400">{formatNumber(tool.promptCount)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-pm-black mb-4">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedPriceRange(range.value)}
                    className={`w-full px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedPriceRange === range.value
                        ? 'bg-primary-50 text-primary-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Results */}
          <div className="flex-1">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-2 mb-6"
              >
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-500 text-sm rounded-lg">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory(null)}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedTool && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-500 text-sm rounded-lg">
                    {selectedTool}
                    <button onClick={() => setSelectedTool(null)}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedPriceRange !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-500 text-sm rounded-lg">
                    {priceRanges.find(r => r.value === selectedPriceRange)?.label}
                    <button onClick={() => setSelectedPriceRange('all')}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-500 text-sm rounded-lg">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-primary-500 transition-colors"
                >
                  Clear all
                </button>
              </motion.div>
            )}

            {/* Results Count */}
            <p className="text-gray-500 mb-6">
              Showing {filteredPrompts.length} results
            </p>

            {/* Prompts Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredPrompts.map((prompt, index) => {
                const ToolIcon = toolIcons[prompt.tool.name] || MessageSquare;
                const isFavorite = favorites.has(prompt.id);

                if (viewMode === 'list') {
                  return (
                    <motion.div
                      key={prompt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link to={`/prompt/${prompt.id}`}>
                        <div className="group flex gap-4 bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-card-hover transition-all">
                          <img
                            src={prompt.thumbnail}
                            alt={prompt.title}
                            className="w-32 h-24 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-pm-black group-hover:text-primary-500 transition-colors">
                                  {prompt.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <ToolIcon className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-500">{prompt.tool.name}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {prompt.isFree ? (
                                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-lg">
                                    FREE
                                  </span>
                                ) : (
                                  <span className="text-lg font-bold text-pm-black">
                                    ${prompt.price}
                                  </span>
                                )}
                                <button
                                  onClick={(e) => toggleFavorite(prompt.id, e)}
                                  className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm">{prompt.rating}</span>
                                <span className="text-sm text-gray-400">({prompt.reviews})</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-400">
                                <ShoppingCart className="w-4 h-4" />
                                <span className="text-sm">{formatNumber(prompt.sales)}</span>
                              </div>
                              <div className="flex items-center gap-2 ml-auto">
                                <img
                                  src={prompt.seller.avatar}
                                  alt={prompt.seller.name}
                                  className="w-6 h-6 rounded-full"
                                />
                                <span className="text-sm text-gray-600">{prompt.seller.name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/prompt/${prompt.id}`}>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card-hover transition-all"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={prompt.thumbnail}
                            alt={prompt.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${toolColors[prompt.tool.name]} text-white text-xs font-medium`}>
                              <ToolIcon className="w-3.5 h-3.5" />
                              {prompt.tool.name}
                            </div>
                          </div>
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
                          <button
                            onClick={(e) => toggleFavorite(prompt.id, e)}
                            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-pm-black mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                            {prompt.title}
                          </h3>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm font-medium">{prompt.rating}</span>
                              <span className="text-sm text-gray-400">({prompt.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400">
                              <ShoppingCart className="w-4 h-4" />
                              <span className="text-sm">{formatNumber(prompt.sales)}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <img
                                src={prompt.seller.avatar}
                                alt={prompt.seller.name}
                                className="w-7 h-7 rounded-full object-cover"
                              />
                              <span className="text-sm text-gray-600">{prompt.seller.name}</span>
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

            {/* Empty State */}
            {filteredPrompts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-pm-black mb-2">
                  No prompts found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-pm-black mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary-50 text-primary-500'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{category.icon}</span>
                      <span className="flex-1">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Tools */}
              <div className="mb-8">
                <h3 className="font-semibold text-pm-black mb-4">AI Tools</h3>
                <div className="space-y-2">
                  {aiTools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(selectedTool === tool.name ? null : tool.name)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedTool === tool.name
                          ? 'bg-primary-50 text-primary-500'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.color }} />
                      <span className="flex-1">{tool.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-pm-black mb-4">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <button
                      key={range.value}
                      onClick={() => setSelectedPriceRange(range.value)}
                      className={`w-full px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedPriceRange === range.value
                          ? 'bg-primary-50 text-primary-500'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-primary-500 text-white font-semibold rounded-xl"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
