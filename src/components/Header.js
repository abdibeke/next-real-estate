'use client';

import { Suspense, useEffect, useState } from 'react';
import { FaSearch, FaInfoCircle } from "react-icons/fa";
import { RiHome3Line } from "react-icons/ri";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { SignedOut, SignedIn, UserButton, useUser } from "@clerk/nextjs";

function HeaderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100/80" 
        : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 cursor-pointer">
            <div className="flex items-center">
              <div className="bg-amber-600 w-8 h-8 rounded-lg flex items-center justify-center mr-2">
                <RiHome3Line className="text-white text-lg" />
              </div>
              <h1 className="font-bold text-xl sm:text-2xl tracking-tight">
                <span className="text-gray-800">Prime</span>
                <span className="text-amber-600">Homes</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search ..."
                  className="w-full py-2.5 px-5 pr-12 rounded-xl border border-gray-200/80 focus:ring-2 focus:ring-amber-500/80 focus:outline-none text-gray-700 placeholder-gray-400 bg-white hover:bg-gray-50/50 transition-all text-sm shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-4 text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
                  aria-label="Search"
                >
                  <FaSearch className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <nav className="flex items-center space-x-1">
              <Link href="/" className="cursor-pointer">
                <div className="flex items-center px-3 py-2.5 rounded-lg hover:bg-gray-50/80 transition-all">
                  <RiHome3Line className="text-gray-500 text-lg mr-2" />
                  <span className="text-gray-700 hover:text-amber-600 transition-colors font-medium text-sm">
                    Home
                  </span>
                </div>
              </Link>
              <Link href="/about" className="cursor-pointer">
                <div className="flex items-center px-3 py-2.5 rounded-lg hover:bg-gray-50/80 transition-all">
                  <FaInfoCircle className="text-gray-500 text-lg mr-2" />
                  <span className="text-gray-700 hover:text-amber-600 transition-colors font-medium text-sm">
                    About
                  </span>
                </div>
              </Link>
            </nav>
            
            <div className="border-l border-gray-200/60 h-6 mx-1"></div>
            
            <div className="flex items-center space-x-2">
              <SignedIn>
                <div className="flex items-center cursor-pointer">
                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-9 w-9 ring-2 ring-amber-500/30 cursor-pointer",
                        userButtonPopoverCard: "shadow-xl rounded-xl border border-gray-200/80",
                        userPreviewAvatarBox: "h-12 w-12"
                      }
                    }}
                    afterSignOutUrl="/"
                  />
                  {user && (
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden lg:inline">
                      Hi, {user.firstName || user.username}
                    </span>
                  )}
                </div>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in" className="cursor-pointer">
                  <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm font-medium py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                    Sign In
                  </button>
                </Link>
              </SignedOut>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-amber-600 hover:bg-gray-100/50 transition-all cursor-pointer"
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

        {/* Mobile Search - Only visible when menu is closed */}
        {!mobileMenuOpen && (
          <div className="md:hidden pb-3">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full py-2.5 px-5 pr-12 rounded-xl border border-gray-200/80 focus:ring-2 focus:ring-amber-500/80 focus:outline-none text-gray-700 placeholder-gray-400 bg-white hover:bg-gray-50/50 transition-all text-sm shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-4 text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
                  aria-label="Search"
                >
                  <FaSearch className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="space-y-2 bg-white rounded-xl shadow-xl border border-gray-200/80 overflow-hidden">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="cursor-pointer">
                <div className="flex items-center px-5 py-3.5 hover:bg-gray-50/50 transition-all">
                  <RiHome3Line className="text-gray-500 text-lg mr-3" />
                  <span className="text-gray-700 font-medium">Home</span>
                </div>
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="cursor-pointer">
                <div className="flex items-center px-5 py-3.5 hover:bg-gray-50/50 transition-all">
                  <FaInfoCircle className="text-gray-500 text-lg mr-3" />
                  <span className="text-gray-700 font-medium">About</span>
                </div>
              </Link>
              
              <div className="border-t border-gray-200/60 my-1"></div>
              
              <SignedIn>
                <div className="px-5 py-3.5 cursor-pointer">
                  <div className="flex items-center">
                    <UserButton 
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-9 w-9 ring-2 ring-amber-500/30 cursor-pointer"
                        }
                      }}
                      afterSignOutUrl="/"
                    />
                    {user && (
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {user.firstName || user.username}
                      </span>
                    )}
                  </div>
                </div>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="cursor-pointer">
                  <div className="mx-4 my-3">
                    <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm font-medium py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                      Sign In
                    </button>
                  </div>
                </Link>
              </SignedOut>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<div className="h-20 bg-white"></div>}>
      <HeaderContent />
    </Suspense>
  );
}