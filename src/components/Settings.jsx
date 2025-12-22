import React, { useState, useRef } from 'react'
import { 
  Moon, 
  Sun, 
  Bell, 
  BellOff,
  Vibrate,
  Download,
  Upload,
  Trash2,
  ChevronRight,
  Smartphone,
  Info,
  Clock,
  Scale,
  Check,
  X,
  AlertTriangle
} from 'lucide-react'
import { exportToJSON, importFromJSON, getStorageUsage, clearAllData } from '../utils/storage'

/**
 * Réglages améliorés - Tout fonctionne !
 */
export default function Settings({ workoutData, canInstall, isInstalled, onInstall }) {
  const { userSettings, updateSetting, workoutHistory, sessionTemplates } = workoutData
  
  const [showImportModal, setShowImportModal] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [importResult, setImportResult] = useState(null)
  const [showSuccess, setShowSuccess] = useState(null)
  
  const fileInputRef = useRef(null)
  const storageUsage = getStorageUsage()
  
  // Export des données
  const handleExport = () => {
    try {
      const data = exportToJSON()
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `workout-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setShowSuccess('Données exportées !')
      setTimeout(() => setShowSuccess(null), 2000)
    } catch (error) {
      console.error('Export error:', error)
    }
  }
  
  // Import des données
  const handleImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    try {
      const content = await file.text()
      const result = importFromJSON(content)
      setImportResult(result)
      setShowImportModal(true)
      
      if (result.success) {
        setTimeout(() => window.location.reload(), 1500)
      }
    } catch (error) {
      setImportResult({ success: false, error: 'Erreur de lecture du fichier' })
      setShowImportModal(true)
    }
    
    e.target.value = ''
  }
  
  // Clear all data
  const handleClearData = () => {
    clearAllData()
    window.location.reload()
  }
  
  return (
    <div className="h-full flex flex-col bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-surface border-b border-dark-border p-4 safe-area-top">
        <h1 className="text-xl font-bold">Réglages</h1>
      </header>
      
      {/* Success toast */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 animate-fade-in">
          <Check size={18} />
          {showSuccess}
        </div>
      )}
      
      {/* Contenu */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Section Unités */}
        <Section title="Préférences">
          <SettingCard>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Scale size={20} className="text-blue-500" />
                </div>
                <div>
                  <div className="font-medium">Unité de poids</div>
                  <div className="text-sm text-text-secondary">Kilogrammes ou livres</div>
                </div>
              </div>
              <div className="flex bg-dark-bg rounded-xl p-1">
                <button
                  onClick={() => updateSetting('weightUnit', 'kg')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userSettings.weightUnit === 'kg' 
                      ? 'bg-primary text-white' 
                      : 'text-text-secondary'
                  }`}
                >
                  kg
                </button>
                <button
                  onClick={() => updateSetting('weightUnit', 'lbs')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userSettings.weightUnit === 'lbs' 
                      ? 'bg-primary text-white' 
                      : 'text-text-secondary'
                  }`}
                >
                  lbs
                </button>
              </div>
            </div>
          </SettingCard>
          
          <SettingCard>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  {userSettings.theme === 'dark' ? <Moon size={20} className="text-purple-500" /> : <Sun size={20} className="text-yellow-500" />}
                </div>
                <div>
                  <div className="font-medium">Thème</div>
                  <div className="text-sm text-text-secondary">Apparence de l'app</div>
                </div>
              </div>
              <div className="flex bg-dark-bg rounded-xl p-1">
                <button
                  onClick={() => updateSetting('theme', 'dark')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userSettings.theme === 'dark' 
                      ? 'bg-primary text-white' 
                      : 'text-text-secondary'
                  }`}
                >
                  Sombre
                </button>
                <button
                  onClick={() => updateSetting('theme', 'light')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userSettings.theme === 'light' 
                      ? 'bg-primary text-white' 
                      : 'text-text-secondary'
                  }`}
                >
                  Clair
                </button>
              </div>
            </div>
          </SettingCard>
        </Section>
        
        {/* Section Timer */}
        <Section title="Entraînement">
          <SettingCard>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="font-medium">Temps de repos par défaut</div>
                  <div className="text-sm text-text-secondary">Entre chaque série</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[60, 90, 120, 180].map((time) => (
                  <button
                    key={time}
                    onClick={() => updateSetting('defaultRestTime', time)}
                    className={`py-3 rounded-xl font-medium transition-colors ${
                      userSettings.defaultRestTime === time
                        ? 'bg-primary text-white'
                        : 'bg-dark-bg text-text-secondary'
                    }`}
                  >
                    {time >= 60 ? `${time / 60}min` : `${time}s`}
                  </button>
                ))}
              </div>
            </div>
          </SettingCard>
          
          <SettingCard>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  {userSettings.soundEnabled ? <Bell size={20} className="text-green-500" /> : <BellOff size={20} className="text-text-secondary" />}
                </div>
                <div>
                  <div className="font-medium">Son</div>
                  <div className="text-sm text-text-secondary">Notification fin de repos</div>
                </div>
              </div>
              <Toggle 
                checked={userSettings.soundEnabled}
                onChange={(checked) => updateSetting('soundEnabled', checked)}
              />
            </div>
          </SettingCard>
          
          <SettingCard>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center">
                  <Vibrate size={20} className="text-pink-500" />
                </div>
                <div>
                  <div className="font-medium">Vibration</div>
                  <div className="text-sm text-text-secondary">Feedback haptique</div>
                </div>
              </div>
              <Toggle 
                checked={userSettings.vibrationEnabled}
                onChange={(checked) => updateSetting('vibrationEnabled', checked)}
              />
            </div>
          </SettingCard>
        </Section>
        
        {/* Section Données */}
        <Section title="Données">
          {/* Usage stockage */}
          <SettingCard>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-text-secondary">Espace utilisé</span>
                <span className="text-sm font-medium">{storageUsage}%</span>
              </div>
              <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${storageUsage}%` }}
                />
              </div>
              <p className="text-xs text-text-secondary mt-3">
                📊 {workoutHistory.length} séance{workoutHistory.length !== 1 ? 's' : ''} • 📋 {sessionTemplates.length} template{sessionTemplates.length !== 1 ? 's' : ''}
              </p>
            </div>
          </SettingCard>
          
          {/* Export */}
          <SettingCard>
            <button 
              onClick={handleExport}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Download size={20} className="text-blue-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Exporter les données</div>
                  <div className="text-sm text-text-secondary">Télécharger une sauvegarde</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-text-secondary" />
            </button>
          </SettingCard>
          
          {/* Import */}
          <SettingCard>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Upload size={20} className="text-green-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Importer des données</div>
                  <div className="text-sm text-text-secondary">Restaurer une sauvegarde</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-text-secondary" />
            </button>
          </SettingCard>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          
          {/* Clear data */}
          <SettingCard>
            <button 
              onClick={() => setShowClearConfirm(true)}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <Trash2 size={20} className="text-red-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-red-500">Effacer toutes les données</div>
                  <div className="text-sm text-text-secondary">Supprimer tout définitivement</div>
                </div>
              </div>
            </button>
          </SettingCard>
        </Section>
        
        {/* Section App */}
        <Section title="Application">
          {!isInstalled && canInstall && (
            <SettingCard>
              <button 
                onClick={onInstall}
                className="w-full flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Smartphone size={20} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Installer l'application</div>
                    <div className="text-sm text-text-secondary">Ajouter à l'écran d'accueil</div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-text-secondary" />
              </button>
            </SettingCard>
          )}
          
          {isInstalled && (
            <SettingCard>
              <div className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Check size={20} className="text-green-500" />
                </div>
                <div>
                  <div className="font-medium">Application installée</div>
                  <div className="text-sm text-text-secondary">Disponible sur l'écran d'accueil</div>
                </div>
              </div>
            </SettingCard>
          )}
          
          <SettingCard>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-500/20 rounded-xl flex items-center justify-center">
                  <Info size={20} className="text-gray-500" />
                </div>
                <div>
                  <div className="font-medium">Version</div>
                  <div className="text-sm text-text-secondary">Workout Tracker</div>
                </div>
              </div>
              <span className="text-text-secondary">1.0.0</span>
            </div>
          </SettingCard>
        </Section>
      </main>
      
      {/* Modal Import Result */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-dark-surface rounded-2xl p-6 w-full max-w-sm">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              importResult?.success ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {importResult?.success ? (
                <Check size={32} className="text-green-500" />
              ) : (
                <X size={32} className="text-red-500" />
              )}
            </div>
            <h3 className="text-lg font-bold text-center mb-2">
              {importResult?.success ? 'Import réussi !' : 'Erreur'}
            </h3>
            <p className="text-center text-text-secondary mb-4">
              {importResult?.success 
                ? 'Données importées. Rechargement...'
                : importResult?.error || 'Erreur lors de l\'import'
              }
            </p>
            {!importResult?.success && (
              <button
                onClick={() => setShowImportModal(false)}
                className="w-full py-3 bg-dark-bg rounded-xl font-medium"
              >
                Fermer
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Modal Clear Confirm */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-dark-surface rounded-2xl p-6 w-full max-w-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle size={32} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Tout supprimer ?</h3>
            <p className="text-center text-text-secondary mb-6">
              Cette action est irréversible. Toutes tes données seront perdues.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-3 bg-dark-bg rounded-xl font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 py-3 bg-red-500 rounded-xl font-medium"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="px-4 py-2 text-sm font-medium text-text-secondary uppercase">{title}</h2>
      <div className="space-y-2 px-4">
        {children}
      </div>
    </div>
  )
}

function SettingCard({ children }) {
  return (
    <div className="bg-dark-surface rounded-2xl overflow-hidden">
      {children}
    </div>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-14 h-8 rounded-full transition-colors relative ${
        checked ? 'bg-primary' : 'bg-dark-bg'
      }`}
    >
      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
        checked ? 'translate-x-7' : 'translate-x-1'
      }`} />
    </button>
  )
}
