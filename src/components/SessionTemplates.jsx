import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { 
  Plus, 
  X, 
  Trash2, 
  Edit3, 
  Copy, 
  Play,
  ChevronRight,
  GripVertical,
  Search,
  Dumbbell,
  Check
} from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

function SessionTemplates({ workoutData, onSelectTemplate, onStartEmpty }) {
  const { 
    sessionTemplates, 
    addTemplate, 
    updateTemplate, 
    deleteTemplate,
    duplicateTemplate,
    addExerciseToTemplate,
    removeExerciseFromTemplate,
    defaultExercises 
  } = workoutData
  
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTemplateId, setEditingTemplateId] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  
  // Template en cours d'édition (toujours à jour)
  const editingTemplate = useMemo(() => {
    if (!editingTemplateId) return null
    return sessionTemplates.find(t => t.id === editingTemplateId)
  }, [editingTemplateId, sessionTemplates])
  
  // Créer un nouveau template
  const handleCreateTemplate = useCallback((templateData) => {
    const newTemplate = addTemplate(templateData)
    setShowCreateModal(false)
    
    // Ouvrir en mode édition pour ajouter des exercices
    if (newTemplate) {
      setEditingTemplateId(newTemplate.id)
    }
  }, [addTemplate])
  
  // Supprimer un template
  const handleDeleteTemplate = useCallback((templateId) => {
    deleteTemplate(templateId)
    setShowDeleteConfirm(null)
  }, [deleteTemplate])
  
  // Dupliquer un template
  const handleDuplicateTemplate = useCallback((templateId) => {
    duplicateTemplate(templateId)
  }, [duplicateTemplate])
  
  return (
    <div className="h-full flex flex-col bg-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-dark-bg border-b border-dark-border safe-area-top">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold">Mes Séances</h1>
          <p className="text-sm text-text-secondary mt-1">
            {sessionTemplates.length} template{sessionTemplates.length !== 1 ? 's' : ''}
          </p>
        </div>
      </header>
      
      {/* Contenu */}
      <main className="flex-1 overflow-y-auto p-4">
        {/* Séance libre */}
        <button
          onClick={onStartEmpty}
          className="w-full mb-4 p-4 bg-dark-surface border-2 border-dashed border-primary/50 rounded-ios-lg flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-primary/20 rounded-ios flex items-center justify-center">
            <Play size={24} className="text-primary" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-primary">Séance libre</h3>
            <p className="text-sm text-text-secondary">Commencer sans template</p>
          </div>
          <ChevronRight className="text-primary" size={20} />
        </button>
        
        {/* Liste des templates */}
        {sessionTemplates.length > 0 ? (
          <div className="space-y-3">
            {sessionTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onStart={() => onSelectTemplate(template.id)}
                onEdit={() => setEditingTemplateId(template.id)}
                onDuplicate={() => handleDuplicateTemplate(template.id)}
                onDelete={() => setShowDeleteConfirm(template.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState onCreateFirst={() => setShowCreateModal(true)} />
        )}
      </main>
      
      {/* FAB Créer template */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-24 right-4 z-20 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
      >
        <Plus size={28} />
      </button>
      
      {/* Modal Création */}
      {showCreateModal && (
        <CreateTemplateModal
          onSubmit={handleCreateTemplate}
          onClose={() => setShowCreateModal(false)}
        />
      )}
      
      {/* Modal Édition */}
      {editingTemplate && (
        <EditTemplateModal
          template={editingTemplate}
          exercises={defaultExercises}
          onUpdate={(updates) => {
            updateTemplate(editingTemplate.id, updates)
          }}
          onAddExercise={(exercise) => addExerciseToTemplate(editingTemplate.id, exercise)}
          onRemoveExercise={(exerciseId) => removeExerciseFromTemplate(editingTemplate.id, exerciseId)}
          onClose={() => setEditingTemplateId(null)}
          onStartWorkout={() => {
            const id = editingTemplate.id
            setEditingTemplateId(null)
            onSelectTemplate(id)
          }}
        />
      )}
      
      {/* Modal Confirmation suppression */}
      {showDeleteConfirm && (
        <ConfirmDeleteModal
          templateName={sessionTemplates.find(t => t.id === showDeleteConfirm)?.name}
          onConfirm={() => handleDeleteTemplate(showDeleteConfirm)}
          onCancel={() => setShowDeleteConfirm(null)}
        />
      )}
    </div>
  )
}

// Carte de template
function TemplateCard({ template, onStart, onEdit, onDuplicate, onDelete }) {
  return (
    <div className="bg-dark-surface rounded-xl overflow-hidden">
      <button
        onClick={onStart}
        className="w-full p-4 flex items-center gap-4 text-left active:bg-dark-elevated transition-colors"
      >
        <div className="w-12 h-12 bg-dark-elevated rounded-ios flex items-center justify-center">
          <Dumbbell size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{template.name}</h3>
          <p className="text-sm text-text-secondary">
            {template.exercises.length} exercice{template.exercises.length !== 1 ? 's' : ''}
          </p>
        </div>
        <ChevronRight size={20} className="text-text-tertiary" />
      </button>
      
      {/* Actions */}
      <div className="flex items-center border-t border-dark-border">
        <button
          onClick={onEdit}
          className="flex-1 py-3 flex items-center justify-center gap-2 text-text-secondary hover:text-white border-r border-dark-border"
        >
          <Edit3 size={16} />
          <span className="text-sm">Modifier</span>
        </button>
        <button
          onClick={onDuplicate}
          className="flex-1 py-3 flex items-center justify-center gap-2 text-text-secondary hover:text-white border-r border-dark-border"
        >
          <Copy size={16} />
          <span className="text-sm">Dupliquer</span>
        </button>
        <button
          onClick={onDelete}
          className="flex-1 py-3 flex items-center justify-center gap-2 text-danger"
        >
          <Trash2 size={16} />
          <span className="text-sm">Suppr.</span>
        </button>
      </div>
    </div>
  )
}

// État vide
function EmptyState({ onCreateFirst }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-20 h-20 bg-dark-surface rounded-full flex items-center justify-center mb-4">
        <Dumbbell size={40} className="text-text-tertiary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Aucun template</h3>
      <p className="text-text-secondary text-sm mb-6 max-w-xs">
        Crée ton premier template de séance pour commencer à tracker tes entraînements
      </p>
      <button
        onClick={onCreateFirst}
        className="px-6 py-3 bg-primary rounded-ios font-semibold"
      >
        Créer mon premier template
      </button>
    </div>
  )
}

// Modal création template
function CreateTemplateModal({ onSubmit, onClose }) {
  const [name, setName] = useState('')
  const [restTime, setRestTime] = useState('120')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    
    onSubmit({
      name: name.trim(),
      exercises: [],
      defaultRestTime: parseInt(restTime, 10) || 120,
    })
  }
  
  const presetNames = ['Push', 'Pull', 'Legs', 'Upper', 'Lower', 'Full Body']
  
  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-surface rounded-t-2xl safe-area-bottom animate-slide-up">
        <div className="w-12 h-1 bg-dark-border rounded-full mx-auto mt-3" />
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Nouveau template</h3>
            <button type="button" onClick={onClose} className="p-2 text-text-secondary">
              <X size={20} />
            </button>
          </div>
          
          {/* Presets rapides */}
          <div className="flex flex-wrap gap-2">
            {presetNames.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setName(preset)}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  name === preset 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-elevated text-text-secondary'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
          
          {/* Nom */}
          <div>
            <label className="block text-sm text-text-secondary mb-2">Nom de la séance</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Push, Leg Day, Full Body..."
              className="w-full px-4 py-3 bg-dark-elevated rounded-ios text-white placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>
          
          {/* Temps de repos */}
          <div>
            <label className="block text-sm text-text-secondary mb-2">Temps de repos par défaut</label>
            <div className="flex gap-2">
              {['60', '90', '120', '180'].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setRestTime(time)}
                  className={`flex-1 py-2 rounded-ios text-sm font-medium ${
                    restTime === time 
                      ? 'bg-primary text-white' 
                      : 'bg-dark-elevated text-text-secondary'
                  }`}
                >
                  {parseInt(time) / 60}min
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-4 bg-primary text-white font-semibold rounded-ios disabled:opacity-50"
          >
            Créer et ajouter des exercices
          </button>
        </form>
      </div>
    </>
  )
}

