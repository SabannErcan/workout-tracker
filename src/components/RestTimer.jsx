import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, Plus, X, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import { formatTimer } from '../utils/dateHelpers'

function RestTimer({ initialTime, onComplete, onDismiss, userSettings }) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)
  const [isPaused, setIsPaused] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const intervalRef = useRef(null)
  const audioRef = useRef(null)
  
  // Créer audio pour notification
  useEffect(() => {
    // Créer un son simple avec Web Audio API
    const createBeep = () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = 800
        gainNode.gain.value = 0.3
        
        oscillator.start()
        setTimeout(() => oscillator.stop(), 200)
      } catch (e) {
        console.log('Audio not available')
      }
    }
    
    audioRef.current = createBeep
  }, [])
  
  // Timer countdown
  useEffect(() => {
    if (isPaused) return
    
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          
          // Notification sonore et vibration
          if (userSettings.soundEnabled && audioRef.current) {
            audioRef.current()
          }
          if (userSettings.vibrationEnabled && navigator.vibrate) {
            navigator.vibrate([200, 100, 200])
          }
          
          // Callback de fin
          setTimeout(onComplete, 300)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(intervalRef.current)
  }, [isPaused, userSettings, onComplete])
  
  // Toggle pause
  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev)
  }, [])
  
  // Ajouter du temps
  const addTime = useCallback((seconds) => {
    setTimeRemaining((prev) => prev + seconds)
  }, [])
  
  // Reset timer
  const resetTimer = useCallback(() => {
    setTimeRemaining(initialTime)
    setIsPaused(false)
  }, [initialTime])
  
  // Calcul du pourcentage pour le cercle
  const percentage = (timeRemaining / initialTime) * 100
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  
  // Version compacte (floating button)
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-24 right-4 z-30 w-16 h-16 bg-dark-surface border-2 border-primary rounded-full flex items-center justify-center shadow-ios-lg animate-pulse-subtle"
      >
        <span className="text-lg font-bold text-primary timer-display">
          {formatTimer(timeRemaining)}
        </span>
      </button>
    )
  }
  
  // Version expandée (modal)
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 z-40"
        onClick={() => setIsExpanded(false)}
      />
      
      {/* Timer Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-dark-surface rounded-2xl p-6 w-[90%] max-w-sm animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Temps de repos</h3>
          <button 
            onClick={onDismiss}
            className="p-2 text-text-secondary hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Circular Timer */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="45"
              fill="none"
              stroke="#2C2C2E"
              strokeWidth="8"
              className="scale-[2] origin-center"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r="45"
              fill="none"
              stroke={timeRemaining <= 10 ? '#FF453A' : '#0A84FF'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="scale-[2] origin-center transition-all duration-1000"
            />
          </svg>
          
          {/* Time display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-5xl font-bold timer-display ${
              timeRemaining <= 10 ? 'text-danger animate-pulse' : ''
            }`}>
              {formatTimer(timeRemaining)}
            </span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => addTime(15)}
            className="px-4 py-2 bg-dark-elevated rounded-ios text-sm font-medium"
          >
            +15s
          </button>
          
          <button
            onClick={togglePause}
            className="w-14 h-14 bg-primary rounded-full flex items-center justify-center"
          >
            {isPaused ? <Play size={28} fill="white" /> : <Pause size={28} />}
          </button>
          
          <button
            onClick={() => addTime(30)}
            className="px-4 py-2 bg-dark-elevated rounded-ios text-sm font-medium"
          >
            +30s
          </button>
        </div>
        
        {/* Secondary controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={resetTimer}
            className="flex items-center gap-2 text-text-secondary text-sm"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          
          <button
            onClick={onDismiss}
            className="flex items-center gap-2 text-text-secondary text-sm"
          >
            <X size={16} />
            Skip
          </button>
        </div>
      </div>
    </>
  )
}

export default RestTimer
