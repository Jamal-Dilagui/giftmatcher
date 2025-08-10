'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Image component with fallback for broken/blocked images
const ImageWithFallback = ({ src, alt, fallback }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  if (imageError || !src) {
    return fallback
  }

  return (
    <>
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
        onLoad={() => setImageLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </>
  )
}

const ProfilePage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [savedGifts, setSavedGifts] = useState([])
  const [loading, setLoading] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [session, status, router])

  // Load saved gifts from API
  useEffect(() => {
    const fetchSavedGifts = async () => {
      if (!session) return;
      
             try {
         const response = await fetch('/api/save-gift');
         if (response.ok) {
           const data = await response.json();
           console.log('Fetched saved gifts:', data.savedGifts); // Debug log
           setSavedGifts(data.savedGifts || []);
         } else {
           console.error('Failed to fetch saved gifts');
         }
       } catch (error) {
         console.error('Error fetching saved gifts:', error);
       }
    };

    fetchSavedGifts();
  }, [session])

  const handleRemoveGift = async (giftTitle) => {
    try {
      const response = await fetch('/api/save-gift', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: giftTitle })
      });

      if (response.ok) {
        setSavedGifts(prev => prev.filter(gift => gift.title !== giftTitle));
      } else {
        console.error('Failed to remove gift');
      }
    } catch (error) {
      console.error('Error removing gift:', error);
    }
  }

  const handleViewGift = (gift) => {
    if (gift.amazonUrl) {
      window.open(gift.amazonUrl, '_blank')
    } else {
      window.open(`https://www.amazon.com/s?k=${encodeURIComponent(gift.title)}&tag=yourtag-20`, '_blank')
    }
  }
  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-600 dark:text-gray-300">Loading profile...</div>
      </main>
    )
  }

  if (!session) {
    return null // Will redirect in useEffect
  }

  return (
    <main className="flex-1 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl shadow-lg p-8 mb-10 flex flex-col items-center border border-pink-200 dark:border-pink-700">
        <div className="relative">
          <Image 
            src={session.user?.image || "https://randomuser.me/api/portraits/lego/1.jpg"} 
            alt="User Avatar" 
            width={96}
            height={96}
            className="rounded-full border-4 border-pink-500 mb-4 shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          {session.user?.name || session.user?.email?.split('@')[0] || 'User'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          @{session.user?.email?.split('@')[0] || 'username'}
        </p>
        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>Member since {new Date(session.user?.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Saved Gifts</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {savedGifts.length} gift{savedGifts.length !== 1 ? 's' : ''} saved
          </span>
        </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedGifts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No saved gifts yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Complete a quiz to start saving your favorite gift ideas!</p>
              <Link 
                href="/quiz" 
                className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 transition-all"
              >
                Take the Quiz
              </Link>
            </div>
          ) : (
                         savedGifts.map((gift, index) => (
               <div key={`${gift.title}-${index}`} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                                 <div className="relative h-48 overflow-hidden">
                   <ImageWithFallback 
                     src={gift.image} 
                     alt={gift.title} 
                     fallback={
                       <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 dark:from-pink-900 dark:to-blue-900">
                         <span className="text-4xl">🎁</span>
                       </div>
                     }
                   />
                   {gift.price && (
                     <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                       {gift.price}
                     </div>
                   )}
                 </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{gift.title}</h3>
                  </div>
                  <span className="inline-block bg-pink-100 dark:bg-pink-800 text-pink-600 dark:text-pink-200 text-xs font-bold px-2 py-1 rounded mb-3">
                    {gift.category}
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1 text-sm">{gift.description}</p>
                  <div className="flex gap-2 mt-auto">
                    <button 
                      onClick={() => handleRemoveGift(gift.title)}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-1"
                    >
                      Remove
                    </button>
                    <button 
                      onClick={() => handleViewGift(gift)}
                      className="px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold shadow hover:bg-pink-600 transition-colors flex-1"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}

export default ProfilePage