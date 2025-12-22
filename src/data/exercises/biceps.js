/**
 * 💪 BICEPS EXERCISES (Biceps)
 * ~15 exercices couvrant toutes les variations de curls
 */

export const bicepsExercises = [
  // ═══════════════════════════════════════════════════════════════
  // BARBELL CURLS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'biceps-barbell-curl',
    name: 'Barbell Curl',
    nameTranslations: {
      en: 'Barbell Curl',
      fr: 'Curl Barre'
    },
    aliases: ['BB Curl', 'Standing Barbell Curl', 'Curl Barre Droite'],
    
    category: {
      primary: 'Biceps',
      secondary: ['Forearms'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['EZ Bar', 'Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 95,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Mass-Building', 'Classic', 'Biceps-Peak'],
    
    formCues: [
      'Debout, barre en prise supination',
      'Largeur d\'épaules',
      'Coudes fixes contre le corps',
      'Remonte la barre vers les épaules',
      'Contracte fort en haut',
      'Descente contrôlée'
    ],
    
    commonMistakes: [
      '❌ Balancer le corps (cheat curl)',
      '❌ Coudes qui avancent',
      '❌ ROM incomplète',
      '❌ Descente trop rapide'
    ],
    
    variations: [
      { id: 'biceps-ez-bar-curl', name: 'EZ Bar Curl', targetShift: 'Easier on wrists' },
      { id: 'biceps-drag-curl', name: 'Drag Curl', targetShift: 'More peak contraction' }
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii': 100 },
      secondary: { 'Brachialis': 65, 'Forearms': 50 }
    }
  },
  
  {
    id: 'biceps-ez-bar-curl',
    name: 'EZ Bar Curl',
    nameTranslations: {
      en: 'EZ Bar Curl',
      fr: 'Curl Barre EZ'
    },
    aliases: ['EZ Curl', 'Cambered Bar Curl', 'Curl Barre Cambré'],
    
    category: {
      primary: 'Biceps',
      secondary: ['Forearms'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'EZ Bar',
      alternatives: ['Barbell', 'Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 92,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Wrist-Friendly', 'Mass-Building'],
    
    formCues: [
      'Prise sur les parties coudées',
      'Moins de stress sur les poignets',
      'Même mouvement que barre droite',
      'Cible légèrement différente'
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii': 100 },
      secondary: { 'Brachialis': 70, 'Forearms': 45 }
    }
  },
  
  {
    id: 'biceps-drag-curl',
    name: 'Drag Curl',
    nameTranslations: {
      en: 'Drag Curl',
      fr: 'Drag Curl / Curl Glissé'
    },
    aliases: ['Body Drag Curl'],
    
    category: {
      primary: 'Biceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['EZ Bar', 'Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 72,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Biceps-Peak', 'Advanced-Technique'],
    
    formCues: [
      'Tire la barre le long du corps',
      'Coudes vont vers l\'arrière',
      'Maximise contraction du pic',
      'ROM réduite mais intense'
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii (Long Head)': 100 },
      secondary: { 'Brachialis': 55 }
    }
  },
  
  {
    id: 'biceps-preacher-curl',
    name: 'Preacher Curl',
    nameTranslations: {
      en: 'Preacher Curl',
      fr: 'Curl au Pupitre Larry Scott'
    },
    aliases: ['Larry Scott Curl', 'Curl Pupitre', 'Scott Curl'],
    
    category: {
      primary: 'Biceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'EZ Bar',
      alternatives: ['Barbell', 'Dumbbell', 'Machine'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Pupitre de curl'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 88,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Strict-Form', 'Biceps-Length', 'No-Cheating'],
    
    formCues: [
      'Bras sur le pupitre incliné',
      'Élimine le momentum',
      'Excellent pour partie basse du biceps',
      'Attention à l\'hyperextension du coude'
    ],
    
    commonMistakes: [
      '❌ Descendre trop vite (stress coude)',
      '❌ Ne pas descendre complètement',
      '❌ Soulever du pupitre'
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii (Short Head)': 100 },
      secondary: { 'Brachialis': 60 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // DUMBBELL CURLS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'biceps-dumbbell-curl',
    name: 'Dumbbell Curl',
    nameTranslations: {
      en: 'Dumbbell Curl',
      fr: 'Curl Haltères'
    },
    aliases: ['DB Curl', 'Standing Dumbbell Curl', 'Curl Haltères'],
    
    category: {
      primary: 'Biceps',
      secondary: ['Forearms'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Cable'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 94,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Unilateral', 'Home-Gym', 'Beginner-Friendly'],
    
    formCues: [
      'Alternés ou simultanés',
      'Supination pendant la montée',
      'Pince les coudes contre le corps',
      'ROM complète'
    ],
    
    variations: [
      { id: 'biceps-hammer-curl', name: 'Hammer Curl', targetShift: 'More brachialis' },
      { id: 'biceps-incline-curl', name: 'Incline Curl', targetShift: 'More stretch' },
      { id: 'biceps-concentration-curl', name: 'Concentration Curl', targetShift: 'Peak isolation' }
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii': 100 },
      secondary: { 'Brachialis': 55, 'Forearms': 50 }
    }
  },
  
  {
    id: 'biceps-hammer-curl',
    name: 'Hammer Curl',
    nameTranslations: {
      en: 'Hammer Curl',
      fr: 'Curl Marteau'
    },
    aliases: ['Neutral Grip Curl', 'Curl Marteau'],
    
    category: {
      primary: 'Biceps',
      secondary: ['Forearms'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Cable', 'Rope'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 90,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Brachialis', 'Forearm-Builder', 'Home-Gym'],
    
    formCues: [
      'Prise neutre (paumes face à face)',
      'Cible le brachial et avant-bras',
      'Excellent pour "épaissir" le bras',
      'Souvent plus fort que curl classique'
    ],
    
    muscleActivation: {
      primary: { 'Brachialis': 100, 'Brachioradialis': 85 },
      secondary: { 'Biceps Brachii': 75 }
    }
  },
  
  {
    id: 'biceps-incline-curl',
    name: 'Incline Dumbbell Curl',
    nameTranslations: {
      en: 'Incline Dumbbell Curl',
      fr: 'Curl Incliné'
    },
    aliases: ['Incline Curl', 'Curl Banc Incliné'],
    
    category: {
      primary: 'Biceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc incliné 45-60°'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 85,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Stretch-Emphasis', 'Long-Head', 'Biceps-Peak'],
    
    formCues: [
      'Allongé sur banc incliné (45-60°)',
      'Bras pendent en arrière',
      'Maximise l\'étirement du biceps',
      'Excellent pour la longue portion',
      'Charge légère!'
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii (Long Head)': 100 },
      secondary: { 'Short Head': 70 }
    }
  },
  
  {
    id: 'biceps-concentration-curl',
    name: 'Concentration Curl',
    nameTranslations: {
      en: 'Concentration Curl',
      fr: 'Curl Concentration'
    },
    aliases: ['Seated Concentration Curl', 'Arnold Curl'],
    
    category: {
      primary: 'Biceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Mind-Muscle', 'Peak-Contraction', 'Finisher'],
    
    formCues: [
      'Assis, coude contre l\'intérieur de la cuisse',
      'Isole complètement le biceps',
      'Excellent pour connexion neuromusculaire',
      'Un bras à la fois'
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii': 100 },
      secondary: {}
    }
  },
  
  {
    id: 'biceps-spider-curl',
    name: 'Spider Curl',
    nameTranslations: {
      en: 'Spider Curl',
      fr: 'Spider Curl'
    },
    aliases: ['Prone Incline Curl'],
    
    category: {
      primary: 'Biceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['EZ Bar', 'Barbell'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc incliné, poitrine contre'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 75,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Short-Head', 'Strict-Form'],
    
    formCues: [
      'Poitrine contre le côté incliné du banc',
      'Bras pendent verticalement',
      'Contraction max en haut',
      'Zéro momentum possible'
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii (Short Head)': 100 },
      secondary: { 'Long Head': 75 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // CABLE CURLS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'biceps-cable-curl',
    name: 'Cable Curl',
    nameTranslations: {
      en: 'Cable Curl',
      fr: 'Curl Poulie Basse'
    },
    aliases: ['Standing Cable Curl', 'Low Cable Curl'],
    
    category: {
      primary: 'Biceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Barbell', 'Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 85,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Cable', 'Constant-Tension'],
    
    formCues: [
      'Poulie basse, barre ou corde',
      'Tension constante toute la ROM',
      'Excellent pour finisher',
      'Variations: barre droite, EZ, corde'
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii': 100 },
      secondary: { 'Forearms': 45 }
    }
  },
  
  {
    id: 'biceps-cable-curl-high',
    name: 'High Cable Curl',
    nameTranslations: {
      en: 'High Cable Curl',
      fr: 'Curl Poulie Haute'
    },
    aliases: ['Overhead Cable Curl', 'Double Biceps Cable Curl'],
    
    category: {
      primary: 'Biceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Deux poulies hautes'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 75,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Cable', 'Peak-Contraction', 'Show-Off'],
    
    formCues: [
      'Entre deux poulies hautes',
      'Bras en croix, tire vers les oreilles',
      'Position "double biceps"',
      'Excellent pour pic du biceps'
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii': 100 },
      secondary: {}
    }
  },
  
  {
    id: 'biceps-rope-hammer-curl',
    name: 'Rope Hammer Curl',
    nameTranslations: {
      en: 'Rope Hammer Curl',
      fr: 'Curl Corde Poulie'
    },
    aliases: ['Cable Rope Curl'],
    
    category: {
      primary: 'Biceps',
      secondary: ['Forearms'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 80,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Cable', 'Brachialis', 'Constant-Tension'],
    
    formCues: [
      'Poulie basse avec corde',
      'Prise neutre',
      'Combine hammer curl + tension câble',
      'Écarte la corde en haut pour plus de contraction'
    ],
    
    muscleActivation: {
      primary: { 'Brachialis': 95, 'Brachioradialis': 85 },
      secondary: { 'Biceps Brachii': 75 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // MACHINE CURLS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'biceps-machine-curl',
    name: 'Machine Bicep Curl',
    nameTranslations: {
      en: 'Machine Bicep Curl',
      fr: 'Curl Machine'
    },
    aliases: ['Bicep Curl Machine', 'Preacher Machine'],
    
    category: {
      primary: 'Biceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Dumbbell', 'Cable'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 78,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Machine', 'Beginner-Friendly', 'Safe'],
    
    formCues: [
      'Ajuste le siège correctement',
      'Coudes alignés avec l\'axe de rotation',
      'Mouvement guidé',
      'Bon pour débutants ou finisher'
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii': 100 },
      secondary: {}
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // SPECIALTY CURLS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'biceps-reverse-curl',
    name: 'Reverse Curl',
    nameTranslations: {
      en: 'Reverse Curl',
      fr: 'Curl Inversé / Pronation'
    },
    aliases: ['Pronated Curl', 'Overhand Curl'],
    
    category: {
      primary: 'Forearms',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['EZ Bar', 'Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 72,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Forearm-Focus', 'Brachioradialis'],
    
    formCues: [
      'Prise pronation (paumes vers le bas)',
      'Cible brachioradialis et extenseurs',
      'Excellent pour avant-bras',
      'Charge plus légère que curl standard'
    ],
    
    muscleActivation: {
      primary: { 'Brachioradialis': 100, 'Forearm Extensors': 80 },
      secondary: { 'Biceps Brachii': 55, 'Brachialis': 60 }
    }
  },
  
  {
    id: 'biceps-21s',
    name: '21s (Bicep Curl)',
    nameTranslations: {
      en: '21s Curl',
      fr: 'Curl 21s'
    },
    aliases: ['Twenty-Ones', 'Curl 21'],
    
    category: {
      primary: 'Biceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['EZ Bar', 'Dumbbell', 'Cable'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 78,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'High-Intensity', 'Burnout', 'Technique'],
    
    formCues: [
      '7 reps moitié basse (0-90°)',
      '7 reps moitié haute (90°-haut)',
      '7 reps ROM complète',
      '= 21 reps au total',
      'Brûlure intense garantie'
    ],
    
    muscleActivation: {
      primary: { 'Biceps Brachii': 100 },
      secondary: {}
    }
  },
]
