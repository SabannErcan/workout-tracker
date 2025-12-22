import React, { useMemo } from 'react'
import { 
  Dumbbell, 
  Play, 
  Clock, 
  TrendingUp,
  Calendar,
  Flame,
  ChevronRight,
  Plus
} from 'lucide-react'
import { formatDuration, getRelativeDate, calculateRestDays } from '../utils/dateHelpers'
import { formatVolume, calculateWorkoutsPerWeek } from '../utils/calculations'

function HomeScreen({ workoutData, onStartWorkout, onNavigate }) {
  const { 
    sessionTemplates, 
    workoutHistory, 
    currentWorkout,
    userSettings,
    calculateStats 
  } = workoutData
  
  // Stats calculées
  const stats = useMemo(() => calculateStats(), [calculateStats])
  const restDays = useMemo(
    () => calculateRestDays(workoutHistory), 
    [workoutHistory]
  )
  const workoutsPerWeek = useMemo(
    () => calculateWorkoutsPerWeek(workoutHistory), 
    [workoutHistory]
  )
  
  // Dernier workout
  const lastWorkout = workoutHistory[0]
  
  // Templates récents (max 3)
  const recentTemplates = sessionTemplates.slice(0, 3)
  
  return (
    <div className="h-full overflow-y-auto pb-4">
      {/* Header */}
      <header className="px-4 pt-safe-top pb-4 bg-dark-bg sticky top-0 z-10">
        <div className="pt-4">
          <h1 className="text-2xl font-bold">Workout Tracker</h1>
          <p className="text-text-secondary text-sm mt-1">
            {restDays === 0 
              ? "Tu as fait du sport aujourd'hui 💪" 
              : restDays === 1 
                ? "1 jour de repos" 
                : `${restDays} jours de repos`
            }
          </p>
        </div>
      </header>
      
      {/* Contenu */}
      <div className="px-4 space-y-6">
        {/* Workout en cours */}
        {currentWorkout && (
          <section className="animate-fade-in">
            <button 
              onClick={() => onNavigate('workout')}
              className="w-full bg-gradient-to-r from-primary to-primary-active rounded-ios-lg p-4 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/80 uppercase tracking-wide">En cours</p>
                  <h2 className="text-lg font-semibold mt-1">{currentWorkout.templateName}</h2>
                  <p className="text-sm text-white/80 mt-1">
                    {currentWorkout.exercises.length} exercices • {currentWorkout.totalVolume}{userSettings.weightUnit}
                  </p>
                </div>
                <div className="bg-white/20 rounded-full p-3">
                  <Play size={24} fill="white" />
                </div>
              </div>
            </button>
          </section>
        )}
        
        {/* Quick Start */}
        {!currentWorkout && recentTemplates.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Démarrage rapide</h2>
              <button 
                onClick={() => onNavigate('templates')}
                className="text-primary text-sm font-medium"
              >
                Voir tout
              </button>
            </div>
            
            <div className="space-y-2">
              {recentTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onStartWorkout(template.id)}
                  className="w-full bg-dark-surface rounded-ios p-4 flex items-center gap-4 touch-feedback"
                >
                  <div className="w-12 h-12 bg-dark-elevated rounded-ios flex items-center justify-center">
                    <Dumbbell size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-text-secondary">
                      {template.exercises.length} exercices
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-text-tertiary" />
                </button>
              ))}
              
              {/* Bouton séance libre */}
              <button
                onClick={() => {
                  workoutData.startEmptyWorkout()
                  onNavigate('workout')
                }}
                className="w-full bg-dark-surface rounded-ios p-4 flex items-center gap-4 touch-feedback border border-dashed border-dark-border"
              >
                <div className="w-12 h-12 bg-dark-elevated rounded-ios flex items-center justify-center">
                  <Plus size={24} className="text-text-secondary" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-text-secondary">Séance libre</h3>
                  <p className="text-sm text-text-tertiary">Créer une séance vide</p>
                </div>
              </button>
            </div>
          </section>
        )}
        
        {/* Pas de templates - CTA création */}
        {!currentWorkout && sessionTemplates.length === 0 && (
          <section className="bg-dark-surface rounded-ios-lg p-6 text-center">
            <div className="w-16 h-16 bg-dark-elevated rounded-full flex items-center justify-center mx-auto mb-4">
              <Dumbbell size={32} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Bienvenue !</h2>
            <p className="text-text-secondary text-sm mb-4">
              Commence par créer ton premier template de séance
            </p>
            <button 
              onClick={() => onNavigate('templates')}
              className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-ios"
            >
              Créer un template
            </button>
          </section>
        )}
        
        {/* Stats rapides */}
        {workoutHistory.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3">Cette semaine</h2>
            <div className="grid grid-cols-2 gap-3">
              <StatCard 
                icon={Calendar}
                label="Séances"
                value={workoutsPerWeek}
                suffix="/sem"
                color="text-primary"
              />
              <StatCard 
                icon={Flame}
                label="Volume total"
                value={formatVolume(stats.totalVolume, userSettings.weightUnit)}
                color="text-warning"
              />
              <StatCard 
                icon={Clock}
                label="Temps total"
                value={formatDuration(stats.totalDuration)}
                color="text-success"
              />
              <StatCard 
                icon={TrendingUp}
                label="Séries"
                value={stats.totalSets}
                color="text-danger"
              />
            </div>
          </section>
        )}
        
        {/* Dernier workout */}
        {lastWorkout && (
          <section>
            <h2 className="text-lg font-semibold mb-3">Dernière séance</h2>
            <button
              onClick={() => onNavigate('history')}
              className="w-full bg-dark-surface rounded-ios p-4 text-left touch-feedback"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{lastWorkout.templateName}</h3>
                <span className="text-xs text-text-secondary">
                  {getRelativeDate(lastWorkout.date)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                <span className="flex items-center gap-1">
                  <Dumbbell size={14} />
                  {lastWorkout.exercises.length} exos
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {formatDuration(lastWorkout.duration)}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp size={14} />
                  {formatVolume(lastWorkout.totalVolume, userSettings.weightUnit)}
                </span>
              </div>
            </button>
          </section>
        )}
      </div>
    </div>
  )
}

// Carte de statistique
function StatCard({ icon: Icon, label, value, suffix = '', color }) {
  return (
    <div className="bg-dark-surface rounded-ios p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className={color} />
        <span className="text-xs text-text-secondary">{label}</span>
      </div>
      <p className="text-xl font-bold">
        {value}
        {suffix && <span className="text-sm font-normal text-text-secondary">{suffix}</span>}
      </p>
    </div>
  )
}

export default HomeScreen
