/**
 * 💪 TRICEPS EXERCISES (Triceps)
 * ~15 exercices couvrant les trois chefs du triceps
 */

export const tricepsExercises = [
  // ═══════════════════════════════════════════════════════════════
  // PUSHDOWNS & CABLE EXTENSIONS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'triceps-pushdown-cable',
    name: 'Triceps Pushdown - Cable',
    nameTranslations: {
      en: 'Cable Triceps Pushdown',
      fr: 'Extension Triceps Poulie Haute'
    },
    aliases: ['Pushdown', 'Triceps Pushdown', 'Poulie Triceps', 'Cable Pushdown'],
    
    category: {
      primary: 'Triceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Resistance Band'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 95,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Cable', 'Beginner-Friendly', 'Triceps-Lateral'],
    
    formCues: [
      'Poulie haute, barre droite ou V-bar',
      'Coudes fixes contre le corps',
      'Pousse jusqu\'à extension complète',
      'Ne laisse pas les coudes avancer',
      'Contracte fort en bas'
    ],
    
    commonMistakes: [
      '❌ Coudes qui bougent',
      '❌ Se pencher sur la barre',
      '❌ ROM incomplète',
      '❌ Charge trop lourde'
    ],
    
    variations: [
      { id: 'triceps-pushdown-rope', name: 'Rope Pushdown', targetShift: 'More lateral head' },
      { id: 'triceps-pushdown-reverse', name: 'Reverse Grip Pushdown', targetShift: 'More medial head' }
    ],
    
    muscleActivation: {
      primary: { 'Triceps (Lateral Head)': 100 },
      secondary: { 'Triceps (Medial Head)': 80, 'Triceps (Long Head)': 60 }
    }
  },
  
  {
    id: 'triceps-pushdown-rope',
    name: 'Triceps Pushdown - Rope',
    nameTranslations: {
      en: 'Rope Triceps Pushdown',
      fr: 'Extension Triceps Corde'
    },
    aliases: ['Rope Pushdown', 'Rope Extension'],
    
    category: {
      primary: 'Triceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 92,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Cable', 'Lateral-Head'],
    
    formCues: [
      'Écarte la corde en bas du mouvement',
      'Plus de ROM que barre',
      'Meilleure contraction latérale',
      'Très populaire'
    ],
    
    muscleActivation: {
      primary: { 'Triceps (Lateral Head)': 100 },
      secondary: { 'Triceps (Long Head)': 70, 'Triceps (Medial Head)': 75 }
    }
  },
  
  {
    id: 'triceps-pushdown-reverse',
    name: 'Reverse Grip Triceps Pushdown',
    nameTranslations: {
      en: 'Reverse Grip Pushdown',
      fr: 'Extension Triceps Supination'
    },
    aliases: ['Underhand Pushdown', 'Supinated Pushdown'],
    
    category: {
      primary: 'Triceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 75,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Cable', 'Medial-Head'],
    
    formCues: [
      'Prise supination (paumes vers le haut)',
      'Cible davantage le chef médial',
      'Charge plus légère',
      'Bon pour varier'
    ],
    
    muscleActivation: {
      primary: { 'Triceps (Medial Head)': 100 },
      secondary: { 'Triceps (Lateral Head)': 75 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // OVERHEAD EXTENSIONS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'triceps-overhead-extension-cable',
    name: 'Overhead Triceps Extension - Cable',
    nameTranslations: {
      en: 'Cable Overhead Triceps Extension',
      fr: 'Extension Triceps Poulie Basse'
    },
    aliases: ['Overhead Cable Extension', 'French Press Cable'],
    
    category: {
      primary: 'Triceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Dumbbell', 'EZ Bar'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 85,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Cable', 'Long-Head', 'Stretch'],
    
    formCues: [
      'Face opposée à la poulie basse',
      'Bras au-dessus de la tête',
      'Étirement max de la longue portion',
      'Coudes fixes, près de la tête'
    ],
    
    muscleActivation: {
      primary: { 'Triceps (Long Head)': 100 },
      secondary: { 'Triceps (Lateral Head)': 65, 'Triceps (Medial Head)': 60 }
    }
  },
  
  {
    id: 'triceps-overhead-extension-dumbbell',
    name: 'Overhead Triceps Extension - Dumbbell',
    nameTranslations: {
      en: 'Dumbbell Overhead Extension',
      fr: 'Extension Triceps Haltère au-dessus'
    },
    aliases: ['Dumbbell French Press', 'Single Arm Overhead Extension'],
    
    category: {
      primary: 'Triceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Cable', 'EZ Bar'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Home-Gym', 'Long-Head', 'Unilateral'],
    
    formCues: [
      'Un ou deux bras',
      'Haltère(s) au-dessus de la tête',
      'Descends derrière la tête',
      'Coudes pointent vers le plafond',
      'Attention au poids sur la tête!'
    ],
    
    muscleActivation: {
      primary: { 'Triceps (Long Head)': 100 },
      secondary: { 'Triceps (Lateral Head)': 60 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // SKULL CRUSHERS / LYING EXTENSIONS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'triceps-skull-crusher',
    name: 'Skull Crusher (Lying Triceps Extension)',
    nameTranslations: {
      en: 'Skull Crusher',
      fr: 'Barre au Front / Skull Crusher'
    },
    aliases: ['Lying Triceps Extension', 'French Press', 'Barre au Front', 'Nose Breaker'],
    
    category: {
      primary: 'Triceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'EZ Bar',
      alternatives: ['Barbell', 'Dumbbell'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc plat'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 90,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Mass-Building', 'Long-Head', 'Classic'],
    
    formCues: [
      'Allongé sur banc plat',
      'Barre au-dessus du front',
      'Descends vers le front ou derrière la tête',
      'Coudes fixes, pointent vers le plafond',
      'Contrôle la descente!'
    ],
    
    commonMistakes: [
      '❌ Coudes qui s\'écartent',
      '❌ Descente trop rapide',
      '❌ Charge trop lourde',
      '❌ Ne pas contrôler vers le visage'
    ],
    
    muscleActivation: {
      primary: { 'Triceps (Long Head)': 95, 'Triceps (Lateral Head)': 85 },
      secondary: { 'Triceps (Medial Head)': 75 }
    }
  },
  
  {
    id: 'triceps-skull-crusher-dumbbell',
    name: 'Dumbbell Skull Crusher',
    nameTranslations: {
      en: 'Dumbbell Skull Crusher',
      fr: 'Skull Crusher Haltères'
    },
    aliases: ['DB Skull Crusher', 'Lying DB Extension'],
    
    category: {
      primary: 'Triceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['EZ Bar', 'Barbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 80,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Home-Gym', 'Long-Head'],
    
    formCues: [
      'Version haltères du skull crusher',
      'Plus de ROM et d\'instabilité',
      'Peut être fait unilatéral'
    ],
    
    muscleActivation: {
      primary: { 'Triceps (Long Head)': 95 },
      secondary: { 'Triceps (Lateral Head)': 80, 'Triceps (Medial Head)': 70 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // COMPOUND MOVEMENTS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'triceps-dips',
    name: 'Triceps Dips',
    nameTranslations: {
      en: 'Triceps Dips',
      fr: 'Dips Triceps'
    },
    aliases: ['Parallel Bar Dips', 'Dips Triceps'],
    
    category: {
      primary: 'Triceps',
      secondary: ['Chest', 'Shoulders'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Machine'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Barres parallèles'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 90,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Mass-Building', 'Functional'],
    
    formCues: [
      'Sur barres parallèles',
      'Corps VERTICAL (pas penché = plus triceps)',
      'Coudes près du corps',
      'Descends jusqu\'à 90°',
      'Pousse en contractant les triceps'
    ],
    
    variations: [
      { id: 'chest-dips', name: 'Chest Dips', targetShift: 'Lean forward for chest' },
      { id: 'triceps-bench-dips', name: 'Bench Dips', targetShift: 'Easier variation' }
    ],
    
    muscleActivation: {
      primary: { 'Triceps': 100 },
      secondary: { 'Anterior Deltoid': 65, 'Pectoralis Major': 55 }
    }
  },
  
  {
    id: 'triceps-bench-dips',
    name: 'Bench Dips',
    nameTranslations: {
      en: 'Bench Dips',
      fr: 'Dips sur Banc'
    },
    aliases: ['Chair Dips', 'Dips Banc'],
    
    category: {
      primary: 'Triceps',
      secondary: ['Shoulders'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc ou chaise stable'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Home-Gym', 'Beginner-Friendly'],
    
    formCues: [
      'Mains sur le bord du banc derrière toi',
      'Pieds au sol ou sur un autre banc',
      'Descends en pliant les coudes',
      'Attention: peut stresser l\'épaule'
    ],
    
    muscleActivation: {
      primary: { 'Triceps': 100 },
      secondary: { 'Anterior Deltoid': 60 }
    }
  },
  
  {
    id: 'triceps-close-grip-bench-press',
    name: 'Close Grip Bench Press',
    nameTranslations: {
      en: 'Close Grip Bench Press',
      fr: 'Développé Couché Prise Serrée'
    },
    aliases: ['CGBP', 'Close Grip Press', 'Développé Serré'],
    
    category: {
      primary: 'Triceps',
      secondary: ['Chest', 'Shoulders'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Smith Machine', 'Dumbbell'],
      requiresRack: true,
      requiresSpotter: true
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 88,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Mass-Building', 'Strength', 'Heavy'],
    
    formCues: [
      'Prise largeur d\'épaules ou moins',
      'Coudes près du corps',
      'Descends la barre vers le bas de la poitrine',
      'Meilleur exercice triceps pour la masse',
      'Peut aller lourd'
    ],
    
    muscleActivation: {
      primary: { 'Triceps': 100 },
      secondary: { 'Pectoralis Major': 70, 'Anterior Deltoid': 60 }
    }
  },
  
  {
    id: 'triceps-diamond-pushup',
    name: 'Diamond Push-Up',
    nameTranslations: {
      en: 'Diamond Push-Up',
      fr: 'Pompes Diamant'
    },
    aliases: ['Triangle Push-Up', 'Close Grip Push-Up'],
    
    category: {
      primary: 'Triceps',
      secondary: ['Chest', 'Shoulders'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 85,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Home-Gym', 'No-Equipment'],
    
    formCues: [
      'Mains ensemble en forme de diamant',
      'Index et pouces se touchent',
      'Coudes près du corps',
      'Plus difficile que push-up standard'
    ],
    
    muscleActivation: {
      primary: { 'Triceps': 100 },
      secondary: { 'Pectoralis Major (Inner)': 70, 'Anterior Deltoid': 55 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // SPECIALTY MOVEMENTS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'triceps-kickback',
    name: 'Triceps Kickback',
    nameTranslations: {
      en: 'Triceps Kickback',
      fr: 'Kickback Triceps'
    },
    aliases: ['Dumbbell Kickback', 'Triceps Extension Kickback'],
    
    category: {
      primary: 'Triceps',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Cable'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 78,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Peak-Contraction', 'Finisher', 'Home-Gym'],
    
    formCues: [
      'Penché à 90°, coude fixe en haut',
      'Étends le bras vers l\'arrière',
      'Contracte fort à l\'extension',
      'Charge légère, focus contraction',
      'Un bras à la fois'
    ],
    
    commonMistakes: [
      '❌ Balancer le bras',
      '❌ Coude qui bouge',
      '❌ Charge trop lourde'
    ],
    
    muscleActivation: {
      primary: { 'Triceps (Lateral Head)': 100 },
      secondary: { 'Triceps (Long Head)': 65 }
    }
  },
  
  {
    id: 'triceps-dip-machine',
    name: 'Triceps Dip Machine',
    nameTranslations: {
      en: 'Machine Triceps Dip',
      fr: 'Machine à Dips'
    },
    aliases: ['Assisted Dip', 'Dip Machine'],
    
    category: {
      primary: 'Triceps',
      secondary: ['Chest'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Bodyweight'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 80,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Machine', 'Beginner-Friendly', 'Assisted'],
    
    formCues: [
      'Version assistée des dips',
      'Contrepoids aide le mouvement',
      'Parfait pour progression',
      'Réduis l\'assistance avec le temps'
    ],
    
    muscleActivation: {
      primary: { 'Triceps': 100 },
      secondary: { 'Pectoralis Major': 60, 'Anterior Deltoid': 55 }
    }
  },
  
  {
    id: 'triceps-jm-press',
    name: 'JM Press',
    nameTranslations: {
      en: 'JM Press',
      fr: 'JM Press'
    },
    aliases: ['JM Blakley Press'],
    
    category: {
      primary: 'Triceps',
      secondary: ['Chest'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['EZ Bar'],
      requiresRack: true,
      requiresSpotter: true
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Medium'
    },
    
    difficulty: 'Advanced',
    popularityScore: 65,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Powerlifting', 'Advanced', 'Triceps-Strength'],
    
    formCues: [
      'Hybride skull crusher / close grip press',
      'Descends vers la gorge/menton',
      'Inventé par JM Blakley',
      'Excellent pour force triceps',
      'Technique avancée'
    ],
    
    muscleActivation: {
      primary: { 'Triceps': 100 },
      secondary: { 'Pectoralis Major': 55, 'Anterior Deltoid': 45 }
    }
  },
]
