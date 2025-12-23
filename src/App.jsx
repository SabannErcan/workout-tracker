import React, { useState, useEffect, useCallback } from 'react'
import { 
  Home, 
  Dumbbell, 
  Calendar, 
  TrendingUp, 
  Settings as SettingsIcon,
  Wifi,
  WifiOff,
  Download,
  RefreshCw,
  Target
} from 'lucide-react'

import { useWorkoutData } from './hooks/useWorkoutData'
import { useServiceWorker } from './hooks/useServiceWorker'

import ExerciseTracker from './components/ExerciseTracker'
import WorkoutSession from './components/WorkoutSession'
import SessionTemplates from './components/SessionTemplates'
import History from './components/History'
import ProgressCharts from './components/ProgressCharts'
import Settings from './components/Settings'
import HomeScreen from './components/HomeScreen'

// Écrans de l'application
const SCREENS = {
  HOME: 'home',
  EXERCISES: 'exercises', // Nouveau écran principal
  WORKOUT: 'workout',
  TEMPLATES: 'templates',
  HISTORY: 'history',
  STATS: 'stats',
  SETTINGS: 'settings',
}

function App() {
  // Navigation - Commence sur les exercices par défaut
  const [currentScreen, setCurrentScreen] = useState(SCREENS.EXERCISES)
  
  // Données workout
  const workoutData = useWorkoutData()
  const { currentWorkout, userSettings } = workoutData
  
  // Service Worker / PWA
  const { 
    isInstalled, 
    canInstall, 
    updateAvailable, 
    isOnline,
    promptInstall,
    applyUpdate 
  } = useServiceWorker()
  
  // Gestion du thème
  useEffect(() => {
    // Applique le thème en fonction des settings
    if (userSettings.theme === 'light') {
      document.documentElement.classList.remove('dark')
      document.body.classList.add('light-theme')
    } else {
      document.documentElement.classList.add('dark')
      document.body.classList.remove('light-theme')
    }
    
    // Meta theme-color pour la barre de navigation mobile
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
      metaTheme.setAttribute('content', userSettings.theme === 'light' ? '#F2F2F7' : '#000000')
    }
  }, [userSettings.theme])
  
  // Gestion du bouton retour (Android)
  useEffect(() => {
    const handlePopState = (e) => {
      if (currentScreen !== SCREENS.EXERCISES) {
        e.preventDefault()
        setCurrentScreen(SCREENS.EXERCISES)
        window.history.pushState(null, '', window.location.href)
      }
    }
    
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)
    
    return () => window.removeEventListener('popstate', handlePopState)
  }, [currentScreen])
  
  // Navigation avec gestion du workout en cours
  const navigate = useCallback((screen) => {
    // Si workout en cours et on essaie de changer d'écran
    if (currentWorkout && screen !== SCREENS.WORKOUT && screen !== SCREENS.HOME) {
      // Permet quand même la navigation mais le workout reste actif
    }
    setCurrentScreen(screen)
  }, [currentWorkout])
  
  // Raccourci pour démarrer un workout
  const handleStartWorkout = useCallback((templateId) => {
    workoutData.startWorkout(templateId)
    setCurrentScreen(SCREENS.WORKOUT)
  }, [workoutData])
  
  // Rendu de l'écran actif
  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.EXERCISES:
        return (
          <ExerciseTracker 
            workoutData={workoutData}
          />
        )
      
      case SCREENS.HOME:
        return (
          <HomeScreen 
            workoutData={workoutData}
            onStartWorkout={handleStartWorkout}
            onNavigate={navigate}
          />
        )
      
      case SCREENS.WORKOUT:
        return currentWorkout ? (
          <WorkoutSession 
            workoutData={workoutData}
            onFinish={() => {
              workoutData.finishWorkout()
              setCurrentScreen(SCREENS.HOME)
            }}
            onCancel={() => {
              workoutData.cancelWorkout()
              setCurrentScreen(SCREENS.HOME)
            }}
          />
        ) : (
          <SessionTemplates 
            workoutData={workoutData}
            onSelectTemplate={handleStartWorkout}
            onStartEmpty={() => {
              workoutData.startEmptyWorkout()
              setCurrentScreen(SCREENS.WORKOUT)
            }}
          />
        )
      
      case SCREENS.TEMPLATES:
        return (
          <SessionTemplates 
            workoutData={workoutData}
            onSelectTemplate={handleStartWorkout}
            onStartEmpty={() => {
              workoutData.startEmptyWorkout()
              setCurrentScreen(SCREENS.WORKOUT)
            }}
          />
        )
      
      case SCREENS.HISTORY:
        return (
          <History 
            workoutData={workoutData}
            onRepeatWorkout={(id) => {
              workoutData.repeatWorkout(id)
              setCurrentScreen(SCREENS.WORKOUT)
            }}
          />
        )
      
      case SCREENS.STATS:
        return <ProgressCharts workoutData={workoutData} />
      
      case SCREENS.SETTINGS:
        return (
          <Settings 
            workoutData={workoutData}
            canInstall={canInstall}
            isInstalled={isInstalled}
            onInstall={promptInstall}
          />
        )
      
      default:
        return null
    }
  }
  
  return (
    <div className="min-h-screen min-h-[100dvh] bg-dark-bg text-white flex flex-col">
      {/* Notification de mise à jour disponible */}
      {updateAvailable && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-primary-active px-4 py-3 flex items-center justify-between safe-area-top animate-slide-down shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-spin-slow">
              <RefreshCw size={16} />
            </div>
            <div>
              <div className="text-sm font-semibold">Mise à jour disponible</div>
              <div className="text-xs opacity-90">Nouvelle version prête à installer</div>
            </div>
          </div>
          <button 
            onClick={applyUpdate}
            className="px-4 py-2 bg-white text-primary rounded-lg text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all"
          >
            Installer
          </button>
        </div>
      )}
      
      {/* Indicateur hors ligne - Design amélioré */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 flex items-center justify-center gap-2 safe-area-top shadow-lg">
          <WifiOff size={16} className="animate-pulse" />
          <span className="text-sm font-semibold text-white">Mode hors ligne - Données sauvegardées localement</span>
        </div>
      )}
      
      {/* Contenu principal */}
      <main className={`flex-1 overflow-hidden ${updateAvailable ? 'pt-12' : ''} ${!isOnline && !updateAvailable ? 'pt-10' : ''}`}>
        {renderScreen()}
      </main>
      
      {/* Bottom Navigation - Toujours visible sauf pendant workout actif */}
      {!(currentWorkout && currentScreen === SCREENS.WORKOUT) && (
        <nav className="fixed bottom-0 left-0 right-0 bg-dark-surface border-t border-dark-border safe-area-bottom">
          {/* Indicateur de statut en haut de la nav */}
          {(!isOnline || updateAvailable) && (
            <div className="absolute top-0 left-0 right-0 h-0.5">
              {!isOnline && <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse" />}
              {updateAvailable && <div className="h-full bg-gradient-to-r from-primary to-primary-active animate-pulse" />}
            </div>
          )}
          <div className="flex items-center justify-around h-16">
            <NavButton 
              icon={Target}
              label="Exercices"
              isActive={currentScreen === SCREENS.EXERCISES}
              onClick={() => navigate(SCREENS.EXERCISES)}
            />
            <NavButton 
              icon={Dumbbell}
              label="Séances"
              isActive={currentScreen === SCREENS.WORKOUT || currentScreen === SCREENS.TEMPLATES}
              onClick={() => navigate(currentWorkout ? SCREENS.WORKOUT : SCREENS.TEMPLATES)}
              hasIndicator={!!currentWorkout}
            />
            <NavButton 
              icon={Calendar}
              label="Historique"
              isActive={currentScreen === SCREENS.HISTORY}
              onClick={() => navigate(SCREENS.HISTORY)}
            />
            <NavButton 
              icon={TrendingUp}
              label="Stats"
              isActive={currentScreen === SCREENS.STATS}
              onClick={() => navigate(SCREENS.STATS)}
            />
            <NavButton 
              icon={SettingsIcon}
              label="Réglages"
              isActive={currentScreen === SCREENS.SETTINGS}
              onClick={() => navigate(SCREENS.SETTINGS)}
            />
          </div>
        </nav>
      )}
      
      {/* Padding pour la nav bar */}
      {!(currentWorkout && currentScreen === SCREENS.WORKOUT) && (
        <div className="h-16 pb-safe-bottom" />
      )}
    </div>
  )
}

// Bouton de navigation
function NavButton({ icon: Icon, label, isActive, onClick, hasIndicator }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center min-w-touch min-h-touch px-3 py-2 transition-colors relative ${
        isActive ? 'text-primary' : 'text-text-secondary'
      }`}
    >
      <div className="relative">
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        {hasIndicator && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-success rounded-full" />
        )}
      </div>
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </button>
  )
}

export default App
