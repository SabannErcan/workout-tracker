import React, { useState, useMemo, useCallback, useEffect } from 'react'
import {
  ChevronLeft,
  Plus,
  TrendingUp,
  Clock,
  Weight,
  Target,
  Search,
  X,
  Check,
  ChevronRight,
  Flame,
  History,
  Star,
  MapPin
} from 'lucide-react'

const GYM_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4']

function getGymColor(gymId, gyms) {
  const idx = gyms?.findIndex(g => g.id === gymId) ?? -1
  if (idx >= 0) return GYM_COLORS[idx % GYM_COLORS.length]
  return '#3B82F6'
}
import { exerciseLibrary } from '../data/exercises/index.js'
import { loadData, saveData, STORAGE_KEYS } from '../utils/storage.js'

// Catégories musculaires avec emojis et couleurs
const MUSCLE_CATEGORIES = [
  { id: 'chest', name: 'Pectoraux', emoji: '🫁', color: 'bg-red-500', muscles: ['Chest'] },
  { id: 'back', name: 'Dos', emoji: '🔙', color: 'bg-blue-500', muscles: ['Back'] },
  { id: 'shoulders', name: 'Épaules', emoji: '💪', color: 'bg-orange-500', muscles: ['Shoulders'] },
  { id: 'arms', name: 'Bras', emoji: '💪', color: 'bg-purple-500', muscles: ['Biceps', 'Triceps', 'Forearms'] },
  { id: 'legs', name: 'Jambes', emoji: '🦵', color: 'bg-green-500', muscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Adductors'] },
  { id: 'core', name: 'Abdos', emoji: '🎯', color: 'bg-yellow-500', muscles: ['Core', 'Abs'] },
]

/**
 * Composant principal - Vue par exercice
 */
export default function ExerciseTracker({ workoutData }) {
  const { workoutHistory, logQuickSet, getExerciseHistory, gyms, userSettings } = workoutData
  
  // États
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddSet, setShowAddSet] = useState(false)
  
  // Favoris
  const [favorites, setFavorites] = useState(() => 
    loadData(STORAGE_KEYS.FAVORITE_EXERCISES, [])
  )
  
  // Compteur d'usage des exercices
  const [exerciseUsage, setExerciseUsage] = useState(() => 
    loadData(STORAGE_KEYS.EXERCISE_USAGE, {})
  )
  
  // Sauvegarder les favoris quand ils changent
  useEffect(() => {
    saveData(STORAGE_KEYS.FAVORITE_EXERCISES, favorites)
  }, [favorites])
  
  // Calculer l'usage à partir de l'historique
  useEffect(() => {
    const usage = {}
    workoutHistory.forEach(workout => {
      workout.exercises?.forEach(ex => {
        const key = ex.exerciseId || ex.name
        usage[key] = (usage[key] || 0) + 1
      })
    })
    setExerciseUsage(usage)
    saveData(STORAGE_KEYS.EXERCISE_USAGE, usage)
  }, [workoutHistory])
  
  // Toggle favori
  const toggleFavorite = useCallback((exerciseId) => {
    setFavorites(prev => {
      if (prev.includes(exerciseId)) {
        return prev.filter(id => id !== exerciseId)
      }
      return [...prev, exerciseId]
    })
  }, [])
  
  // Exercices favoris
  const favoriteExercises = useMemo(() => {
    return exerciseLibrary.filter(ex => favorites.includes(ex.id))
  }, [favorites])
  
  // Exercices filtrés par catégorie et triés par usage
  const exercisesByCategory = useMemo(() => {
    const grouped = {}
    MUSCLE_CATEGORIES.forEach(cat => {
      // Filtrer par catégorie
      let exercises = exerciseLibrary.filter(ex => 
        cat.muscles.includes(ex.category?.primary)
      )
      
      // Trier par usage (les plus utilisés en premier)
      exercises = exercises.sort((a, b) => {
        const usageA = exerciseUsage[a.id] || 0
        const usageB = exerciseUsage[b.id] || 0
        return usageB - usageA // Ordre décroissant
      })
      
      grouped[cat.id] = exercises
    })
    return grouped
  }, [exerciseUsage])
  
  // Recherche globale
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return exerciseLibrary.filter(ex => 
      ex.name?.toLowerCase().includes(query) ||
      ex.nameTranslations?.fr?.toLowerCase().includes(query) ||
      ex.aliases?.some(a => a.toLowerCase().includes(query))
    ).slice(0, 20)
  }, [searchQuery])
  
  // Historique d'un exercice spécifique
  const exerciseHistory = useMemo(() => {
    if (!selectedExercise) return []
    
    // Parcourir l'historique pour trouver cet exercice
    const history = []
    workoutHistory.forEach(workout => {
      workout.exercises?.forEach(ex => {
        if (ex.exerciseId === selectedExercise.id || ex.name === selectedExercise.name) {
          ex.sets?.forEach(set => {
            if (set.completed) {
              history.push({
                date: workout.date,
                weight: set.weight,
                reps: set.reps,
                workoutId: workout.id,
                gymId: workout.gymId || null,
              })
            }
          })
        }
      })
    })
    
    // Trier par date décroissante
    return history.sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [selectedExercise, workoutHistory])
  
  // Meilleur record (1RM estimé)
  const personalRecord = useMemo(() => {
    if (!exerciseHistory.length) return null
    
    let best = { weight: 0, reps: 0, estimated1RM: 0 }
    exerciseHistory.forEach(h => {
      // Formule Epley pour estimer 1RM
      const estimated1RM = h.weight * (1 + h.reps / 30)
      if (estimated1RM > best.estimated1RM) {
        best = { ...h, estimated1RM }
      }
    })
    return best
  }, [exerciseHistory])
  
  // Dernière performance
  const lastPerformance = exerciseHistory[0] || null
  
  // Vue détail exercice - PRIORITAIRE
  if (selectedExercise) {
    return (
      <ExerciseDetail
        exercise={selectedExercise}
        history={exerciseHistory}
        personalRecord={personalRecord}
        lastPerformance={lastPerformance}
        workoutData={workoutData}
        gyms={gyms}
        currentGym={userSettings?.currentGym || null}
        onBack={() => {
          setSelectedExercise(null)
        }}
      />
    )
  }
  
  // Vue recherche
  if (searchQuery) {
    return (
      <div className="h-full flex flex-col">
        <header className="bg-dark-surface border-b border-dark-border p-4 safe-area-top">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Rechercher un exercice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-10 py-3 text-white placeholder-text-secondary focus:border-primary focus:outline-none"
            />
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
            >
              <X size={20} />
            </button>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto">
          {searchResults.length === 0 ? (
            <div className="p-8 text-center text-text-secondary">
              Aucun exercice trouvé pour "{searchQuery}"
            </div>
          ) : (
            <div className="divide-y divide-dark-border">
              {searchResults.map(ex => (
                <ExerciseListItem 
                  key={ex.id} 
                  exercise={ex} 
                  workoutHistory={workoutHistory}
                  isFavorite={favorites.includes(ex.id)}
                  onToggleFavorite={() => toggleFavorite(ex.id)}
                  onClick={() => {
                    setSelectedExercise(ex)
                    setSearchQuery('')
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
  
  // Vue liste exercices d'une catégorie
  if (selectedCategory) {
    const exercises = exercisesByCategory[selectedCategory.id] || []
    
    return (
      <div className="h-full flex flex-col">
        <header className="bg-dark-surface border-b border-dark-border p-4 safe-area-top">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-primary mb-2"
          >
            <ChevronLeft size={20} />
            <span>Retour</span>
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${selectedCategory.color} rounded-xl flex items-center justify-center text-2xl`}>
              {selectedCategory.emoji}
            </div>
            <div>
              <h1 className="text-xl font-bold">{selectedCategory.name}</h1>
              <p className="text-sm text-text-secondary">{exercises.length} exercices</p>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-dark-border">
            {exercises.map(ex => (
              <ExerciseListItem 
                key={ex.id} 
                exercise={ex} 
                workoutHistory={workoutHistory}
                isFavorite={favorites.includes(ex.id)}
                onToggleFavorite={() => toggleFavorite(ex.id)}
                onClick={() => setSelectedExercise(ex)}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  // Vue catégories (accueil)
  if (!selectedCategory && !searchQuery) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <header className="bg-dark-surface border-b border-dark-border p-4 safe-area-top">
          <h1 className="text-xl font-bold">Exercices</h1>
          <p className="text-sm text-text-secondary">Choisis un muscle pour suivre tes progrès</p>
        </header>
        
        {/* Barre de recherche */}
        <div className="p-4 bg-dark-surface">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Rechercher un exercice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-4 py-3 text-white placeholder-text-secondary focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        
        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Section Favoris */}
          {favoriteExercises.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                Favoris
              </h2>
              <div className="space-y-2">
                {favoriteExercises.map(ex => (
                  <FavoriteExerciseItem 
                    key={ex.id}
                    exercise={ex}
                    workoutHistory={workoutHistory}
                    isFavorite={true}
                    onToggleFavorite={() => toggleFavorite(ex.id)}
                    onClick={() => setSelectedExercise(ex)}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Grille des catégories */}
          <h2 className="text-lg font-bold mb-3">Catégories</h2>
          <div className="grid grid-cols-2 gap-4">
            {MUSCLE_CATEGORIES.map(cat => {
              const exerciseCount = exercisesByCategory[cat.id]?.length || 0
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className="bg-dark-surface rounded-2xl p-6 text-left hover:bg-dark-border transition-colors active:scale-95"
                >
                  <div className={`w-14 h-14 ${cat.color} rounded-xl flex items-center justify-center text-3xl mb-3`}>
                    {cat.emoji}
                  </div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-sm text-text-secondary">{exerciseCount} exercices</p>
                </button>
              )
            })}
          </div>
          
          {/* Exercices récents */}
          <RecentExercises 
            workoutHistory={workoutHistory} 
            onSelect={(ex) => {
              const found = exerciseLibrary.find(e => e.id === ex.exerciseId || e.name === ex.name)
              if (found) setSelectedExercise(found)
            }}
          />
        </div>
      </div>
    )
  }
  
  return null
}

/**
 * Item d'exercice dans la liste
 */
function ExerciseListItem({ exercise, workoutHistory, onClick, isFavorite, onToggleFavorite }) {
  // Trouver la dernière perf
  let lastWeight = null
  let lastReps = null
  
  for (const workout of workoutHistory) {
    for (const ex of workout.exercises || []) {
      if (ex.exerciseId === exercise.id || ex.name === exercise.name) {
        const lastSet = ex.sets?.filter(s => s.completed).pop()
        if (lastSet) {
          lastWeight = lastSet.weight
          lastReps = lastSet.reps
          break
        }
      }
    }
    if (lastWeight) break
  }
  
  return (
    <button
      onClick={onClick}
      className="w-full p-4 flex items-center gap-3 bg-dark-surface/30 hover:bg-dark-surface transition-colors text-left"
    >
      {/* Icône favori (cliquable pour toggle) */}
      <div 
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavorite?.()
        }}
        className="flex-shrink-0 cursor-pointer hover:scale-110 transition-transform"
      >
        <Star 
          size={20} 
          className={isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-text-secondary'} 
        />
      </div>
      
      {/* Info exercice */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">
          {exercise.nameTranslations?.fr || exercise.name}
        </h3>
        <p className="text-sm text-text-secondary truncate">
          {exercise.equipment?.type || 'Libre'}
        </p>
      </div>
      
      {/* Stats */}
      {lastWeight && (
        <div className="text-right flex-shrink-0">
          <div className="font-bold text-primary">{lastWeight} kg</div>
          <div className="text-xs text-text-secondary">{lastReps} reps</div>
        </div>
      )}
      
      <ChevronRight size={20} className="text-text-secondary flex-shrink-0" />
    </button>
  )
}

/**
 * Item favori sur la page d'accueil
 */
function FavoriteExerciseItem({ exercise, workoutHistory, onClick, isFavorite, onToggleFavorite }) {
  // Trouver la dernière perf
  let lastWeight = null
  let lastReps = null
  
  for (const workout of workoutHistory) {
    for (const ex of workout.exercises || []) {
      if (ex.exerciseId === exercise.id || ex.name === exercise.name) {
        const lastSet = ex.sets?.filter(s => s.completed).pop()
        if (lastSet) {
          lastWeight = lastSet.weight
          lastReps = lastSet.reps
          break
        }
      }
    }
    if (lastWeight) break
  }
  
  return (
    <div className="bg-dark-surface rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full p-4 flex items-center gap-3 text-left hover:bg-dark-border active:bg-dark-border transition-colors"
      >
        {/* Étoile favori (non cliquable, juste affichage) */}
        <div className="flex-shrink-0">
          <Star 
            size={20} 
            className="text-yellow-500 fill-yellow-500"
          />
        </div>
        
        {/* Info exercice */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">
            {exercise.nameTranslations?.fr || exercise.name}
          </h3>
          <p className="text-sm text-text-secondary truncate">
            {exercise.equipment?.type || 'Libre'}
          </p>
        </div>
        
        {/* Stats */}
        {lastWeight && (
          <div className="text-right flex-shrink-0">
            <div className="font-bold text-primary">{lastWeight} kg</div>
            <div className="text-xs text-text-secondary">{lastReps} reps</div>
          </div>
        )}
        
        <ChevronRight size={20} className="text-text-secondary flex-shrink-0" />
      </button>
    </div>
  )
}

/**
 * Exercices récents
 */
function RecentExercises({ workoutHistory, onSelect }) {
  const recentExercises = useMemo(() => {
    const seen = new Set()
    const recent = []
    
    for (const workout of workoutHistory.slice(0, 10)) {
      for (const ex of workout.exercises || []) {
        if (!seen.has(ex.exerciseId) && ex.sets?.some(s => s.completed)) {
          seen.add(ex.exerciseId)
          recent.push({
            ...ex,
            date: workout.date,
            lastSet: ex.sets.filter(s => s.completed).pop()
          })
        }
        if (recent.length >= 5) break
      }
      if (recent.length >= 5) break
    }
    
    return recent
  }, [workoutHistory])
  
  if (recentExercises.length === 0) return null
  
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <History size={20} className="text-primary" />
        Récents
      </h2>
      <div className="space-y-2">
        {recentExercises.map((ex, i) => (
          <button
            key={`${ex.exerciseId}-${i}`}
            onClick={() => onSelect(ex)}
            className="w-full bg-dark-surface rounded-xl p-4 flex items-center gap-4 text-left hover:bg-dark-border active:scale-98 transition-all"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{ex.name}</h3>
              <p className="text-xs text-text-secondary">
                {new Date(ex.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
              </p>
            </div>
            {ex.lastSet && (
              <div className="text-right">
                <div className="font-bold text-primary">{ex.lastSet.weight} kg</div>
                <div className="text-xs text-text-secondary">{ex.lastSet.reps} reps</div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * Vue détail d'un exercice avec historique et ajout rapide
 */
function ExerciseDetail({ exercise, history, personalRecord, lastPerformance, workoutData, gyms, currentGym, onBack }) {
  const [showAddSet, setShowAddSet] = useState(false)
  const [weight, setWeight] = useState(lastPerformance?.weight?.toString() || '')
  const [reps, setReps] = useState(lastPerformance?.reps?.toString() || '')
  const [sets, setSets] = useState('1')

  // Dernière perf par salle (history trié du plus récent au plus ancien)
  const gymStats = useMemo(() => {
    if (!gyms || gyms.length === 0) return []
    const seen = {}
    for (const h of history) {
      if (!h.gymId) continue
      if (seen[h.gymId]) continue
      seen[h.gymId] = {
        gymId: h.gymId,
        gymName: gyms.find(g => g.id === h.gymId)?.name ?? h.gymId,
        weight: h.weight,
        reps: h.reps,
        date: h.date,
      }
    }
    return Object.values(seen)
  }, [history, gyms])
  
  // Fonction pour ajouter une série rapide
  const handleAddSet = () => {
    if (!weight || !reps) return

    const numSets = parseInt(sets) || 1

    workoutData.logQuickExercise({
      exerciseId: exercise.id,
      name: exercise.nameTranslations?.fr || exercise.name,
      weight: parseFloat(weight),
      reps: parseInt(reps),
      sets: numSets,
      date: new Date().toISOString(),
      gymId: currentGym,
    })

    setShowAddSet(false)
  }
  
  // Grouper l'historique par jour
  const historyByDay = useMemo(() => {
    const grouped = {}
    history.forEach(h => {
      const dateKey = new Date(h.date).toLocaleDateString('fr-FR')
      if (!grouped[dateKey]) {
        grouped[dateKey] = { date: h.date, sets: [] }
      }
      grouped[dateKey].sets.push(h)
    })
    return Object.values(grouped).slice(0, 20)
  }, [history])
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-dark-surface border-b border-dark-border p-4 safe-area-top">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary mb-3"
        >
          <ChevronLeft size={20} />
          <span>Retour</span>
        </button>
        <h1 className="text-xl font-bold">
          {exercise.nameTranslations?.fr || exercise.name}
        </h1>
        <p className="text-sm text-text-secondary">
          {exercise.equipment?.type || 'Poids libre'} • {exercise.category?.primary}
        </p>
      </header>
      
      {/* Stats rapides */}
      <div className="px-4 pt-4 pb-2 space-y-3">

        {/* Par salle — section principale si données disponibles */}
        {gymStats.length > 0 ? (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin size={14} className="text-text-secondary" />
              <span className="text-xs uppercase tracking-widest text-text-secondary font-semibold">Par salle</span>
            </div>
            <div className="space-y-2">
              {gymStats.map(({ gymId, gymName, weight: w, reps: r }) => {
                const color = getGymColor(gymId, gyms)
                const isActive = gymId === currentGym
                return (
                  <div
                    key={gymId}
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      backgroundColor: isActive ? `${color}22` : `${color}0d`,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: isActive ? `${color}66` : `${color}33`,
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold truncate" style={{ color }}>{gymName}</div>
                      <div className="text-xs text-text-secondary mt-0.5">dernière fois</div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white">{w}</span>
                      <span className="text-sm text-text-secondary ml-1">kg</span>
                      <div className="text-xs text-text-secondary">× {r} reps</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          /* Record + Dernier côte à côte si pas encore de données par salle */
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={16} className="text-yellow-500" />
                <span className="text-xs text-text-secondary uppercase tracking-wide">Record</span>
              </div>
              {personalRecord ? (
                <>
                  <div className="text-2xl font-bold">{personalRecord.weight} kg</div>
                  <div className="text-sm text-text-secondary">× {personalRecord.reps} reps</div>
                </>
              ) : (
                <div className="text-text-secondary text-sm">Aucun</div>
              )}
            </div>
            <div className="bg-dark-surface rounded-xl p-4 border border-dark-border">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-primary" />
                <span className="text-xs text-text-secondary uppercase tracking-wide">Dernier</span>
              </div>
              {lastPerformance ? (
                <>
                  <div className="text-2xl font-bold">{lastPerformance.weight} kg</div>
                  <div className="text-sm text-text-secondary">× {lastPerformance.reps} reps</div>
                </>
              ) : (
                <div className="text-text-secondary text-sm">Aucun</div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Bouton ajouter */}
      <div className="px-4 mb-4">
        <button
          onClick={() => setShowAddSet(true)}
          className="w-full bg-primary text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform"
        >
          <Plus size={20} />
          Ajouter une série
        </button>
      </div>
      
      {/* Historique */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" />
          Historique
        </h2>
        
        {historyByDay.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Target size={48} className="mx-auto mb-3 opacity-50" />
            <p>Aucune donnée pour cet exercice</p>
            <p className="text-sm">Ajoute ta première série !</p>
          </div>
        ) : (
          <div className="space-y-3">
            {historyByDay.map((day, i) => (
              <div key={i} className="bg-dark-surface rounded-xl p-4">
                <div className="text-sm text-text-secondary mb-2">
                  {new Date(day.date).toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </div>
                <div className="flex flex-wrap gap-2">
                  {day.sets.map((set, j) => {
                    const color = set.gymId ? getGymColor(set.gymId, gyms) : null
                    return (
                      <div
                        key={j}
                        className="flex items-center gap-1.5 bg-dark-bg px-3 py-2 rounded-lg text-sm"
                      >
                        {color && (
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                        )}
                        <span className="font-bold">{set.weight}</span>
                        <span className="text-text-secondary"> kg × </span>
                        <span className="font-bold">{set.reps}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Modal ajout série */}
      {showAddSet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60">
          <div className="w-full max-w-lg bg-dark-surface rounded-t-3xl p-6 animate-slide-up safe-area-bottom">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Nouvelle série</h2>
              <button onClick={() => setShowAddSet(false)} className="p-2">
                <X size={24} />
              </button>
            </div>
            {/* Salle active */}
            {currentGym && gyms && gyms.length > 0 && (() => {
              const gym = gyms.find(g => g.id === currentGym)
              if (!gym) return null
              const color = getGymColor(currentGym, gyms)
              return (
                <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl" style={{ backgroundColor: `${color}22` }}>
                  <MapPin size={14} style={{ color }} />
                  <span className="text-sm font-medium" style={{ color }}>{gym.name}</span>
                </div>
              )
            })()}
            
            <div className="space-y-4">
              {/* Poids */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">Poids (kg)</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setWeight(w => String(Math.max(0, (parseFloat(w) || 0) - 2.5)))}
                    className="w-14 h-14 bg-dark-bg rounded-xl text-xl font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-1 bg-dark-bg border border-dark-border rounded-xl text-center text-2xl font-bold focus:border-primary focus:outline-none"
                    placeholder="0"
                  />
                  <button 
                    onClick={() => setWeight(w => String((parseFloat(w) || 0) + 2.5))}
                    className="w-14 h-14 bg-dark-bg rounded-xl text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Reps */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">Répétitions</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setReps(r => String(Math.max(1, (parseInt(r) || 0) - 1)))}
                    className="w-14 h-14 bg-dark-bg rounded-xl text-xl font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="flex-1 bg-dark-bg border border-dark-border rounded-xl text-center text-2xl font-bold focus:border-primary focus:outline-none"
                    placeholder="0"
                  />
                  <button 
                    onClick={() => setReps(r => String((parseInt(r) || 0) + 1))}
                    className="w-14 h-14 bg-dark-bg rounded-xl text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Nombre de séries */}
              <div>
                <label className="block text-sm text-text-secondary mb-2">Nombre de séries identiques</label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setSets(String(n))}
                      className={`w-12 h-12 rounded-xl font-bold transition-colors ${
                        sets === String(n) 
                          ? 'bg-primary text-white' 
                          : 'bg-dark-bg text-text-secondary'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Bouton valider */}
              <button
                onClick={handleAddSet}
                disabled={!weight || !reps}
                className="w-full bg-primary text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                <Check size={20} />
                Enregistrer {sets !== '1' ? `${sets} séries` : '1 série'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
