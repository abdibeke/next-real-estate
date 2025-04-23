'use client';

import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

export default function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-blue-50 to-teal-50 shadow-sm' : 'bg-gradient-to-r from-blue-100 to-teal-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
          {/* Logo and mobile menu button */}
          <div className="flex items-center w-full md:w-auto justify-between">
            <Link href="/" className="flex-shrink-0">
              <h1 className="font-bold text-2xl sm:text-3xl">
                <span className="text-gray-800">Real</span>
                <span className="text-teal-600">Estate</span>
              </h1>
            </Link>

            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-white/50 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <MdClose className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Narrower search bar */}
          <form
            onSubmit={handleSubmit}
            className={`w-full md:w-2/5 lg:w-1/3 transition-all duration-300 ${mobileMenuOpen ? 'mt-4' : ''}`}
          >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2.5 px-5 pr-10 rounded-full border-0 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-700 placeholder-gray-500 bg-white/90 hover:bg-white transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 text-teal-600 hover:text-teal-700 transition-colors"
                aria-label="Search"
              >
                <FaSearch className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <span className="text-gray-700 hover:text-teal-600 transition-colors font-medium text-sm py-2 px-4 rounded-lg hover:bg-white/50">
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className="text-gray-700 hover:text-teal-600 transition-colors font-medium text-sm py-2 px-4 rounded-lg hover:bg-white/50">
                About
              </span>
            </Link>
            <Link href="/sign-in">
              <span className="text-gray-700 hover:text-teal-600 transition-colors font-medium text-sm py-2 px-4 rounded-lg hover:bg-white/50">
                Sign In
              </span>
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 mt-2">
            <nav className="space-y-2 bg-white/90 rounded-lg p-2 shadow-inner">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <div className="block px-4 py-3 rounded-lg text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-all font-medium">
                  Home
                </div>
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                <div className="block px-4 py-3 rounded-lg text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-all font-medium">
                  About
                </div>
              </Link>
              <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <div className="block px-4 py-3 rounded-lg text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-all font-medium">
                  Sign In
                </div>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}