import React from 'react'
import { TrendingUp, TrendingDown, Minus, Award } from 'lucide-react'
import { calculateOneRepMax, detectPR } from '../utils/calculations'

/**
 * Composant pour afficher le log d'un exercice avec comparaison à la dernière fois
 * Utilisé dans WorkoutSession pour afficher les séries d'un exercice
 */
function ExerciseLog({ 
  exercise, 
  sets, 
  lastPerformance, 
  onDeleteSet,
  userSettings,
  workoutHistory 
}) {
  return (
    <div className="space-y-2">
      {/* Header avec colonnes */}
      <div className="flex items-center text-xs text-text-secondary px-2 py-1">
        <span className="w-10 text-center">Série</span>
        <span className="flex-1 text-center">Précédent</span>
        <span className="flex-1 text-center">Actuel</span>
        <span className="w-16 text-center">Volume</span>
      </div>
      
      {/* Lignes de séries */}
      {sets.map((set, index) => {
        const previousSet = lastPerformance?.sets?.[index]
        const pr = detectPR(exercise, set, workoutHistory)
        
        return (
          <SetLogRow
            key={index}
            setNumber={index + 1}
            currentSet={set}
            previousSet={previousSet}
            isPR={pr.isPR}
            prType={pr.type}
            improvement={pr.improvement}
            onDelete={() => onDeleteSet(index)}
            userSettings={userSettings}
          />
        )
      })}
      
      {/* Séries précédentes non encore faites */}
      {lastPerformance?.sets?.slice(sets.length).map((prevSet, index) => (
        <div 
          key={`prev-${index}`}
          className="flex items-center px-2 py-2 bg-dark-elevated/50 rounded-ios opacity-50"
        >
          <span className="w-10 text-center text-sm text-text-tertiary">
            {sets.length + index + 1}
          </span>
          <span className="flex-1 text-center text-sm text-text-tertiary">
            {prevSet.reps}×{prevSet.weight}{userSettings.weightUnit}
          </span>
          <span className="flex-1 text-center text-sm text-text-tertiary">—</span>
          <span className="w-16 text-center text-sm text-text-tertiary">—</span>
        </div>
      ))}
    </div>
  )
}

/**
 * Ligne individuelle d'une série avec comparaison
 */
function SetLogRow({ 
  setNumber, 
  currentSet, 
  previousSet, 
  isPR, 
  prType,
  improvement,
  onDelete, 
  userSettings 
}) {
  const volume = (currentSet.weight || 0) * (currentSet.reps || 0)
  
  // Comparaison avec la série précédente
  const comparison = getSetComparison(currentSet, previousSet)
  
  return (
    <div 
      className={`flex items-center px-2 py-3 rounded-ios ${
        isPR ? 'bg-success/10 border border-success/30' : 'bg-dark-elevated'
      }`}
    >
      {/* Numéro de série */}
      <span className="w-10 text-center text-sm font-medium text-text-secondary">
        {setNumber}
      </span>
      
      {/* Précédent */}
      <div className="flex-1 text-center">
        {previousSet ? (
          <span className="text-sm text-text-tertiary">
            {previousSet.reps}×{previousSet.weight}
          </span>
        ) : (
          <span className="text-sm text-text-tertiary">—</span>
        )}
      </div>
      
      {/* Actuel */}
      <div className="flex-1 text-center flex items-center justify-center gap-1">
        <span className="text-sm font-semibold">
          {currentSet.reps}×{currentSet.weight}
        </span>
        
        {/* Indicateur de progression */}
        {comparison.type === 'up' && (
          <TrendingUp size={14} className="text-success" />
        )}
        {comparison.type === 'down' && (
          <TrendingDown size={14} className="text-warning" />
        )}
        
        {/* Badge PR */}
        {isPR && (
          <span className="badge badge-success text-[10px] ml-1">
            <Award size={10} className="mr-0.5" />
            PR
          </span>
        )}
      </div>
      
      {/* Volume */}
      <span className="w-16 text-center text-sm text-text-secondary">
        {volume}{userSettings.weightUnit}
      </span>
    </div>
  )
}

/**
 * Compare une série actuelle avec une série précédente
 */
function getSetComparison(currentSet, previousSet) {
  if (!previousSet) {
    return { type: 'neutral', diff: 0 }
  }
  
  const currentVolume = (currentSet.weight || 0) * (currentSet.reps || 0)
  const previousVolume = (previousSet.weight || 0) * (previousSet.reps || 0)
  
  if (currentVolume > previousVolume) {
    return { type: 'up', diff: currentVolume - previousVolume }
  }
  
  if (currentVolume < previousVolume) {
    return { type: 'down', diff: previousVolume - currentVolume }
  }
  
  return { type: 'neutral', diff: 0 }
}

/**
 * Résumé de progression pour un exercice complet
 */
export function ExerciseProgressSummary({ exercise, currentSets, lastPerformance, userSettings }) {
  const currentVolume = currentSets.reduce(
    (sum, set) => sum + (set.weight || 0) * (set.reps || 0), 
    0
  )
  
  const previousVolume = lastPerformance?.sets?.reduce(
    (sum, set) => sum + (set.weight || 0) * (set.reps || 0),
    0
  ) || 0
  
  const diff = currentVolume - previousVolume
  const percentChange = previousVolume > 0 
    ? Math.round((diff / previousVolume) * 100) 
    : 0
  
  if (currentSets.length === 0) return null
  
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-dark-elevated/50 rounded-ios mt-2">
      <span className="text-sm text-text-secondary">Volume total</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold">{currentVolume}{userSettings.weightUnit}</span>
        
        {previousVolume > 0 && (
          <span className={`text-xs flex items-center gap-0.5 ${
            diff > 0 ? 'text-success' : diff < 0 ? 'text-warning' : 'text-text-tertiary'
          }`}>
            {diff > 0 ? '+' : ''}{diff}{userSettings.weightUnit}
            {diff > 0 ? <TrendingUp size={12} /> : diff < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
          </span>
        )}
      </div>
    </div>
  )
}

export default ExerciseLog
