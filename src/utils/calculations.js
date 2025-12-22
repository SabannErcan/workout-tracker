/**
 * Calculs sportifs pour le tracking musculation
 */

/**
 * Calcule le 1RM estimé avec la formule Epley
 * @param {number} weight - Poids soulevé
 * @param {number} reps - Nombre de répétitions
 * @returns {number} - 1RM estimé
 */
export function calculateOneRepMax(weight, reps) {
  if (reps <= 0 || weight <= 0) return 0
  if (reps === 1) return weight
  
  // Formule Epley: 1RM = weight × (1 + reps/30)
  return Math.round(weight * (1 + reps / 30))
}

/**
 * Calcule le 1RM avec différentes formules
 * @param {number} weight - Poids soulevé
 * @param {number} reps - Nombre de répétitions
 * @returns {Object} - Différentes estimations 1RM
 */
export function calculateOneRepMaxAll(weight, reps) {
  if (reps <= 0 || weight <= 0) return { epley: 0, brzycki: 0, average: 0 }
  if (reps === 1) return { epley: weight, brzycki: weight, average: weight }
  
  // Formule Epley
  const epley = weight * (1 + reps / 30)
  
  // Formule Brzycki
  const brzycki = weight * (36 / (37 - reps))
  
  // Moyenne des deux
  const average = (epley + brzycki) / 2
  
  return {
    epley: Math.round(epley),
    brzycki: Math.round(brzycki),
    average: Math.round(average),
  }
}

/**
 * Calcule le volume d'une série
 * @param {number} weight - Poids
 * @param {number} reps - Répétitions
 * @returns {number} - Volume (poids × reps)
 */
export function calculateSetVolume(weight, reps) {
  return (weight || 0) * (reps || 0)
}

/**
 * Calcule le volume total d'un exercice (somme de toutes les séries)
 * @param {Array<{weight: number, reps: number}>} sets - Liste des séries
 * @returns {number} - Volume total
 */
export function calculateExerciseVolume(sets) {
  if (!sets || !Array.isArray(sets)) return 0
  
  return sets.reduce((total, set) => {
    return total + calculateSetVolume(set.weight, set.reps)
  }, 0)
}

/**
 * Calcule le volume total d'une séance
 * @param {Array} exercises - Liste des exercices avec leurs séries
 * @returns {number} - Volume total de la séance
 */
export function calculateWorkoutVolume(exercises) {
  if (!exercises || !Array.isArray(exercises)) return 0
  
  return exercises.reduce((total, exercise) => {
    return total + calculateExerciseVolume(exercise.sets || [])
  }, 0)
}

/**
 * Estime les calories brûlées pendant un workout
 * Estimation approximative basée sur le volume et la durée
 * @param {number} volume - Volume total en kg
 * @param {number} durationMinutes - Durée en minutes
 * @returns {number} - Calories estimées
 */
export function estimateCalories(volume, durationMinutes) {
  // Estimation: ~5 cal par minute de musculation + bonus selon volume
  const baseCalPerMin = 5
  const volumeBonus = Math.log10(volume + 1) * 10
  
  return Math.round(durationMinutes * baseCalPerMin + volumeBonus)
}

/**
 * Détecte si c'est un nouveau record personnel
 * @param {Object} exercise - Exercice actuel
 * @param {Object} newSet - Nouvelle série
 * @param {Array} history - Historique des workouts
 * @returns {Object} - { isPR: boolean, type: string, improvement: number }
 */
export function detectPR(exercise, newSet, history) {
  if (!exercise || !newSet || !history) {
    return { isPR: false }
  }
  
  // Récupère tous les sets de cet exercice dans l'historique
  const allSets = []
  history.forEach((workout) => {
    const ex = workout.exercises?.find((e) => e.name === exercise.name || e.exerciseId === exercise.id)
    if (ex && ex.sets) {
      allSets.push(...ex.sets)
    }
  })
  
  if (allSets.length === 0) {
    return { isPR: true, type: 'first', improvement: 0 }
  }
  
  const newWeight = newSet.weight || 0
  const newReps = newSet.reps || 0
  const new1RM = calculateOneRepMax(newWeight, newReps)
  
  // Max weight historique pour le même nombre de reps
  const maxWeightSameReps = Math.max(
    ...allSets
      .filter((s) => s.reps === newReps)
      .map((s) => s.weight || 0),
    0
  )
  
  // Max 1RM historique
  const max1RM = Math.max(
    ...allSets.map((s) => calculateOneRepMax(s.weight || 0, s.reps || 0)),
    0
  )
  
  // PR de poids pour ce nombre de reps
  if (newWeight > maxWeightSameReps && maxWeightSameReps > 0) {
    return {
      isPR: true,
      type: 'weight',
      improvement: newWeight - maxWeightSameReps,
    }
  }
  
  // PR de 1RM estimé
  if (new1RM > max1RM && max1RM > 0) {
    return {
      isPR: true,
      type: '1rm',
      improvement: new1RM - max1RM,
    }
  }
  
  return { isPR: false }
}

/**
 * Suggère le poids pour la prochaine série basé sur l'historique
 * @param {Object} exercise - Exercice
 * @param {Array} history - Historique des workouts
 * @param {number} targetReps - Nombre de reps visé
 * @returns {number} - Poids suggéré
 */
