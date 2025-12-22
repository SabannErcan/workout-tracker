/**
 * 🔙 BACK EXERCISES (Dos)
 * ~25 exercices couvrant lats, mid-back, lower back
 */

export const backExercises = [
  // ═══════════════════════════════════════════════════════════════
  // VERTICAL PULLING - PULL-UPS & CHIN-UPS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'back-pull-up',
    name: 'Pull-Up',
    nameTranslations: {
      en: 'Pull-Up',
      fr: 'Traction Pronation'
    },
    aliases: ['Pull Up', 'Pullup', 'Traction', 'Tractions'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps', 'Core'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Cable', 'Machine'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Barre de traction'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 97,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Mass-Building', 'Functional', 'Back-Width'],
    
    formCues: [
      'Prise pronation (paumes vers l\'avant)',
      'Largeur plus grande que les épaules',
      'Tire les coudes vers le bas et l\'arrière',
      'Monte le menton au-dessus de la barre',
      'Descends complètement (bras tendus)',
      'Engage les dorsaux avant de tirer'
    ],
    
    commonMistakes: [
      '❌ ROM incomplète (ne pas monter assez)',
      '❌ Kipping excessif (balancer)',
      '❌ Ne pas engager les lats',
      '❌ Descente non contrôlée'
    ],
    
    variations: [
      { id: 'back-chin-up', name: 'Chin-Up', targetShift: 'More biceps' },
      { id: 'back-wide-grip-pull-up', name: 'Wide Grip Pull-Up', targetShift: 'More lat width' },
      { id: 'back-close-grip-pull-up', name: 'Close Grip Pull-Up', targetShift: 'More mid-back' }
    ],
    
    alternatives: [
      { exerciseId: 'back-lat-pulldown-cable', reason: 'Plus facile, ajustable', whenToUse: 'Débutant' },
      { exerciseId: 'back-assisted-pull-up', reason: 'Version assistée', whenToUse: 'Progression' }
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 100 },
      secondary: { 'Biceps': 70, 'Rhomboids': 60, 'Rear Deltoid': 50, 'Core': 40 }
    }
  },
  
  {
    id: 'back-chin-up',
    name: 'Chin-Up',
    nameTranslations: {
      en: 'Chin-Up',
      fr: 'Traction Supination'
    },
    aliases: ['Chinup', 'Chin Up', 'Traction Supination', 'Underhand Pull-Up'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps', 'Core'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Cable', 'Machine'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 93,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Biceps-Emphasis', 'Functional'],
    
    formCues: [
      'Prise supination (paumes vers toi)',
      'Largeur d\'épaules',
      'Plus d\'implication biceps',
      'Généralement plus facile que pull-up'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 95 },
      secondary: { 'Biceps': 85, 'Brachialis': 60, 'Rhomboids': 55 }
    }
  },
  
  {
    id: 'back-wide-grip-pull-up',
    name: 'Wide Grip Pull-Up',
    nameTranslations: {
      en: 'Wide Grip Pull-Up',
      fr: 'Traction Prise Large'
    },
    aliases: ['Wide Pull-Up', 'Traction Large'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Cable'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Advanced',
    popularityScore: 85,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Back-Width', 'Advanced'],
    
    formCues: [
      'Prise très large (1.5x épaules)',
      'Maximum de largeur dorsaux',
      'Plus difficile que standard',
      'ROM peut être réduite'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi (Width)': 100 },
      secondary: { 'Teres Major': 75, 'Biceps': 55 }
    }
  },
  
  {
    id: 'back-close-grip-pull-up',
    name: 'Close Grip Pull-Up',
    nameTranslations: {
      en: 'Close Grip Pull-Up',
      fr: 'Traction Prise Serrée'
    },
    aliases: ['Close Pull-Up', 'Neutral Grip Pull-Up'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Cable'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 80,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Back-Thickness'],
    
    formCues: [
      'Prise serrée ou neutre',
      'Plus de focus mid-back',
      'Souvent plus facile que prise large'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 95 },
      secondary: { 'Rhomboids': 70, 'Biceps': 70, 'Mid-Traps': 60 }
    }
  },
  
  {
    id: 'back-assisted-pull-up',
    name: 'Assisted Pull-Up',
    nameTranslations: {
      en: 'Assisted Pull-Up',
      fr: 'Traction Assistée'
    },
    aliases: ['Machine Pull-Up', 'Gravitron'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Resistance Band'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Beginner-Friendly', 'Machine', 'Progression'],
    
    formCues: [
      'Machine avec contrepoids',
      'Parfait pour progression vers pull-up',
      'Réduis l\'assistance progressivement',
      'Même technique que pull-up classique'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 100 },
      secondary: { 'Biceps': 65, 'Rhomboids': 55 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // VERTICAL PULLING - LAT PULLDOWN
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'back-lat-pulldown-cable',
    name: 'Lat Pulldown - Cable',
    nameTranslations: {
      en: 'Lat Pulldown',
      fr: 'Tirage Vertical Poulie Haute'
    },
    aliases: ['Lat Pulldown', 'Pulldown', 'Tirage Vertical', 'Poulie Haute'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Machine', 'Bodyweight'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 95,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Beginner-Friendly', 'Back-Width', 'Cable'],
    
    formCues: [
      'Assis avec cuisses bloquées',
      'Tire la barre vers le haut de la poitrine',
      'Coudes vers le bas et l\'arrière',
      'Serre les omoplates en bas du mouvement',
      'Contrôle la remontée'
    ],
    
    commonMistakes: [
      '❌ Tirer derrière la nuque (dangereux)',
      '❌ Se pencher trop en arrière',
      '❌ Utiliser le momentum',
      '❌ Poignets cassés'
    ],
    
    variations: [
      { id: 'back-lat-pulldown-wide', name: 'Wide Grip Pulldown', targetShift: 'More width' },
      { id: 'back-lat-pulldown-close', name: 'Close Grip Pulldown', targetShift: 'More thickness' },
      { id: 'back-lat-pulldown-underhand', name: 'Underhand Pulldown', targetShift: 'More biceps' }
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 100 },
      secondary: { 'Biceps': 65, 'Rhomboids': 55, 'Rear Deltoid': 45 }
    }
  },
  
  {
    id: 'back-lat-pulldown-wide',
    name: 'Wide Grip Lat Pulldown',
    nameTranslations: {
      en: 'Wide Grip Lat Pulldown',
      fr: 'Tirage Vertical Prise Large'
    },
    aliases: ['Wide Pulldown', 'Tirage Large'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Machine'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 88,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Back-Width', 'Cable'],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi (Width)': 100 },
      secondary: { 'Teres Major': 70, 'Biceps': 55 }
    }
  },
  
  {
    id: 'back-lat-pulldown-close',
    name: 'Close Grip Lat Pulldown',
    nameTranslations: {
      en: 'Close Grip Lat Pulldown',
      fr: 'Tirage Vertical Prise Serrée'
    },
    aliases: ['Close Pulldown', 'V-Bar Pulldown', 'Neutral Grip Pulldown'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Machine'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 85,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Back-Thickness', 'Cable'],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 95 },
      secondary: { 'Rhomboids': 70, 'Biceps': 70, 'Mid-Traps': 60 }
    }
  },
  
  {
    id: 'back-lat-pulldown-underhand',
    name: 'Underhand Lat Pulldown',
    nameTranslations: {
      en: 'Underhand Lat Pulldown',
      fr: 'Tirage Vertical Supination'
    },
    aliases: ['Reverse Grip Pulldown', 'Supinated Pulldown'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Machine'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 80,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Biceps-Emphasis', 'Cable'],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 95 },
      secondary: { 'Biceps': 80, 'Brachialis': 55 }
    }
  },
  
  {
    id: 'back-straight-arm-pulldown',
    name: 'Straight Arm Pulldown',
    nameTranslations: {
      en: 'Straight Arm Pulldown',
      fr: 'Pullover Poulie Haute'
    },
    aliases: ['Straight Arm Pullover', 'Lat Pushdown', 'Pullover Poulie'],
    
    category: {
      primary: 'Back',
      secondary: ['Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Resistance Band'],
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
    
    tags: ['Isolation', 'Back-Width', 'Cable', 'Mind-Muscle'],
    
    formCues: [
      'Bras tendus tout le mouvement',
      'Légère flexion coude (pas locked)',
      'Tire avec les lats, pas les bras',
      'Excellent pour connexion neuromusculaire'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 100 },
      secondary: { 'Triceps (Long Head)': 45, 'Rear Deltoid': 30 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // HORIZONTAL PULLING - ROWS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'back-barbell-row',
    name: 'Barbell Row',
    nameTranslations: {
      en: 'Barbell Row',
      fr: 'Rowing Barre'
    },
    aliases: ['Bent Over Row', 'BB Row', 'Rowing Barre', 'Barbell Bent Over Row'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps', 'Core'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Cable', 'Machine'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 96,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Mass-Building', 'Back-Thickness', 'Strength'],
    
    formCues: [
      'Penché à 45-60° (dos droit)',
      'Tire la barre vers le nombril',
      'Coudes près du corps',
      'Serre les omoplates en haut',
      'Contrôle la descente',
      'Garde le core engagé'
    ],
    
    commonMistakes: [
      '❌ Dos arrondi',
      '❌ Se relever pendant le mouvement',
      '❌ Tirer trop haut (vers la poitrine)',
      '❌ Momentum excessif'
    ],
    
    variations: [
      { id: 'back-pendlay-row', name: 'Pendlay Row', targetShift: 'Explosive, dead stop' },
      { id: 'back-underhand-row', name: 'Underhand Row', targetShift: 'More biceps' }
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 90, 'Rhomboids': 90 },
      secondary: { 'Biceps': 70, 'Rear Deltoid': 65, 'Erector Spinae': 60, 'Mid-Traps': 60 }
    }
  },
  
  {
    id: 'back-pendlay-row',
    name: 'Pendlay Row',
    nameTranslations: {
      en: 'Pendlay Row',
      fr: 'Rowing Pendlay'
    },
    aliases: ['Dead Stop Row', 'Explosive Row'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps', 'Core'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Advanced',
    popularityScore: 78,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Power', 'Explosive', 'Strength'],
    
    formCues: [
      'Dos parallèle au sol',
      'Barre reposée au sol entre chaque rep',
      'Mouvement explosif vers le haut',
      'Reset complet à chaque rep'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 95, 'Rhomboids': 95 },
      secondary: { 'Biceps': 65, 'Rear Deltoid': 60, 'Erector Spinae': 70 }
    }
  },
  
  {
    id: 'back-underhand-row',
    name: 'Underhand Barbell Row',
    nameTranslations: {
      en: 'Underhand Barbell Row',
      fr: 'Rowing Barre Supination'
    },
    aliases: ['Yates Row', 'Reverse Grip Row'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['EZ Bar'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 80,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Biceps-Emphasis', 'Back-Thickness'],
    
    formCues: [
      'Prise supination (paumes vers le haut)',
      'Tire vers le bas du ventre',
      'Plus d\'implication biceps',
      'Moins de stress épaule'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 95 },
      secondary: { 'Biceps': 80, 'Rhomboids': 75, 'Rear Deltoid': 55 }
    }
  },
  
  {
    id: 'back-dumbbell-row',
    name: 'Dumbbell Row',
    nameTranslations: {
      en: 'Dumbbell Row',
      fr: 'Rowing Haltère'
    },
    aliases: ['One Arm Row', 'Single Arm Row', 'DB Row', 'Rowing Haltère 1 Bras'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps', 'Core'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Cable', 'Machine'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc plat pour support'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 94,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Unilateral', 'Back-Thickness', 'Home-Gym', 'Beginner-Friendly'],
    
    formCues: [
      'Un genou et une main sur le banc',
      'Dos plat et parallèle au sol',
      'Tire l\'haltère vers la hanche',
      'Coude près du corps',
      'Rotation minimale du torse'
    ],
    
    commonMistakes: [
      '❌ Rotation excessive du torse',
      '❌ Dos arrondi',
      '❌ Tirer vers la poitrine (trop haut)',
      '❌ Momentum'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 100 },
      secondary: { 'Rhomboids': 75, 'Biceps': 65, 'Rear Deltoid': 55, 'Core': 45 }
    }
  },
  
  {
    id: 'back-cable-row-seated',
    name: 'Seated Cable Row',
    nameTranslations: {
      en: 'Seated Cable Row',
      fr: 'Tirage Horizontal Poulie Basse'
    },
    aliases: ['Cable Row', 'Seated Row', 'Low Row', 'Tirage Horizontal'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Machine', 'Resistance Band'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 92,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Beginner-Friendly', 'Back-Thickness', 'Cable'],
    
    formCues: [
      'Assis, pieds sur les repose-pieds',
      'Dos droit, légère inclinaison avant au départ',
      'Tire vers le nombril',
      'Serre les omoplates en fin de mouvement',
      'Contrôle le retour sans arrondir le dos'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 90, 'Rhomboids': 90 },
      secondary: { 'Biceps': 65, 'Rear Deltoid': 55, 'Mid-Traps': 60 }
    }
  },
  
  {
    id: 'back-cable-row-single-arm',
    name: 'Single Arm Cable Row',
    nameTranslations: {
      en: 'Single Arm Cable Row',
      fr: 'Tirage Horizontal Unilatéral'
    },
    aliases: ['One Arm Cable Row', 'Unilateral Cable Row'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps', 'Core'],
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
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 80,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Unilateral', 'Cable', 'Core'],
    
    formCues: [
      'Debout ou assis face à la poulie',
      'Un bras à la fois',
      'Anti-rotation = travail du core',
      'Excellent pour équilibre musculaire'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 100 },
      secondary: { 'Rhomboids': 70, 'Biceps': 60, 'Core': 55 }
    }
  },
  
  {
    id: 'back-seated-row-machine',
    name: 'Seated Row - Machine',
    nameTranslations: {
      en: 'Machine Seated Row',
      fr: 'Rowing Assis Machine'
    },
    aliases: ['Machine Row', 'Rowing Machine'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Cable', 'Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 85,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Beginner-Friendly', 'Safe', 'Machine'],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 95, 'Rhomboids': 85 },
      secondary: { 'Biceps': 60, 'Rear Deltoid': 50 }
    }
  },
  
  {
    id: 'back-t-bar-row',
    name: 'T-Bar Row',
    nameTranslations: {
      en: 'T-Bar Row',
      fr: 'Rowing T-Bar'
    },
    aliases: ['T-Bar Row', 'Landmine Row', 'T Bar'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps', 'Core'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Machine'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'T-Bar machine ou barre coincée'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 88,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Mass-Building', 'Back-Thickness', 'Strength'],
    
    formCues: [
      'Position penchée stable',
      'Prise neutre proche',
      'Tire vers le torse',
      'Excellent pour épaisseur du dos',
      'Peut charger lourd'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 95, 'Rhomboids': 95 },
      secondary: { 'Biceps': 70, 'Rear Deltoid': 60, 'Erector Spinae': 55 }
    }
  },
  
  {
    id: 'back-chest-supported-row',
    name: 'Chest Supported Row',
    nameTranslations: {
      en: 'Chest Supported Row',
      fr: 'Rowing Buste Supporté'
    },
    aliases: ['Incline Row', 'Seal Row', 'Prone Row'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Machine'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc incliné 30-45°'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 83,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Lower-Back-Friendly', 'Strict-Form', 'Isolation-Feel'],
    
    formCues: [
      'Poitrine appuyée sur banc incliné',
      'Élimine le momentum et le stress lombaire',
      'Isole parfaitement le dos',
      'Idéal si problème de bas du dos'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 100, 'Rhomboids': 90 },
      secondary: { 'Biceps': 60, 'Rear Deltoid': 55 }
    }
  },
  
  {
    id: 'back-inverted-row',
    name: 'Inverted Row',
    nameTranslations: {
      en: 'Inverted Row',
      fr: 'Rowing Inversé / Traction Horizontale'
    },
    aliases: ['Body Row', 'Australian Pull-Up', 'Horizontal Pull-Up'],
    
    category: {
      primary: 'Back',
      secondary: ['Biceps', 'Core'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['TRX', 'Rings'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Barre basse ou TRX'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 84,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Home-Gym', 'Beginner-Friendly', 'Progression'],
    
    formCues: [
      'Sous une barre basse, corps gainé',
      'Tire la poitrine vers la barre',
      'Corps droit comme une planche',
      'Progression vers pull-up',
      'Ajuste difficulté via angle du corps'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 90, 'Rhomboids': 85 },
      secondary: { 'Biceps': 65, 'Rear Deltoid': 60, 'Core': 50 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // DEADLIFT VARIATIONS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'back-deadlift-conventional',
    name: 'Deadlift - Conventional',
    nameTranslations: {
      en: 'Conventional Deadlift',
      fr: 'Soulevé de Terre Conventionnel'
    },
    aliases: ['Deadlift', 'Soulevé de Terre', 'Dead Lift'],
    
    category: {
      primary: 'Back',
      secondary: ['Hamstrings', 'Glutes', 'Core', 'Forearms'],
      bodyPart: 'Full Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Trap Bar', 'Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Advanced',
    popularityScore: 98,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Strength', 'Mass-Building', 'Powerlifting', 'Full-Body'],
    
    formCues: [
      'Pieds largeur hanches',
      'Barre au-dessus du milieu du pied',
      'Hanches en arrière, dos droit',
      'Prise juste à l\'extérieur des genoux',
      'Tire en poussant le sol',
      'Verrouille hanches et genoux ensemble',
      'Garde la barre près du corps'
    ],
    
    commonMistakes: [
      '❌ Dos arrondi',
      '❌ Barre trop loin du corps',
      '❌ Hanches qui montent avant le torse',
      '❌ Hyperextension en haut'
    ],
    
    variations: [
      { id: 'back-deadlift-sumo', name: 'Sumo Deadlift', targetShift: 'More quads/adductors' },
      { id: 'legs-romanian-deadlift-barbell', name: 'Romanian Deadlift', targetShift: 'Hamstring focus' },
      { id: 'back-rack-pull', name: 'Rack Pull', targetShift: 'Top half only' }
    ],
    
    muscleActivation: {
      primary: { 'Erector Spinae': 100, 'Glutes': 95 },
      secondary: { 'Hamstrings': 85, 'Quadriceps': 60, 'Latissimus Dorsi': 55, 'Trapezius': 55, 'Forearms': 70 }
    }
  },
  
  {
    id: 'back-deadlift-sumo',
    name: 'Deadlift - Sumo',
    nameTranslations: {
      en: 'Sumo Deadlift',
      fr: 'Soulevé de Terre Sumo'
    },
    aliases: ['Sumo Deadlift', 'Wide Stance Deadlift'],
    
    category: {
      primary: 'Back',
      secondary: ['Glutes', 'Quadriceps', 'Adductors'],
      bodyPart: 'Full Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Medium'
    },
    
    difficulty: 'Advanced',
    popularityScore: 85,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Strength', 'Powerlifting', 'Hip-Dominant'],
    
    formCues: [
      'Pieds très écartés, pointes vers l\'extérieur',
      'Prise à l\'intérieur des genoux',
      'Hanches plus basses que conventionnel',
      'Pousse les genoux vers l\'extérieur',
      'ROM réduite = potentiel plus de charge'
    ],
    
    muscleActivation: {
      primary: { 'Glutes': 100, 'Quadriceps': 80 },
      secondary: { 'Adductors': 85, 'Erector Spinae': 75, 'Hamstrings': 65 }
    }
  },
  
  {
    id: 'back-trap-bar-deadlift',
    name: 'Trap Bar Deadlift',
    nameTranslations: {
      en: 'Trap Bar Deadlift',
      fr: 'Soulevé de Terre Trap Bar'
    },
    aliases: ['Hex Bar Deadlift', 'Trap Bar Dead'],
    
    category: {
      primary: 'Back',
      secondary: ['Quadriceps', 'Glutes', 'Hamstrings'],
      bodyPart: 'Full Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Trap Bar',
      alternatives: ['Barbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 88,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Beginner-Friendly', 'Lower-Back-Friendly', 'Quad-Emphasis'],
    
    formCues: [
      'Au centre de la trap bar',
      'Prise neutre (moins de stress épaule)',
      'Plus de quad, moins de bas du dos',
      'Excellent pour débutants',
      'Plus facile à apprendre que conventionnel'
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 90, 'Glutes': 90 },
      secondary: { 'Erector Spinae': 70, 'Hamstrings': 70, 'Trapezius': 55 }
    }
  },
  
  {
    id: 'back-rack-pull',
    name: 'Rack Pull',
    nameTranslations: {
      en: 'Rack Pull',
      fr: 'Soulevé de Terre Partiel'
    },
    aliases: ['Block Pull', 'Partial Deadlift'],
    
    category: {
      primary: 'Back',
      secondary: ['Glutes', 'Trapezius'],
      bodyPart: 'Upper Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: [],
      requiresRack: true,
      requiresSpotter: false,
      setupNotes: 'Barre sur rack à hauteur genoux'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Short'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 75,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Strength', 'Lockout', 'Overload'],
    
    formCues: [
      'Barre au niveau des genoux ou au-dessus',
      'ROM réduite = plus de charge possible',
      'Focus sur le lockout',
      'Excellent pour trapèzes et érecteurs',
      'Surcharge pour force deadlift'
    ],
    
    muscleActivation: {
      primary: { 'Erector Spinae': 100, 'Trapezius': 90 },
      secondary: { 'Glutes': 75, 'Latissimus Dorsi': 60 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // ISOLATION & SPECIALTY
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'back-dumbbell-pullover',
    name: 'Dumbbell Pullover',
    nameTranslations: {
      en: 'Dumbbell Pullover',
      fr: 'Pullover Haltère'
    },
    aliases: ['DB Pullover', 'Pullover'],
    
    category: {
      primary: 'Back',
      secondary: ['Chest', 'Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Cable', 'Machine'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc plat, perpendiculaire ou parallèle'
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
    
    tags: ['Isolation', 'Back-Width', 'Rib-Cage-Expansion', 'Old-School'],
    
    formCues: [
      'Allongé perpendiculaire au banc',
      'Hanches basses pour plus d\'étirement',
      'Descends l\'haltère derrière la tête',
      'Coudes légèrement fléchis',
      'Cible lats + serratus'
    ],
    
    muscleActivation: {
      primary: { 'Latissimus Dorsi': 90 },
      secondary: { 'Pectoralis Major': 50, 'Triceps (Long Head)': 45, 'Serratus Anterior': 55 }
    }
  },
  
  {
    id: 'back-hyperextension',
    name: 'Back Extension (Hyperextension)',
    nameTranslations: {
      en: 'Back Extension',
      fr: 'Extension Lombaire / Hyperextension'
    },
    aliases: ['Hyperextension', '45° Back Extension', 'Roman Chair'],
    
    category: {
      primary: 'Back',
      secondary: ['Glutes', 'Hamstrings'],
      bodyPart: 'Lower Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Bodyweight'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc à 45° ou horizontal'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: false,
    isFunctional: true,
    
    tags: ['Isolation', 'Lower-Back', 'Rehabilitation', 'Core'],
    
    formCues: [
      'Hanches sur le coussin',
      'Descends jusqu\'à ~90°',
      'Remonte jusqu\'à alignement',
      'Ne pas hyperextendre (ne pas aller au-delà)',
      'Peut tenir un disque pour progresser'
    ],
    
    muscleActivation: {
      primary: { 'Erector Spinae': 100 },
      secondary: { 'Glutes': 70, 'Hamstrings': 60 }
    }
  },
  
  {
    id: 'back-reverse-hyperextension',
    name: 'Reverse Hyperextension',
    nameTranslations: {
      en: 'Reverse Hyperextension',
      fr: 'Hyperextension Inversée'
    },
    aliases: ['Reverse Hyper', 'Glute Ham Developer'],
    
    category: {
      primary: 'Glutes',
      secondary: ['Hamstrings', 'Back'],
      bodyPart: 'Lower Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Bench'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 72,
    isCompound: false,
    isFunctional: true,
    
    tags: ['Isolation', 'Glute-Focus', 'Lower-Back-Friendly', 'Rehabilitation'],
    
    formCues: [
      'Torse sur le banc, jambes pendantes',
      'Monte les jambes en contractant les fessiers',
      'Excellent pour les fessiers',
      'Thérapeutique pour le bas du dos'
    ],
    
    muscleActivation: {
      primary: { 'Glutes': 100, 'Hamstrings': 80 },
      secondary: { 'Erector Spinae': 60 }
    }
  },
  
  {
    id: 'shoulders-face-pull-cable',
    name: 'Face Pull',
    nameTranslations: {
      en: 'Face Pull',
      fr: 'Face Pull / Tirage Visage'
    },
    aliases: ['Cable Face Pull', 'Rope Face Pull'],
    
    category: {
      primary: 'Shoulders',
      secondary: ['Back'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Resistance Band'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Poulie haute avec corde'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 90,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Rear-Delt', 'Rotator-Cuff', 'Posture', 'Shoulder-Health'],
    
    formCues: [
      'Poulie haute, corde',
      'Tire vers le visage',
      'Rotation externe en fin de mouvement',
      'Excellent pour posture et santé épaule',
      'Coudes hauts'
    ],
    
    muscleActivation: {
      primary: { 'Rear Deltoid': 100, 'Rhomboids': 85 },
      secondary: { 'External Rotators': 75, 'Mid-Traps': 70 }
    }
  },
  
  {
    id: 'back-shrugs-barbell',
    name: 'Barbell Shrugs',
    nameTranslations: {
      en: 'Barbell Shrugs',
      fr: 'Shrugs Barre'
    },
    aliases: ['Shrugs', 'Trap Shrugs', 'Shoulder Shrugs'],
    
    category: {
      primary: 'Back',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Machine', 'Trap Bar'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Short'
    },
    
    difficulty: 'Beginner',
    popularityScore: 80,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Trapezius', 'Upper-Back'],
    
    formCues: [
      'Debout, barre devant les cuisses',
      'Monte les épaules vers les oreilles',
      'Tiens 1-2 sec en haut',
      'Ne pas rouler les épaules (inutile et dangereux)'
    ],
    
    muscleActivation: {
      primary: { 'Upper Trapezius': 100 },
      secondary: { 'Levator Scapulae': 60 }
    }
  },
  
  {
    id: 'back-shrugs-dumbbell',
    name: 'Dumbbell Shrugs',
    nameTranslations: {
      en: 'Dumbbell Shrugs',
      fr: 'Shrugs Haltères'
    },
    aliases: ['DB Shrugs'],
    
    category: {
      primary: 'Back',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Machine'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Short'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Trapezius', 'Home-Gym'],
    
    formCues: [
      'Haltères sur les côtés',
      'Plus grande ROM que barre',
      'Position plus naturelle des mains'
    ],
    
    muscleActivation: {
      primary: { 'Upper Trapezius': 100 },
      secondary: { 'Levator Scapulae': 55 }
    }
  },
]
