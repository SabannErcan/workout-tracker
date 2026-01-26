import React, { useState, useCallback } from 'react'
import { 
  Dumbbell, 
  Plus, 
  Check, 
  Edit3, 
  Trash2, 
  MapPin,
  X 
} from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

/**
 * Composant pour gérer les salles de sport
 * Permet de créer, modifier, supprimer et choisir une salle active
 */
export default function GymSelector({ gyms, currentGym, onSelectGym, onUpdateGyms }) {
  const [showAddGym, setShowAddGym] = useState(false)
  const [editingGym, setEditingGym] = useState(null)
  
  const handleAddGym = useCallback((gymData) => {
    const newGym = {
      id: uuidv4(),
      ...gymData,
      createdAt: new Date().toISOString()
    }
    onUpdateGyms([...gyms, newGym])
    setShowAddGym(false)
  }, [gyms, onUpdateGyms])
  
  const handleUpdateGym = useCallback((gymId, updates) => {
    onUpdateGyms(gyms.map(g => g.id === gymId ? { ...g, ...updates } : g))
    setEditingGym(null)
  }, [gyms, onUpdateGyms])
  
  const handleDeleteGym = useCallback((gymId) => {
    onUpdateGyms(gyms.filter(g => g.id !== gymId))
    if (currentGym === gymId) {
      onSelectGym(null)
    }
  }, [gyms, currentGym, onUpdateGyms, onSelectGym])
  
  return (
    <div className="space-y-4">
      {/* Sélecteur rapide */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {/* Option "Aucune salle" */}
        <button
          onClick={() => onSelectGym(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-colors ${
            !currentGym 
              ? 'bg-primary text-white' 
              : 'bg-dark-elevated text-text-secondary hover:bg-dark-border'
          }`}
        >
          <MapPin size={16} className="inline mr-2" />
          Aucune salle
        </button>
        
        {gyms.map(gym => (
          <button
            key={gym.id}
            onClick={() => onSelectGym(gym.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-colors ${
              currentGym === gym.id 
                ? 'bg-primary text-white' 
                : 'bg-dark-elevated text-text-secondary hover:bg-dark-border'
            }`}
          >
            <Dumbbell size={16} className="inline mr-2" />
            {gym.name}
          </button>
        ))}
        
        {/* Bouton ajouter */}
        <button
          onClick={() => setShowAddGym(true)}
          className="flex-shrink-0 px-4 py-2 rounded-xl bg-dark-elevated text-primary hover:bg-dark-border transition-colors"
        >
          <Plus size={16} className="inline mr-2" />
          Ajouter
        </button>
      </div>
      
      {/* Liste complète des salles (avec gestion) */}
      {gyms.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-text-secondary">Mes salles</h3>
          <div className="space-y-2">
            {gyms.map(gym => (
              <GymCard
                key={gym.id}
                gym={gym}
                isActive={currentGym === gym.id}
                onSelect={() => onSelectGym(gym.id)}
                onEdit={() => setEditingGym(gym)}
                onDelete={() => handleDeleteGym(gym.id)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Modal ajouter salle */}
      {showAddGym && (
        <GymFormModal
          onSubmit={handleAddGym}
          onClose={() => setShowAddGym(false)}
        />
      )}
      
      {/* Modal éditer salle */}
      {editingGym && (
        <GymFormModal
          gym={editingGym}
          onSubmit={(data) => handleUpdateGym(editingGym.id, data)}
          onClose={() => setEditingGym(null)}
        />
      )}
    </div>
  )
}

// Carte de salle
function GymCard({ gym, isActive, onSelect, onEdit, onDelete }) {
  const [showActions, setShowActions] = useState(false)
  
  return (
    <div 
      className={`p-3 rounded-ios bg-dark-elevated border-2 transition-all ${
        isActive ? 'border-primary' : 'border-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onSelect}
          className="flex-1 flex items-center gap-3 text-left"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isActive ? 'bg-primary text-white' : 'bg-dark-surface'
          }`}>
            <Dumbbell size={20} />
          </div>
          <div className="flex-1">
            <p className="font-medium">{gym.name}</p>
            {gym.address && (
              <p className="text-xs text-text-secondary">{gym.address}</p>
            )}
          </div>
          {isActive && <Check size={20} className="text-primary" />}
        </button>
        
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={onEdit}
            className="p-2 text-text-secondary hover:text-white"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-text-secondary hover:text-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {gym.notes && (
        <p className="mt-2 text-sm text-text-secondary">{gym.notes}</p>
      )}
    </div>
  )
}

// Modal formulaire salle
function GymFormModal({ gym, onSubmit, onClose }) {
  const [name, setName] = useState(gym?.name || '')
  const [address, setAddress] = useState(gym?.address || '')
  const [notes, setNotes] = useState(gym?.notes || '')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    
    onSubmit({
      name: name.trim(),
      address: address.trim(),
      notes: notes.trim()
    })
  }
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-surface rounded-t-2xl safe-area-bottom animate-slide-up">
        <div className="w-12 h-1 bg-dark-border rounded-full mx-auto mt-3" />
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {gym ? 'Modifier la salle' : 'Nouvelle salle'}
            </h3>
            <button type="button" onClick={onClose}>
              <X size={24} className="text-text-secondary" />
            </button>
          </div>
          
          {/* Nom */}
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Nom de la salle *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Basic Fit, Keep Cool, etc."
              required
              autoFocus
              className="w-full px-4 py-3 bg-dark-elevated rounded-ios text-white placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Adresse */}
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Adresse (optionnel)
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 rue de la musculation"
              className="w-full px-4 py-3 bg-dark-elevated rounded-ios text-white placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Notes */}
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Notes (optionnel)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Équipements spécifiques, horaires, etc."
              rows={3}
              className="w-full px-4 py-3 bg-dark-elevated rounded-ios text-white placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          
          {/* Boutons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-dark-elevated text-text-secondary rounded-ios font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-3 bg-primary text-white rounded-ios font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {gym ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
