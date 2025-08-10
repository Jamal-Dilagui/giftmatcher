
export const steps = [
    {
      id: 1,
      title: "Who are you shopping for?",
      subtitle: "We'll personalize your results based on this! 🎯",
      icon: "👤",
      options: [
        { id: 'mother', label: 'Mother', emoji: '👩', description: 'Mom, stepmom, mother-in-law', color: 'pink' },
        { id: 'father', label: 'Father', emoji: '👨', description: 'Dad, stepdad, father-in-law', color: 'blue' },
        { id: 'partner', label: 'Partner', emoji: '💑', description: 'Husband, wife, significant other', color: 'purple' },
        { id: 'friend', label: 'Friend', emoji: '👯‍♀️', description: 'Bestie, buddy, close friend', color: 'green' },
        { id: 'sibling', label: 'Sibling', emoji: '👥', description: 'Brother, sister, step-sibling', color: 'yellow' },
        { id: 'colleague', label: 'Colleague', emoji: '💼', description: 'Coworker, boss, client', color: 'gray' }
      ]
    },
    {
      id: 2,
      title: "What's the occasion?",
      subtitle: "Every celebration deserves the perfect gift! 🎊",
      icon: "🎉",
      options: [
        { id: 'birthday', label: 'Birthday', emoji: '🎂', description: 'Another year, another celebration!', color: 'pink' },
        { id: 'anniversary', label: 'Anniversary', emoji: '💕', description: 'Celebrating love and commitment', color: 'red' },
        { id: 'graduation', label: 'Graduation', emoji: '🎓', description: 'Academic achievements unlocked!', color: 'blue' },
        { id: 'holiday', label: 'Holiday', emoji: '🎄', description: 'Christmas, Hanukkah, etc.', color: 'green' },
        { id: 'wedding', label: 'Wedding', emoji: '💒', description: 'A special day to remember', color: 'purple' },
        { id: 'housewarming', label: 'Housewarming', emoji: '🏠', description: 'New home, new memories', color: 'orange' }
      ]
    },
    {
      id: 3,
      title: "What are their interests?",
      subtitle: "Tell us what makes them unique! ✨",
      icon: "🎨",
      options: [
        { id: 'fitness', label: 'Fitness', emoji: '🏃‍♀️', description: 'Health and wellness enthusiast', color: 'green' },
        { id: 'reading', label: 'Reading', emoji: '📚', description: 'Book lover and knowledge seeker', color: 'blue' },
        { id: 'gaming', label: 'Gaming', emoji: '🎮', description: 'Video games and entertainment', color: 'purple' },
        { id: 'music', label: 'Music', emoji: '🎵', description: 'Melody and rhythm lover', color: 'pink' },
        { id: 'cooking', label: 'Cooking', emoji: '🍳', description: 'Culinary arts and foodie', color: 'yellow' },
        { id: 'art', label: 'Art', emoji: '🎨', description: 'Creative and artistic soul', color: 'indigo' }
      ]
    },
    {
      id: 4,
      title: "What's your budget?",
      subtitle: "We'll find amazing gifts within your range! 💰",
      icon: "💸",
      options: [
        { id: 'under-25', label: 'Under $25', emoji: '💚', description: 'Budget-friendly gems', color: 'green' },
        { id: '25-50', label: '$25 - $50', emoji: '💙', description: 'Sweet spot gifts', color: 'blue' },
        { id: '50-100', label: '$50 - $100', emoji: '💜', description: 'Premium picks', color: 'purple' },
        { id: '100-plus', label: '$100+', emoji: '💎', description: 'Luxury gifts', color: 'red' }
      ]
    }
]


export const getColorClasses = (color) => {
    const colorMap = {
      pink: {
        bg: 'bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900 dark:to-red-900',
        border: 'border-pink-200 dark:border-pink-700',
        hover: 'hover:border-pink-400 dark:hover:border-pink-400',
        overlay: 'bg-gradient-to-br from-pink-500/20 to-red-500/20'
      },
      blue: {
        bg: 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900',
        border: 'border-blue-200 dark:border-blue-700',
        hover: 'hover:border-blue-400 dark:hover:border-blue-400',
        overlay: 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20'
      },
      purple: {
        bg: 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900',
        border: 'border-purple-200 dark:border-purple-700',
        hover: 'hover:border-purple-400 dark:hover:border-purple-400',
        overlay: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
      },
      green: {
        bg: 'bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900',
        border: 'border-green-200 dark:border-green-700',
        hover: 'hover:border-green-400 dark:hover:border-green-400',
        overlay: 'bg-gradient-to-br from-green-500/20 to-teal-500/20'
      },
      yellow: {
        bg: 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900',
        border: 'border-yellow-200 dark:border-yellow-700',
        hover: 'hover:border-yellow-400 dark:hover:border-yellow-400',
        overlay: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
      },
      gray: {
        bg: 'bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-700 dark:to-slate-700',
        border: 'border-gray-200 dark:border-gray-600',
        hover: 'hover:border-gray-400 dark:hover:border-gray-400',
        overlay: 'bg-gradient-to-br from-gray-500/20 to-slate-500/20'
      },
      red: {
        bg: 'bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900',
        border: 'border-red-200 dark:border-red-700',
        hover: 'hover:border-red-400 dark:hover:border-red-400',
        overlay: 'bg-gradient-to-br from-red-500/20 to-pink-500/20'
      },
      orange: {
        bg: 'bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900',
        border: 'border-orange-200 dark:border-orange-700',
        hover: 'hover:border-orange-400 dark:hover:border-orange-400',
        overlay: 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20'
      },
      indigo: {
        bg: 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900',
        border: 'border-indigo-200 dark:border-indigo-700',
        hover: 'hover:border-indigo-400 dark:hover:border-indigo-400',
        overlay: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20'
      }
    }
    return colorMap[color] || colorMap.pink
  }