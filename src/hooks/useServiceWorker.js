import { useState, useEffect, useCallback } from 'react'

/**
 * Hook pour gérer le Service Worker et les fonctionnalités PWA
 * - Enregistrement et mise à jour du SW
 * - Détection des updates
 * - Gestion du prompt d'installation
 */
export function useServiceWorker() {
  const [registration, setRegistration] = useState(null)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  
  // Détection si l'app est installée
  useEffect(() => {
    // Vérifie si lancé en mode standalone (PWA installée)
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    
    setIsInstalled(isStandalone)
    
    // Écoute les changements de display mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleChange = (e) => setIsInstalled(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  // Écoute le prompt d'installation
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      // Empêche le prompt automatique
      e.preventDefault()
      // Stocke l'event pour usage ultérieur
      setInstallPrompt(e)
    }
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    
    // Écoute si l'app vient d'être installée
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setInstallPrompt(null)
    })
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [])
  
  // Écoute les mises à jour du Service Worker
  useEffect(() => {
    const handleSwUpdate = (e) => {
      setRegistration(e.detail)
      setUpdateAvailable(true)
    }
    
    window.addEventListener('swUpdate', handleSwUpdate)
    
    return () => window.removeEventListener('swUpdate', handleSwUpdate)
  }, [])
  
  // Écoute le statut online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  
  /**
   * Déclenche l'installation de la PWA
   */
  const promptInstall = useCallback(async () => {
    if (!installPrompt) {
      console.log('[SW] Pas de prompt d\'installation disponible')
      return false
    }
    
    // Affiche le prompt
    installPrompt.prompt()
    
    // Attend la réponse de l'utilisateur
    const { outcome } = await installPrompt.userChoice
    
    console.log(`[SW] Installation: ${outcome}`)
    
    // Clear le prompt (ne peut être utilisé qu'une fois)
    setInstallPrompt(null)
    
    return outcome === 'accepted'
  }, [installPrompt])
  
  /**
   * Force le rechargement pour appliquer la mise à jour
   */
  const applyUpdate = useCallback(() => {
    if (registration?.waiting) {
      // Indique au SW d'activer la nouvelle version
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
    
    // Recharge la page pour utiliser le nouveau SW
    window.location.reload()
  }, [registration])
  
  /**
   * Ignore la mise à jour
   */
  const dismissUpdate = useCallback(() => {
    setUpdateAvailable(false)
  }, [])
  
  /**
   * Récupère la version du SW
   */
  const getVersion = useCallback(async () => {
    if (!navigator.serviceWorker?.controller) {
      return null
    }
    
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel()
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data?.version || null)
      }
      
      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_VERSION' },
        [messageChannel.port2]
      )
      
      // Timeout si pas de réponse
      setTimeout(() => resolve(null), 1000)
    })
  }, [])
  
  /**
   * Vérifie si le SW est actif
   */
  const isServiceWorkerActive = useCallback(() => {
    return !!navigator.serviceWorker?.controller
  }, [])
  
  return {
    // États
    isInstalled,
    canInstall: !!installPrompt,
    updateAvailable,
    isOnline,
    
    // Actions
    promptInstall,
    applyUpdate,
    dismissUpdate,
    getVersion,
    isServiceWorkerActive,
  }
}

export default useServiceWorker
