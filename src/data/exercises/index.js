/**
 * 🏋️ Bibliothèque d'Exercices de Musculation Complète
 * 
 * Structure modulaire avec:
 * - Exercices par groupe musculaire
 * - Machines Basic-Fit
 * - Index pour recherche rapide
 * - Fonctions de filtrage et recherche
 * - Presets de workout
 */

import { chestExercises } from './chest'
import { backExercises } from './back'
import { shoulderExercises } from './shoulders'
import { legExercises } from './legs'
import { bicepsExercises } from './biceps'
import { tricepsExercises } from './triceps'
import { coreExercises } from './core'
import { forearmExercises } from './forearms'
import { basicFitMachines } from './basicfit-machines'

// ═══════════════════════════════════════════════════════════════
// 📚 BIBLIOTHÈQUE COMPLÈTE
// ═══════════════════════════════════════════════════════════════

export const exerciseLibrary = [
  ...basicFitMachines, // Les machines Basic-Fit en premier (plus utilisées)
  ...chestExercises,
  ...backExercises,
  ...shoulderExercises,
  ...legExercises,
  ...bicepsExercises,
  ...tricepsExercises,
  ...coreExercises,
  ...forearmExercises,
]

// ═══════════════════════════════════════════════════════════════
// 🗂️ INDEX POUR RECHERCHE RAPIDE
// ═══════════════════════════════════════════════════════════════

// Index par groupe musculaire principal
export const indexByMuscleGroup = exerciseLibrary.reduce((acc, ex) => {
  const muscle = ex.category.primary
  if (!acc[muscle]) acc[muscle] = []
  acc[muscle].push(ex.id)
  return acc
}, {})

// Index par équipement
export const indexByEquipment = exerciseLibrary.reduce((acc, ex) => {
  const equipment = ex.equipment.type
  if (!acc[equipment]) acc[equipment] = []
  acc[equipment].push(ex.id)
  return acc
}, {})

// Index par difficulté
export const indexByDifficulty = exerciseLibrary.reduce((acc, ex) => {
  const diff = ex.difficulty
  if (!acc[diff]) acc[diff] = []
  acc[diff].push(ex.id)
  return acc
}, {})

// Index par pattern de mouvement
export const indexByMovementPattern = exerciseLibrary.reduce((acc, ex) => {
  const pattern = ex.category.movementPattern
  if (!acc[pattern]) acc[pattern] = []
  acc[pattern].push(ex.id)
  return acc
}, {})

// Index par type (compound/isolation)
export const indexByType = exerciseLibrary.reduce((acc, ex) => {
  const type = ex.isCompound ? 'Compound' : 'Isolation'
  if (!acc[type]) acc[type] = []
  acc[type].push(ex.id)
  return acc
}, {})

// Top exercices par catégorie (triés par popularité)
export const popularByCategory = Object.keys(indexByMuscleGroup).reduce((acc, muscle) => {
  acc[muscle] = exerciseLibrary
    .filter(ex => ex.category.primary === muscle)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 5)
    .map(ex => ex.id)
  return acc
}, {})

// ═══════════════════════════════════════════════════════════════
// 🔍 FONCTIONS DE RECHERCHE
// ═══════════════════════════════════════════════════════════════

/**
 * Recherche fuzzy d'exercices
 * Tolère les fautes de frappe et cherche dans noms FR/EN + aliases
 */
export function searchExercises(query, options = {}) {
  if (!query || query.length < 2) return []
  
  const {
    limit = 20,
    muscleGroup = null,
    equipment = null,
    difficulty = null,
  } = options
  
  const normalizedQuery = normalizeString(query)
  
  let results = exerciseLibrary.filter(ex => {
    // Filtres optionnels
    if (muscleGroup && ex.category.primary !== muscleGroup) return false
    if (equipment && ex.equipment.type !== equipment) return false
    if (difficulty && ex.difficulty !== difficulty) return false
    
    // Recherche dans tous les champs texte
    const searchFields = [
      ex.name,
      ex.nameTranslations?.fr,
      ex.nameTranslations?.en,
      ...(ex.aliases || []),
      ex.category.primary,
      ...ex.category.secondary,
    ].filter(Boolean).map(normalizeString)
    
    return searchFields.some(field => 
      field.includes(normalizedQuery) || 
      fuzzyMatch(normalizedQuery, field)
    )
  })
  
  // Trier par pertinence
  results.sort((a, b) => {
    const aNameMatch = normalizeString(a.name).startsWith(normalizedQuery) ? 1 : 0
    const bNameMatch = normalizeString(b.name).startsWith(normalizedQuery) ? 1 : 0
    if (aNameMatch !== bNameMatch) return bNameMatch - aNameMatch
    return b.popularityScore - a.popularityScore
  })
  
  return results.slice(0, limit)
}

