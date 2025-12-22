import React, { useState, useCallback, useEffect, useRef } from 'react'
import { 
  X, 
  Check, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Dumbbell,
  TrendingUp,
  AlertCircle,
  Minus
} from 'lucide-react'
import { formatTimer, formatDuration } from '../utils/dateHelpers'
import { formatVolume, calculateOneRepMax, detectPR } from '../utils/calculations'
import RestTimer from './RestTimer'
import ExerciseLog from './ExerciseLog'

function WorkoutSession({ workoutData, onFinish, onCancel }) {
  const { 
    currentWorkout, 
    userSettings,
    workoutHistory,
    logSet,
    updateSet,
    deleteSet,
    addExerciseNote,
    addExerciseToWorkout,
    defaultExercises 
  } = workoutData
  
  // États locaux
  const [expandedExercise, setExpandedExercise] = useState(
    currentWorkout?.exercises[0]?.exerciseId || null
  )
  const [showAddSet, setShowAddSet] = useState(false)
  const [activeExerciseId, setActiveExerciseId] = useState(null)
  const [showRestTimer, setShowRestTimer] = useState(false)
  const [restTimeRemaining, setRestTimeRemaining] = useState(0)
  const [showAddExercise, setShowAddExercise] = useState(false)
  const [showFinishConfirm, setShowFinishConfirm] = useState(false)
  
  // Timer de la séance
  const [elapsedTime, setElapsedTime] = useState(0)
  const startTime = useRef(new Date(currentWorkout?.startTime))
  
  // Mise à jour du timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setElapsedTime(Math.floor((now - startTime.current) / 1000))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Ouvrir le panel d'ajout de série
  const handleAddSetClick = useCallback((exerciseId) => {
    setActiveExerciseId(exerciseId)
    setShowAddSet(true)
  }, [])
  
  // Logger une série
  const handleLogSet = useCallback((setData) => {
    if (!activeExerciseId) return
    
    logSet(activeExerciseId, setData)
    setShowAddSet(false)
    
    // Démarre le timer de repos si activé
    if (userSettings.autoStartRest) {
      setRestTimeRemaining(userSettings.defaultRestTime)
      setShowRestTimer(true)
    }
    
    // Feedback haptique si disponible
    if (navigator.vibrate && userSettings.vibrationEnabled) {
      navigator.vibrate(50)
    }
  }, [activeExerciseId, logSet, userSettings])
  
  // Supprimer une série
  const handleDeleteSet = useCallback((exerciseId, setIndex) => {
    if (navigator.vibrate && userSettings.vibrationEnabled) {
      navigator.vibrate([50, 50, 50])
    }
    deleteSet(exerciseId, setIndex)
  }, [deleteSet, userSettings])
  
  // Toggle exercice
  const toggleExercise = useCallback((exerciseId) => {
    setExpandedExercise((prev) => prev === exerciseId ? null : exerciseId)
  }, [])
  
  // Ajouter un exercice
  const handleAddExercise = useCallback((exercise) => {
    addExerciseToWorkout(exercise)
    setShowAddExercise(false)
    // Expand le nouvel exercice
    setTimeout(() => {
      const exs = currentWorkout?.exercises || []
      if (exs.length > 0) {
        setExpandedExercise(exs[exs.length - 1]?.exerciseId)
      }
    }, 100)
  }, [addExerciseToWorkout, currentWorkout])
  
  // Terminer le workout
  const handleFinish = useCallback(() => {
    // Vérifie s'il y a au moins une série
    const totalSets = currentWorkout?.exercises.reduce(
      (sum, ex) => sum + (ex.sets?.length || 0), 
      0
    ) || 0
    
    if (totalSets === 0) {
      setShowFinishConfirm(true)
      return
    }
    
    onFinish()
  }, [currentWorkout, onFinish])
  
  if (!currentWorkout) return null
  
  const totalSets = currentWorkout.exercises.reduce(
    (sum, ex) => sum + (ex.sets?.length || 0), 
    0
  )
  
  return (
    <div className="h-full flex flex-col bg-dark-bg">
      {/* Header fixe */}
      <header className="sticky top-0 z-20 bg-dark-bg border-b border-dark-border safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={onCancel}
            className="p-2 -ml-2 text-text-secondary hover:text-white"
            aria-label="Annuler"
          >
            <X size={24} />
          </button>
          
          <div className="text-center">
            <h1 className="font-semibold">{currentWorkout.templateName}</h1>
            <div className="flex items-center justify-center gap-2 text-xs text-text-secondary">
              <Clock size={12} />
              <span className="timer-display">{formatDuration(elapsedTime)}</span>
            </div>
          </div>
          
          <button 
            onClick={handleFinish}
            className="p-2 -mr-2 text-success hover:text-success/80"
            aria-label="Terminer"
          >
            <Check size={24} />
          </button>
        </div>
        
        {/* Stats en temps réel */}
        <div className="flex items-center justify-around px-4 py-2 bg-dark-surface">
          <div className="text-center">
            <p className="text-xs text-text-secondary">Exercices</p>
            <p className="font-semibold">{currentWorkout.exercises.length}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-secondary">Séries</p>
            <p className="font-semibold">{totalSets}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-secondary">Volume</p>
            <p className="font-semibold">
              {formatVolume(currentWorkout.totalVolume, userSettings.weightUnit)}
            </p>
          </div>
        </div>
      </header>
      
      {/* Liste des exercices */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="p-4 space-y-3">
          {currentWorkout.exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.exerciseId}
              exercise={exercise}
              index={index}
              isExpanded={expandedExercise === exercise.exerciseId}
              onToggle={() => toggleExercise(exercise.exerciseId)}
              onAddSet={() => handleAddSetClick(exercise.exerciseId)}
              onDeleteSet={(setIndex) => handleDeleteSet(exercise.exerciseId, setIndex)}
              onUpdateNote={(note) => addExerciseNote(exercise.exerciseId, note)}
              workoutHistory={workoutHistory}
              userSettings={userSettings}
            />
          ))}
          
          {/* Bouton ajouter exercice */}
          <button
            onClick={() => setShowAddExercise(true)}
            className="w-full py-4 border-2 border-dashed border-dark-border rounded-ios-lg flex items-center justify-center gap-2 text-text-secondary hover:text-white hover:border-text-secondary transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium">Ajouter un exercice</span>
          </button>
        </div>
      </main>
      
      {/* Bottom Sheet - Add Set */}
      {showAddSet && (
        <AddSetSheet
          exercise={currentWorkout.exercises.find(e => e.exerciseId === activeExerciseId)}
          onSubmit={handleLogSet}
          onClose={() => setShowAddSet(false)}
          userSettings={userSettings}
          workoutHistory={workoutHistory}
        />
      )}
      
      {/* Bottom Sheet - Add Exercise */}
      {showAddExercise && (
        <AddExerciseSheet
          exercises={defaultExercises}
          onSelect={handleAddExercise}
          onClose={() => setShowAddExercise(false)}
        />
      )}
      
      {/* Rest Timer */}
      {showRestTimer && (
        <RestTimer
          initialTime={restTimeRemaining}
          onComplete={() => setShowRestTimer(false)}
          onDismiss={() => setShowRestTimer(false)}
          userSettings={userSettings}
        />
      )}
      
      {/* Confirmation finish sans séries */}
      {showFinishConfirm && (
        <ConfirmModal
          title="Terminer sans séries ?"
          message="Tu n'as enregistré aucune série. Veux-tu vraiment terminer cette séance ?"
          onConfirm={() => {
            setShowFinishConfirm(false)
            onCancel()
          }}
          onCancel={() => setShowFinishConfirm(false)}
          confirmText="Terminer"
          cancelText="Continuer"
          isDanger
        />
      )}
    </div>
  )
}

