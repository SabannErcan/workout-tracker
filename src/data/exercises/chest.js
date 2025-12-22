/**
 * 💪 CHEST EXERCISES (Pectoraux)
 * ~20 exercices couvrant tous les angles et équipements
 */

export const chestExercises = [
  // ═══════════════════════════════════════════════════════════════
  // PRESSING MOVEMENTS - BARBELL
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'chest-bench-press-barbell',
    name: 'Bench Press - Barbell',
    nameTranslations: {
      en: 'Barbell Bench Press',
      fr: 'Développé Couché Barre'
    },
    aliases: ['Bench Press', 'Flat Bench Press', 'BB Bench', 'Développé Couché'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders', 'Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Smith Machine', 'Machine'],
      requiresRack: true,
      requiresSpotter: true,
      setupNotes: 'Flat bench + barbell rack'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 98,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Strength', 'Hypertrophy', 'Mass-Building', 'Powerlifting', 'Requires-Spotter'],
    
    formCues: [
      'Rétracte et abaisse les omoplates',
      'Grip légèrement plus large que les épaules',
      'Descends la barre au milieu de la poitrine',
      'Coudes à ~45° (pas 90°)',
      'Pousse à travers les pieds',
      'Garde un léger arc lombaire',
      'Lock-out complet en haut'
    ],
    
    commonMistakes: [
      '❌ Rebondir la barre sur la poitrine',
      '❌ Coudes trop écartés (stress épaule)',
      '❌ Lever les fesses du banc',
      '❌ ROM incomplète',
      '❌ Poignets cassés en arrière'
    ],
    
    safetyTips: [
      'TOUJOURS utiliser un pareur pour séries lourdes',
      'Utiliser les barres de sécurité si seul',
      'Commencer avec barre vide pour apprendre',
      'Progresser par paliers de 2.5kg'
    ],
    
    variations: [
      { id: 'chest-incline-press-barbell', name: 'Incline Bench Press', targetShift: 'Upper chest' },
      { id: 'chest-decline-press-barbell', name: 'Decline Bench Press', targetShift: 'Lower chest' },
      { id: 'chest-close-grip-bench-press', name: 'Close-Grip Bench Press', targetShift: 'Triceps emphasis' }
    ],
    
    alternatives: [
      { exerciseId: 'chest-bench-press-dumbbell', reason: 'Plus grande ROM, unilatéral', whenToUse: 'Déséquilibre musculaire' },
      { exerciseId: 'chest-push-up', reason: 'Poids du corps, pas d\'équipement', whenToUse: 'Home workout' }
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major': 100 },
      secondary: { 'Anterior Deltoid': 70, 'Triceps': 65, 'Serratus Anterior': 30 }
    },
    
    repRanges: {
      strength: '1-5 reps',
      hypertrophy: '6-12 reps',
      endurance: '15+ reps'
    }
  },
  
  {
    id: 'chest-incline-press-barbell',
    name: 'Incline Bench Press - Barbell',
    nameTranslations: {
      en: 'Incline Barbell Bench Press',
      fr: 'Développé Incliné Barre'
    },
    aliases: ['Incline Press', 'Incline Bench', 'Développé Incliné'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders', 'Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Smith Machine', 'Machine'],
      requiresRack: true,
      requiresSpotter: true,
      setupNotes: 'Banc incliné 30-45° + rack'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Incline',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 92,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Strength', 'Hypertrophy', 'Upper-Chest', 'Requires-Spotter'],
    
    formCues: [
      'Banc à 30-45° d\'inclinaison',
      'Descends la barre vers le haut de la poitrine',
      'Garde les épaules en arrière',
      'Coudes à 45-60°',
      'Contrôle la descente'
    ],
    
    commonMistakes: [
      '❌ Inclinaison trop haute (devient épaules)',
      '❌ Descendre trop bas (vers abdos)',
      '❌ Décoller du banc'
    ],
    
    variations: [
      { id: 'chest-bench-press-barbell', name: 'Flat Bench Press', targetShift: 'Mid chest' },
      { id: 'chest-incline-press-dumbbell', name: 'Incline DB Press', targetShift: 'Better ROM' }
    ],
    
    alternatives: [
      { exerciseId: 'chest-incline-press-dumbbell', reason: 'Meilleure ROM', whenToUse: 'Mobilité limitée' },
      { exerciseId: 'chest-incline-push-up', reason: 'Sans équipement', whenToUse: 'Home workout' }
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Upper)': 100 },
      secondary: { 'Anterior Deltoid': 80, 'Triceps': 60 }
    },
    
    difficulty: 'Intermediate',
    popularityScore: 92,
    isCompound: true,
    isFunctional: true
  },
  
  {
    id: 'chest-decline-press-barbell',
    name: 'Decline Bench Press - Barbell',
    nameTranslations: {
      en: 'Decline Barbell Bench Press',
      fr: 'Développé Décliné Barre'
    },
    aliases: ['Decline Press', 'Decline Bench', 'Développé Décliné'],
    
    category: {
      primary: 'Chest',
      secondary: ['Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Smith Machine'],
      requiresRack: true,
      requiresSpotter: true,
      setupNotes: 'Banc décliné 15-30° + rack'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Decline',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 75,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Strength', 'Lower-Chest', 'Requires-Spotter'],
    
    formCues: [
      'Banc décliné 15-30°',
      'Pieds bien calés',
      'Descends vers le bas de la poitrine',
      'Moins de stress sur les épaules que flat'
    ],
    
    variations: [
      { id: 'chest-bench-press-barbell', name: 'Flat Bench Press', targetShift: 'Mid chest' }
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Lower)': 100 },
      secondary: { 'Triceps': 70, 'Anterior Deltoid': 50 }
    }
  },
  
  {
    id: 'chest-close-grip-bench-press',
    name: 'Close-Grip Bench Press',
    nameTranslations: {
      en: 'Close-Grip Bench Press',
      fr: 'Développé Couché Prise Serrée'
    },
    aliases: ['CGBP', 'Close Grip Bench', 'Prise Serrée'],
    
    category: {
      primary: 'Triceps',
      secondary: ['Chest', 'Shoulders'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['EZ Bar', 'Smith Machine'],
      requiresRack: true,
      requiresSpotter: true
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
    
    tags: ['Compound', 'Strength', 'Triceps-Focus', 'Powerlifting'],
    
    formCues: [
      'Mains à largeur d\'épaules ou légèrement moins',
      'Coudes près du corps',
      'Descends vers le bas de la poitrine',
      'Focus sur extension des triceps'
    ],
    
    muscleActivation: {
      primary: { 'Triceps': 100 },
      secondary: { 'Pectoralis Major': 70, 'Anterior Deltoid': 50 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // PRESSING MOVEMENTS - DUMBBELL
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'chest-bench-press-dumbbell',
    name: 'Bench Press - Dumbbell',
    nameTranslations: {
      en: 'Dumbbell Bench Press',
      fr: 'Développé Couché Haltères'
    },
    aliases: ['DB Bench Press', 'Dumbbell Press', 'Développé Couché Haltères'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders', 'Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Machine'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Flat bench + haltères'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 95,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Hypertrophy', 'Unilateral', 'Beginner-Friendly', 'Home-Gym'],
    
    formCues: [
      'Plus grande ROM que la barre',
      'Haltères peuvent descendre plus bas',
      'Rotation neutre ou pronation possible',
      'Travail unilatéral = équilibre musculaire',
      'Contrôle la descente'
    ],
    
    commonMistakes: [
      '❌ Haltères qui se touchent en haut (perte tension)',
      '❌ Trop descendre (stress épaule)',
      '❌ Asymétrie gauche/droite'
    ],
    
    variations: [
      { id: 'chest-incline-press-dumbbell', name: 'Incline DB Press', targetShift: 'Upper chest' },
      { id: 'chest-decline-press-dumbbell', name: 'Decline DB Press', targetShift: 'Lower chest' }
    ],
    
    alternatives: [
      { exerciseId: 'chest-bench-press-barbell', reason: 'Plus de charge possible', whenToUse: 'Force max' }
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major': 100 },
      secondary: { 'Anterior Deltoid': 65, 'Triceps': 60 }
    }
  },
  
  {
    id: 'chest-incline-press-dumbbell',
    name: 'Incline Bench Press - Dumbbell',
    nameTranslations: {
      en: 'Incline Dumbbell Press',
      fr: 'Développé Incliné Haltères'
    },
    aliases: ['Incline DB Press', 'Incline Dumbbell', 'Développé Incliné Haltères'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders', 'Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Machine', 'Smith Machine'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Incline',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 93,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Hypertrophy', 'Upper-Chest', 'Beginner-Friendly', 'Home-Gym'],
    
    formCues: [
      'Banc à 30-45°',
      'Excellente ROM pour pecs supérieurs',
      'Haltères permettent rotation naturelle',
      'Moins de stress épaule que barre'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Upper)': 100 },
      secondary: { 'Anterior Deltoid': 75, 'Triceps': 55 }
    }
  },
  
  {
    id: 'chest-decline-press-dumbbell',
    name: 'Decline Bench Press - Dumbbell',
    nameTranslations: {
      en: 'Decline Dumbbell Press',
      fr: 'Développé Décliné Haltères'
    },
    aliases: ['Decline DB Press', 'Décliné Haltères'],
    
    category: {
      primary: 'Chest',
      secondary: ['Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Machine'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Decline',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 70,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Lower-Chest', 'Home-Gym'],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Lower)': 100 },
      secondary: { 'Triceps': 65 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // PRESSING MOVEMENTS - MACHINE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'chest-press-machine',
    name: 'Chest Press - Machine',
    nameTranslations: {
      en: 'Machine Chest Press',
      fr: 'Presse Pectoraux Machine'
    },
    aliases: ['Chest Press', 'Seated Chest Press', 'Presse Pectoraux'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders', 'Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Dumbbell', 'Barbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Beginner-Friendly', 'Safe', 'Machine', 'Hypertrophy'],
    
    formCues: [
      'Ajuste le siège pour que les poignées soient au niveau de la poitrine',
      'Garde les épaules en arrière',
      'Pousse sans verrouiller complètement',
      'Contrôle le retour'
    ],
    
    commonMistakes: [
      '❌ Siège mal réglé',
      '❌ Décoller le dos du dossier',
      '❌ Aller trop vite'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major': 100 },
      secondary: { 'Triceps': 60, 'Anterior Deltoid': 55 }
    }
  },
  
  {
    id: 'chest-incline-press-machine',
    name: 'Incline Chest Press - Machine',
    nameTranslations: {
      en: 'Machine Incline Chest Press',
      fr: 'Presse Inclinée Machine'
    },
    aliases: ['Incline Machine Press', 'Presse Inclinée'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders', 'Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Dumbbell', 'Barbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Incline',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 78,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Beginner-Friendly', 'Safe', 'Upper-Chest', 'Machine'],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Upper)': 100 },
      secondary: { 'Anterior Deltoid': 70, 'Triceps': 55 }
    }
  },
  
  {
    id: 'chest-press-smith-machine',
    name: 'Bench Press - Smith Machine',
    nameTranslations: {
      en: 'Smith Machine Bench Press',
      fr: 'Développé Couché Smith Machine'
    },
    aliases: ['Smith Bench Press', 'Smith Machine Press'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders', 'Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Smith Machine',
      alternatives: ['Barbell', 'Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 75,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Beginner-Friendly', 'Safe', 'Machine', 'Solo-Friendly'],
    
    formCues: [
      'Trajectoire guidée = moins de stabilisation',
      'Bon pour isoler les pecs',
      'Peut aller plus lourd seul',
      'Position sous la barre importante'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major': 100 },
      secondary: { 'Triceps': 65, 'Anterior Deltoid': 60 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // PUSH-UPS & BODYWEIGHT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'chest-push-up',
    name: 'Push-Up',
    nameTranslations: {
      en: 'Push-Up',
      fr: 'Pompe'
    },
    aliases: ['Pushup', 'Press-Up', 'Pompes', 'Push Up'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders', 'Triceps', 'Core'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Dumbbell', 'Barbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 96,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Home-Gym', 'Beginner-Friendly', 'Functional', 'Core'],
    
    formCues: [
      'Corps aligné tête-pieds (planche)',
      'Mains légèrement plus larges que les épaules',
      'Coudes à 45°',
      'Descends poitrine près du sol',
      'Gainage constant'
    ],
    
    commonMistakes: [
      '❌ Hanches qui s\'affaissent',
      '❌ Fesses en l\'air',
      '❌ ROM incomplète',
      '❌ Coudes trop écartés'
    ],
    
    variations: [
      { id: 'chest-incline-push-up', name: 'Incline Push-Up', targetShift: 'Easier, lower chest' },
      { id: 'chest-decline-push-up', name: 'Decline Push-Up', targetShift: 'Harder, upper chest' },
      { id: 'chest-diamond-push-up', name: 'Diamond Push-Up', targetShift: 'Triceps focus' },
      { id: 'chest-wide-push-up', name: 'Wide Push-Up', targetShift: 'Chest stretch' }
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major': 100 },
      secondary: { 'Triceps': 70, 'Anterior Deltoid': 65, 'Core': 50 }
    }
  },
  
  {
    id: 'chest-incline-push-up',
    name: 'Incline Push-Up',
    nameTranslations: {
      en: 'Incline Push-Up',
      fr: 'Pompe Inclinée'
    },
    aliases: ['Elevated Push-Up', 'Pompe Surélevée'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders', 'Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc, marche ou mur'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Incline',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 80,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Home-Gym', 'Beginner-Friendly', 'Regression'],
    
    formCues: [
      'Mains sur surface surélevée',
      'Plus facile que pompe classique',
      'Bon pour débutants',
      'Focus lower chest'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Lower)': 100 },
      secondary: { 'Triceps': 65, 'Anterior Deltoid': 55 }
    }
  },
  
  {
    id: 'chest-decline-push-up',
    name: 'Decline Push-Up',
    nameTranslations: {
      en: 'Decline Push-Up',
      fr: 'Pompe Déclinée'
    },
    aliases: ['Feet Elevated Push-Up', 'Pompe Pieds Surélevés'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders', 'Triceps', 'Core'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc ou box pour les pieds'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Decline',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 78,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Home-Gym', 'Upper-Chest', 'Progression'],
    
    formCues: [
      'Pieds sur surface surélevée',
      'Plus dur que pompe classique',
      'Focus upper chest et épaules',
      'Gainage encore plus important'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Upper)': 100 },
      secondary: { 'Anterior Deltoid': 75, 'Triceps': 65, 'Core': 55 }
    }
  },
  
  {
    id: 'chest-diamond-push-up',
    name: 'Diamond Push-Up',
    nameTranslations: {
      en: 'Diamond Push-Up',
      fr: 'Pompe Diamant'
    },
    aliases: ['Triangle Push-Up', 'Close-Grip Push-Up', 'Pompe Mains Serrées'],
    
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
    popularityScore: 82,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Home-Gym', 'Triceps-Focus'],
    
    formCues: [
      'Mains en forme de diamant sous la poitrine',
      'Coudes près du corps',
      'Triceps = muscle principal',
      'Plus difficile que pompe standard'
    ],
    
    muscleActivation: {
      primary: { 'Triceps': 100 },
      secondary: { 'Pectoralis Major': 75, 'Anterior Deltoid': 60 }
    }
  },
  
  {
    id: 'chest-wide-push-up',
    name: 'Wide Push-Up',
    nameTranslations: {
      en: 'Wide Push-Up',
      fr: 'Pompe Large'
    },
    aliases: ['Wide Grip Push-Up', 'Pompe Écartée'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders'],
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
    
    difficulty: 'Beginner',
    popularityScore: 75,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Home-Gym', 'Chest-Stretch'],
    
    formCues: [
      'Mains plus larges que les épaules',
      'Plus d\'étirement pectoral',
      'Moins de triceps',
      'Attention aux épaules'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major': 100 },
      secondary: { 'Anterior Deltoid': 65, 'Triceps': 45 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // DIPS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'chest-dips',
    name: 'Dips - Chest Focus',
    nameTranslations: {
      en: 'Chest Dips',
      fr: 'Dips Pectoraux'
    },
    aliases: ['Chest Dips', 'Dips Pecs', 'Parallel Bar Dips'],
    
    category: {
      primary: 'Chest',
      secondary: ['Triceps', 'Shoulders'],
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
    popularityScore: 88,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Mass-Building', 'Lower-Chest'],
    
    formCues: [
      'Penché en avant 30-45° pour cibler pecs',
      'Coudes écartés',
      'Descends jusqu\'à 90° ou plus',
      'Ne pas verrouiller en haut'
    ],
    
    commonMistakes: [
      '❌ Rester droit (devient triceps)',
      '❌ Descendre trop bas si mobilité limitée',
      '❌ Balancer le corps'
    ],
    
    variations: [
      { id: 'triceps-dips', name: 'Triceps Dips', targetShift: 'Triceps focus (corps droit)' }
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Lower)': 100 },
      secondary: { 'Triceps': 80, 'Anterior Deltoid': 65 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // FLY MOVEMENTS - ISOLATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'chest-dumbbell-fly',
    name: 'Dumbbell Fly',
    nameTranslations: {
      en: 'Dumbbell Fly',
      fr: 'Écarté Couché Haltères'
    },
    aliases: ['DB Fly', 'Chest Fly', 'Écarté Haltères', 'Fly'],
    
    category: {
      primary: 'Chest',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Cable', 'Machine'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 88,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Hypertrophy', 'Chest-Stretch', 'Home-Gym'],
    
    formCues: [
      'Coudes légèrement fléchis (fixés)',
      'Ouvre grand en arc de cercle',
      'Étirement contrôlé en bas',
      'Serre en haut comme si tu faisais un câlin',
      'Ne monte pas les haltères trop haut (perte tension)'
    ],
    
    commonMistakes: [
      '❌ Coudes qui bougent (devient press)',
      '❌ Trop lourd = stress épaule',
      '❌ Descendre trop bas'
    ],
    
    variations: [
      { id: 'chest-incline-dumbbell-fly', name: 'Incline DB Fly', targetShift: 'Upper chest' }
    ],
    
    alternatives: [
      { exerciseId: 'chest-cable-fly-mid', reason: 'Tension constante', whenToUse: 'Meilleure finition' }
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major': 100 },
      secondary: { 'Anterior Deltoid': 30 }
    }
  },
  
  {
    id: 'chest-incline-dumbbell-fly',
    name: 'Incline Dumbbell Fly',
    nameTranslations: {
      en: 'Incline Dumbbell Fly',
      fr: 'Écarté Incliné Haltères'
    },
    aliases: ['Incline DB Fly', 'Incline Fly', 'Écarté Incliné'],
    
    category: {
      primary: 'Chest',
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
      plane: 'Incline',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Hypertrophy', 'Upper-Chest', 'Home-Gym'],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Upper)': 100 },
      secondary: { 'Anterior Deltoid': 35 }
    }
  },
  
  {
    id: 'chest-cable-fly-mid',
    name: 'Cable Fly - Mid',
    nameTranslations: {
      en: 'Cable Fly',
      fr: 'Écarté Poulie Vis-à-Vis'
    },
    aliases: ['Cable Fly', 'Cable Crossover', 'Vis-à-Vis', 'Poulie Vis-à-Vis'],
    
    category: {
      primary: 'Chest',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Dumbbell', 'Machine'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Poulies à hauteur d\'épaule'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 90,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Hypertrophy', 'Constant-Tension', 'Finisher'],
    
    formCues: [
      'Poulies à hauteur d\'épaules',
      'Un pied devant pour stabilité',
      'Coudes légèrement fléchis',
      'Croise légèrement les mains en fin de mouvement',
      'Tension constante tout le mouvement'
    ],
    
    variations: [
      { id: 'chest-cable-fly-high-to-low', name: 'High to Low Cable Fly', targetShift: 'Lower chest' },
      { id: 'chest-cable-fly-low-to-high', name: 'Low to High Cable Fly', targetShift: 'Upper chest' }
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major': 100 },
      secondary: { 'Anterior Deltoid': 25 }
    }
  },
  
  {
    id: 'chest-cable-fly-high-to-low',
    name: 'Cable Fly - High to Low',
    nameTranslations: {
      en: 'High to Low Cable Fly',
      fr: 'Écarté Poulie Haute'
    },
    aliases: ['High Cable Fly', 'Cable Crossover High'],
    
    category: {
      primary: 'Chest',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Dumbbell'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Poulies en position haute'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Decline',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 85,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Hypertrophy', 'Lower-Chest', 'Constant-Tension'],
    
    formCues: [
      'Poulies en haut',
      'Tire vers le bas et l\'intérieur',
      'Focus lower pecs',
      'Finis les mains croisées devant le nombril'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Lower)': 100 },
      secondary: { 'Anterior Deltoid': 20 }
    }
  },
  
  {
    id: 'chest-cable-fly-low-to-high',
    name: 'Cable Fly - Low to High',
    nameTranslations: {
      en: 'Low to High Cable Fly',
      fr: 'Écarté Poulie Basse'
    },
    aliases: ['Low Cable Fly', 'Cable Crossover Low'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Dumbbell'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Poulies en position basse'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Incline',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 83,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Hypertrophy', 'Upper-Chest', 'Constant-Tension'],
    
    formCues: [
      'Poulies en bas',
      'Tire vers le haut et l\'intérieur',
      'Focus upper pecs',
      'Finis les mains croisées devant le visage'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Upper)': 100 },
      secondary: { 'Anterior Deltoid': 35 }
    }
  },
  
  {
    id: 'chest-pec-deck',
    name: 'Pec Deck Machine',
    nameTranslations: {
      en: 'Pec Deck',
      fr: 'Butterfly / Pec Deck'
    },
    aliases: ['Pec Deck', 'Butterfly', 'Machine Fly', 'Peck Deck'],
    
    category: {
      primary: 'Chest',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Dumbbell', 'Cable'],
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
    popularityScore: 85,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Beginner-Friendly', 'Safe', 'Machine', 'Finisher'],
    
    formCues: [
      'Coudes alignés avec les épaules',
      'Contracte fort en position fermée',
      'Contrôle le retour',
      'Ne reviens pas trop loin (protège épaules)'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major': 100 },
      secondary: {}
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // SPECIALTY MOVEMENTS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'chest-floor-press',
    name: 'Floor Press',
    nameTranslations: {
      en: 'Floor Press',
      fr: 'Développé au Sol'
    },
    aliases: ['Floor Press', 'Développé Sol'],
    
    category: {
      primary: 'Chest',
      secondary: ['Triceps', 'Shoulders'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Short'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 72,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Shoulder-Friendly', 'Lockout-Strength', 'Powerlifting'],
    
    formCues: [
      'Allongé au sol (pas de banc)',
      'ROM limité = moins de stress épaule',
      'Focus sur la partie haute du mouvement',
      'Bon pour travailler le lockout'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major': 90 },
      secondary: { 'Triceps': 80, 'Anterior Deltoid': 50 }
    }
  },
  
  {
    id: 'chest-landmine-press',
    name: 'Landmine Press',
    nameTranslations: {
      en: 'Landmine Press',
      fr: 'Press Landmine'
    },
    aliases: ['Landmine Chest Press', 'Angled Press'],
    
    category: {
      primary: 'Chest',
      secondary: ['Shoulders', 'Triceps', 'Core'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Barre coincée dans un coin ou landmine attachment'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Incline',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 75,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Functional', 'Shoulder-Friendly', 'Unilateral'],
    
    formCues: [
      'Barre ancrée au sol',
      'Pousse en arc de cercle',
      'Excellent pour upper chest',
      'Peut être fait unilatéral'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Upper)': 100 },
      secondary: { 'Anterior Deltoid': 70, 'Triceps': 55, 'Core': 40 }
    }
  },
  
  {
    id: 'chest-squeeze-press',
    name: 'Squeeze Press',
    nameTranslations: {
      en: 'Squeeze Press',
      fr: 'Développé Serré Haltères'
    },
    aliases: ['Crush Press', 'Hex Press'],
    
    category: {
      primary: 'Chest',
      secondary: ['Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 70,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Hypertrophy', 'Inner-Chest', 'Home-Gym'],
    
    formCues: [
      'Haltères collés ensemble (prise neutre)',
      'Serre fort les haltères l\'un contre l\'autre',
      'La tension interne cible l\'intérieur des pecs',
      'Press standard mais en serrant'
    ],
    
    muscleActivation: {
      primary: { 'Pectoralis Major (Inner)': 100 },
      secondary: { 'Triceps': 65 }
    }
  },
]