/**
 * Filtre multi-critères d'exercices
 */
export function filterExercises(filters = {}) {
  const {
    muscleGroups = [],        // ["Chest", "Back"]
    equipment = [],           // ["Barbell", "Dumbbell"]
    difficulty = [],          // ["Beginner", "Intermediate"]
    movementPattern = [],     // ["Push", "Pull"]
    tags = [],                // ["Compound", "Home-Gym"]
    isCompound = null,        // true, false, ou null pour tous
    bodyPart = null,          // "Upper Body", "Lower Body"
    excludeTags = [],         // Tags à exclure
  } = filters
  
  return exerciseLibrary.filter(ex => {
    // Filtre par groupe musculaire
    if (muscleGroups.length > 0) {
      const allMuscles = [ex.category.primary, ...ex.category.secondary]
      if (!muscleGroups.some(m => allMuscles.includes(m))) return false
    }
    
    // Filtre par équipement
    if (equipment.length > 0) {
      const allEquip = [ex.equipment.type, ...(ex.equipment.alternatives || [])]
      if (!equipment.some(e => allEquip.includes(e))) return false
    }
    
    // Filtre par difficulté
    if (difficulty.length > 0 && !difficulty.includes(ex.difficulty)) return false
    
    // Filtre par pattern de mouvement
    if (movementPattern.length > 0 && !movementPattern.includes(ex.category.movementPattern)) return false
    
    // Filtre par tags
    if (tags.length > 0 && !tags.some(t => ex.tags.includes(t))) return false
    
    // Filtre compound/isolation
    if (isCompound !== null && ex.isCompound !== isCompound) return false
    
    // Filtre par partie du corps
    if (bodyPart && ex.category.bodyPart !== bodyPart) return false
    
    // Exclure certains tags
    if (excludeTags.length > 0 && excludeTags.some(t => ex.tags.includes(t))) return false
    
    return true
  })
}

/**
 * Obtenir un exercice par ID
 */
export function getExerciseById(id) {
  return exerciseLibrary.find(ex => ex.id === id)
}

/**
 * Obtenir les exercices par liste d'IDs
 */
export function getExercisesByIds(ids) {
  return ids.map(id => getExerciseById(id)).filter(Boolean)
}

/**
 * Obtenir les variations d'un exercice
 */
export function getExerciseVariations(exerciseId) {
  const exercise = getExerciseById(exerciseId)
  if (!exercise?.variations) return []
  
  return exercise.variations.map(v => ({
    ...v,
    fullExercise: getExerciseById(v.id)
  })).filter(v => v.fullExercise)
}

/**
 * Obtenir les alternatives d'un exercice
 */
export function getExerciseAlternatives(exerciseId) {
  const exercise = getExerciseById(exerciseId)
  if (!exercise?.alternatives) return []
  
  return exercise.alternatives.map(alt => ({
    ...alt,
    fullExercise: getExerciseById(alt.exerciseId)
  })).filter(a => a.fullExercise)
}

/**
 * Suggérer des exercices complémentaires
 */
export function suggestComplementaryExercises(exerciseId, limit = 3) {
  const exercise = getExerciseById(exerciseId)
  if (!exercise) return []
  
  // Trouver des exercices du même groupe mais différent type
  const complementary = exerciseLibrary.filter(ex => {
    if (ex.id === exerciseId) return false
    if (ex.category.primary !== exercise.category.primary) return false
    // Si l'exercice actuel est compound, suggérer isolation et vice-versa
    if (ex.isCompound === exercise.isCompound) return false
    return true
  })
  
  return complementary
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit)
}

// ═══════════════════════════════════════════════════════════════
// 🛠️ FONCTIONS UTILITAIRES
// ═══════════════════════════════════════════════════════════════

function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlever accents
    .replace(/[^a-z0-9\s]/g, '')     // Garder que alphanum
    .trim()
}

function fuzzyMatch(query, target) {
  // Simple fuzzy: toutes les lettres de query dans l'ordre dans target
  let queryIndex = 0
  for (let i = 0; i < target.length && queryIndex < query.length; i++) {
    if (target[i] === query[queryIndex]) {
      queryIndex++
    }
  }
  return queryIndex === query.length
}

// ═══════════════════════════════════════════════════════════════
// 📋 CONSTANTES ET ÉNUMÉRATIONS
// ═══════════════════════════════════════════════════════════════

export const MUSCLE_GROUPS = [
  'Chest',
  'Back', 
  'Shoulders',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Biceps',
  'Triceps',
  'Calves',
  'Core',
  'Forearms',
]

