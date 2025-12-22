/**
 * Utilitaires de stockage localStorage
 * Gère la persistance des données de l'application
 */

import {
  exerciseLibrary,
  searchExercises,
  filterExercises,
  getExerciseById,
  getExercisesByIds,
  MUSCLE_GROUPS,
  MUSCLE_GROUPS_FR,
  EQUIPMENT_TYPES,
  EQUIPMENT_TYPES_FR,
  DIFFICULTY_LEVELS,
  DIFFICULTY_LEVELS_FR,
  workoutPresets,
} from '../data/exercises/index.js'

import { personalTemplates } from '../data/personalTemplates.js'

// Clés de stockage
export const STORAGE_KEYS = {
  SESSION_TEMPLATES: 'sessionTemplates',
  WORKOUT_HISTORY: 'workoutHistory',
  USER_SETTINGS: 'userSettings',
  DATA_VERSION: 'dataVersion',
  CURRENT_WORKOUT: 'currentWorkout',
  USER_EXERCISES: 'userExercises', // Exercices personnalisés ajoutés par l'utilisateur
  FAVORITE_EXERCISES: 'favoriteExercises', // IDs des exercices favoris
}

// Version actuelle des données (pour migrations futures)
const CURRENT_DATA_VERSION = '2.0.0'

// Paramètres par défaut
const DEFAULT_SETTINGS = {
  theme: 'dark',
  weightUnit: 'kg',
  defaultRestTime: 120,
  soundEnabled: true,
  vibrationEnabled: true,
  showLastWorkout: true,
  autoStartRest: true,
  language: 'fr', // Langue par défaut
}

// Mapping des catégories pour compatibilité avec l'ancien format simple
const CATEGORY_MAPPING = {
  'Chest': 'Poitrine',
  'Back': 'Dos',
  'Shoulders': 'Épaules',
  'Biceps': 'Bras',
  'Triceps': 'Bras',
  'Forearms': 'Bras',
  'Quadriceps': 'Jambes',
  'Hamstrings': 'Jambes',
  'Glutes': 'Jambes',
  'Calves': 'Jambes',
  'Adductors': 'Jambes',
  'Core': 'Abdos',
  'Multi': 'Multi',
}

/**
 * Convertit un exercice de la nouvelle bibliothèque vers le format simple
 * @param {Object} exercise - Exercice de la bibliothèque
 * @returns {Object} - Format simplifié {name, category, id, ...}
 */
function toSimpleFormat(exercise) {
  return {
    id: exercise.id,
    name: exercise.nameTranslations?.fr || exercise.name,
    category: CATEGORY_MAPPING[exercise.category.primary] || exercise.category.primary,
    // Données enrichies pour usage avancé
    fullData: exercise,
  }
}

/**
 * Retourne la liste complète des exercices en format simple pour compatibilité
 */
function getSimplifiedExerciseList() {
  return exerciseLibrary.map(toSimpleFormat)
}

/**
 * Sauvegarde des données dans localStorage
 * @param {string} key - Clé de stockage
 * @param {any} data - Données à sauvegarder
 * @returns {boolean} - Succès de l'opération
 */
export function saveData(key, data) {
  try {
    const serialized = JSON.stringify(data)
    localStorage.setItem(key, serialized)
    return true
  } catch (error) {
    console.error(`[Storage] Erreur sauvegarde ${key}:`, error)
    
    // Gestion quota dépassé
    if (error.name === 'QuotaExceededError') {
      console.error('[Storage] Quota localStorage dépassé!')
      // Dispatch event pour notification
      window.dispatchEvent(new CustomEvent('storageQuotaExceeded'))
    }
    return false
  }
}

/**
 * Charge des données depuis localStorage
 * @param {string} key - Clé de stockage
 * @param {any} defaultValue - Valeur par défaut si non trouvé
 * @returns {any} - Données chargées ou valeur par défaut
 */
export function loadData(key, defaultValue = null) {
  try {
    const serialized = localStorage.getItem(key)
    if (serialized === null) {
      return defaultValue
    }
    return JSON.parse(serialized)
  } catch (error) {
    console.error(`[Storage] Erreur chargement ${key}:`, error)
    return defaultValue
  }
}

