import React, { useMemo } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Dumbbell,
  Calendar,
  Activity
} from 'lucide-react'
import { formatWorkoutDate } from '../utils/dateHelpers'

/**
 * Composant pour comparer les performances entre salles de sport
 */
export default function GymComparison({ workoutHistory, gyms, currentGym }) {
  // Statistiques par salle
  const gymStats = useMemo(() => {
    const stats = {}
    
    // Initialiser les stats pour chaque salle
    gyms.forEach(gym => {
      stats[gym.id] = {
        gymName: gym.name,
        totalWorkouts: 0,
        totalVolume: 0,
        totalSets: 0,
        averageVolume: 0,
        exercises: {},
        lastWorkout: null
      }
    })
    
    // Stats pour "sans salle"
    stats['none'] = {
      gymName: 'Sans salle spécifique',
      totalWorkouts: 0,
      totalVolume: 0,
      totalSets: 0,
      averageVolume: 0,
      exercises: {},
      lastWorkout: null
    }
    
    // Parcourir l'historique
    workoutHistory.forEach(workout => {
      const gymId = workout.gymId || 'none'
      
      if (!stats[gymId]) return
      
      stats[gymId].totalWorkouts++
      stats[gymId].totalVolume += workout.totalVolume || 0
      
      // Date du dernier workout
      if (!stats[gymId].lastWorkout || new Date(workout.date) > new Date(stats[gymId].lastWorkout)) {
        stats[gymId].lastWorkout = workout.date
      }
      
      // Stats par exercice
      workout.exercises?.forEach(ex => {
        if (!stats[gymId].exercises[ex.name]) {
          stats[gymId].exercises[ex.name] = {
            count: 0,
            totalVolume: 0,
            maxWeight: 0,
            totalSets: 0
          }
        }
        
        const exerciseStats = stats[gymId].exercises[ex.name]
        exerciseStats.count++
        
        ex.sets?.forEach(set => {
          if (set.completed) {
            stats[gymId].totalSets++
            exerciseStats.totalSets++
            
            const volume = (set.weight || 0) * (set.reps || 0)
            exerciseStats.totalVolume += volume
            exerciseStats.maxWeight = Math.max(exerciseStats.maxWeight, set.weight || 0)
          }
        })
      })
    })
    
    // Calculer les moyennes
    Object.values(stats).forEach(s => {
      if (s.totalWorkouts > 0) {
        s.averageVolume = Math.round(s.totalVolume / s.totalWorkouts)
      }
    })
    
    return stats
  }, [workoutHistory, gyms])
  
  // Top exercices par salle
  const topExercisesByGym = useMemo(() => {
    const result = {}
    
    Object.entries(gymStats).forEach(([gymId, stats]) => {
      result[gymId] = Object.entries(stats.exercises || {})
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.totalVolume - a.totalVolume)
        .slice(0, 5)
    })
    
    return result
  }, [gymStats])
  
  // Comparaison salle actuelle vs autres
  const currentGymComparison = useMemo(() => {
    if (!currentGym) return null
    
    const current = gymStats[currentGym]
    if (!current) return null
    
    // Moyenne des autres salles
    const otherGyms = Object.entries(gymStats)
      .filter(([id]) => id !== currentGym && id !== 'none')
      .map(([, stats]) => stats)
    
    if (otherGyms.length === 0) return null
    
    const avgOthersVolume = otherGyms.reduce((sum, g) => sum + g.averageVolume, 0) / otherGyms.length
    const avgOthersSets = otherGyms.reduce((sum, g) => sum + g.totalSets, 0) / otherGyms.length / Math.max(1, otherGyms.reduce((sum, g) => sum + g.totalWorkouts, 0) / otherGyms.length)
    
    return {
      volumeDiff: current.averageVolume - avgOthersVolume,
      volumePercent: avgOthersVolume > 0 ? ((current.averageVolume - avgOthersVolume) / avgOthersVolume * 100).toFixed(1) : 0,
      setsDiff: (current.totalSets / Math.max(1, current.totalWorkouts)) - avgOthersSets,
    }
  }, [gymStats, currentGym])
  
  return (
    <div className="space-y-6">
      {/* Comparaison salle actuelle */}
      {currentGym && currentGymComparison && (
        <div className="bg-dark-surface rounded-ios-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            Comparaison avec les autres salles
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <StatComparisonCard
              label="Volume moyen"
              value={currentGymComparison.volumeDiff}
              percent={currentGymComparison.volumePercent}
              unit="kg"
            />
            <StatComparisonCard
              label="Séries/séance"
              value={currentGymComparison.setsDiff}
              unit="séries"
            />
          </div>
        </div>
      )}
      
      {/* Liste des salles avec stats */}
      <div className="space-y-3">
        <h3 className="font-semibold text-text-secondary">Statistiques par salle</h3>
        
        {Object.entries(gymStats)
          .filter(([id, stats]) => stats.totalWorkouts > 0)
          .sort(([, a], [, b]) => b.totalWorkouts - a.totalWorkouts)
          .map(([gymId, stats]) => (
            <GymStatsCard
              key={gymId}
              stats={stats}
              topExercises={topExercisesByGym[gymId]}
              isActive={gymId === currentGym}
            />
          ))}
      </div>
    </div>
  )
}