export const MUSCLE_GROUPS_FR = {
  'Chest': 'Pectoraux',
  'Back': 'Dos',
  'Shoulders': 'Épaules',
  'Quadriceps': 'Quadriceps',
  'Hamstrings': 'Ischio-jambiers',
  'Glutes': 'Fessiers',
  'Biceps': 'Biceps',
  'Triceps': 'Triceps',
  'Calves': 'Mollets',
  'Core': 'Abdos',
  'Forearms': 'Avant-bras',
}

export const EQUIPMENT_TYPES = [
  'Barbell',
  'Dumbbell',
  'Cable',
  'Machine',
  'Bodyweight',
  'Kettlebell',
  'Resistance Band',
  'Smith Machine',
  'EZ Bar',
  'Trap Bar',
]

export const EQUIPMENT_TYPES_FR = {
  'Barbell': 'Barre',
  'Dumbbell': 'Haltères',
  'Cable': 'Poulie',
  'Machine': 'Machine',
  'Bodyweight': 'Poids du corps',
  'Kettlebell': 'Kettlebell',
  'Resistance Band': 'Élastique',
  'Smith Machine': 'Smith Machine',
  'EZ Bar': 'Barre EZ',
  'Trap Bar': 'Trap Bar',
}

export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export const DIFFICULTY_LEVELS_FR = {
  'Beginner': 'Débutant',
  'Intermediate': 'Intermédiaire',
  'Advanced': 'Avancé',
}

export const MOVEMENT_PATTERNS = ['Push', 'Pull', 'Squat', 'Hinge', 'Carry', 'Core']

export const BODY_PARTS = ['Upper Body', 'Lower Body', 'Core']

export const BODY_PARTS_FR = {
  'Upper Body': 'Haut du corps',
  'Lower Body': 'Bas du corps',
  'Core': 'Centre',
}

// ═══════════════════════════════════════════════════════════════
// 🏋️ WORKOUT PRESETS
// ═══════════════════════════════════════════════════════════════