/**
 * Supprime une clé du localStorage
 * @param {string} key - Clé à supprimer
 */
export function removeData(key) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`[Storage] Erreur suppression ${key}:`, error)
  }
}

/**
 * Efface toutes les données de l'application
 * @returns {boolean} - Succès de l'opération
 */
export function clearAllData() {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.error('[Storage] Erreur effacement total:', error)
    return false
  }
}

/**
 * Exporte toutes les données en JSON
 * @returns {string} - JSON stringifié de toutes les données
 */
export function exportToJSON() {
  const data = {
    sessionTemplates: loadData(STORAGE_KEYS.SESSION_TEMPLATES, []),
    workoutHistory: loadData(STORAGE_KEYS.WORKOUT_HISTORY, []),
    userSettings: loadData(STORAGE_KEYS.USER_SETTINGS, DEFAULT_SETTINGS),
    dataVersion: loadData(STORAGE_KEYS.DATA_VERSION, CURRENT_DATA_VERSION),
    exportDate: new Date().toISOString(),
  }
  return JSON.stringify(data, null, 2)
}

/**
 * Importe des données depuis un fichier JSON
 * @param {string} jsonString - Contenu JSON à importer
 * @returns {{ success: boolean, error?: string }}
 */
export function importFromJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString)
    
    // Validation basique du schéma
    if (!data.sessionTemplates || !Array.isArray(data.sessionTemplates)) {
      return { success: false, error: 'Format invalide: sessionTemplates manquant' }
    }
    
    if (!data.workoutHistory || !Array.isArray(data.workoutHistory)) {
      return { success: false, error: 'Format invalide: workoutHistory manquant' }
    }
    
    // Import des données
    saveData(STORAGE_KEYS.SESSION_TEMPLATES, data.sessionTemplates)
    saveData(STORAGE_KEYS.WORKOUT_HISTORY, data.workoutHistory)
    
    if (data.userSettings) {
      saveData(STORAGE_KEYS.USER_SETTINGS, { ...DEFAULT_SETTINGS, ...data.userSettings })
    }
    
    saveData(STORAGE_KEYS.DATA_VERSION, CURRENT_DATA_VERSION)
    
    return { success: true }
  } catch (error) {
    console.error('[Storage] Erreur import:', error)
    return { success: false, error: 'JSON invalide' }
  }
}

/**
 * Retourne le pourcentage de quota localStorage utilisé
 * @returns {number} - Pourcentage (0-100)
 */
export function getStorageUsage() {
  try {
    let totalSize = 0
    for (const key of Object.keys(localStorage)) {
      const item = localStorage.getItem(key)
      if (item) {
        totalSize += item.length * 2 // UTF-16 = 2 bytes par caractère
      }
    }
    
    // localStorage limit généralement ~5MB
    const limit = 5 * 1024 * 1024
    return Math.round((totalSize / limit) * 100)
  } catch (error) {
    return 0
  }
}

/**
 * Vérifie et migre les données vers la nouvelle version si nécessaire
 */
export function migrateDataVersion() {
  const currentVersion = loadData(STORAGE_KEYS.DATA_VERSION, '0.0.0')
  
  if (currentVersion === CURRENT_DATA_VERSION) {
    return // Déjà à jour
  }
  
  console.log(`[Storage] Migration ${currentVersion} -> ${CURRENT_DATA_VERSION}`)
  
  // Migrations spécifiques selon version
  // Exemple pour futures migrations:
  // if (compareVersions(currentVersion, '1.1.0') < 0) {
  //   // Migration vers 1.1.0
  // }
  
  saveData(STORAGE_KEYS.DATA_VERSION, CURRENT_DATA_VERSION)
}

/**
 * Initialise les données par défaut si première utilisation
 */
export function initializeDefaultData() {
  // Settings par défaut
  if (!loadData(STORAGE_KEYS.USER_SETTINGS)) {
    saveData(STORAGE_KEYS.USER_SETTINGS, DEFAULT_SETTINGS)
  }
  
  // Templates personnalisés par défaut (vos séances)
  if (!loadData(STORAGE_KEYS.SESSION_TEMPLATES)) {
    saveData(STORAGE_KEYS.SESSION_TEMPLATES, personalTemplates)
  }
  
  // Historique vide
  if (!loadData(STORAGE_KEYS.WORKOUT_HISTORY)) {
    saveData(STORAGE_KEYS.WORKOUT_HISTORY, [])
  }
  
  // Version des données
  if (!loadData(STORAGE_KEYS.DATA_VERSION)) {
    saveData(STORAGE_KEYS.DATA_VERSION, CURRENT_DATA_VERSION)
  }
  
  // Migration si nécessaire
  migrateDataVersion()
}

