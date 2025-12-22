/**
 * 💪 FOREARM EXERCISES (Avant-bras)
 * ~10 exercices couvrant flexors, extensors, brachioradialis
 */

export const forearmExercises = [
  // ═══════════════════════════════════════════════════════════════
  // WRIST CURLS - FLEXORS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'forearms-wrist-curl-barbell',
    name: 'Wrist Curl - Barbell',
    nameTranslations: {
      en: 'Barbell Wrist Curl',
      fr: 'Curl de Poignet Barre'
    },
    aliases: ['Wrist Curl', 'Forearm Curl', 'Palms Up Wrist Curl'],
    
    category: {
      primary: 'Forearms',
      secondary: [],
      bodyPart: 'Arms',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Cable'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Short'
    },
    
    difficulty: 'Beginner',
    popularityScore: 78,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Forearm-Flexors', 'High-Rep', 'Grip-Strength'],
    
    formCues: [
      'Assis, avant-bras sur les cuisses',
      'Paumes vers le haut',
      'Seuls les poignets bougent',
      'Curl le poignet vers le haut',
      'ROM complète'
    ],
    
    commonMistakes: [
      '❌ Bouger les avant-bras',
      '❌ Charge trop lourde',
      '❌ ROM incomplète'
    ],
    
    muscleActivation: {
      primary: { 'Wrist Flexors': 100 },
      secondary: { 'Finger Flexors': 50 }
    }
  },
  
  {
    id: 'forearms-wrist-curl-dumbbell',
    name: 'Wrist Curl - Dumbbell',
    nameTranslations: {
      en: 'Dumbbell Wrist Curl',
      fr: 'Curl de Poignet Haltère'
    },
    aliases: ['DB Wrist Curl', 'Single Arm Wrist Curl'],
    
    category: {
      primary: 'Forearms',
      secondary: [],
      bodyPart: 'Arms',
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
      plane: 'Sagittal',
      range: 'Short'
    },
    
    difficulty: 'Beginner',
    popularityScore: 75,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Forearm-Flexors', 'Home-Gym', 'Unilateral'],
    
    formCues: [
      'Même technique qu\'avec barre',
      'Peut faire un bras à la fois',
      'Plus de ROM possible',
      'Corrige les déséquilibres'
    ],
    
    muscleActivation: {
      primary: { 'Wrist Flexors': 100 },
      secondary: { 'Finger Flexors': 50 }
    }
  },
  
  {
    id: 'forearms-behind-back-wrist-curl',
    name: 'Behind the Back Wrist Curl',
    nameTranslations: {
      en: 'Behind the Back Wrist Curl',
      fr: 'Curl de Poignet Derrière le Dos'
    },
    aliases: ['Standing Wrist Curl'],
    
    category: {
      primary: 'Forearms',
      secondary: [],
      bodyPart: 'Arms',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Cable'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Short'
    },
    
    difficulty: 'Beginner',
    popularityScore: 68,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Forearm-Flexors', 'Standing'],
    
    formCues: [
      'Debout, barre derrière les fesses',
      'Prise supination',
      'Curl du poignet',
      'Permet plus de charge'
    ],
    
    muscleActivation: {
      primary: { 'Wrist Flexors': 100 },
      secondary: {}
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // REVERSE WRIST CURLS - EXTENSORS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'forearms-reverse-wrist-curl',
    name: 'Reverse Wrist Curl',
    nameTranslations: {
      en: 'Reverse Wrist Curl',
      fr: 'Curl de Poignet Inversé'
    },
    aliases: ['Wrist Extension', 'Palms Down Wrist Curl'],
    
    category: {
      primary: 'Forearms',
      secondary: [],
      bodyPart: 'Arms',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Cable'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Short'
    },
    
    difficulty: 'Beginner',
    popularityScore: 72,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Forearm-Extensors', 'Balance'],
    
    formCues: [
      'Même position que wrist curl',
      'Paumes vers LE BAS',
      'Extension du poignet',
      'Important pour équilibre avant-bras',
      'Prévention tendinite'
    ],
    
    muscleActivation: {
      primary: { 'Wrist Extensors': 100 },
      secondary: {}
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // GRIP STRENGTH & FUNCTIONAL
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'forearms-farmers-walk',
    name: 'Farmer\'s Walk',
    nameTranslations: {
      en: 'Farmer\'s Walk',
      fr: 'Marche du Fermier'
    },
    aliases: ['Farmer Carry', 'Marche du Fermier', 'Loaded Carry'],
    
    category: {
      primary: 'Forearms',
      secondary: ['Core', 'Shoulders', 'Back', 'Legs'],
      bodyPart: 'Full Body',
      movementPattern: 'Carry'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Trap Bar', 'Kettlebell', 'Farmer Walk Handles'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Isometric',
      plane: 'Multi',
      range: 'None'
    },
    
    difficulty: 'Beginner',
    popularityScore: 85,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Functional', 'Grip-Strength', 'Full-Body', 'Conditioning'],
    
    formCues: [
      'Un poids lourd dans chaque main',
      'Marche avec posture droite',
      'Épaules en arrière, core engagé',
      'Grip crush (serre fort)',
      'Distance ou temps'
    ],
    
    muscleActivation: {
      primary: { 'Forearms (Grip)': 100, 'Upper Trapezius': 90 },
      secondary: { 'Core': 80, 'Quadriceps': 50, 'Glutes': 50 }
    }
  },
  
  {
    id: 'forearms-plate-pinch',
    name: 'Plate Pinch',
    nameTranslations: {
      en: 'Plate Pinch',
      fr: 'Pincement de Disque'
    },
    aliases: ['Pinch Grip', 'Plate Pinch Hold'],
    
    category: {
      primary: 'Forearms',
      secondary: [],
      bodyPart: 'Arms',
      movementPattern: 'Isometric'
    },
    
    equipment: {
      type: 'Other',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Disques de poids'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Isometric',
      plane: 'None',
      range: 'None'
    },
    
    difficulty: 'Beginner',
    popularityScore: 65,
    isCompound: false,
    isFunctional: true,
    
    tags: ['Isolation', 'Pinch-Grip', 'Isometric', 'Functional'],
    
    formCues: [
      'Pince deux disques ensemble',
      'Tiens avec le pouce et les doigts',
      'Force de pincement',
      'Temps ou distance'
    ],
    
    muscleActivation: {
      primary: { 'Finger Flexors': 100, 'Thumb': 95 },
      secondary: {}
    }
  },
  
  {
    id: 'forearms-dead-hang',
    name: 'Dead Hang',
    nameTranslations: {
      en: 'Dead Hang',
      fr: 'Suspension Barre Fixe'
    },
    aliases: ['Bar Hang', 'Passive Hang'],
    
    category: {
      primary: 'Forearms',
      secondary: ['Shoulders', 'Back'],
      bodyPart: 'Upper Body',
      movementPattern: 'Isometric'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Barre de traction'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Isometric',
      plane: 'Vertical',
      range: 'None'
    },
    
    difficulty: 'Beginner',
    popularityScore: 80,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Isometric', 'Grip-Strength', 'Shoulder-Health', 'Decompression'],
    
    formCues: [
      'Suspendu à la barre, bras tendus',
      'Tiens le plus longtemps possible',
      'Excellent pour grip et décompression',
      'Étire les épaules et le dos'
    ],
    
    muscleActivation: {
      primary: { 'Forearms (Grip)': 100 },
      secondary: { 'Latissimus Dorsi': 40, 'Shoulders': 35 }
    }
  },
  
  {
    id: 'forearms-wrist-roller',
    name: 'Wrist Roller',
    nameTranslations: {
      en: 'Wrist Roller',
      fr: 'Enrouleur de Poignet'
    },
    aliases: ['Forearm Roller'],
    
    category: {
      primary: 'Forearms',
      secondary: [],
      bodyPart: 'Arms',
      movementPattern: 'Rotation'
    },
    
    equipment: {
      type: 'Other',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Wrist roller (barre + corde + poids)'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Rotation',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 72,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Forearm-Complete', 'Old-School', 'Brutal'],
    
    formCues: [
      'Bras tendus devant ou à 90°',
      'Enroule la corde autour de la barre',
      'Alterne flexion et extension',
      'Monte puis descend le poids',
      'Brûlure intense!'
    ],
    
    muscleActivation: {
      primary: { 'Wrist Flexors': 100, 'Wrist Extensors': 90 },
      secondary: { 'Brachioradialis': 60 }
    }
  },
  
  {
    id: 'forearms-finger-curls',
    name: 'Finger Curls',
    nameTranslations: {
      en: 'Finger Curls',
      fr: 'Curl des Doigts'
    },
    aliases: ['Finger Curl'],
    
    category: {
      primary: 'Forearms',
      secondary: [],
      bodyPart: 'Arms',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Short'
    },
    
    difficulty: 'Beginner',
    popularityScore: 65,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Finger-Strength', 'Grip'],
    
    formCues: [
      'Comme wrist curl mais on ouvre les doigts',
      'Laisse la barre rouler jusqu\'aux doigts',
      'Referme les doigts pour remonter',
      'Travaille les fléchisseurs des doigts'
    ],
    
    muscleActivation: {
      primary: { 'Finger Flexors': 100 },
      secondary: { 'Wrist Flexors': 50 }
    }
  },
  
  {
    id: 'forearms-reverse-curl',
    name: 'Reverse Curl',
    nameTranslations: {
      en: 'Reverse Curl',
      fr: 'Curl Inversé'
    },
    aliases: ['Pronated Curl', 'Overhand Curl'],
    
    category: {
      primary: 'Forearms',
      secondary: ['Biceps'],
      bodyPart: 'Arms',
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
      plane: 'Sagittal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 78,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Brachioradialis', 'Forearm-Extensors'],
    
    formCues: [
      'Prise pronation (paumes vers le bas)',
      'Curl classique mais prise inversée',
      'Cible brachioradialis et extenseurs',
      'Charge plus légère que curl standard'
    ],
    
    muscleActivation: {
      primary: { 'Brachioradialis': 100, 'Wrist Extensors': 85 },
      secondary: { 'Biceps Brachii': 55, 'Brachialis': 60 }
    }
  },
]
