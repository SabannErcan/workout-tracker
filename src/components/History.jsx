import React, { useState, useMemo } from 'react'
import { 
  ChevronDown,
  ChevronUp,
  Clock,
  Dumbbell,
  Weight,
  Search,
  X,
  Calendar,
  Flame,
  MapPin,
  Copy,
  Filter
} from 'lucide-react'

/**
 * Historique amélioré - Vue claire par jour
 */
export default function History({ workoutData, onStartWorkout }) {
  const { workoutHistory, userSettings, gyms } = workoutData
  
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedDay, setExpandedDay] = useState(null)
  const [selectedGym, setSelectedGym] = useState(null) // Filtre par salle
  
  // Grouper par jour
  const historyByDay = useMemo(() => {
    const grouped = {}
    
    workoutHistory.forEach(workout => {
      workout.exercises?.forEach(exercise => {
        exercise.sets?.forEach(set => {
          if (set.completed !== false) {
            const dateKey = new Date(workout.date).toLocaleDateString('fr-FR')
            if (!grouped[dateKey]) {
              grouped[dateKey] = {
                date: workout.date,
                workoutId: workout.id,
                gymId: workout.gymId,
                duration: workout.duration,
                exercises: {},
                totalVolume: 0,
                totalSets: 0
              }
            }
            
            const exName = exercise.name || exercise.exerciseId
            if (!grouped[dateKey].exercises[exName]) {
              grouped[dateKey].exercises[exName] = {
                name: exName,
                sets: [],
                bestWeight: 0
              }
            }
            
            grouped[dateKey].exercises[exName].sets.push({
              weight: set.weight,
              reps: set.reps,
              notes: set.notes
            })
            
            if (set.weight > grouped[dateKey].exercises[exName].bestWeight) {
              grouped[dateKey].exercises[exName].bestWeight = set.weight
            }
            
            grouped[dateKey].totalVolume += (set.weight || 0) * (set.reps || 0)
            grouped[dateKey].totalSets++
          }
        })
      })
    })
    
    return Object.entries(grouped)
      .map(([dateKey, data]) => ({
        dateKey,
        ...data,
        exercisesList: Object.values(data.exercises)
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [workoutHistory])
  
  // Filtrer par recherche et par salle
  const filteredHistory = useMemo(() => {
    let filtered = historyByDay
    
    // Filtre par salle
    if (selectedGym) {
      filtered = filtered.filter(day => day.gymId === selectedGym)
    }
    
    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(day => 
        day.exercisesList.some(ex => 
          ex.name.toLowerCase().includes(query)
        )
      ).map(day => ({
        ...day,
        exercisesList: day.exercisesList.filter(ex => 
          ex.name.toLowerCase().includes(query)
        )
      }))
    }
    
    return filtered
  }, [historyByDay, searchQuery, selectedGym])
  
  // Stats globales
  const globalStats = useMemo(() => {
    let totalDays = historyByDay.length
    let totalSets = 0
    let totalVolume = 0
    
    historyByDay.forEach(day => {
      totalSets += day.totalSets
      totalVolume += day.totalVolume
    })
    
    return { totalDays, totalSets, totalVolume }
  }, [historyByDay])
  
  return (
    <div className="h-full flex flex-col bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-surface border-b border-dark-border p-4 safe-area-top">
        <h1 className="text-xl font-bold mb-1">Historique</h1>
        <p className="text-sm text-text-secondary">
          {globalStats.totalDays} jour{globalStats.totalDays > 1 ? 's' : ''} d'entraînement
        </p>
        
        {/* Stats rapides */}
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Dumbbell size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold">{globalStats.totalSets}</div>
              <div className="text-xs text-text-secondary">séries</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Weight size={16} className="text-green-500" />
            </div>
            <div>
              <div className="text-lg font-bold">{Math.round(globalStats.totalVolume / 1000)}k</div>
              <div className="text-xs text-text-secondary">kg total</div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Barre de recherche */}
      <div className="p-4 bg-dark-surface border-b border-dark-border space-y-3">
        {/* Recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input
            type="text"
            placeholder="Rechercher un exercice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-text-secondary focus:border-primary focus:outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        {/* Filtre par salle */}
        {gyms && gyms.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Filtrer par salle</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedGym(null)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  selectedGym === null
                    ? 'bg-primary text-white'
                    : 'bg-dark-bg text-text-secondary border border-dark-border'
                }`}
              >
                Toutes
              </button>
              {gyms.map(gym => (
                <button
                  key={gym.id}
                  onClick={() => setSelectedGym(gym.id)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                    selectedGym === gym.id
                      ? 'bg-primary text-white'
                      : 'bg-dark-bg text-text-secondary border border-dark-border'
                  }`}
                >
                  {gym.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Liste par jour */}
      <div className="flex-1 overflow-y-auto">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Calendar size={64} className="text-text-secondary mb-4 opacity-30" />
            <h3 className="text-lg font-semibold mb-2">Aucun historique</h3>
            <p className="text-text-secondary">
              {searchQuery ? `Aucun résultat pour "${searchQuery}"` : 'Commence à enregistrer tes séries !'}
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredHistory.map((day) => (
              <DayCard
                key={day.dateKey}
                day={day}
                gyms={gyms}
                isExpanded={expandedDay === day.dateKey}
                onToggle={() => setExpandedDay(expandedDay === day.dateKey ? null : day.dateKey)}
                onRepeat={onStartWorkout}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Carte d'un jour
 */
function DayCard({ day, gyms, isExpanded, onToggle, onRepeat }) {
  const date = new Date(day.date)
  const isToday = new Date().toDateString() === date.toDateString()
  const isYesterday = new Date(Date.now() - 86400000).toDateString() === date.toDateString()
  
  const dateLabel = isToday ? "Aujourd'hui" : 
                    isYesterday ? 'Hier' : 
                    date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  
  const gymName = gyms?.find(g => g.id === day.gymId)?.name
  
  const handleRepeat = () => {
    if (onRepeat) {
      // Créer une nouvelle séance avec les mêmes exercices
      const exercisesToRepeat = day.exercisesList.map(ex => ({
        exerciseId: ex.name,
        name: ex.name
      }))
      onRepeat(exercisesToRepeat, day.gymId)
    }
  }
  
  const formatDuration = (seconds) => {
    if (!seconds) return null
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours}h ${mins}min`
    return `${mins}min`
  }
  
  return (
    <div className="bg-dark-surface rounded-2xl overflow-hidden">
      {/* Header cliquable */}
      <button
        onClick={onToggle}
        className="w-full p-4 text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold capitalize">{dateLabel}</h3>
              {isToday && (
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                  Aujourd'hui
                </span>
              )}
              {gymName && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                  <MapPin size={12} />
                  {gymName}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-text-secondary flex-wrap">
              <span>{day.exercisesList.length} exercice{day.exercisesList.length > 1 ? 's' : ''}</span>
              <span>•</span>
              <span>{day.totalSets} séries</span>
              {day.duration && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {formatDuration(day.duration)}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-bold text-primary">{Math.round(day.totalVolume)} kg</div>
              <div className="text-xs text-text-secondary">volume</div>
            </div>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </button>
      
      {/* Détails */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Bouton refaire séance */}
          {onRepeat && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRepeat()
              }}
              className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary py-3 rounded-xl transition-colors font-medium"
            >
              <Copy size={18} />
              Refaire cette séance
            </button>
          )}
          
          {day.exercisesList.map((exercise, i) => (
            <div key={i} className="bg-dark-bg rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{exercise.name}</h4>
                <div className="flex items-center gap-1 text-sm">
                  <Flame size={14} className="text-orange-500" />
                  <span className="text-primary font-bold">{exercise.bestWeight} kg</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {exercise.sets.map((set, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-dark-surface rounded-lg text-sm">
                      <span className="font-bold">{set.weight}</span>
                      <span className="text-text-secondary"> kg × </span>
                      <span className="font-bold">{set.reps}</span>
                    </span>
                    {set.notes && (
                      <span className="text-xs text-text-secondary italic flex-1">
                        "{set.notes}"
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