// Carte d'exercice
function ExerciseCard({ 
  exercise, 
  index,
  isExpanded, 
  onToggle, 
  onAddSet, 
  onDeleteSet,
  onUpdateNote,
  workoutHistory,
  userSettings 
}) {
  const [swipedSet, setSwipedSet] = useState(null)
  
  // Dernière performance pour cet exercice
  const lastPerformance = getLastPerformance(exercise.name, workoutHistory)
  
  return (
    <div className="bg-dark-surface rounded-ios-lg overflow-hidden animate-fade-in">
      {/* Header exercice */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between touch-feedback"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-dark-elevated rounded-lg flex items-center justify-center text-sm font-semibold text-primary">
            {index + 1}
          </span>
          <div className="text-left">
            <h3 className="font-medium">{exercise.name}</h3>
            <p className="text-xs text-text-secondary">
              {exercise.sets.length} série{exercise.sets.length !== 1 ? 's' : ''}
              {exercise.sets.length > 0 && (
                <> • {calculateExerciseVolume(exercise.sets)}{userSettings.weightUnit}</>
              )}
            </p>
          </div>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {/* Contenu expandé */}
      {isExpanded && (
        <div className="px-4 pb-4 animate-fade-in">
          {/* Référence dernière séance */}
          {lastPerformance && userSettings.showLastWorkout && (
            <div className="mb-3 p-3 bg-dark-elevated rounded-ios">
              <p className="text-xs text-text-secondary mb-2">Dernière fois :</p>
              <div className="flex flex-wrap gap-2">
                {lastPerformance.sets.slice(0, 4).map((set, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-dark-surface rounded">
                    {set.reps}×{set.weight}{userSettings.weightUnit}
                  </span>
                ))}
                {lastPerformance.sets.length > 4 && (
                  <span className="text-xs text-text-tertiary">
                    +{lastPerformance.sets.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Liste des séries */}
          {exercise.sets.length > 0 && (
            <div className="space-y-2 mb-3">
              <div className="flex items-center text-xs text-text-secondary px-2">
                <span className="w-8">Set</span>
                <span className="flex-1 text-center">Reps</span>
                <span className="flex-1 text-center">Poids</span>
                <span className="w-10"></span>
              </div>
              
              {exercise.sets.map((set, setIndex) => (
                <SetRow
                  key={setIndex}
                  set={set}
                  index={setIndex}
                  onDelete={() => onDeleteSet(setIndex)}
                  userSettings={userSettings}
                  isPR={detectPR(exercise, set, workoutHistory).isPR}
                />
              ))}
            </div>
          )}
          
          {/* Bouton ajouter série */}
          <button
            onClick={onAddSet}
            className="w-full py-3 bg-primary/10 text-primary font-semibold rounded-ios flex items-center justify-center gap-2 min-h-touch"
          >
            <Plus size={20} />
            Ajouter une série
          </button>
        </div>
      )}
    </div>
  )
}

// Ligne de série
function SetRow({ set, index, onDelete, userSettings, isPR }) {
  const [showDelete, setShowDelete] = useState(false)
  
  return (
    <div 
      className={`flex items-center p-2 rounded-ios ${showDelete ? 'bg-danger/20' : 'bg-dark-elevated'}`}
      onClick={() => setShowDelete(!showDelete)}
    >
      <span className="w-8 text-sm font-medium text-text-secondary">{index + 1}</span>
      <span className="flex-1 text-center font-semibold">{set.reps}</span>
      <span className="flex-1 text-center font-semibold">
        {set.weight}{userSettings.weightUnit}
        {isPR && <span className="ml-1 text-xs text-success">PR</span>}
      </span>
      
      {showDelete ? (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="w-10 h-8 flex items-center justify-center text-danger"
        >
          <Trash2 size={18} />
        </button>
      ) : (
        <span className="w-10 text-xs text-text-tertiary text-center">
          {set.rpe && `@${set.rpe}`}
        </span>
      )}
    </div>
  )
}

// Bottom Sheet pour ajouter une série
function AddSetSheet({ exercise, onSubmit, onClose, userSettings, workoutHistory }) {
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState(exercise?.suggestedWeight?.toString() || '')
  const [rpe, setRpe] = useState('')
  
  const repsInputRef = useRef(null)
  
  // Focus auto sur input reps
  useEffect(() => {
    setTimeout(() => repsInputRef.current?.focus(), 100)
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!reps || !weight) return
    
    onSubmit({
      reps: parseInt(reps, 10),
      weight: parseFloat(weight),
      rpe: rpe ? parseInt(rpe, 10) : null,
    })
  }
  
  // Incréments rapides
  const adjustWeight = (delta) => {
    const current = parseFloat(weight) || 0
    setWeight(Math.max(0, current + delta).toString())
  }
  
  const adjustReps = (delta) => {
    const current = parseInt(reps, 10) || 0
    setReps(Math.max(0, current + delta).toString())
  }
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-surface rounded-t-2xl safe-area-bottom animate-slide-up">
        <div className="w-12 h-1 bg-dark-border rounded-full mx-auto mt-3" />
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <h3 className="text-lg font-semibold text-center">{exercise?.name}</h3>
          
          {/* Input Reps */}
          <div>
            <label className="block text-sm text-text-secondary mb-2">Répétitions</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => adjustReps(-1)}
                className="w-12 h-12 bg-dark-elevated rounded-ios flex items-center justify-center"
              >
                <Minus size={20} />
              </button>
              <input
                ref={repsInputRef}
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="0"
                className="flex-1 h-14 bg-dark-elevated rounded-ios text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => adjustReps(1)}
                className="w-12 h-12 bg-dark-elevated rounded-ios flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
          
          {/* Input Weight */}
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Poids ({userSettings.weightUnit})
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => adjustWeight(-2.5)}
                className="w-12 h-12 bg-dark-elevated rounded-ios flex items-center justify-center text-sm"
              >
                -2.5
              </button>
              <input
                type="number"
                inputMode="decimal"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0"
                className="flex-1 h-14 bg-dark-elevated rounded-ios text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => adjustWeight(2.5)}
                className="w-12 h-12 bg-dark-elevated rounded-ios flex items-center justify-center text-sm"
              >
                +2.5
              </button>
            </div>
          </div>
          
          {/* RPE optionnel */}
          <div>
            <label className="block text-sm text-text-secondary mb-2">RPE (optionnel)</label>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {[6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRpe(rpe === value.toString() ? '' : value.toString())}
                  className={`px-4 py-2 rounded-ios font-medium flex-shrink-0 ${
                    rpe === value.toString() 
                      ? 'bg-primary text-white' 
                      : 'bg-dark-elevated text-text-secondary'
                  }`}
                >
                  @{value}
                </button>
              ))}
            </div>
          </div>
          
          {/* Bouton submit */}
          <button
            type="submit"
            disabled={!reps || !weight}
            className="w-full py-4 bg-success text-white font-bold text-lg rounded-ios disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-touch"
          >
            <Check size={24} />
            ENREGISTRER
          </button>
        </form>
      </div>
    </>
  )
}

