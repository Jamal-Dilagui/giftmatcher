'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";


const AuthPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password && formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });
      
      if (result?.error) {
        setErrors({
          server: result.error || 'Login failed. Please try again.'
        });
      } else {
        router.push('/quiz'); // Redirect after successful login
      }
    } catch (error) {
      setErrors({
        server: error.message || 'Login failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn('google', {
        redirect: false
      });
      
      if (result?.error) {
        setErrors({
          server: result.error || 'Google login failed. Please try again.'
        });
      } else {
        router.push('/'); // Redirect after successful login
      }
    } catch (error) {
      setErrors({
        server: error.message || 'Google login failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    // Set guest user state
    router.push('/');
  };

  return (
    <div className="flex flex-1 min-h-screen">
      {/* Branding Side */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-pink-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-12">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6">
            <span className="text-4xl">🎁</span>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-4">Gift Matcher</h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 text-center max-w-xs">
            Find the perfect gift for anyone, in seconds. AI-powered, stress-free, and always delightful.
          </p>
          <ul className="text-gray-600 dark:text-gray-300 text-base space-y-2 mb-8">
            <li>✔️ Personalized recommendations</li>
            <li>✔️ Save your favorite gifts</li>
            <li>✔️ 100% free to use</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
              <span className="text-lg">🐦</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
              <span className="text-lg">📧</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
              <span className="text-lg">📱</span>
            </a>
          </div>
        </div>
      </div>

      {/* Auth Form Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white dark:bg-gray-900 p-8 sm:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Welcome Back!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">Secure, fast, and easy access to Gift Matcher</p>
          
          {errors.server && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
              {errors.server}
            </div>
          )}

          <div className="flex flex-col gap-4 mb-8">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow-lg hover:shadow-pink-500/25 hover:scale-105 transition-all text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-spin">🌀</span>
              ) : (
                <>
                  <span className="text-xl">🔒</span> Sign in with Google
                </>
              )}
            </button>
            {/* <button 
              onClick={handleGuestLogin}
              disabled={loading}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="text-xl">👤</span> Continue as Guest
            </button> */}
          </div>
          
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Email
                {errors.email && <span className="text-red-500 text-xs ml-2">{errors.email}</span>}
              </label>
              <input 
                id="email" 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-pink-200 dark:border-pink-700'} bg-pink-50 dark:bg-gray-800 p-4 focus:ring-pink-500 focus:border-pink-500 font-medium text-lg`} 
                placeholder="you@email.com" 
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Password
                {errors.password && <span className="text-red-500 text-xs ml-2">{errors.password}</span>}
              </label>
              <input 
                id="password" 
                name="password"
                type="password" 
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-xl border-2 ${errors.password ? 'border-red-500' : 'border-pink-200 dark:border-pink-700'} bg-pink-50 dark:bg-gray-800 p-4 focus:ring-pink-500 focus:border-pink-500 font-medium text-lg`} 
                placeholder="********" 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-lg shadow-lg hover:shadow-pink-500/25 hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-pink-600 dark:text-pink-400 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;