export const workoutPresets = {
  'push-day': {
    id: 'push-day',
    name: 'Push Day',
    nameFr: 'Jour Push',
    description: 'Chest, Shoulders, Triceps',
    exercises: [
      { exerciseId: 'chest-bench-press-barbell', suggestedSets: 4, suggestedReps: '6-8' },
      { exerciseId: 'chest-incline-press-dumbbell', suggestedSets: 3, suggestedReps: '8-10' },
      { exerciseId: 'chest-cable-fly-mid', suggestedSets: 3, suggestedReps: '12-15' },
      { exerciseId: 'shoulders-overhead-press-dumbbell', suggestedSets: 4, suggestedReps: '8-10' },
      { exerciseId: 'shoulders-lateral-raise-dumbbell', suggestedSets: 3, suggestedReps: '12-15' },
      { exerciseId: 'triceps-pushdown-cable-rope', suggestedSets: 3, suggestedReps: '12-15' },
    ]
  },
  
  'pull-day': {
    id: 'pull-day',
    name: 'Pull Day',
    nameFr: 'Jour Pull',
    description: 'Back, Biceps, Rear Delts',
    exercises: [
      { exerciseId: 'back-pull-up', suggestedSets: 4, suggestedReps: '6-10' },
      { exerciseId: 'back-barbell-row', suggestedSets: 4, suggestedReps: '6-8' },
      { exerciseId: 'back-lat-pulldown-cable', suggestedSets: 3, suggestedReps: '10-12' },
      { exerciseId: 'back-cable-row-seated', suggestedSets: 3, suggestedReps: '10-12' },
      { exerciseId: 'shoulders-face-pull-cable', suggestedSets: 3, suggestedReps: '15-20' },
      { exerciseId: 'biceps-barbell-curl', suggestedSets: 3, suggestedReps: '10-12' },
      { exerciseId: 'biceps-hammer-curl-dumbbell', suggestedSets: 3, suggestedReps: '10-12' },
    ]
  },
  
  'leg-day': {
    id: 'leg-day',
    name: 'Leg Day',
    nameFr: 'Jour Jambes',
    description: 'Quads, Hamstrings, Glutes, Calves',
    exercises: [
      { exerciseId: 'legs-squat-barbell', suggestedSets: 4, suggestedReps: '6-8' },
      { exerciseId: 'legs-romanian-deadlift-barbell', suggestedSets: 4, suggestedReps: '8-10' },
      { exerciseId: 'legs-leg-press', suggestedSets: 3, suggestedReps: '10-12' },
      { exerciseId: 'legs-leg-curl-lying', suggestedSets: 3, suggestedReps: '10-12' },
      { exerciseId: 'legs-leg-extension', suggestedSets: 3, suggestedReps: '12-15' },
      { exerciseId: 'legs-calf-raise-standing', suggestedSets: 4, suggestedReps: '12-15' },
    ]
  },
  
  'upper-body': {
    id: 'upper-body',
    name: 'Upper Body',
    nameFr: 'Haut du Corps',
    description: 'Complete upper body workout',
    exercises: [
      { exerciseId: 'chest-bench-press-barbell', suggestedSets: 4, suggestedReps: '6-8' },
      { exerciseId: 'back-barbell-row', suggestedSets: 4, suggestedReps: '6-8' },
      { exerciseId: 'shoulders-overhead-press-dumbbell', suggestedSets: 3, suggestedReps: '8-10' },
      { exerciseId: 'back-lat-pulldown-cable', suggestedSets: 3, suggestedReps: '10-12' },
      { exerciseId: 'chest-cable-fly-mid', suggestedSets: 3, suggestedReps: '12-15' },
      { exerciseId: 'biceps-dumbbell-curl', suggestedSets: 3, suggestedReps: '10-12' },
      { exerciseId: 'triceps-pushdown-cable-rope', suggestedSets: 3, suggestedReps: '10-12' },
    ]
  },
  
  'lower-body': {
    id: 'lower-body',
    name: 'Lower Body',
    nameFr: 'Bas du Corps',
    description: 'Complete lower body workout',
    exercises: [
      { exerciseId: 'legs-squat-barbell', suggestedSets: 4, suggestedReps: '6-8' },
      { exerciseId: 'legs-romanian-deadlift-barbell', suggestedSets: 4, suggestedReps: '8-10' },
      { exerciseId: 'legs-bulgarian-split-squat', suggestedSets: 3, suggestedReps: '10-12' },
      { exerciseId: 'legs-leg-curl-lying', suggestedSets: 3, suggestedReps: '10-12' },
      { exerciseId: 'legs-hip-thrust-barbell', suggestedSets: 3, suggestedReps: '10-12' },
      { exerciseId: 'legs-calf-raise-standing', suggestedSets: 4, suggestedReps: '12-15' },
    ]
  },
  
  'full-body': {
    id: 'full-body',
    name: 'Full Body',
    nameFr: 'Full Body',
    description: 'Hit every muscle group',
    exercises: [
      { exerciseId: 'legs-squat-barbell', suggestedSets: 3, suggestedReps: '6-8' },
      { exerciseId: 'chest-bench-press-barbell', suggestedSets: 3, suggestedReps: '6-8' },
      { exerciseId: 'back-barbell-row', suggestedSets: 3, suggestedReps: '8-10' },
      { exerciseId: 'shoulders-overhead-press-dumbbell', suggestedSets: 3, suggestedReps: '8-10' },
      { exerciseId: 'legs-romanian-deadlift-barbell', suggestedSets: 3, suggestedReps: '8-10' },
      { exerciseId: 'biceps-dumbbell-curl', suggestedSets: 2, suggestedReps: '10-12' },
      { exerciseId: 'triceps-pushdown-cable-rope', suggestedSets: 2, suggestedReps: '10-12' },
    ]
  },
  
  'home-workout': {
    id: 'home-workout',
    name: 'Home Workout',
    nameFr: 'Entraînement Maison',
    description: 'Bodyweight only, no equipment',
    exercises: [
      { exerciseId: 'chest-push-up', suggestedSets: 4, suggestedReps: '10-20' },
      { exerciseId: 'back-inverted-row', suggestedSets: 3, suggestedReps: '8-12' },
      { exerciseId: 'legs-bodyweight-squat', suggestedSets: 3, suggestedReps: '15-20' },
      { exerciseId: 'legs-lunge-bodyweight', suggestedSets: 3, suggestedReps: '12-15' },
      { exerciseId: 'shoulders-pike-push-up', suggestedSets: 3, suggestedReps: '8-12' },
      { exerciseId: 'core-plank', suggestedSets: 3, suggestedReps: '30-60s' },
      { exerciseId: 'glutes-glute-bridge', suggestedSets: 3, suggestedReps: '15-20' },
    ]
  },
}

export default {
  exerciseLibrary,
  indexByMuscleGroup,
  indexByEquipment,
  indexByDifficulty,
  indexByMovementPattern,
  indexByType,
  popularByCategory,
  searchExercises,
  filterExercises,
  getExerciseById,
  getExercisesByIds,
  getExerciseVariations,
  getExerciseAlternatives,
  suggestComplementaryExercises,
  workoutPresets,
  MUSCLE_GROUPS,
  MUSCLE_GROUPS_FR,
  EQUIPMENT_TYPES,
  EQUIPMENT_TYPES_FR,
  DIFFICULTY_LEVELS,
  DIFFICULTY_LEVELS_FR,
  MOVEMENT_PATTERNS,
  BODY_PARTS,
  BODY_PARTS_FR,
}
