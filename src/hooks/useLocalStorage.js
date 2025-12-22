import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Hook pour synchronisation bidirectionnelle avec localStorage
 * Inclut debounce pour éviter les writes excessifs
 * 
 * @param {string} key - Clé localStorage
 * @param {any} defaultValue - Valeur par défaut
 * @param {number} debounceMs - Délai de debounce (ms)
 * @returns {[any, function, boolean]} - [value, setValue, isLoading]
 */
export function useLocalStorage(key, defaultValue, debounceMs = 300) {
  // État principal
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`[useLocalStorage] Erreur lecture ${key}:`, error)
      return defaultValue
    }
  })
  
  const [isLoading, setIsLoading] = useState(false)
  
  // Ref pour le timeout de debounce
  const debounceTimeout = useRef(null)
  
  // Sauvegarde avec debounce
  const saveToStorage = useCallback((value) => {
    // Clear timeout existant
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    
    // Nouveau timeout
    debounceTimeout.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(`[useLocalStorage] Erreur sauvegarde ${key}:`, error)
        
        // Gestion quota dépassé
        if (error.name === 'QuotaExceededError') {
          window.dispatchEvent(new CustomEvent('storageQuotaExceeded'))
        }
      }
    }, debounceMs)
  }, [key, debounceMs])
  
  // Setter qui update state ET localStorage
  const setValue = useCallback((value) => {
    setStoredValue((prev) => {
      const newValue = typeof value === 'function' ? value(prev) : value
      saveToStorage(newValue)
      return newValue
    })
  }, [saveToStorage])
  
  // Écoute les changements localStorage depuis d'autres onglets
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`[useLocalStorage] Erreur sync ${key}:`, error)
        }
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [key])
  
  return [storedValue, setValue, isLoading]
}

/**
 * Hook pour synchronisation immédiate (sans debounce)
 * Utile pour les données critiques
 * 
 * @param {string} key - Clé localStorage
 * @param {any} defaultValue - Valeur par défaut
 * @returns {[any, function]}
 */
export function useLocalStorageImmediate(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      return defaultValue
    }
  })
  
  const setValue = useCallback((value) => {
    setStoredValue((prev) => {
      const newValue = typeof value === 'function' ? value(prev) : value
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.error(`[useLocalStorage] Erreur:`, error)
      }
      return newValue
    })
  }, [key])
  
  return [storedValue, setValue]
}

export default useLocalStorage
