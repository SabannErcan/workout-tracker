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
  Minus,
  MapPin
} from 'lucide-react'
import { formatTimer, formatDuration } from '../utils/dateHelpers'
import { formatVolume, calculateOneRepMax, detectPR } from '../utils/calculations'
import RestTimer from './RestTimer'
import ExerciseLog from './ExerciseLog'

const GYM_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4']

function getGymColor(gymId, gyms) {
  const idx = gyms?.findIndex(g => g.id === gymId) ?? -1
  if (idx >= 0) return GYM_COLORS[idx % GYM_COLORS.length]
  return '#3B82F6'
}

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
    defaultExercises,
    gyms,
    selectGym,
    setCurrentWorkout
  } = workoutData
  
  // Trouver le nom de la salle actuelle
  const currentGymName = gyms?.find(g => g.id === currentWorkout?.gymId)?.name
  const currentGymColor = getGymColor(currentWorkout?.gymId, gyms)
  
  // Changer la salle pendant la séance
  const handleChangeGym = useCallback((gymId) => {
    if (setCurrentWorkout) {
      setCurrentWorkout(prev => ({ ...prev, gymId }))
    }
    // Mettre à jour aussi dans les settings pour persister
    if (selectGym) {
      selectGym(gymId)
    }
  }, [setCurrentWorkout, selectGym])
  
  // États locaux
  const [expandedExercise, setExpandedExercise] = useState(
    currentWorkout?.exercises[0]?.exerciseId || null
  )
  const [showAddSet, setShowAddSet] = useState(false)
  const [activeExerciseId, setActiveExerciseId] = useState(null)
  const [editingSetIndex, setEditingSetIndex] = useState(null)
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
  const handleAddSetClick = useCallback((exerciseId, setIndex = null) => {
    setActiveExerciseId(exerciseId)
    setEditingSetIndex(setIndex)
    setShowAddSet(true)
  }, [])
  
  // Logger ou modifier une série
  const handleLogSet = useCallback((setData) => {
    if (!activeExerciseId) return
    
    if (editingSetIndex !== null) {
      // Mode édition : mettre à jour la série existante
      updateSet(activeExerciseId, editingSetIndex, setData)
    } else {
      // Mode ajout : ajouter une nouvelle série
      logSet(activeExerciseId, setData)
      
      // Démarre le timer de repos si activé
      if (userSettings.autoStartRest) {
        setRestTimeRemaining(userSettings.defaultRestTime)
        setShowRestTimer(true)
      }
    }
    
    setShowAddSet(false)
    setEditingSetIndex(null)
    
    // Feedback haptique si disponible
    if (navigator.vibrate && userSettings.vibrationEnabled) {
      navigator.vibrate(50)
    }
  }, [activeExerciseId, editingSetIndex, logSet, updateSet, userSettings])
  
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
      {/* Header fixe avec couleur selon salle */}
      <header 
        className={`sticky top-0 z-20 border-b safe-area-top transition-all ${
          currentGymName ? 'border-primary/30' : 'border-dark-border'
        }`}
        style={currentGymName ? { background: `linear-gradient(180deg, ${currentGymColor}22 0%, #0b0b0f 60%)`, borderColor: `${currentGymColor}55` } : { background: '#0b0b0f' }}
      >
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
              {currentGymName && (
                <>
                  <span>•</span>
                  <MapPin size={12} className="text-primary" />
                  <span className="text-primary font-medium">{currentGymName}</span>
                </>
              )}
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
            <p className="font-bold">{currentWorkout.exercises.length}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-secondary">Séries</p>
            <p className="font-bold">{totalSets}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-secondary">Volume</p>
            <p className="font-bold">{Math.round(calculateWorkoutVolume(currentWorkout))}{userSettings.weightUnit}</p>
          </div>
        </div>
        
        {/* Sélecteur de salle - TOUJOURS VISIBLE */}
        {gyms && gyms.length > 0 && (
          <div className="px-4 py-2 bg-dark-surface border-t border-dark-border">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {gyms.map((gym) => (
                <button
                  key={gym.id}
                  type="button"
                  onClick={() => handleChangeGym(gym.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex-shrink-0 transition-all whitespace-nowrap ${
                    currentWorkout.gymId === gym.id 
                      ? 'text-white' 
                      : 'bg-dark-elevated text-text-secondary'
                  }`}
                  style={currentWorkout.gymId === gym.id ? { backgroundColor: getGymColor(gym.id, gyms) } : {}}
                >
                  {gym.name}
                </button>
              ))}
            </div>
          </div>
        )}
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
              onEditSet={(setIndex) => handleAddSetClick(exercise.exerciseId, setIndex)}
              onDeleteSet={(setIndex) => handleDeleteSet(exercise.exerciseId, setIndex)}
              onUpdateNote={(note) => addExerciseNote(exercise.exerciseId, note)}
              workoutHistory={workoutHistory}
              userSettings={userSettings}
              gyms={gyms}
              currentGym={currentWorkout.gymId}
              onChangeGym={handleChangeGym}
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
          editingSet={editingSetIndex !== null ? currentWorkout.exercises.find(e => e.exerciseId === activeExerciseId)?.sets[editingSetIndex] : null}
          onSubmit={handleLogSet}
          onClose={() => {
            setShowAddSet(false)
            setEditingSetIndex(null)
          }}
          userSettings={userSettings}
          workoutHistory={workoutHistory}
          gyms={gyms}
          currentGym={currentWorkout.gymId}
          onChangeGym={handleChangeGym}
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
  onEditSet,
  onDeleteSet,
  onUpdateNote,
  workoutHistory,
  userSettings,
  gyms,
  currentGym,
  onChangeGym
}) {
  const [swipedSet, setSwipedSet] = useState(null)
  const [editingSet, setEditingSet] = useState(null)
  
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
          {/* Référence dernière séance (par salle si plusieurs salles) */}
          {userSettings.showLastWorkout && (() => {
            const byGym = getLastPerformanceByGym(exercise.name, workoutHistory, gyms)
            const hasMultipleGyms = byGym.length > 1

            if (!hasMultipleGyms) {
              return lastPerformance ? (
                <div className="mb-3 p-3 bg-dark-elevated rounded-ios">
                  <p className="text-xs text-text-secondary mb-2">Dernière fois :</p>
                  <div className="flex flex-wrap gap-2">
                    {lastPerformance.sets.slice(0, 4).map((set, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-dark-surface rounded">
                        {set.reps}×{set.weight}{userSettings.weightUnit}
                      </span>
                    ))}
                    {lastPerformance.sets.length > 4 && (
                      <span className="text-xs text-text-tertiary">+{lastPerformance.sets.length - 4}</span>
                    )}
                  </div>
                </div>
              ) : null
            }

            return (
              <div className="mb-3 p-3 bg-dark-elevated rounded-ios">
                <p className="text-xs text-text-secondary mb-2">Par salle :</p>
                <div className="space-y-1.5">
                  {byGym.map(({ gymId, gymName, sets }) => {
                    const color = getGymColor(gymId, gyms)
                    const isActive = gymId === currentGym
                    return (
                      <div key={gymId} className="flex items-center gap-2" style={{ opacity: isActive ? 1 : 0.6 }}>
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                        <span className="text-xs font-medium flex-shrink-0 w-20 truncate" style={{ color }}>
                          {gymName}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {sets.slice(0, 3).map((set, i) => (
                            <span key={i} className="text-xs px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: `${color}22`, color }}>
                              {set.reps}×{set.weight}{userSettings.weightUnit}
                            </span>
                          ))}
                          {sets.length > 3 && (
                            <span className="text-xs text-text-tertiary">+{sets.length - 3}</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })()}
          
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
                  onEdit={() => onEditSet(setIndex)}
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
function SetRow({ set, index, onDelete, onEdit, userSettings, isPR }) {
  return (
    <div className="relative">
      <div 
        className="flex items-center p-3 rounded-ios transition-all bg-dark-elevated"
      >
        <span className="w-8 text-sm font-medium text-text-secondary">{index + 1}</span>
        <span className="flex-1 text-center font-semibold">{set.reps}</span>
        <span className="flex-1 text-center font-semibold">
          {set.weight}{userSettings.weightUnit}
          {isPR && <span className="ml-1 text-xs text-success">PR</span>}
        </span>
        
        <div className="w-24 flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            className="w-9 h-9 flex items-center justify-center bg-primary rounded-lg text-white"
            title="Modifier"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="w-9 h-9 flex items-center justify-center bg-danger rounded-lg text-white"
            title="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {set.notes && (
        <div className="text-xs text-text-secondary mt-1 ml-10 italic">
          💭 {set.notes}
        </div>
      )}
    </div>
  )
}

// Bottom Sheet pour ajouter ou modifier une série
function AddSetSheet({ exercise, editingSet, onSubmit, onClose, userSettings, workoutHistory, gyms, currentGym, onChangeGym }) {
  const activeGymColor = getGymColor(currentGym, gyms)
  
  // Si mode édition, pré-remplir avec les valeurs existantes
  const [reps, setReps] = useState(editingSet ? editingSet.reps.toString() : '')
  const [weight, setWeight] = useState(editingSet ? editingSet.weight.toString() : exercise?.suggestedWeight?.toString() || '')
  const [rpe, setRpe] = useState(editingSet && editingSet.rpe ? editingSet.rpe.toString() : '')
  const [notes, setNotes] = useState(editingSet?.notes || '')
  
  const repsInputRef = useRef(null)
  
  // Focus auto sur input reps
  useEffect(() => {
    setTimeout(() => repsInputRef.current?.focus(), 100)
  }, [])
  
  // Mettre à jour les suggestions quand la salle change (sauf en mode édition)
  useEffect(() => {
    if (editingSet) return // Ne pas changer les valeurs en mode édition
    
    // Trouver la dernière série pour cet exercice dans cette salle
    const lastPerformanceInGym = workoutHistory
      .filter(w => w.gymId === currentGym)
      .reverse()
      .find(workout => 
        workout.exercises?.some(ex => ex.name === exercise?.name || ex.exerciseId === exercise?.exerciseId)
      )
    
    if (lastPerformanceInGym) {
      const exerciseInGym = lastPerformanceInGym.exercises.find(
        ex => ex.name === exercise?.name || ex.exerciseId === exercise?.exerciseId
      )
      if (exerciseInGym?.sets?.length > 0) {
        const lastSet = exerciseInGym.sets[exerciseInGym.sets.length - 1]
        setWeight(lastSet.weight.toString())
        if (!reps) setReps(lastSet.reps.toString())
      }
    }
  }, [currentGym, exercise, workoutHistory, editingSet])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!reps || !weight) return
    
    onSubmit({
      reps: parseInt(reps, 10),
      weight: parseFloat(weight),
      rpe: rpe ? parseInt(rpe, 10) : null,
      notes: notes.trim() || null,
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
          <div className="h-1 rounded-full" style={{ backgroundColor: gyms && gyms.length ? activeGymColor : '#2563eb' }} />
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{exercise?.name}</h3>
            {editingSet ? (
              <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                ✏️ Modification
              </span>
            ) : (
              <span className="text-xs px-3 py-1 rounded-full text-white" style={{ backgroundColor: activeGymColor }}>
                 {gyms?.find(g => g.id === currentGym)?.name || 'Ajout'}
              </span>
            )}
          </div>
          
          {/* Sélecteur de salle - Toujours visible en haut */}
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              🏋️ Salle de sport
            </label>
            {gyms && gyms.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {gyms.map((gym) => {
                  const isActive = currentGym === gym.id
                  const color = getGymColor(gym.id, gyms)
                  
                  return (
                    <button
                      key={gym.id}
                      type="button"
                      onClick={() => onChangeGym(gym.id)}
                      className={`px-4 py-2 rounded-ios font-medium flex-shrink-0 transition-all ${
                        isActive 
                          ? 'text-white ring-2' 
                          : 'bg-dark-elevated text-text-secondary'
                      }`}
                      style={isActive ? { backgroundColor: color, borderColor: color, '--tw-ring-color': color } : {}}
                    >
                      {gym.name}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="bg-dark-elevated rounded-ios p-4 text-center">
                <p className="text-sm text-text-secondary mb-2">
                  Aucune salle créée
                </p>
                <p className="text-xs text-text-tertiary">
                  Va dans Paramètres → Salles de sport pour ajouter tes salles
                </p>
              </div>
            )}
          </div>
          
          {/* Référence poids par salle */}
          {(() => {
            if (!gyms || gyms.length === 0) return null
            const byGym = getLastPerformanceByGym(exercise?.name, workoutHistory, gyms)
            if (byGym.length === 0) return null
            return (
              <div>
                <p className="text-xs text-text-secondary mb-1.5">Poids précédents :</p>
                <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                  {byGym.map(({ gymId, gymName, sets }) => {
                    const color = getGymColor(gymId, gyms)
                    const isActive = gymId === currentGym
                    const lastWeight = sets[sets.length - 1]?.weight
                    return (
                      <button
                        key={gymId}
                        type="button"
                        onClick={() => setWeight(lastWeight.toString())}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-ios flex-shrink-0 transition-all"
                        style={{
                          backgroundColor: isActive ? `${color}33` : `${color}18`,
                          borderWidth: 1, borderStyle: 'solid',
                          borderColor: isActive ? color : `${color}55`,
                          opacity: isActive ? 1 : 0.75,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-xs font-medium" style={{ color }}>{gymName}</span>
                        <span className="text-xs text-white font-bold">{lastWeight}{userSettings.weightUnit}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })()}

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
          
          {/* Champ Notes */}
          <div>
            <label className="block text-sm text-text-secondary mb-2">Notes (optionnel)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Bon ressenti, série facile, douleur..."
              className="w-full px-4 py-3 bg-dark-elevated rounded-ios text-white placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Bouton submit */}
          <button
            type="submit"
            disabled={!reps || !weight}
            className="w-full py-4 bg-success text-white font-bold text-lg rounded-ios disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-touch"
          >
            <Check size={24} />
            {editingSet ? 'MODIFIER' : 'ENREGISTRER'}
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

// Helper pour récupérer la dernière performance par salle
// history est du plus récent au plus ancien (prepend dans finishWorkout)
function getLastPerformanceByGym(exerciseName, history, gyms) {
  if (!gyms || gyms.length === 0) return []
  const seen = {}
  for (const workout of history) {
    if (!workout.gymId) continue
    if (seen[workout.gymId]) continue
    const ex = workout.exercises?.find(e => e.name === exerciseName)
    if (ex && ex.sets && ex.sets.length > 0) {
      seen[workout.gymId] = {
        gymId: workout.gymId,
        gymName: gyms.find(g => g.id === workout.gymId)?.name ?? workout.gymId,
        date: workout.date,
        sets: ex.sets,
      }
    }
  }
  return Object.values(seen)
}

// Helper pour calculer volume exercice
function calculateExerciseVolume(sets) {
  return sets.reduce((total, set) => total + (set.weight || 0) * (set.reps || 0), 0)
}

export default WorkoutSession
