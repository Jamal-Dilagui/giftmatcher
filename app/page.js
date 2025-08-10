import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      
       <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-white to-blue-100/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF4D6D' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl shadow-2xl mb-6">
              <span className="text-4xl">🎁</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Find the Perfect Gift
              <span className="block bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">for Anyone</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              In seconds. Using AI. With love. 
              <span className="block text-lg text-gray-500 dark:text-gray-400 mt-2">No more gift-giving stress!</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/quiz" className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300">
              Start the Game 🚀
            </Link>
            <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 font-semibold transition-colors">
              How it works →
            </a>
          </div>
        </div>
      </section>

      
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI-powered gift finder makes gift-giving effortless and delightful
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-lg border border-pink-100 dark:border-gray-700">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Answer Questions</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Tell us about the recipient, occasion, and your budget. Our fun quiz takes just 2 minutes!
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-lg border border-blue-100 dark:border-gray-700">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI Magic</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our advanced AI analyzes preferences and finds the perfect gifts from millions of options.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-lg border border-green-100 dark:border-gray-700">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get Perfect Matches</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Receive personalized gift recommendations with direct purchase links. Joy guaranteed!
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Loved by Gift-Givers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our users are saying about their gift-finding experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-pink-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Sarah M.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Found the perfect gift for my mom!</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                &quot;I was stuck on what to get my mom for her birthday. Gift Matcher found the perfect jewelry set in 2 minutes!&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★★★★★</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-pink-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Mike R.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Husband of the year!</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                &quot;My wife loved the personalized cookbook I found through Gift Matcher. She cried happy tears!&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★★★★★</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-pink-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">E</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Emma L.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Best friend goals achieved!</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                &quot;Found the cutest personalized mug for my bestie. The AI really understood our friendship!&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}