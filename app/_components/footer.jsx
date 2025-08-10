import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">🎁</span>
              </div>
              <span className="text-2xl font-bold">Gift Matcher</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Making gift-giving effortless and delightful with AI-powered recommendations. 
              Find the perfect gift for anyone, anytime.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors" aria-label="Phone">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 14a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2zm14-14a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5a2 2 0 012-2h2zm0 14a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors" aria-label="Email">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 10-8 0 4 4 0 008 0zm-8 0V8a4 4 0 018 0v4" /></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.9 3.54 4.3-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" /></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Product</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/quiz" className="hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors rounded">Take Quiz</Link></li>
              <li><Link href="/results" className="hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors rounded">View Results</Link></li>
              <li><Link href="/profile" className="hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors rounded">My Profile</Link></li>
              {/* Removed Saved Gifts link as the page does not exist */}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about" className="hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors rounded">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors rounded">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors rounded">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors rounded">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Gift Matcher. All rights reserved. Made with ❤️ for gift-givers everywhere.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;