// Bottom Sheet pour ajouter un exercice
function AddExerciseSheet({ exercises, onSelect, onClose }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  
  const categories = [...new Set(exercises.map(e => e.category))]
  
  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || ex.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-surface rounded-t-2xl h-[80vh] flex flex-col safe-area-bottom animate-slide-up">
        <div className="w-12 h-1 bg-dark-border rounded-full mx-auto mt-3" />
        
        {/* Header */}
        <div className="p-4 border-b border-dark-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Ajouter un exercice</h3>
            <button onClick={onClose} className="p-2 text-text-secondary">
              <X size={20} />
            </button>
          </div>
          
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full px-4 py-3 bg-dark-elevated rounded-ios text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          
          {/* Categories */}
          <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar pb-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium flex-shrink-0 ${
                !selectedCategory ? 'bg-primary text-white' : 'bg-dark-elevated text-text-secondary'
              }`}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium flex-shrink-0 ${
                  selectedCategory === cat ? 'bg-primary text-white' : 'bg-dark-elevated text-text-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {/* Liste */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {filteredExercises.map((ex, index) => (
              <button
                key={index}
                onClick={() => onSelect(ex)}
                className="w-full p-4 bg-dark-elevated rounded-ios text-left touch-feedback"
              >
                <p className="font-medium">{ex.name}</p>
                <p className="text-xs text-text-secondary">{ex.category}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// Modal de confirmation
function ConfirmModal({ title, message, onConfirm, onCancel, confirmText, cancelText, isDanger }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onCancel} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm bg-dark-surface rounded-ios-lg p-6 animate-scale-in">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-text-secondary mb-6">{message}</p>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-dark-elevated rounded-ios font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-ios font-medium ${
              isDanger ? 'bg-danger text-white' : 'bg-primary text-white'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  )
}

// Helper pour récupérer dernière performance
function getLastPerformance(exerciseName, history) {
  for (const workout of history) {
    const exercise = workout.exercises?.find((e) => e.name === exerciseName)
    if (exercise && exercise.sets && exercise.sets.length > 0) {
      return {
        date: workout.date,
        sets: exercise.sets,
      }
    }
  }
  return null
}

// Helper pour calculer volume exercice
function calculateExerciseVolume(sets) {
  return sets.reduce((total, set) => total + (set.weight || 0) * (set.reps || 0), 0)
}

export default WorkoutSession