// Carte de comparaison de stat
function StatComparisonCard({ label, value, percent, unit }) {
  const isPositive = value > 0
  const isNeutral = Math.abs(value) < 1
  
  return (
    <div className="bg-dark-elevated rounded-ios p-3">
      <p className="text-xs text-text-secondary mb-1">{label}</p>
      <div className="flex items-center gap-2">
        {isNeutral ? (
          <Minus size={16} className="text-text-tertiary" />
        ) : isPositive ? (
          <TrendingUp size={16} className="text-success" />
        ) : (
          <TrendingDown size={16} className="text-danger" />
        )}
        <span className={`font-bold ${
          isNeutral ? 'text-text-secondary' : isPositive ? 'text-success' : 'text-danger'
        }`}>
          {isPositive ? '+' : ''}{Math.round(value)} {unit}
        </span>
      </div>
      {percent && !isNeutral && (
        <p className="text-xs text-text-tertiary mt-1">
          {isPositive ? '+' : ''}{percent}%
        </p>
      )}
    </div>
  )
}

// Carte de stats par salle
function GymStatsCard({ stats, topExercises, isActive }) {
  const [expanded, setExpanded] = React.useState(false)
  
  return (
    <div className={`bg-dark-surface rounded-ios-lg p-4 border-2 transition-colors ${
      isActive ? 'border-primary' : 'border-transparent'
    }`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isActive ? 'bg-primary text-white' : 'bg-dark-elevated'
            }`}>
              <Dumbbell size={20} />
            </div>
            <div>
              <p className="font-medium">{stats.gymName}</p>
              {stats.lastWorkout && (
                <p className="text-xs text-text-secondary flex items-center gap-1">
                  <Calendar size={12} />
                  Dernière: {formatWorkoutDate(stats.lastWorkout)}
                </p>
              )}
            </div>
          </div>
          {isActive && (
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Active</span>
          )}
        </div>
        
        {/* Stats principales */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-dark-elevated rounded-ios p-2">
            <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
            <p className="text-xs text-text-secondary">Séances</p>
          </div>
          <div className="bg-dark-elevated rounded-ios p-2">
            <p className="text-2xl font-bold">{Math.round(stats.totalVolume / 1000)}k</p>
            <p className="text-xs text-text-secondary">Volume total</p>
          </div>
          <div className="bg-dark-elevated rounded-ios p-2">
            <p className="text-2xl font-bold">{stats.totalSets}</p>
            <p className="text-xs text-text-secondary">Séries</p>
          </div>
        </div>
      </button>
      
      {/* Top exercices (expandable) */}
      {expanded && topExercises && topExercises.length > 0 && (
        <div className="mt-4 pt-4 border-t border-dark-border animate-fade-in">
          <p className="text-sm font-medium text-text-secondary mb-2">Top exercices</p>
          <div className="space-y-2">
            {topExercises.map((ex, index) => (
              <div key={ex.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-dark-elevated rounded flex items-center justify-center text-xs text-text-secondary">
                    {index + 1}
                  </span>
                  <span>{ex.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{Math.round(ex.totalVolume / 1000)}k kg</p>
                  <p className="text-xs text-text-tertiary">{ex.totalSets} séries</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
