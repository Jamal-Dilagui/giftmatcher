'use client'
import React, { useState } from 'react'
 import { steps, getColorClasses } from '../utils/quizData'

const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState({
    person: '',
    occasion: '',
    interests: '',
    budget: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [apiError, setApiError] = useState('')

  const currentStepData = steps.find(step => step.id === currentStep)
  const progressPercentage = (currentStep / steps.length) * 100

  const handleOptionSelect = (optionId) => {
    const stepKey = Object.keys(answers)[currentStep - 1]
    setAnswers(prev => ({
      ...prev,
      [stepKey]: optionId
    }))
  }

  // Map stored answer ids to human readable labels from steps config
  const getAnswerLabel = (key, id) => {
    const indexByKey = { person: 0, occasion: 1, interests: 2, budget: 3 }
    const step = steps[indexByKey[key]]
    const found = step?.options?.find(o => o.id === id)
    return found?.label || id
  }

  // Build chat messages for the Deepseek route
  const buildMessages = () => {
    const readable = {
      person: getAnswerLabel('person', answers.person),
      occasion: getAnswerLabel('occasion', answers.occasion),
      interests: getAnswerLabel('interests', answers.interests),
      budget: getAnswerLabel('budget', answers.budget)
    }

    const system = {
      role: 'system',
      content:
        'You are GiftMatcher AI. Given user answers, return a concise JSON array of 5-8 gift ideas. Each item must be an object with keys: title, category, priceRange, why, and optionally image. Do not include any prose or markdown, only pure JSON.'
    }

    const user = {
      role: 'user',
      content: `Find gift ideas for the following profile:\n- Person: ${readable.person}\n- Occasion: ${readable.occasion}\n- Interests: ${readable.interests}\n- Budget: ${readable.budget}\nPlease tailor gifts to the interests and occasion, and keep within the budget.`
    }

    return [system, user]
  }

  // Parse JSON content that might be wrapped in code fences
  const safeParseSuggestions = (content) => {
    try {
      let text = content || ''
      // Strip markdown code fences if present
      text = text.replace(/^```(json)?/i, '').replace(/```$/i, '').trim()
      const parsed = JSON.parse(text)
      return Array.isArray(parsed) ? parsed : []
    } catch (e) {
      return []
    }
  }

  const generateGiftSuggestions = async () => {
    setApiError('')
    setIsGenerating(true)
    try {
      const messages = buildMessages()
      const res = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat',
          messages,
          max_tokens: 900
        })
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to fetch suggestions')
      }

      const data = await res.json()
      const content = data?.response?.content || ''
      const suggestions = safeParseSuggestions(content)

      // Persist for results page
      if (typeof window !== 'undefined') {
        localStorage.setItem('quizAnswers', JSON.stringify(answers))
        localStorage.setItem('giftSuggestions', JSON.stringify(suggestions))
        localStorage.setItem('giftRaw', content)
      }

      // Navigate to results
      window.location.href = '/results'
    } catch (error) {
      console.error('Gift suggestion error:', error)
      setApiError(error.message || 'Something went wrong generating suggestions')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final step: generate AI suggestions
      generateGiftSuggestions()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

 
  const isOptionSelected = (optionId) => {
    const stepKey = Object.keys(answers)[currentStep - 1]
    return answers[stepKey] === optionId
  }

  const canProceed = () => {
    const stepKey = Object.keys(answers)[currentStep - 1]
    return answers[stepKey] !== '' && !isGenerating
  }
  console.log(answers)
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Progress Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-pink-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎁</span>
                </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Gift Matcher Quiz</h1>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Step</span>
              <span className="text-lg font-bold text-pink-600 dark:text-pink-400">{currentStep}</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">of {steps.length}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              {steps.map((step, index) => (
                <span key={step.id} className={index < currentStep ? 'text-pink-600 dark:text-pink-400 font-medium' : ''}>
                  {step.title.split(' ')[0]}
                </span>
              ))}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
              </div>
            </div>
              </div>
            </div>
            
      {/* Main Quiz Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar Progress - Desktop Only */}
          <div className="hidden lg:block">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-pink-200 dark:border-gray-700 sticky top-32">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quiz Progress</h3>
              
              {steps.map((step, index) => (
                <div key={step.id} className={`flex items-center space-x-4 mb-6 ${index + 1 < currentStep ? 'opacity-50' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                    index + 1 <= currentStep 
                      ? 'bg-gradient-to-br from-pink-500 to-red-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    <span className={`font-bold ${index + 1 <= currentStep ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                      {step.id}
                    </span>
                </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${index + 1 <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                      {step.title}
                    </h4>
                    <p className={`text-sm ${index + 1 <= currentStep ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                      {step.subtitle.split('!')[0]}
                    </p>
                </div>
                  {index + 1 === currentStep && (
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-pink-200 dark:border-gray-700">
              
              {/* Step Header */}
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">{currentStepData?.icon}</span>
              </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentStepData?.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{currentStepData?.subtitle}</p>
            </div>
            
              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {currentStepData?.options.map((option) => {
                  const colorClasses = getColorClasses(option.color)
                  const isSelected = isOptionSelected(option.id)
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={isGenerating}
                      className={`group relative overflow-hidden ${colorClasses.bg} rounded-2xl p-6 text-left hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-2 ${colorClasses.border} ${colorClasses.hover} ${
                        isSelected ? 'ring-4 ring-pink-500 ring-opacity-50 scale-105' : ''
                      } ${isGenerating ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      <div className={`absolute inset-0 ${colorClasses.overlay} opacity-0 group-hover:opacity-100 transition-opacity ${
                        isSelected ? 'opacity-100' : ''
                      }`}></div>
                      <div className="relative z-10">
                        <div className="text-4xl mb-3">{option.emoji}</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{option.label}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{option.description}</p>
            </div>
                    </button>
                  )
                })}
                </div>
            
              {/* Error */}
              {apiError && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg text-sm">
                  {apiError}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-pink-200 dark:border-gray-700">
                <button 
                  onClick={handleBack}
                  disabled={currentStep === 1 || isGenerating}
                  className="px-6 py-3 text-gray-600 dark:text-gray-300 font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Back
                </button>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Step {currentStep} of {steps.length}</span>
                  <button 
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {currentStep === steps.length 
                      ? (isGenerating ? 'Generating… 🎁' : 'Get Results! 🎉')
                      : 'Next →'}
                  </button>
                </div>
            </div>
            
            </div>
          </div>
            </div>
          </div>

      {/* Mobile Navigation - Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-pink-200 dark:border-gray-700 p-4 z-50">
        <div className="flex justify-between items-center">
          <button 
            onClick={handleBack}
            disabled={currentStep === 1 || isGenerating}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400">Step {currentStep} of {steps.length}</span>
            <button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {currentStep === steps.length 
              ? (isGenerating ? 'Generating… 🎁' : 'Results! 🎉')
              : 'Next →'}
            </button>
          </div>
          </div>
      </div>
  )
}

export default QuizPage