/**
 * Retourne la liste des exercices par défaut (format simplifié pour compatibilité)
 * @returns {Array} - Liste des exercices avec nom et catégorie
 */
export function getDefaultExercises() {
  return getSimplifiedExerciseList()
}

/**
 * Retourne la bibliothèque d'exercices complète
 * @returns {Array} - Liste complète des exercices avec toutes les données
 */
export function getFullExerciseLibrary() {
  return exerciseLibrary
}

/**
 * Recherche des exercices
 * @param {string} query - Terme de recherche
 * @param {Object} options - Options de recherche
 * @returns {Array} - Exercices correspondants
 */
export function searchExercisesInLibrary(query, options = {}) {
  return searchExercises(query, options)
}

/**
 * Filtre les exercices selon plusieurs critères
 * @param {Object} filters - Critères de filtrage
 * @returns {Array} - Exercices filtrés
 */
export function filterExercisesInLibrary(filters = {}) {
  return filterExercises(filters)
}

/**
 * Retourne un exercice par son ID
 * @param {string} id - ID de l'exercice
 * @returns {Object|null} - Exercice ou null
 */
export function getExerciseByIdFromLibrary(id) {
  return getExerciseById(id)
}

/**
 * Retourne les catégories d'exercices disponibles
 * @returns {Array<string>} - Liste des catégories
 */
export function getExerciseCategories() {
  return ['Poitrine', 'Dos', 'Épaules', 'Bras', 'Jambes', 'Abdos']
}

/**
 * Retourne les groupes musculaires détaillés
 * @returns {Array<string>} - Liste des groupes musculaires
 */
export function getMuscleGroups() {
  return MUSCLE_GROUPS
}

/**
 * Retourne les groupes musculaires avec traduction FR
 * @returns {Object} - Mapping EN -> FR
 */
export function getMuscleGroupsFr() {
  return MUSCLE_GROUPS_FR
}

/**
 * Retourne les types d'équipement
 * @returns {Array<string>} - Liste des équipements
 */
export function getEquipmentTypes() {
  return EQUIPMENT_TYPES
}

/**
 * Retourne les types d'équipement avec traduction FR
 * @returns {Object} - Mapping EN -> FR
 */
export function getEquipmentTypesFr() {
  return EQUIPMENT_TYPES_FR
}

/**
 * Retourne les niveaux de difficulté
 * @returns {Array<string>} - Liste des difficultés
 */
export function getDifficultyLevels() {
  return DIFFICULTY_LEVELS
}

/**
 * Retourne les niveaux de difficulté avec traduction FR
 * @returns {Object} - Mapping EN -> FR
 */
export function getDifficultyLevelsFr() {
  return DIFFICULTY_LEVELS_FR
}

/**
 * Retourne les presets de workout
 * @returns {Object} - Presets avec exercices recommandés
 */
export function getWorkoutPresets() {
  return workoutPresets
}

/**
 * Retourne les settings par défaut
 * @returns {Object} - Settings par défaut
 */
export function getDefaultSettings() {
  return { ...DEFAULT_SETTINGS }
}

export default {
  STORAGE_KEYS,
  saveData,
  loadData,
  removeData,
  clearAllData,
  exportToJSON,
  importFromJSON,
  getStorageUsage,
  migrateDataVersion,
  initializeDefaultData,
  getDefaultExercises,
  getFullExerciseLibrary,
  searchExercisesInLibrary,
  filterExercisesInLibrary,
  getExerciseByIdFromLibrary,
  getExerciseCategories,
  getMuscleGroups,
  getMuscleGroupsFr,
  getEquipmentTypes,
  getEquipmentTypesFr,
  getDifficultyLevels,
  getDifficultyLevelsFr,
  getWorkoutPresets,
  getDefaultSettings,
}
