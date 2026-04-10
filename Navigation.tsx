import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ChevronDown, ShoppingCart, Bell } from 'lucide-react';
import { navItems } from '@/data/mockData';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartCount] = useState(3);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-effect border-b border-gray-200 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-primary-500/50 to-primary-600/50 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <span className="text-xl font-bold text-pm-black">
                PromptMarket
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="flex items-center px-4 py-2 text-sm font-medium text-pm-text-gray hover:text-pm-black transition-colors rounded-lg hover:bg-gray-100"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
                      >
                        <div className="p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="flex items-center px-4 py-3 text-sm text-gray-600 hover:text-pm-black hover:bg-gray-50 rounded-xl transition-all group"
                            >
                              <span className="text-lg mr-3">{child.icon}</span>
                              <span className="group-hover:translate-x-1 transition-transform">
                                {child.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <motion.div
                animate={{
                  scale: isSearchFocused ? 1.02 : 1,
                  boxShadow: isSearchFocused
                    ? '0 0 30px rgba(41, 121, 255, 0.2)'
                    : '0 0 0px transparent'
                }}
                transition={{ duration: 0.3 }}
                className="relative w-full"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-xl text-pm-black placeholder-gray-400 focus:outline-none focus:border-primary-500/50 focus:bg-white transition-all"
                />
              </motion.div>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-500 hover:text-pm-black transition-colors relative"
              >
                <Bell className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-500 hover:text-pm-black transition-colors relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-pm-black transition-colors"
                >
                  Log In
                </motion.button>
              </Link>
              
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-pm-black"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-100 overflow-y-auto"
            >
              <div className="p-6 pt-20 space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-transparent rounded-xl text-pm-black placeholder-gray-400 focus:outline-none focus:border-primary-500"
                  />
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      <Link
                        to={item.href}
                        className="flex items-center justify-between px-4 py-3 text-gray-600 hover:text-pm-black hover:bg-gray-50 rounded-xl"
                        onClick={() => !item.children && setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                        {item.children && <ChevronDown className="h-4 w-4" />}
                      </Link>
                      {item.children && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="flex items-center px-4 py-2 text-sm text-gray-500 hover:text-pm-black hover:bg-gray-50 rounded-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="mr-2">{child.icon}</span>
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Auth Buttons */}
                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <Link to="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-3 text-gray-600 hover:text-pm-black border border-gray-200 rounded-xl transition-colors">
                      Log In
                    </button>
                  </Link>
                  <Link to="/signup" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-3 text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-semibold">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
