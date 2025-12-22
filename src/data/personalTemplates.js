/**
 * 🏋️ Templates personnalisés
 * Séances d'entraînement pré-configurées pour vos 3 salles
 */

export const personalTemplates = [
  // ═══════════════════════════════════════════════════════════════
  // 💪 SÉANCE PUSH
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'template-push-arles',
    name: 'PUSH (Arles - avec Supine)',
    location: 'Arles',
    description: 'Pectoraux, Épaules, Triceps - Version avec Supine disponible',
    exercises: [
      // Pectoraux
      { 
        exerciseId: 'chest-bench-press-barbell',
        name: 'Développé Couché (Barre)',
        sets: [] // Vous gérez les séries vous-même
      },
      { 
        exerciseId: 'bf-incline-chest-press',
        name: 'Développé Incliné (Machine)',
        sets: []
      },
      { 
        exerciseId: 'bf-pec-deck',
        name: 'Butterfly / Pec Deck',
        sets: []
      },
      
      // Épaules
      { 
        exerciseId: 'shoulders-smith-machine-press',
        name: 'Développé Militaire (Smith Machine)',
        sets: []
      },
      { 
        exerciseId: 'shoulders-lateral-raise-cable',
        name: 'Élévation Latérale (Poulie)',
        sets: []
      },
      
      // Triceps (au choix)
      { 
        exerciseId: 'chest-bench-press-close-grip',
        name: 'Développé Couché Prise Serrée',
        sets: []
      },
      { 
        exerciseId: 'triceps-pushdown-cable-rope',
        name: 'Extension Triceps Poulie (Corde)',
        sets: []
      },
      { 
        exerciseId: 'triceps-overhead-extension-dumbbell',
        name: 'Extension Nuque (Haltère)',
        sets: []
      }
    ],
    tags: ['Push', 'Arles', 'Pecs', 'Épaules', 'Triceps']
  },

  {
    id: 'template-push-st-christol',
    name: 'PUSH (St Christol - sans Supine)',
    location: 'St Christol lez Ales',
    description: 'Pectoraux, Épaules, Triceps - Version sans Supine',
    exercises: [
      // Pectoraux (adaptés sans supine)
      { 
        exerciseId: 'bf-chest-press-machine',
        name: 'Presse Pectoraux (Machine)',
        sets: []
      },
      { 
        exerciseId: 'bf-incline-chest-press',
        name: 'Développé Incliné (Machine)',
        sets: []
      },
      { 
        exerciseId: 'bf-pec-deck',
        name: 'Butterfly / Pec Deck',
        sets: []
      },
      
      // Épaules
      { 
        exerciseId: 'shoulders-smith-machine-press',
        name: 'Développé Militaire (Smith Machine)',
        sets: []
      },
      { 
        exerciseId: 'shoulders-lateral-raise-cable',
        name: 'Élévation Latérale (Poulie)',
        sets: []
      },
      
      // Triceps (au choix)
      { 
        exerciseId: 'chest-bench-press-close-grip',
        name: 'Développé Couché Prise Serrée',
        sets: []
      },
      { 
        exerciseId: 'triceps-pushdown-cable-rope',
        name: 'Extension Triceps Poulie (Corde)',
        sets: []
      },
      { 
        exerciseId: 'triceps-overhead-extension-dumbbell',
        name: 'Extension Nuque (Haltère)',
        sets: []
      }
    ],
    tags: ['Push', 'St Christol', 'Pecs', 'Épaules', 'Triceps']
  },

  // ═══════════════════════════════════════════════════════════════
  // 🔙 SÉANCE PULL - VERSION TRACTION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'template-pull-traction',
    name: 'PULL (Version Tractions)',
    location: 'Toutes salles',
    description: 'Dos, Biceps - Version avec tractions au poids du corps',
    exercises: [
      // Dos - Vertical (Tractions)
      { 
        exerciseId: 'back-wide-grip-pull-up',
        name: 'Traction Prise Large',
        sets: []
      },
      { 
        exerciseId: 'back-close-grip-pull-up',
        name: 'Traction Prise Serrée',
        sets: []
      },
      
      // Dos - Horizontal (Rowing)
      { 
        exerciseId: 'back-barbell-row',
        name: 'Rowing Barre',
        sets: []
      },
      { 
        exerciseId: 'bf-seated-row-machine',
        name: 'Rowing Assis (Machine)',
        sets: []
      },
      
      // Biceps (1 ou 2 exos au choix)
      { 
        exerciseId: 'biceps-barbell-curl',
        name: 'Curl Barre',
        sets: []
      },
      { 
        exerciseId: 'biceps-hammer-curl-dumbbell',
        name: 'Curl Marteau',
        sets: []
      },
      { 
        exerciseId: 'bf-cable-bicep-curl',
        name: 'Curl Poulie',
        sets: []
      }
    ],
    tags: ['Pull', 'Dos', 'Biceps', 'Tractions']
  },

  // ═══════════════════════════════════════════════════════════════
  // 🔙 SÉANCE PULL - VERSION MACHINE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'template-pull-machine',
    name: 'PULL (Version Machine)',
    location: 'Toutes salles',
    description: 'Dos, Biceps - Version avec machines (fatigue ou progression)',
    exercises: [
      // Dos - Vertical (Machines)
      { 
        exerciseId: 'bf-lat-pulldown',
        name: 'Tirage Vertical Prise Large',
        sets: []
      },
      { 
        exerciseId: 'back-lat-pulldown-close-grip',
        name: 'Tirage Vertical Prise Serrée',
        sets: []
      },
      
      // Dos - Horizontal (Rowing)
      { 
        exerciseId: 'back-barbell-row',
        name: 'Rowing Barre',
        sets: []
      },
      { 
        exerciseId: 'bf-seated-row-machine',
        name: 'Rowing Assis (Machine)',
        sets: []
      },
      
      // Biceps (1 ou 2 exos au choix)
      { 
        exerciseId: 'biceps-barbell-curl',
        name: 'Curl Barre',
        sets: []
      },
      { 
        exerciseId: 'biceps-hammer-curl-dumbbell',
        name: 'Curl Marteau',
        sets: []
      },
      { 
        exerciseId: 'bf-cable-bicep-curl',
        name: 'Curl Poulie',
        sets: []
      }
    ],
    tags: ['Pull', 'Dos', 'Biceps', 'Machine']
  },

  // ═══════════════════════════════════════════════════════════════
  // 🦵 SÉANCE JAMBES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'template-legs',
    name: 'JAMBES',
    location: 'Toutes salles',
    description: 'Jambes complètes - Quadriceps, Ischio, Mollets',
    exercises: [
      // Exercices composés
      { 
        exerciseId: 'legs-squat-barbell',
        name: 'Squat (Barre)',
        sets: []
      },
      { 
        exerciseId: 'bf-leg-press',
        name: 'Leg Press',
        sets: []
      },
      
      // Isolation Quadriceps
      { 
        exerciseId: 'bf-leg-extension',
        name: 'Leg Extension',
        sets: []
      },
      
      // Isolation Ischio-jambiers
      { 
        exerciseId: 'bf-leg-curl-lying',
        name: 'Leg Curl Allongé',
        sets: []
      },
      
      // Mollets
      { 
        exerciseId: 'bf-calf-raise-standing',
        name: 'Mollets Debout',
        sets: []
      },
      { 
        exerciseId: 'bf-calf-raise-seated',
        name: 'Mollets Assis',
        sets: []
      }
    ],
    tags: ['Legs', 'Jambes', 'Quadriceps', 'Ischio', 'Mollets']
  }
]
