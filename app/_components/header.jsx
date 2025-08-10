'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setMenuOpen(false);
  };

  const handleSignIn = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-pink-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg" tabIndex={0} aria-label="Go to homepage">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">🎁</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">Gift Matcher</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg">Home</Link>
            <Link href="/quiz" className="text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg">Quiz</Link>
            <Link href="/profile" className="text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg">Profile</Link>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {session.user?.username?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {session.user?.username || session.user?.email || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg px-3 py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500"
                onClick={handleSignIn}
              >
                Sign In
              </Link>
            )}
          </nav>
          
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <nav className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50 animate-fade-in" aria-label="Mobile navigation">
            <ul className="flex flex-col space-y-2 py-4 px-6">
              <li>
                <Link href="/" className="block py-2 px-4 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" onClick={() => setMenuOpen(false)}>Home</Link>
              </li>
              <li>
                <Link href="/quiz" className="block py-2 px-4 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" onClick={() => setMenuOpen(false)}>Quiz</Link>
              </li>
              <li>
                <Link href="/profile" className="block py-2 px-4 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-pink-500" onClick={() => setMenuOpen(false)}>Profile</Link>
              </li>
              
              {session ? (
                <>
                  <li className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                    <div className="flex items-center space-x-3 py-2 px-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium">
                        {session.user?.name || session.user?.email || 'User'}
                      </span>
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block py-2 px-4 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    href="/auth" 
                    className="block py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500" 
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;