export function suggestWeight(exercise, history, targetReps = 8) {
  if (!exercise || !history || history.length === 0) {
    return 0
  }
  
  // Trouve le dernier workout contenant cet exercice
  for (let i = history.length - 1; i >= 0; i--) {
    const workout = history[i]
    const ex = workout.exercises?.find(
      (e) => e.name === exercise.name || e.exerciseId === exercise.id
    )
    
    if (ex && ex.sets && ex.sets.length > 0) {
      // Retourne le poids de la dernière série réussie
      const lastSet = ex.sets[ex.sets.length - 1]
      return lastSet.weight || 0
    }
  }
  
  return 0
}

/**
 * Calcule la progression entre deux séances
 * @param {Object} currentWorkout - Séance actuelle
 * @param {Object} previousWorkout - Séance précédente
 * @returns {Object} - { volumeDiff, volumePercent }
 */
export function calculateProgression(currentWorkout, previousWorkout) {
  if (!currentWorkout || !previousWorkout) {
    return { volumeDiff: 0, volumePercent: 0 }
  }
  
  const currentVolume = calculateWorkoutVolume(currentWorkout.exercises)
  const previousVolume = calculateWorkoutVolume(previousWorkout.exercises)
  
  if (previousVolume === 0) {
    return { volumeDiff: currentVolume, volumePercent: 100 }
  }
  
  const volumeDiff = currentVolume - previousVolume
  const volumePercent = Math.round((volumeDiff / previousVolume) * 100)
  
  return { volumeDiff, volumePercent }
}

/**
 * Analyse les stats d'un exercice sur l'historique
 * @param {string} exerciseName - Nom de l'exercice
 * @param {Array} history - Historique des workouts
 * @returns {Object} - Stats complètes
 */
export function analyzeExerciseStats(exerciseName, history) {
  const allSets = []
  const dateVolumes = []
  
  history.forEach((workout) => {
    const ex = workout.exercises?.find((e) => e.name === exerciseName)
    if (ex && ex.sets) {
      ex.sets.forEach((set) => {
        allSets.push({
          ...set,
          date: workout.date,
        })
      })
      
      dateVolumes.push({
        date: workout.date,
        volume: calculateExerciseVolume(ex.sets),
      })
    }
  })
  
  if (allSets.length === 0) {
    return {
      totalSets: 0,
      maxWeight: 0,
      maxReps: 0,
      estimated1RM: 0,
      totalVolume: 0,
      averageWeight: 0,
      averageReps: 0,
      progression: [],
    }
  }
  
  const weights = allSets.map((s) => s.weight || 0)
  const reps = allSets.map((s) => s.reps || 0)
  const oneRMs = allSets.map((s) => calculateOneRepMax(s.weight || 0, s.reps || 0))
  
  return {
    totalSets: allSets.length,
    maxWeight: Math.max(...weights),
    maxReps: Math.max(...reps),
    estimated1RM: Math.max(...oneRMs),
    totalVolume: calculateExerciseVolume(allSets),
    averageWeight: Math.round(weights.reduce((a, b) => a + b, 0) / weights.length),
    averageReps: Math.round(reps.reduce((a, b) => a + b, 0) / reps.length),
    progression: dateVolumes,
  }
}

/**
 * Calcule le tonnage par groupe musculaire
 * @param {Array} history - Historique des workouts
 * @returns {Object} - Volume par catégorie
 */
export function calculateVolumeByMuscleGroup(history) {
  const volumeByGroup = {}
  
  history.forEach((workout) => {
    workout.exercises?.forEach((exercise) => {
      const category = exercise.category || 'Autre'
      const volume = calculateExerciseVolume(exercise.sets || [])
      
      if (!volumeByGroup[category]) {
        volumeByGroup[category] = 0
      }
      volumeByGroup[category] += volume
    })
  })
  
  return volumeByGroup
}

/**
 * Calcule le nombre de séances par semaine
 * @param {Array} history - Historique des workouts
 * @param {number} weeks - Nombre de semaines à analyser
 * @returns {number} - Moyenne de séances par semaine
 */
export function calculateWorkoutsPerWeek(history, weeks = 4) {
  if (!history || history.length === 0) return 0
  
  const now = new Date()
  const cutoffDate = new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000)
  
  const recentWorkouts = history.filter((w) => new Date(w.date) >= cutoffDate)
  
  return Math.round((recentWorkouts.length / weeks) * 10) / 10
}

/**
 * Formate le volume pour affichage
 * @param {number} volume - Volume en kg
 * @param {string} unit - Unité (kg ou lbs)
 * @returns {string} - Volume formaté
 */
export function formatVolume(volume, unit = 'kg') {
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}t`
  }
  return `${Math.round(volume)}${unit}`
}

/**
 * Convertit le poids entre kg et lbs
 * @param {number} weight - Poids
 * @param {string} from - Unité source ('kg' ou 'lbs')
 * @param {string} to - Unité cible ('kg' ou 'lbs')
 * @returns {number} - Poids converti
 */
export function convertWeight(weight, from, to) {
  if (from === to) return weight
  
  if (from === 'kg' && to === 'lbs') {
    return Math.round(weight * 2.20462 * 10) / 10
  }
  
  if (from === 'lbs' && to === 'kg') {
    return Math.round(weight / 2.20462 * 10) / 10
  }
  
  return weight
}

export default {
  calculateOneRepMax,
  calculateOneRepMaxAll,
  calculateSetVolume,
  calculateExerciseVolume,
  calculateWorkoutVolume,
  estimateCalories,
  detectPR,
  suggestWeight,
  calculateProgression,
  analyzeExerciseStats,
  calculateVolumeByMuscleGroup,
  calculateWorkoutsPerWeek,
  formatVolume,
  convertWeight,
}
