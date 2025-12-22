import React, { useState, useMemo } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Flame,
  Award,
  Calendar,
  Dumbbell,
  Target,
  ChevronRight,
  ChevronLeft,
  Activity,
  BarChart3
} from 'lucide-react'
import { exerciseLibrary } from '../data/exercises/index.js'

/**
 * Page de statistiques et progression - Version améliorée
 */
export default function ProgressCharts({ workoutData }) {
  const { workoutHistory, userSettings } = workoutData
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [timeRange, setTimeRange] = useState('30') // 7, 30, 90, all
  
  // Filtrer l'historique selon la période
  const filteredHistory = useMemo(() => {
    if (timeRange === 'all') return workoutHistory
    
    const days = parseInt(timeRange)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    return workoutHistory.filter(w => new Date(w.date) >= cutoffDate)
  }, [workoutHistory, timeRange])
  
  // Stats globales
  const globalStats = useMemo(() => {
    const totalDays = new Set(workoutHistory.map(w => 
      new Date(w.date).toDateString()
    )).size
    
    let totalSets = 0
    let totalVolume = 0
    
    workoutHistory.forEach(w => {
      w.exercises?.forEach(ex => {
        ex.sets?.forEach(set => {
          if (set.completed) {
            totalSets++
            totalVolume += (set.weight || 0) * (set.reps || 0)
          }
        })
      })
    })
    
    return { totalDays, totalSets, totalVolume }
  }, [workoutHistory])
  
  // Progression par exercice
  const exerciseProgression = useMemo(() => {
    const progression = {}
    
    workoutHistory.forEach(w => {
      w.exercises?.forEach(ex => {
        if (!progression[ex.exerciseId]) {
          progression[ex.exerciseId] = {
            id: ex.exerciseId,
            name: ex.name,
            sessions: [],
            maxWeight: 0,
            totalVolume: 0,
            totalSets: 0
          }
        }
        
        let sessionVolume = 0
        let sessionMaxWeight = 0
        let sessionSets = 0
        
        ex.sets?.forEach(set => {
          if (set.completed) {
            sessionSets++
            sessionVolume += (set.weight || 0) * (set.reps || 0)
            sessionMaxWeight = Math.max(sessionMaxWeight, set.weight || 0)
          }
        })
        
        if (sessionSets > 0) {
          progression[ex.exerciseId].sessions.push({
            date: new Date(w.date),
            volume: sessionVolume,
            maxWeight: sessionMaxWeight,
            sets: sessionSets
          })
          progression[ex.exerciseId].totalVolume += sessionVolume
          progression[ex.exerciseId].totalSets += sessionSets
          progression[ex.exerciseId].maxWeight = Math.max(
            progression[ex.exerciseId].maxWeight,
            sessionMaxWeight
          )
        }
      })
    })
    
    // Calculer la progression (% d'augmentation)
    Object.values(progression).forEach(ex => {
      if (ex.sessions.length >= 2) {
        ex.sessions.sort((a, b) => a.date - b.date)
        const firstWeight = ex.sessions[0].maxWeight
        const lastWeight = ex.sessions[ex.sessions.length - 1].maxWeight
        ex.progressPercent = firstWeight > 0 
          ? ((lastWeight - firstWeight) / firstWeight * 100)
          : 0
      } else {
        ex.progressPercent = 0
      }
    })
    
    return Object.values(progression).sort((a, b) => b.totalVolume - a.totalVolume)
  }, [workoutHistory])
  
  // Top exercices
  const topExercises = exerciseProgression.slice(0, 10)
  
  // Vue détail d'un exercice
  if (selectedExercise) {
    return <ExerciseProgressDetail 
      exercise={selectedExercise}
      onBack={() => setSelectedExercise(null)}
    />
  }
  
  return (
    <div className="h-full flex flex-col bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-surface border-b border-dark-border p-4 safe-area-top">
        <h1 className="text-xl font-bold mb-3">Progression</h1>
        
        {/* Sélecteur de période */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {[
            { value: '7', label: '7j' },
            { value: '30', label: '30j' },
            { value: '90', label: '3 mois' },
            { value: 'all', label: 'Tout' }
          ].map(range => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                timeRange === range.value
                  ? 'bg-primary text-white'
                  : 'bg-dark-bg text-text-secondary'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </header>
      
      {/* Contenu */}
      <main className="flex-1 overflow-y-auto pb-24">
        {workoutHistory.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-dark-surface rounded-full flex items-center justify-center">
              <BarChart3 size={32} className="text-text-secondary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Pas encore de données</h3>
            <p className="text-text-secondary">
              Commence à t'entraîner pour voir ta progression !
            </p>
          </div>
        ) : (
          <>
            {/* Stats globales */}
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3">
                <StatCard
                  icon={<Calendar size={20} />}
                  label="Jours"
                  value={globalStats.totalDays}
                  color="bg-blue-500"
                />
                <StatCard
                  icon={<Dumbbell size={20} />}
                  label="Séries"
                  value={globalStats.totalSets}
                  color="bg-purple-500"
                />
                <StatCard
                  icon={<Flame size={20} />}
                  label="Volume"
                  value={`${(globalStats.totalVolume / 1000).toFixed(1)}t`}
                  color="bg-orange-500"
                />
              </div>
            </div>
            
            {/* Progression par exercice */}
            <div className="px-4 pb-4">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Activity size={20} className="text-primary" />
                Progression des exercices
              </h2>
              
              {topExercises.length === 0 ? (
                <div className="bg-dark-surface rounded-2xl p-6 text-center text-text-secondary">
                  Aucun exercice enregistré
                </div>
              ) : (
                <div className="space-y-2">
                  {topExercises.map(ex => (
                    <ExerciseProgressCard
                      key={ex.id}
                      exercise={ex}
                      onClick={() => setSelectedExercise(ex)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

/**
 * Carte de stat simple
 */
function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-dark-surface rounded-2xl p-4">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-white mb-2`}>
        {icon}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  )
}

/**
 * Carte de progression d'un exercice
 */
function ExerciseProgressCard({ exercise, onClick }) {
  const trend = exercise.progressPercent > 0 ? 'up' : exercise.progressPercent < 0 ? 'down' : 'neutral'
  
  return (
    <button
      onClick={onClick}
      className="w-full bg-dark-surface rounded-2xl p-4 flex items-center gap-4 hover:bg-dark-border transition-colors active:scale-98"
    >
      {/* Info */}
      <div className="flex-1 text-left min-w-0">
        <h3 className="font-semibold truncate mb-1">{exercise.name}</h3>
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <span>{exercise.totalSets} séries</span>
          <span>•</span>
          <span>{(exercise.totalVolume / 1000).toFixed(1)}t volume</span>
        </div>
      </div>
      
      {/* Progression */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="font-bold text-lg">{exercise.maxWeight} kg</div>
          {exercise.progressPercent !== 0 && (
            <div className={`text-xs flex items-center gap-1 ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {Math.abs(exercise.progressPercent).toFixed(0)}%
            </div>
          )}
        </div>
        <ChevronRight size={20} className="text-text-secondary" />
      </div>
    </button>
  )
}

/**
 * Vue détail de progression d'un exercice
 */
function ExerciseProgressDetail({ exercise, onBack }) {
  // Trier les sessions par date
  const sessions = useMemo(() => {
    return [...exercise.sessions].sort((a, b) => a.date - b.date)
  }, [exercise.sessions])
  
  // Stats
  const firstSession = sessions[0]
  const lastSession = sessions[sessions.length - 1]
  const avgWeight = sessions.reduce((sum, s) => sum + s.maxWeight, 0) / sessions.length
  const totalProgress = firstSession ? lastSession.maxWeight - firstSession.maxWeight : 0
  
  // Graphique simple en barres
  const maxSessionWeight = Math.max(...sessions.map(s => s.maxWeight))
  
  return (
    <div className="h-full flex flex-col bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-surface border-b border-dark-border p-4 safe-area-top">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary mb-3"
        >
          <ChevronLeft size={20} />
          <span>Retour</span>
        </button>
        <h1 className="text-xl font-bold">{exercise.name}</h1>
        <p className="text-sm text-text-secondary">{sessions.length} séances enregistrées</p>
      </header>
      
      {/* Contenu */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Stats rapides */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <StatCard
              icon={<Award size={18} />}
              label="Record"
              value={`${exercise.maxWeight} kg`}
              color="bg-yellow-500"
            />
            <StatCard
              icon={<Target size={18} />}
              label="Moyenne"
              value={`${avgWeight.toFixed(1)} kg`}
              color="bg-blue-500"
            />
            <StatCard
              icon={<TrendingUp size={18} />}
              label="Progrès"
              value={totalProgress > 0 ? `+${totalProgress} kg` : `${totalProgress} kg`}
              color={totalProgress > 0 ? 'bg-green-500' : 'bg-red-500'}
            />
          </div>
        </div>
        
        {/* Graphique */}
        <div className="px-4 pb-4">
          <h2 className="text-lg font-bold mb-3">Évolution du poids max</h2>
          <div className="bg-dark-surface rounded-2xl p-4">
            <div className="flex items-end justify-between gap-2 h-48">
              {sessions.map((session, i) => {
                const heightPercent = (session.maxWeight / maxSessionWeight) * 100
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    {/* Barre */}
                    <div className="relative w-full flex items-end" style={{ height: '160px' }}>
                      <div
                        className="w-full bg-primary rounded-t-lg transition-all duration-300 hover:opacity-80"
                        style={{ height: `${heightPercent}%` }}
                        title={`${session.maxWeight} kg`}
                      />
                    </div>
                    {/* Label */}
                    <div className="text-xs text-text-secondary">
                      {new Date(session.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* Historique des séances */}
        <div className="px-4 pb-4">
          <h2 className="text-lg font-bold mb-3">Historique</h2>
          <div className="space-y-2">
            {sessions.slice().reverse().map((session, i) => (
              <div key={i} className="bg-dark-surface rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">
                    {new Date(session.date).toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long' 
                    })}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {session.sets} série{session.sets > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-text-secondary mb-1">Poids max</div>
                    <div className="text-xl font-bold text-primary">{session.maxWeight} kg</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-text-secondary mb-1">Volume</div>
                    <div className="text-xl font-bold">{(session.volume / 1000).toFixed(1)}t</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