// Modal édition template
function EditTemplateModal({ template, exercises, onUpdate, onAddExercise, onRemoveExercise, onClose, onStartWorkout }) {
  const [showAddExercise, setShowAddExercise] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  
  const categories = useMemo(() => {
    return ['Tous', ...new Set(exercises.map(e => e.category))]
  }, [exercises])
  
  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      const matchSearch = !searchQuery || ex.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCategory = selectedCategory === 'Tous' || ex.category === selectedCategory
      return matchSearch && matchCategory
    })
  }, [exercises, searchQuery, selectedCategory])
  
  // Grouper par catégorie
  const groupedExercises = useMemo(() => {
    if (selectedCategory !== 'Tous') {
      return { [selectedCategory]: filteredExercises }
    }
    return filteredExercises.reduce((acc, ex) => {
      if (!acc[ex.category]) acc[ex.category] = []
      acc[ex.category].push(ex)
      return acc
    }, {})
  }, [filteredExercises, selectedCategory])
  
  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      
      <div className="fixed inset-0 z-50 bg-dark-bg flex flex-col safe-area-top safe-area-bottom">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-dark-border">
          <button onClick={onClose} className="p-2 -ml-2 text-text-secondary">
            <X size={24} />
          </button>
          
          <h2 className="text-lg font-semibold">{template.name}</h2>
          
          <button 
            onClick={onStartWorkout}
            disabled={template.exercises.length === 0}
            className="px-4 py-2 bg-primary rounded-xl font-medium text-sm disabled:opacity-50 flex items-center gap-1"
          >
            <Play size={16} fill="white" />
            Go
          </button>
        </header>
        
        {/* Liste des exercices */}
        <main className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-semibold text-text-secondary mb-3">
            Exercices ({template.exercises.length})
          </h3>
          
          {template.exercises.length > 0 ? (
            <div className="space-y-2 mb-4">
              {template.exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="flex items-center gap-3 p-3 bg-dark-surface rounded-xl"
                >
                  <span className="w-7 h-7 bg-primary/20 text-primary rounded-lg flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-xs text-text-secondary">{exercise.category}</p>
                  </div>
                  <button
                    onClick={() => onRemoveExercise(exercise.id)}
                    className="p-2 text-danger active:scale-90 transition-transform"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-secondary">
              <p>Aucun exercice ajouté</p>
              <p className="text-sm mt-1">Appuie sur le bouton ci-dessous</p>
            </div>
          )}
          
          {/* Bouton ajouter exercice */}
          <button
            onClick={() => setShowAddExercise(true)}
            className="w-full py-4 border-2 border-dashed border-primary/50 rounded-xl flex items-center justify-center gap-2 text-primary font-medium active:bg-primary/10 transition-colors"
          >
            <Plus size={20} />
            Ajouter un exercice
          </button>
        </main>
        
        {/* Panel ajout exercice */}
        {showAddExercise && (
          <div className="fixed inset-0 z-60 bg-dark-bg flex flex-col">
            <header className="px-4 py-3 border-b border-dark-border">
              <div className="flex items-center gap-3 mb-3">
                <button onClick={() => setShowAddExercise(false)} className="p-2 -ml-2 text-text-secondary">
                  <X size={24} />
                </button>
                <h3 className="text-lg font-semibold">Ajouter exercice</h3>
              </div>
              
              {/* Recherche */}
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un exercice..."
                  className="w-full pl-10 pr-4 py-3 bg-dark-surface rounded-xl text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
              </div>
              
              {/* Filtres par catégorie */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-primary text-white' 
                        : 'bg-dark-surface text-text-secondary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </header>
            
            <main className="flex-1 overflow-y-auto p-4 pb-20">
              {Object.entries(groupedExercises).map(([category, categoryExercises]) => (
                <div key={category} className="mb-6">
                  <h4 className="text-sm font-semibold text-text-secondary mb-2 sticky top-0 bg-dark-bg py-1">
                    {category} ({categoryExercises.length})
                  </h4>
                  <div className="space-y-1">
                    {categoryExercises.map((exercise) => {
                      const isAlreadyAdded = template.exercises.some(e => e.name === exercise.name)
                      
                      return (
                        <button
                          key={exercise.id || exercise.name}
                          onClick={() => {
                            if (!isAlreadyAdded) {
                              onAddExercise(exercise)
                            }
                          }}
                          disabled={isAlreadyAdded}
                          className={`w-full p-3 rounded-xl text-left flex items-center justify-between transition-colors ${
                            isAlreadyAdded 
                              ? 'bg-dark-elevated text-text-tertiary' 
                              : 'bg-dark-surface active:bg-dark-elevated'
                          }`}
                        >
                          <span className="font-medium">{exercise.name}</span>
                          {isAlreadyAdded && (
                            <Check size={18} className="text-success" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
              
              {filteredExercises.length === 0 && (
                <div className="text-center py-12 text-text-secondary">
                  <p>Aucun exercice trouvé</p>
                  <p className="text-sm mt-1">Essaie un autre terme de recherche</p>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </>
  )
}

// Modal confirmation suppression
function ConfirmDeleteModal({ templateName, onConfirm, onCancel }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onCancel} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm bg-dark-surface rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-2">Supprimer "{templateName}" ?</h3>
        <p className="text-text-secondary mb-6">
          Cette action est irréversible. La séance sera définitivement supprimée.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-dark-elevated rounded-xl font-medium active:scale-95 transition-transform"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-danger text-white rounded-xl font-medium active:scale-95 transition-transform"
          >
            Supprimer
          </button>
        </div>
      </div>
    </>
  )
}

export default SessionTemplates