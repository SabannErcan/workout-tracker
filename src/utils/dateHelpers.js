/**
 * Utilitaires de manipulation des dates
 */

/**
 * Formate une date pour affichage workout
 * @param {string|Date} date - Date à formater
 * @returns {string} - Date formatée (ex: "Lun. 15 Jan")
 */
export function formatWorkoutDate(date) {
  const d = new Date(date)
  const options = { weekday: 'short', day: 'numeric', month: 'short' }
  return d.toLocaleDateString('fr-FR', options)
}

/**
 * Formate une date en format complet
 * @param {string|Date} date - Date à formater
 * @returns {string} - Date formatée (ex: "Lundi 15 Janvier 2024")
 */
export function formatFullDate(date) {
  const d = new Date(date)
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  return d.toLocaleDateString('fr-FR', options)
}

/**
 * Formate une heure
 * @param {string|Date} date - Date/heure à formater
 * @returns {string} - Heure formatée (ex: "14:30")
 */
export function formatTime(date) {
  const d = new Date(date)
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

/**
 * Retourne le numéro de semaine
 * @param {string|Date} date - Date
 * @returns {number} - Numéro de semaine (1-52)
 */
export function getWeekNumber(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

/**
 * Retourne le nom du mois
 * @param {string|Date} date - Date
 * @returns {string} - Nom du mois (ex: "Janvier")
 */
export function getMonthName(date) {
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', { month: 'long' })
}

/**
 * Retourne le nom court du mois
 * @param {string|Date} date - Date
 * @returns {string} - Nom court (ex: "Jan")
 */
export function getShortMonthName(date) {
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', { month: 'short' })
}

/**
 * Vérifie si une date est aujourd'hui
 * @param {string|Date} date - Date à vérifier
 * @returns {boolean}
 */
export function isToday(date) {
  const d = new Date(date)
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

/**
 * Vérifie si une date est hier
 * @param {string|Date} date - Date à vérifier
 * @returns {boolean}
 */
export function isYesterday(date) {
  const d = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return d.toDateString() === yesterday.toDateString()
}

/**
 * Vérifie si une date est dans cette semaine
 * @param {string|Date} date - Date à vérifier
 * @returns {boolean}
 */
export function isThisWeek(date) {
  const d = new Date(date)
  const today = new Date()
  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - today.getDay())
  weekStart.setHours(0, 0, 0, 0)
  
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 7)
  
  return d >= weekStart && d < weekEnd
}

/**
 * Calcule le nombre de jours depuis une date
 * @param {string|Date} date - Date
 * @returns {number} - Nombre de jours
 */
export function getDaysAgo(date) {
  const d = new Date(date)
  const today = new Date()
  const diffTime = today.getTime() - d.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Retourne un texte relatif pour une date
 * @param {string|Date} date - Date
 * @returns {string} - Texte relatif (ex: "Aujourd'hui", "Il y a 3 jours")
 */
export function getRelativeDate(date) {
  if (isToday(date)) return "Aujourd'hui"
  if (isYesterday(date)) return 'Hier'
  
  const daysAgo = getDaysAgo(date)
  
  if (daysAgo < 7) return `Il y a ${daysAgo} jour${daysAgo > 1 ? 's' : ''}`
  if (daysAgo < 14) return 'La semaine dernière'
  if (daysAgo < 30) return `Il y a ${Math.floor(daysAgo / 7)} semaines`
  if (daysAgo < 60) return 'Le mois dernier'
  
  return formatWorkoutDate(date)
}

/**
 * Groupe les workouts par semaine
 * @param {Array} history - Historique des workouts
 * @returns {Object} - Workouts groupés par semaine { "2024-W01": [...] }
 */
export function groupWorkoutsByWeek(history) {
  const grouped = {}
  
  history.forEach((workout) => {
    const date = new Date(workout.date)
    const year = date.getFullYear()
    const week = getWeekNumber(date)
    const key = `${year}-W${week.toString().padStart(2, '0')}`
    
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(workout)
  })
  
  return grouped
}

/**
 * Groupe les workouts par mois
 * @param {Array} history - Historique des workouts
 * @returns {Object} - Workouts groupés par mois { "2024-01": [...] }
 */
export function groupWorkoutsByMonth(history) {
  const grouped = {}
  
  history.forEach((workout) => {
    const date = new Date(workout.date)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const key = `${year}-${month}`
    
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(workout)
  })
  
  return grouped
}

/**
 * Calcule les jours de repos consécutifs actuels
 * @param {Array} history - Historique des workouts (trié par date décroissante)
 * @returns {number} - Nombre de jours de repos
 */
export function calculateRestDays(history) {
  if (!history || history.length === 0) return 0
  
  const lastWorkout = new Date(history[0].date)
  const today = new Date()
  
  const diffTime = today.getTime() - lastWorkout.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Retourne les jours d'un mois avec leur état workout
 * @param {number} year - Année
 * @param {number} month - Mois (0-11)
 * @param {Array} history - Historique des workouts
 * @returns {Array} - Tableau des jours avec infos workout
 */
export function getMonthDays(year, month, history) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []
  
  // Jours vides avant le premier du mois (pour alignement)
  const startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  for (let i = 0; i < startPadding; i++) {
    days.push({ day: null, workout: null })
  }
  
  // Jours du mois
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day)
    const dateString = date.toISOString().split('T')[0]
    
    const workout = history.find((w) => {
      const wDate = new Date(w.date).toISOString().split('T')[0]
      return wDate === dateString
    })
    
    days.push({
      day,
      date: dateString,
      workout: workout || null,
      isToday: isToday(date),
    })
  }
  
  return days
}

/**
 * Formate une durée en secondes en format lisible
 * @param {number} seconds - Durée en secondes
 * @returns {string} - Durée formatée (ex: "1h 23min")
 */
export function formatDuration(seconds) {
  if (!seconds || seconds < 0) return '0min'
  
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (hours === 0) {
    return `${minutes}min`
  }
  
  if (minutes === 0) {
    return `${hours}h`
  }
  
  return `${hours}h ${minutes}min`
}

/**
 * Formate un timer (secondes restantes)
 * @param {number} seconds - Secondes
 * @returns {string} - Format "MM:SS"
 */
export function formatTimer(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Retourne la date de début de semaine (lundi)
 * @param {Date} date - Date de référence
 * @returns {Date} - Lundi de la semaine
 */
export function getWeekStart(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Génère un tableau des 7 derniers jours
 * @returns {Array} - Tableau avec les 7 derniers jours
 */
export function getLast7Days() {
  const days = []
  const today = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    days.push({
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
      dayNumber: date.getDate(),
    })
  }
  
  return days
}

/**
 * Génère un identifiant ISO pour une date (YYYY-MM-DD)
 * @param {Date} date - Date
 * @returns {string} - ID de date
 */
export function getDateId(date = new Date()) {
  return date.toISOString().split('T')[0]
}

export default {
  formatWorkoutDate,
  formatFullDate,
  formatTime,
  getWeekNumber,
  getMonthName,
  getShortMonthName,
  isToday,
  isYesterday,
  isThisWeek,
  getDaysAgo,
  getRelativeDate,
  groupWorkoutsByWeek,
  groupWorkoutsByMonth,
  calculateRestDays,
  getMonthDays,
  formatDuration,
  formatTimer,
  getWeekStart,
  getLast7Days,
  getDateId,
}
