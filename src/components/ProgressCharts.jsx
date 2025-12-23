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
  BarChart3,
  Trophy,
  Clock,
  Zap
} from 'lucide-react'
import { exerciseLibrary } from '../data/exercises/index.js'

/**
 * Page de statistiques et progression - Version améliorée avec heatmap et records
 */
export default function ProgressCharts({ workoutData }) {
  const { workoutHistory, userSettings } = workoutData
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [timeRange, setTimeRange] = useState('30') // 7, 30, 90, all
  const [viewMode, setViewMode] = useState('overview') // overview, calendar, records
  
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
  
  // Calendrier d'activité (heatmap)
  const activityHeatmap = useMemo(() => {
    const days = {}
    const today = new Date()
    const startDate = new Date()
    startDate.setDate(today.getDate() - 90) // 90 derniers jours
    
    // Initialiser tous les jours à 0
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split('T')[0]
      days[key] = { count: 0, volume: 0 }
    }
    
    // Compter les workouts
    workoutHistory.forEach(w => {
      const dateKey = new Date(w.date).toISOString().split('T')[0]
      if (days[dateKey]) {
        days[dateKey].count++
        days[dateKey].volume += w.totalVolume || 0
      }
    })
    
    return days
  }, [workoutHistory])
  
  // Records personnels
  const personalRecords = useMemo(() => {
    const records = []
    
    exerciseProgression.forEach(ex => {
      if (ex.sessions.length > 0) {
        ex.sessions.sort((a, b) => b.date - a.date)
        const recordSession = ex.sessions.reduce((max, s) => 
          s.maxWeight > max.maxWeight ? s : max
        )
        
        records.push({
          exerciseId: ex.id,
          exerciseName: ex.name,
          weight: recordSession.maxWeight,
          date: recordSession.date,
          isRecent: (new Date() - recordSession.date) < 7 * 24 * 60 * 60 * 1000 // 7 jours
        })
      }
    })
    
    return records.sort((a, b) => b.date - a.date).slice(0, 10)
  }, [exerciseProgression])
  
  // Streak (jours consécutifs)
  const currentStreak = useMemo(() => {
    if (workoutHistory.length === 0) return 0
    
    const sortedDates = [...new Set(workoutHistory.map(w => 
      new Date(w.date).toISOString().split('T')[0]
    ))].sort((a, b) => new Date(b) - new Date(a))
    
    let streak = 0
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]
    
    // Si pas d'entraînement aujourd'hui ni hier, streak = 0
    if (sortedDates[0] !== today && sortedDates[0] !== yesterdayStr) return 0
    
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i])
      const next = new Date(sortedDates[i + 1])
      const diffDays = Math.floor((current - next) / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) {
        streak++
      } else {
        break
      }
    }
    
    return streak + 1
  }, [workoutHistory])
  
  // Vue détail d'un exercice
  if (selectedExercise) {
    return <ExerciseProgressDetail 
      exercise={selectedExercise}
      onBack={() => setSelectedExercise(null)}
      userSettings={userSettings}
    />
  }
  
  return (
    <div className="h-full flex flex-col bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-surface border-b border-dark-border p-4 safe-area-top">
        <h1 className="text-xl font-bold mb-3">Progression</h1>
        
        {/* Onglets de vue */}
        <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar">
          {[
            { value: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
            { value: 'calendar', label: 'Calendrier', icon: Calendar },
            { value: 'records', label: 'Records', icon: Trophy }
          ].map(mode => {
            const Icon = mode.icon
            return (
              <button
                key={mode.value}
                onClick={() => setViewMode(mode.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  viewMode === mode.value
                    ? 'bg-primary text-white'
                    : 'bg-dark-bg text-text-secondary'
                }`}
              >
                <Icon size={16} />
                {mode.label}
              </button>
            )
          })}
        </div>
        
        {/* Sélecteur de période (seulement pour vue d'ensemble) */}
        {viewMode === 'overview' && (
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
        )}
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
            {/* Vue d'ensemble */}
            {viewMode === 'overview' && (
              <>
                {/* Stats globales avec streak */}
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-3">
                    <StatCard
                      icon={<Calendar size={18} />}
                      label="Jours"
                      value={globalStats.totalDays}
                      color="bg-blue-500"
                    />
                    <StatCard
                      icon={<Dumbbell size={18} />}
                      label="Séries"
                      value={globalStats.totalSets}
                      color="bg-purple-500"
                    />
                    <StatCard
                      icon={<Flame size={18} />}
                      label="Volume"
                      value={`${(globalStats.totalVolume / 1000).toFixed(1)}t`}
                      color="bg-orange-500"
                    />
                    <StatCard
                      icon={<Zap size={18} />}
                      label="Série"
                      value={currentStreak > 0 ? `${currentStreak}j` : '0'}
                      color="bg-green-500"
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
            
            {/* Vue calendrier (heatmap) */}
            {viewMode === 'calendar' && (
              <div className="p-4">
                <div className="bg-dark-surface rounded-2xl p-4 mb-4">
                  <h2 className="text-lg font-bold mb-2">Activité des 90 derniers jours</h2>
                  <p className="text-sm text-text-secondary mb-4">
                    {currentStreak > 0 ? `🔥 ${currentStreak} jour${currentStreak > 1 ? 's' : ''} d'affilée` : 'Pas de série en cours'}
                  </p>
                  <ActivityHeatmap data={activityHeatmap} />
                </div>
                
                <div className="bg-dark-surface rounded-2xl p-4">
                  <h3 className="font-bold mb-3">Légende</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-dark-bg rounded"></div>
                      <span className="text-text-secondary">Aucun</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/30 rounded"></div>
                      <span className="text-text-secondary">Léger</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/60 rounded"></div>
                      <span className="text-text-secondary">Moyen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary rounded"></div>
                      <span className="text-text-secondary">Intense</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Vue records */}
            {viewMode === 'records' && (
              <div className="p-4">
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Trophy size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Records personnels</h2>
                      <p className="text-sm text-text-secondary">{personalRecords.length} exercices</p>
                    </div>
                  </div>
                </div>
                
                {personalRecords.length === 0 ? (
                  <div className="bg-dark-surface rounded-2xl p-6 text-center text-text-secondary">
                    Aucun record enregistré
                  </div>
                ) : (
                  <div className="space-y-2">
                    {personalRecords.map((record, i) => (
                      <div key={i} className="bg-dark-surface rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{record.exerciseName}</h3>
                              {record.isRecent && (
                                <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded-full font-medium">
                                  Nouveau!
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-text-secondary">
                              {new Date(record.date).toLocaleDateString('fr-FR', { 
                                day: 'numeric', 
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-yellow-500">{record.weight} kg</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
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
 * Heatmap d'activité (calendrier)
 */
function ActivityHeatmap({ data }) {
  const days = Object.entries(data).slice(-90) // 90 derniers jours
  const maxCount = Math.max(...days.map(([, d]) => d.count), 1)
  
  // Grouper par semaine
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  
  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map(([date, dayData]) => {
              const intensity = dayData.count === 0 ? 0 : Math.ceil((dayData.count / maxCount) * 3)
              const colorClass = [
                'bg-dark-bg',
                'bg-primary/30',
                'bg-primary/60',
                'bg-primary'
              ][intensity]
              
              return (
                <div
                  key={date}
                  className={`w-3 h-3 rounded-sm ${colorClass} transition-all hover:scale-125`}
                  title={`${new Date(date).toLocaleDateString('fr-FR')} - ${dayData.count} workout${dayData.count > 1 ? 's' : ''}`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Vue détail de progression d'un exercice
 */
function ExerciseProgressDetail({ exercise, onBack, userSettings }) {
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
