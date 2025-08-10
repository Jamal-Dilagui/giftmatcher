import React from 'react'
import Image from 'next/image'

const ProfilePage = () => {
  return (
   
    <main className="flex-1 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-10 flex flex-col items-center">
        <Image 
          src="https://randomuser.me/api/portraits/lego/1.jpg" 
          alt="User Avatar" 
          width={96}
          height={96}
          className="rounded-full border-4 border-pink-500 mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">Your Name</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">@username</p>
      </div>
      <h2 className="text-xl font-semibold mb-6">Saved Gifts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
      
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
          <Image 
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" 
            alt="Gift 1" 
            width={400}
            height={144}
            className="w-full h-36 object-cover"
          />
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-semibold text-lg mb-2">Bluetooth Headphones</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">Wireless, noise-cancelling headphones for music lovers and commuters.</p>
            <div className="flex gap-2 mt-auto">
              <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg font-semibold cursor-not-allowed opacity-70">Remove</button>
              <button className="px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold shadow cursor-not-allowed opacity-70">View</button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
          <Image 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" 
            alt="Gift 2" 
            width={400}
            height={144}
            className="w-full h-36 object-cover"
          />
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-semibold text-lg mb-2">Personalized Mug</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">A custom mug with their name or favorite quote. Perfect for coffee or tea lovers.</p>
            <div className="flex gap-2 mt-auto">
              <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg font-semibold cursor-not-allowed opacity-70">Remove</button>
              <button className="px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold shadow cursor-not-allowed opacity-70">View</button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
          <Image 
            src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" 
            alt="Gift 3" 
            width={400}
            height={144}
            className="w-full h-36 object-cover"
          />
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-semibold text-lg mb-2">Cookbook</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">A beautifully illustrated cookbook for aspiring chefs and foodies.</p>
            <div className="flex gap-2 mt-auto">
              <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg font-semibold cursor-not-allowed opacity-70">Remove</button>
              <button className="px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold shadow cursor-not-allowed opacity-70">View</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage