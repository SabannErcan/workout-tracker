import { useState, useCallback, useMemo } from 'react'
import { useLocalStorage, useLocalStorageImmediate } from './useLocalStorage'
import { v4 as uuidv4 } from 'uuid'
import { 
  calculateWorkoutVolume, 
  suggestWeight,
  calculateExerciseVolume 
} from '../utils/calculations'
import { 
  STORAGE_KEYS, 
  initializeDefaultData,
  getDefaultExercises,
  getDefaultSettings 
} from '../utils/storage'

/**
 * Hook principal pour la gestion des données workout
 * Expose toutes les fonctions CRUD pour templates, workouts, et settings
 */
export function useWorkoutData() {
  // Initialisation des données par défaut
  useMemo(() => {
    initializeDefaultData()
  }, [])
  
  // State localStorage
  const [sessionTemplates, setSessionTemplates] = useLocalStorage(
    STORAGE_KEYS.SESSION_TEMPLATES, 
    []
  )
  
  const [workoutHistory, setWorkoutHistory] = useLocalStorage(
    STORAGE_KEYS.WORKOUT_HISTORY, 
    []
  )
  
  const [userSettings, setUserSettings] = useLocalStorage(
    STORAGE_KEYS.USER_SETTINGS, 
    getDefaultSettings()
  )
  
  // Workout en cours (sauvegarde immédiate pour éviter perte de données)
  const [currentWorkout, setCurrentWorkout] = useLocalStorageImmediate(
    STORAGE_KEYS.CURRENT_WORKOUT, 
    null
  )
  
  // Liste des exercices disponibles
  const defaultExercises = useMemo(() => getDefaultExercises(), [])
  
  // ===================
  // GESTION DES TEMPLATES
  // ===================
  
  /**
   * Ajoute un nouveau template de séance
   */
  const addTemplate = useCallback((template) => {
    const newTemplate = {
      id: uuidv4(),
      name: template.name,
      exercises: template.exercises || [],
      defaultRestTime: template.defaultRestTime || userSettings.defaultRestTime,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    }
    
    setSessionTemplates((prev) => [...prev, newTemplate])
    return newTemplate
  }, [setSessionTemplates, userSettings.defaultRestTime])
  
  /**
   * Met à jour un template existant
   */
  const updateTemplate = useCallback((templateId, updates) => {
    setSessionTemplates((prev) => 
      prev.map((t) => 
        t.id === templateId 
          ? { ...t, ...updates, modifiedAt: new Date().toISOString() }
          : t
      )
    )
  }, [setSessionTemplates])
  
  /**
   * Supprime un template
   */
  const deleteTemplate = useCallback((templateId) => {
    setSessionTemplates((prev) => prev.filter((t) => t.id !== templateId))
  }, [setSessionTemplates])
  
  /**
   * Duplique un template
   */
  const duplicateTemplate = useCallback((templateId) => {
    const original = sessionTemplates.find((t) => t.id === templateId)
    if (!original) return null
    
    const duplicate = {
      ...original,
      id: uuidv4(),
      name: `${original.name} (copie)`,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    }
    
    setSessionTemplates((prev) => [...prev, duplicate])
    return duplicate
  }, [sessionTemplates, setSessionTemplates])
  
  /**
   * Ajoute un exercice à un template
   */
  const addExerciseToTemplate = useCallback((templateId, exercise) => {
    const newExercise = {
      id: uuidv4(),
      name: exercise.name,
      category: exercise.category || 'Autre',
      lastPerformed: null,
    }
    
    setSessionTemplates((prev) =>
      prev.map((t) =>
        t.id === templateId
          ? { 
              ...t, 
              exercises: [...t.exercises, newExercise],
              modifiedAt: new Date().toISOString() 
            }
          : t
      )
    )
    
    return newExercise
  }, [setSessionTemplates])
  
  /**
   * Retire un exercice d'un template
   */
  const removeExerciseFromTemplate = useCallback((templateId, exerciseId) => {
    setSessionTemplates((prev) =>
      prev.map((t) =>
        t.id === templateId
          ? {
              ...t,
              exercises: t.exercises.filter((e) => e.id !== exerciseId),
              modifiedAt: new Date().toISOString(),
            }
          : t
      )
    )
  }, [setSessionTemplates])
  
  /**
   * Réordonne les exercices d'un template
   */
  const reorderTemplateExercises = useCallback((templateId, newExercises) => {
    setSessionTemplates((prev) =>
      prev.map((t) =>
        t.id === templateId
          ? { ...t, exercises: newExercises, modifiedAt: new Date().toISOString() }
          : t
      )
    )
  }, [setSessionTemplates])
  
  // ===================
  // GESTION DES WORKOUTS
  // ===================
  
  /**
   * Démarre un nouveau workout à partir d'un template
   */
  const startWorkout = useCallback((templateId) => {
    const template = sessionTemplates.find((t) => t.id === templateId)
    if (!template) return null
    
    const workout = {
      id: uuidv4(),
      templateId: template.id,
      templateName: template.name,
      date: new Date().toISOString(),
      startTime: new Date().toISOString(),
      endTime: null,
      exercises: template.exercises.map((ex) => ({
        exerciseId: ex.id,
        name: ex.name,
        category: ex.category,
        sets: [],
        notes: '',
        // Suggère le poids basé sur l'historique
        suggestedWeight: suggestWeight(ex, workoutHistory),
      })),
      totalVolume: 0,
      duration: 0,
      isActive: true,
    }
    
    setCurrentWorkout(workout)
    return workout
  }, [sessionTemplates, workoutHistory, setCurrentWorkout])
  
  /**
   * Démarre un workout vide (sans template)
   */
  const startEmptyWorkout = useCallback(() => {
    const workout = {
      id: uuidv4(),
      templateId: null,
      templateName: 'Séance libre',
      date: new Date().toISOString(),
      startTime: new Date().toISOString(),
      endTime: null,
      exercises: [],
      totalVolume: 0,
      duration: 0,
      isActive: true,
    }
    
    setCurrentWorkout(workout)
    return workout
  }, [setCurrentWorkout])
  
  /**
   * Ajoute un exercice au workout en cours
   */
  const addExerciseToWorkout = useCallback((exercise) => {
    if (!currentWorkout) return
    
    const newExercise = {
      exerciseId: exercise.id || uuidv4(),
      name: exercise.name,
      category: exercise.category || 'Autre',
      sets: [],
      notes: '',
      suggestedWeight: suggestWeight(exercise, workoutHistory),
    }
    
    setCurrentWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }))
    
    return newExercise
  }, [currentWorkout, workoutHistory, setCurrentWorkout])
  
  /**
   * Enregistre une série pour un exercice
   */
  const logSet = useCallback((exerciseId, setData) => {
    if (!currentWorkout) return
    
    const newSet = {
      setNumber: 0, // sera calculé
      reps: setData.reps || 0,
      weight: setData.weight || 0,
      rpe: setData.rpe || null,
      timestamp: new Date().toISOString(),
    }
    
    setCurrentWorkout((prev) => {
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.exerciseId === exerciseId) {
          const sets = [...ex.sets, { ...newSet, setNumber: ex.sets.length + 1 }]
          return { ...ex, sets }
        }
        return ex
      })
      
      const totalVolume = updatedExercises.reduce(
        (total, ex) => total + calculateExerciseVolume(ex.sets),
        0
      )
      
      return {
        ...prev,
        exercises: updatedExercises,
        totalVolume,
      }
    })
  }, [currentWorkout, setCurrentWorkout])
  
  /**
   * Met à jour une série existante
   */
  const updateSet = useCallback((exerciseId, setIndex, updates) => {
    if (!currentWorkout) return
    
    setCurrentWorkout((prev) => {
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.exerciseId === exerciseId) {
          const sets = ex.sets.map((s, i) => 
            i === setIndex ? { ...s, ...updates } : s
          )
          return { ...ex, sets }
        }
        return ex
      })
      
      const totalVolume = updatedExercises.reduce(
        (total, ex) => total + calculateExerciseVolume(ex.sets),
        0
      )
      
      return {
        ...prev,
        exercises: updatedExercises,
        totalVolume,
      }
    })
  }, [currentWorkout, setCurrentWorkout])
  
  /**
   * Supprime une série
   */
  const deleteSet = useCallback((exerciseId, setIndex) => {
    if (!currentWorkout) return
    
    setCurrentWorkout((prev) => {
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.exerciseId === exerciseId) {
          const sets = ex.sets
            .filter((_, i) => i !== setIndex)
            .map((s, i) => ({ ...s, setNumber: i + 1 }))
          return { ...ex, sets }
        }
        return ex
      })
      
      const totalVolume = updatedExercises.reduce(
        (total, ex) => total + calculateExerciseVolume(ex.sets),
        0
      )
      
      return {
        ...prev,
        exercises: updatedExercises,
        totalVolume,
      }
    })
  }, [currentWorkout, setCurrentWorkout])
  
  /**
   * Ajoute une note à un exercice
   */
  const addExerciseNote = useCallback((exerciseId, note) => {
    if (!currentWorkout) return
    
    setCurrentWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.exerciseId === exerciseId ? { ...ex, notes: note } : ex
      ),
    }))
  }, [currentWorkout, setCurrentWorkout])
  
  /**
   * Termine le workout en cours
   */
  const finishWorkout = useCallback(() => {
    if (!currentWorkout) return null
    
    const endTime = new Date()
    const startTime = new Date(currentWorkout.startTime)
    const duration = Math.floor((endTime - startTime) / 1000)
    
    const completedWorkout = {
      ...currentWorkout,
      endTime: endTime.toISOString(),
      duration,
      totalVolume: calculateWorkoutVolume(currentWorkout.exercises),
      isActive: false,
    }
    
    // Ajoute à l'historique
    setWorkoutHistory((prev) => [completedWorkout, ...prev])
    
    // Mise à jour des lastPerformed sur le template
    if (currentWorkout.templateId) {
      setSessionTemplates((prev) =>
        prev.map((t) => {
          if (t.id === currentWorkout.templateId) {
            const updatedExercises = t.exercises.map((ex) => {
              const workoutEx = currentWorkout.exercises.find(
                (we) => we.exerciseId === ex.id
              )
              if (workoutEx && workoutEx.sets.length > 0) {
                return {
                  ...ex,
                  lastPerformed: {
                    date: endTime.toISOString(),
                    sets: workoutEx.sets,
                  },
                }
              }
              return ex
            })
            return { ...t, exercises: updatedExercises }
          }
          return t
        })
      )
    }
    
    // Clear current workout
    setCurrentWorkout(null)
    
    return completedWorkout
  }, [currentWorkout, setCurrentWorkout, setWorkoutHistory, setSessionTemplates])
  
  /**
   * Abandonne le workout en cours
   */
  const cancelWorkout = useCallback(() => {
    setCurrentWorkout(null)
  }, [setCurrentWorkout])
  
  /**
   * Supprime un workout de l'historique
   */
  const deleteWorkout = useCallback((workoutId) => {
    setWorkoutHistory((prev) => prev.filter((w) => w.id !== workoutId))
  }, [setWorkoutHistory])
  
  /**
   * Répète un workout (crée un nouveau workout avec les mêmes exercices)
   */
  const repeatWorkout = useCallback((workoutId) => {
    const original = workoutHistory.find((w) => w.id === workoutId)
    if (!original) return null
    
    const workout = {
      id: uuidv4(),
      templateId: original.templateId,
      templateName: original.templateName,
      date: new Date().toISOString(),
      startTime: new Date().toISOString(),
      endTime: null,
      exercises: original.exercises.map((ex) => ({
        ...ex,
        exerciseId: ex.exerciseId || uuidv4(),
        sets: [], // Reset sets
        suggestedWeight: ex.sets.length > 0 
          ? ex.sets[ex.sets.length - 1].weight 
          : 0,
      })),
      totalVolume: 0,
      duration: 0,
      isActive: true,
    }
    
    setCurrentWorkout(workout)
    return workout
  }, [workoutHistory, setCurrentWorkout])
  
  // ===================
  // GESTION DES SETTINGS
  // ===================
  
  /**
   * Met à jour un setting
   */
  const updateSetting = useCallback((key, value) => {
    setUserSettings((prev) => ({ ...prev, [key]: value }))
  }, [setUserSettings])
  
  /**
   * Réinitialise les settings par défaut
   */
  const resetSettings = useCallback(() => {
    setUserSettings(getDefaultSettings())
  }, [setUserSettings])
  
  // ===================
  // HELPERS & STATS
  // ===================
  
  /**
   * Retourne l'historique d'un exercice spécifique
   */
  const getExerciseHistory = useCallback((exerciseName) => {
    const history = []
    
    workoutHistory.forEach((workout) => {
      const exercise = workout.exercises.find((e) => e.name === exerciseName)
      if (exercise && exercise.sets.length > 0) {
        history.push({
          date: workout.date,
          sets: exercise.sets,
          notes: exercise.notes,
        })
      }
    })
    
    return history
  }, [workoutHistory])
  
  /**
   * Enregistre rapidement un exercice (sans démarrer une séance complète)
   * Mode "quick log" pour suivi par exercice
   */
  const logQuickExercise = useCallback((data) => {
    const { exerciseId, name, weight, reps, sets = 1, date = new Date().toISOString() } = data
    
    // Chercher si on a déjà un workout "quick log" pour aujourd'hui
    const today = new Date(date).toDateString()
    let todayWorkout = workoutHistory.find(w => 
      w.templateName === 'Quick Log' && 
      new Date(w.date).toDateString() === today
    )
    
    if (todayWorkout) {
      // Ajouter à l'exercice existant ou créer un nouvel exercice
      const updatedWorkout = { ...todayWorkout }
      const existingExercise = updatedWorkout.exercises.find(e => 
        e.exerciseId === exerciseId || e.name === name
      )
      
      if (existingExercise) {
        // Ajouter les séries à l'exercice existant
        for (let i = 0; i < sets; i++) {
          existingExercise.sets.push({
            setNumber: existingExercise.sets.length + 1,
            weight,
            reps,
            completed: true,
            timestamp: new Date().toISOString()
          })
        }
      } else {
        // Créer un nouvel exercice
        const newSets = []
        for (let i = 0; i < sets; i++) {
          newSets.push({
            setNumber: i + 1,
            weight,
            reps,
            completed: true,
            timestamp: new Date().toISOString()
          })
        }
        updatedWorkout.exercises.push({
          exerciseId,
          name,
          sets: newSets
        })
      }
      
      // Recalculer le volume
      updatedWorkout.totalVolume = updatedWorkout.exercises.reduce(
        (total, ex) => total + calculateExerciseVolume(ex.sets),
        0
      )
      
      // Mettre à jour l'historique
      setWorkoutHistory(prev => prev.map(w => 
        w.id === todayWorkout.id ? updatedWorkout : w
      ))
    } else {
      // Créer un nouveau workout "Quick Log" pour aujourd'hui
      const newSets = []
      for (let i = 0; i < sets; i++) {
        newSets.push({
          setNumber: i + 1,
          weight,
          reps,
          completed: true,
          timestamp: new Date().toISOString()
        })
      }
      
      const newWorkout = {
        id: uuidv4(),
        templateId: null,
        templateName: 'Quick Log',
        date,
        startTime: date,
        endTime: date,
        exercises: [{
          exerciseId,
          name,
          sets: newSets
        }],
        totalVolume: weight * reps * sets,
        duration: 0,
        isActive: false,
      }
      
      setWorkoutHistory(prev => [newWorkout, ...prev])
    }
  }, [workoutHistory, setWorkoutHistory])
  
  /**
   * Retourne le dernier workout pour un template donné
   */
  const getLastWorkoutForTemplate = useCallback((templateId) => {
    return workoutHistory.find((w) => w.templateId === templateId)
  }, [workoutHistory])
  
  /**
   * Calcule les statistiques globales
   */
  const calculateStats = useCallback(() => {
    const totalWorkouts = workoutHistory.length
    const totalVolume = workoutHistory.reduce(
      (sum, w) => sum + (w.totalVolume || 0),
      0
    )
    const totalDuration = workoutHistory.reduce(
      (sum, w) => sum + (w.duration || 0),
      0
    )
    const totalSets = workoutHistory.reduce(
      (sum, w) => sum + w.exercises.reduce(
        (eSum, e) => eSum + (e.sets?.length || 0),
        0
      ),
      0
    )
    
    return {
      totalWorkouts,
      totalVolume,
      totalDuration,
      totalSets,
      averageWorkoutDuration: totalWorkouts > 0 
        ? Math.round(totalDuration / totalWorkouts) 
        : 0,
      averageVolumePerWorkout: totalWorkouts > 0 
        ? Math.round(totalVolume / totalWorkouts) 
        : 0,
    }
  }, [workoutHistory])
  
  return {
    // Data
    sessionTemplates,
    workoutHistory,
    userSettings,
    currentWorkout,
    defaultExercises,
    
    // Templates
    addTemplate,
    updateTemplate,
    deleteTemplate,
    duplicateTemplate,
    addExerciseToTemplate,
    removeExerciseFromTemplate,
    reorderTemplateExercises,
    
    // Workouts
    startWorkout,
    startEmptyWorkout,
    addExerciseToWorkout,
    logSet,
    updateSet,
    deleteSet,
    addExerciseNote,
    finishWorkout,
    cancelWorkout,
    deleteWorkout,
    repeatWorkout,
    
    // Settings
    updateSetting,
    resetSettings,
    
    // Helpers
    getExerciseHistory,
    getLastWorkoutForTemplate,
    calculateStats,
    logQuickExercise,
  }
}

export default useWorkoutData
