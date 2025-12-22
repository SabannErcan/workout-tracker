/**
 * 🦵 LEG EXERCISES (Jambes)
 * ~30 exercices couvrant quadriceps, hamstrings, glutes, calves
 */

export const legExercises = [
  // ═══════════════════════════════════════════════════════════════
  // SQUATS - COMPOUND
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'legs-squat-barbell',
    name: 'Squat - Barbell (Back Squat)',
    nameTranslations: {
      en: 'Barbell Back Squat',
      fr: 'Squat Barre / Back Squat'
    },
    aliases: ['Back Squat', 'Squat', 'Barbell Squat', 'Squat Barre'],
    
    category: {
      primary: 'Legs',
      secondary: ['Glutes', 'Core', 'Back'],
      bodyPart: 'Lower Body',
      movementPattern: 'Squat'
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
    popularityScore: 99,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Strength', 'Mass-Building', 'Powerlifting', 'King-of-Exercises'],
    
    formCues: [
      'Barre sur les trapèzes (high bar) ou deltoïdes (low bar)',
      'Pieds largeur d\'épaules ou légèrement plus',
      'Pointes de pieds légèrement vers l\'extérieur',
      'Descends en poussant les hanches en arrière',
      'Genoux dans l\'axe des orteils',
      'Descends au moins jusqu\'à parallèle',
      'Remonte en poussant dans le sol',
      'Garde le torse droit'
    ],
    
    commonMistakes: [
      '❌ Genoux qui rentrent vers l\'intérieur',
      '❌ Talons qui décollent',
      '❌ Dos arrondi (butt wink)',
      '❌ ROM insuffisante',
      '❌ Regarder vers le haut'
    ],
    
    safetyTips: [
      '⚠️ Utilise un rack avec sécurités',
      '⚠️ Demande un spotter si tu vas lourd',
      '⚠️ Échauffe progressivement',
      '⚠️ Apprends à "dumper" la barre en sécurité'
    ],
    
    variations: [
      { id: 'legs-squat-front', name: 'Front Squat', targetShift: 'More quads, less back' },
      { id: 'legs-squat-low-bar', name: 'Low Bar Squat', targetShift: 'More posterior chain' },
      { id: 'legs-squat-pause', name: 'Pause Squat', targetShift: 'Strength out of hole' }
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 100, 'Glutes': 90 },
      secondary: { 'Hamstrings': 65, 'Erector Spinae': 60, 'Core': 55, 'Adductors': 50 }
    }
  },
  
  {
    id: 'legs-squat-front',
    name: 'Front Squat',
    nameTranslations: {
      en: 'Front Squat',
      fr: 'Squat Avant / Front Squat'
    },
    aliases: ['Front Squat', 'Squat Avant'],
    
    category: {
      primary: 'Legs',
      secondary: ['Core', 'Back'],
      bodyPart: 'Lower Body',
      movementPattern: 'Squat'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Kettlebell'],
      requiresRack: true,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Advanced',
    popularityScore: 88,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Quad-Focus', 'Olympic', 'Core-Heavy'],
    
    formCues: [
      'Barre devant, sur les clavicules/deltoïdes',
      'Position clean grip ou croisée',
      'Coudes hauts tout le mouvement',
      'Plus vertical que back squat',
      'Plus de quad, moins de fessier',
      'Excellent pour la mobilité'
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 100 },
      secondary: { 'Glutes': 70, 'Core': 75, 'Upper Back': 60 }
    }
  },
  
  {
    id: 'legs-squat-goblet',
    name: 'Goblet Squat',
    nameTranslations: {
      en: 'Goblet Squat',
      fr: 'Goblet Squat'
    },
    aliases: ['Goblet Squat', 'DB Squat'],
    
    category: {
      primary: 'Legs',
      secondary: ['Core'],
      bodyPart: 'Lower Body',
      movementPattern: 'Squat'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Kettlebell'],
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
    popularityScore: 85,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Beginner-Friendly', 'Home-Gym', 'Mobility'],
    
    formCues: [
      'Tiens un haltère ou kettlebell contre la poitrine',
      'Coudes entre les genoux en bas',
      'Excellent pour apprendre le squat',
      'Parfait pour mobilité',
      'Auto-corrige la position du torse'
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 95, 'Glutes': 85 },
      secondary: { 'Core': 60, 'Upper Back': 45 }
    }
  },
  
  {
    id: 'legs-squat-smith-machine',
    name: 'Smith Machine Squat',
    nameTranslations: {
      en: 'Smith Machine Squat',
      fr: 'Squat Smith Machine'
    },
    aliases: ['Smith Squat', 'Guided Squat'],
    
    category: {
      primary: 'Legs',
      secondary: ['Glutes'],
      bodyPart: 'Lower Body',
      movementPattern: 'Squat'
    },
    
    equipment: {
      type: 'Smith Machine',
      alternatives: ['Barbell'],
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
    popularityScore: 75,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Machine', 'Safe', 'Guided'],
    
    formCues: [
      'Trajectoire guidée fixe',
      'Pieds légèrement en avant de la barre',
      'Moins de travail stabilisateurs',
      'Bon pour débutants ou réhabilitation'
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 95, 'Glutes': 80 },
      secondary: { 'Hamstrings': 50 }
    }
  },
  
  {
    id: 'legs-squat-bulgarian-split',
    name: 'Bulgarian Split Squat',
    nameTranslations: {
      en: 'Bulgarian Split Squat',
      fr: 'Fentes Bulgares / Bulgarian Split Squat'
    },
    aliases: ['Bulgarian Squat', 'Rear Foot Elevated Split Squat', 'RFESS'],
    
    category: {
      primary: 'Legs',
      secondary: ['Glutes', 'Core'],
      bodyPart: 'Lower Body',
      movementPattern: 'Lunge'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Bodyweight', 'Kettlebell'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc pour pied arrière'
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
    
    tags: ['Compound', 'Unilateral', 'Balance', 'Quad-Focus', 'Home-Gym'],
    
    formCues: [
      'Pied arrière sur un banc',
      'Descends verticalement',
      'Genou avant ne dépasse pas excessivement l\'orteil',
      'Excellent pour équilibre musculaire',
      'Peut remplacer le squat back'
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 100, 'Glutes': 90 },
      secondary: { 'Hamstrings': 55, 'Core': 60, 'Hip Flexors': 45 }
    }
  },
  
  {
    id: 'legs-squat-hack',
    name: 'Hack Squat',
    nameTranslations: {
      en: 'Hack Squat',
      fr: 'Hack Squat Machine'
    },
    aliases: ['Hack Squat Machine', 'Reverse Hack'],
    
    category: {
      primary: 'Legs',
      secondary: ['Glutes'],
      bodyPart: 'Lower Body',
      movementPattern: 'Squat'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Barbell'],
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
    popularityScore: 88,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Machine', 'Quad-Focus', 'Safe'],
    
    formCues: [
      'Dos contre le dossier',
      'Pieds sur la plateforme',
      'Position des pieds affecte le ciblage',
      'Descends profond',
      'Excellent pour isoler les quads'
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 100 },
      secondary: { 'Glutes': 70, 'Hamstrings': 40 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // LEG PRESS & MACHINE COMPOUNDS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'legs-leg-press',
    name: 'Leg Press',
    nameTranslations: {
      en: 'Leg Press',
      fr: 'Presse à Cuisses'
    },
    aliases: ['Leg Press Machine', 'Presse à Cuisses', '45° Leg Press'],
    
    category: {
      primary: 'Legs',
      secondary: ['Glutes'],
      bodyPart: 'Lower Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Barbell Squat'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Diagonal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 95,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Machine', 'Safe', 'Mass-Building', 'High-Volume'],
    
    formCues: [
      'Assis, dos bien calé',
      'Pieds sur la plateforme largeur épaules',
      'Ne verrouille jamais complètement les genoux',
      'Descends jusqu\'à 90° ou plus',
      'Position pieds haute = plus fessiers',
      'Position pieds basse = plus quads'
    ],
    
    commonMistakes: [
      '❌ Verrouiller les genoux (très dangereux)',
      '❌ Bas du dos qui décolle du siège',
      '❌ ROM insuffisante',
      '❌ Charge excessive sans contrôle'
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 100, 'Glutes': 80 },
      secondary: { 'Hamstrings': 50, 'Calves': 20 }
    }
  },
  
  {
    id: 'legs-leg-press-single',
    name: 'Single Leg Press',
    nameTranslations: {
      en: 'Single Leg Press',
      fr: 'Presse à Cuisses Unilatérale'
    },
    aliases: ['One Leg Press', 'Unilateral Leg Press'],
    
    category: {
      primary: 'Legs',
      secondary: ['Glutes'],
      bodyPart: 'Lower Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Diagonal',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 78,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Unilateral', 'Balance', 'Machine'],
    
    formCues: [
      'Un pied sur la plateforme',
      'L\'autre jambe au repos',
      'Corrige les déséquilibres',
      'Plus de ROM possible'
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 100, 'Glutes': 85 },
      secondary: { 'Hamstrings': 55 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // LUNGES - COMPOUND
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'legs-lunge-dumbbell',
    name: 'Lunges - Dumbbell',
    nameTranslations: {
      en: 'Dumbbell Lunges',
      fr: 'Fentes Haltères'
    },
    aliases: ['Walking Lunges', 'DB Lunges', 'Fentes'],
    
    category: {
      primary: 'Legs',
      secondary: ['Glutes', 'Core'],
      bodyPart: 'Lower Body',
      movementPattern: 'Lunge'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Bodyweight'],
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
    popularityScore: 90,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Unilateral', 'Functional', 'Home-Gym'],
    
    formCues: [
      'Haltères sur les côtés',
      'Grand pas en avant ou en arrière',
      'Descends jusqu\'à ce que le genou arrière touche presque le sol',
      'Pousse avec le talon avant',
      'Garde le torse droit'
    ],
    
    variations: [
      { id: 'legs-lunge-walking', name: 'Walking Lunges', targetShift: 'More functional' },
      { id: 'legs-lunge-reverse', name: 'Reverse Lunges', targetShift: 'Easier on knees' },
      { id: 'legs-lunge-lateral', name: 'Lateral Lunges', targetShift: 'Adductors' }
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 95, 'Glutes': 90 },
      secondary: { 'Hamstrings': 60, 'Core': 50, 'Calves': 30 }
    }
  },
  
  {
    id: 'legs-lunge-reverse',
    name: 'Reverse Lunges',
    nameTranslations: {
      en: 'Reverse Lunges',
      fr: 'Fentes Arrière'
    },
    aliases: ['Back Lunges', 'Step Back Lunges'],
    
    category: {
      primary: 'Legs',
      secondary: ['Glutes'],
      bodyPart: 'Lower Body',
      movementPattern: 'Lunge'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Bodyweight'],
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
    popularityScore: 85,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Knee-Friendly', 'Unilateral', 'Beginner-Friendly'],
    
    formCues: [
      'Recule plutôt qu\'avancer',
      'Moins de stress sur les genoux',
      'Plus de contrôle',
      'Recommandé si douleurs genoux'
    ],
    
    muscleActivation: {
      primary: { 'Glutes': 95, 'Quadriceps': 90 },
      secondary: { 'Hamstrings': 55, 'Core': 45 }
    }
  },
  
  {
    id: 'legs-lunge-walking',
    name: 'Walking Lunges',
    nameTranslations: {
      en: 'Walking Lunges',
      fr: 'Fentes Marchées'
    },
    aliases: ['Fentes Marchées', 'Traveling Lunges'],
    
    category: {
      primary: 'Legs',
      secondary: ['Glutes', 'Core'],
      bodyPart: 'Lower Body',
      movementPattern: 'Lunge'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Bodyweight'],
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
    
    tags: ['Compound', 'Cardio', 'Functional', 'Space-Required'],
    
    formCues: [
      'Avance à chaque rep',
      'Nécessite de l\'espace',
      'Plus fonctionnel',
      'Composante cardio'
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 95, 'Glutes': 90 },
      secondary: { 'Hamstrings': 60, 'Core': 55, 'Calves': 35 }
    }
  },
  
  {
    id: 'legs-step-up',
    name: 'Step Ups',
    nameTranslations: {
      en: 'Step Ups',
      fr: 'Step Ups / Montées sur Banc'
    },
    aliases: ['Box Step Ups', 'Bench Step Ups'],
    
    category: {
      primary: 'Legs',
      secondary: ['Glutes'],
      bodyPart: 'Lower Body',
      movementPattern: 'Lunge'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Bodyweight'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc ou box stable'
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
    isFunctional: true,
    
    tags: ['Compound', 'Functional', 'Unilateral', 'Home-Gym'],
    
    formCues: [
      'Monte sur un banc stable',
      'Pousse avec la jambe du haut uniquement',
      'Ne pas pousser avec la jambe au sol',
      'Contrôle la descente'
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 90, 'Glutes': 95 },
      secondary: { 'Hamstrings': 55, 'Calves': 40 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // HAMSTRINGS - COMPOUND (DEADLIFT VARIATIONS)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'legs-romanian-deadlift-barbell',
    name: 'Romanian Deadlift - Barbell',
    nameTranslations: {
      en: 'Romanian Deadlift',
      fr: 'Soulevé de Terre Roumain / RDL'
    },
    aliases: ['RDL', 'Romanian Deadlift', 'Stiff Leg Deadlift', 'Soulevé Jambes Tendues'],
    
    category: {
      primary: 'Hamstrings',
      secondary: ['Glutes', 'Back'],
      bodyPart: 'Lower Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Kettlebell'],
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
    popularityScore: 95,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Hamstring-Focus', 'Hinge', 'Mass-Building'],
    
    formCues: [
      'Départ debout, barre devant les cuisses',
      'Jambes quasi tendues (légère flexion)',
      'Pousse les hanches en arrière',
      'Barre reste près du corps',
      'Étirement maximum des ischios',
      'Remonte en contractant les fessiers'
    ],
    
    commonMistakes: [
      '❌ Arrondir le dos',
      '❌ Jambes trop tendues (locked)',
      '❌ Descendre trop bas',
      '❌ Barre trop loin du corps'
    ],
    
    muscleActivation: {
      primary: { 'Hamstrings': 100, 'Glutes': 85 },
      secondary: { 'Erector Spinae': 70, 'Adductors': 45 }
    }
  },
  
  {
    id: 'legs-romanian-deadlift-dumbbell',
    name: 'Romanian Deadlift - Dumbbell',
    nameTranslations: {
      en: 'Dumbbell Romanian Deadlift',
      fr: 'Soulevé de Terre Roumain Haltères'
    },
    aliases: ['DB RDL', 'Dumbbell RDL'],
    
    category: {
      primary: 'Hamstrings',
      secondary: ['Glutes', 'Back'],
      bodyPart: 'Lower Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Kettlebell'],
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
    isFunctional: true,
    
    tags: ['Compound', 'Home-Gym', 'Hamstring-Focus', 'Beginner-Friendly'],
    
    formCues: [
      'Haltères devant ou sur les côtés',
      'Plus de ROM possible que barre',
      'Parfait pour home gym'
    ],
    
    muscleActivation: {
      primary: { 'Hamstrings': 100, 'Glutes': 85 },
      secondary: { 'Erector Spinae': 65 }
    }
  },
  
  {
    id: 'legs-rdl-single-leg',
    name: 'Single Leg Romanian Deadlift',
    nameTranslations: {
      en: 'Single Leg RDL',
      fr: 'RDL Unilatéral'
    },
    aliases: ['Single Leg RDL', 'One Leg Deadlift'],
    
    category: {
      primary: 'Hamstrings',
      secondary: ['Glutes', 'Core'],
      bodyPart: 'Lower Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Kettlebell', 'Bodyweight'],
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
    popularityScore: 82,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Unilateral', 'Balance', 'Functional'],
    
    formCues: [
      'Debout sur une jambe',
      'L\'autre jambe part en arrière',
      'Excellent pour équilibre',
      'Travaille les stabilisateurs'
    ],
    
    muscleActivation: {
      primary: { 'Hamstrings': 100, 'Glutes': 90 },
      secondary: { 'Core': 70, 'Hip Stabilizers': 65 }
    }
  },
  
  {
    id: 'legs-good-morning',
    name: 'Good Morning',
    nameTranslations: {
      en: 'Good Morning',
      fr: 'Good Morning / Révérence'
    },
    aliases: ['Good Morning', 'Barbell Good Morning'],
    
    category: {
      primary: 'Hamstrings',
      secondary: ['Glutes', 'Back'],
      bodyPart: 'Lower Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell'],
      requiresRack: true,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Advanced',
    popularityScore: 70,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Advanced', 'Posterior-Chain', 'Powerlifting-Accessory'],
    
    formCues: [
      'Barre sur les trapèzes comme squat',
      'Jambes légèrement fléchies',
      'Penche le torse vers l\'avant',
      'Pousse les hanches en arrière',
      'Commence léger!'
    ],
    
    muscleActivation: {
      primary: { 'Hamstrings': 95, 'Erector Spinae': 95 },
      secondary: { 'Glutes': 75 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // HAMSTRINGS - ISOLATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'legs-leg-curl-lying',
    name: 'Leg Curl - Lying',
    nameTranslations: {
      en: 'Lying Leg Curl',
      fr: 'Leg Curl Couché'
    },
    aliases: ['Lying Leg Curl', 'Prone Leg Curl', 'Leg Curl Machine'],
    
    category: {
      primary: 'Hamstrings',
      secondary: [],
      bodyPart: 'Lower Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 90,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Machine', 'Hamstring-Focus', 'Beginner-Friendly'],
    
    formCues: [
      'Allongé face contre le coussin',
      'Pads sur les chevilles',
      'Remonte les talons vers les fesses',
      'Contrôle la descente',
      'Ne soulève pas les hanches'
    ],
    
    muscleActivation: {
      primary: { 'Hamstrings': 100 },
      secondary: { 'Calves': 25 }
    }
  },
  
  {
    id: 'legs-leg-curl-seated',
    name: 'Leg Curl - Seated',
    nameTranslations: {
      en: 'Seated Leg Curl',
      fr: 'Leg Curl Assis'
    },
    aliases: ['Seated Leg Curl'],
    
    category: {
      primary: 'Hamstrings',
      secondary: [],
      bodyPart: 'Lower Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 88,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Machine', 'Hamstring-Focus'],
    
    formCues: [
      'Assis, cuisses sous le pad supérieur',
      'Chevilles sur le pad inférieur',
      'Plus d\'étirement que couché',
      'Meilleur pour hypertrophie'
    ],
    
    muscleActivation: {
      primary: { 'Hamstrings': 100 },
      secondary: {}
    }
  },
  
  {
    id: 'legs-nordic-curl',
    name: 'Nordic Hamstring Curl',
    nameTranslations: {
      en: 'Nordic Hamstring Curl',
      fr: 'Nordic Curl / Curl Nordique'
    },
    aliases: ['Nordic Curl', 'Russian Curl', 'Natural GHR'],
    
    category: {
      primary: 'Hamstrings',
      secondary: [],
      bodyPart: 'Lower Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: true,
      setupNotes: 'Quelque chose pour bloquer les pieds'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Advanced',
    popularityScore: 75,
    isCompound: false,
    isFunctional: true,
    
    tags: ['Isolation', 'Bodyweight', 'Advanced', 'Injury-Prevention'],
    
    formCues: [
      'À genoux, pieds bloqués',
      'Descends le torse vers l\'avant',
      'Résiste avec les ischios',
      'Mouvement excentrique',
      'Excellent pour prévention blessures'
    ],
    
    muscleActivation: {
      primary: { 'Hamstrings': 100 },
      secondary: {}
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // QUADRICEPS - ISOLATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'legs-leg-extension',
    name: 'Leg Extension',
    nameTranslations: {
      en: 'Leg Extension',
      fr: 'Leg Extension / Extension des Jambes'
    },
    aliases: ['Leg Extension Machine', 'Quad Extension'],
    
    category: {
      primary: 'Legs',
      secondary: [],
      bodyPart: 'Lower Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: [],
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
    
    tags: ['Isolation', 'Machine', 'Quad-Focus', 'Finisher'],
    
    formCues: [
      'Assis, dos contre le dossier',
      'Pad sur les chevilles',
      'Étends les jambes complètement',
      'Contracte fort les quads en haut',
      'Contrôle la descente'
    ],
    
    commonMistakes: [
      '❌ Soulever les fesses du siège',
      '❌ Descente non contrôlée',
      '❌ Utiliser le momentum'
    ],
    
    muscleActivation: {
      primary: { 'Quadriceps': 100 },
      secondary: {}
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // GLUTES - HIP THRUST & BRIDGES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'legs-hip-thrust-barbell',
    name: 'Hip Thrust - Barbell',
    nameTranslations: {
      en: 'Barbell Hip Thrust',
      fr: 'Hip Thrust Barre'
    },
    aliases: ['Hip Thrust', 'Barbell Glute Bridge', 'Hip Thrust Barre'],
    
    category: {
      primary: 'Glutes',
      secondary: ['Hamstrings'],
      bodyPart: 'Lower Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Machine', 'Bodyweight'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Banc + barre avec pad'
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Horizontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 92,
    isCompound: false,
    isFunctional: true,
    
    tags: ['Isolation', 'Glute-Focus', 'Mass-Building', 'Popular'],
    
    formCues: [
      'Haut du dos sur un banc',
      'Barre sur les hanches (avec pad)',
      'Pieds à plat, genoux à 90°',
      'Monte les hanches vers le plafond',
      'Contracte fort les fessiers en haut',
      'Chin tucked (menton rentré)'
    ],
    
    muscleActivation: {
      primary: { 'Glutes': 100 },
      secondary: { 'Hamstrings': 55, 'Quadriceps': 30 }
    }
  },
  
  {
    id: 'legs-glute-bridge',
    name: 'Glute Bridge',
    nameTranslations: {
      en: 'Glute Bridge',
      fr: 'Pont Fessier'
    },
    aliases: ['Bridge', 'Pont Fessier', 'Floor Bridge'],
    
    category: {
      primary: 'Glutes',
      secondary: ['Hamstrings'],
      bodyPart: 'Lower Body',
      movementPattern: 'Hinge'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Dumbbell', 'Barbell'],
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
    isFunctional: true,
    
    tags: ['Isolation', 'Bodyweight', 'Beginner-Friendly', 'Home-Gym'],
    
    formCues: [
      'Allongé au sol, genoux pliés',
      'Pieds à plat',
      'Monte les hanches',
      'Serre les fessiers en haut',
      'Version de base du hip thrust'
    ],
    
    muscleActivation: {
      primary: { 'Glutes': 100 },
      secondary: { 'Hamstrings': 50 }
    }
  },
  
  {
    id: 'legs-hip-abduction-machine',
    name: 'Hip Abduction Machine',
    nameTranslations: {
      en: 'Hip Abduction Machine',
      fr: 'Machine Abduction Hanches'
    },
    aliases: ['Abductor Machine', 'Good Girl Machine'],
    
    category: {
      primary: 'Glutes',
      secondary: [],
      bodyPart: 'Lower Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Cable', 'Resistance Band'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Lateral',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Machine', 'Glute-Medius', 'Accessory'],
    
    formCues: [
      'Écarte les jambes contre la résistance',
      'Cible le gluteus medius',
      'Important pour stabilité hanche'
    ],
    
    muscleActivation: {
      primary: { 'Gluteus Medius': 100, 'Gluteus Maximus': 60 },
      secondary: { 'TFL': 45 }
    }
  },
  
  {
    id: 'legs-hip-adduction-machine',
    name: 'Hip Adduction Machine',
    nameTranslations: {
      en: 'Hip Adduction Machine',
      fr: 'Machine Adduction Hanches'
    },
    aliases: ['Adductor Machine', 'Bad Girl Machine'],
    
    category: {
      primary: 'Legs',
      secondary: [],
      bodyPart: 'Lower Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Cable'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Lateral',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 78,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Machine', 'Adductors', 'Accessory'],
    
    formCues: [
      'Rapproche les jambes contre la résistance',
      'Cible les adducteurs (intérieur cuisses)'
    ],
    
    muscleActivation: {
      primary: { 'Adductors': 100 },
      secondary: {}
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // CALVES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'legs-calf-raise-standing',
    name: 'Standing Calf Raise',
    nameTranslations: {
      en: 'Standing Calf Raise',
      fr: 'Mollets Debout'
    },
    aliases: ['Calf Raise', 'Standing Calf', 'Mollets'],
    
    category: {
      primary: 'Calves',
      secondary: [],
      bodyPart: 'Lower Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Dumbbell', 'Bodyweight', 'Smith Machine'],
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
    isFunctional: true,
    
    tags: ['Isolation', 'Calf-Focus', 'High-Rep'],
    
    formCues: [
      'Debout sur une plateforme, talons dans le vide',
      'Monte sur la pointe des pieds',
      'Pause en haut, contracte',
      'Descends pour bien étirer',
      'ROM complète essentielle'
    ],
    
    muscleActivation: {
      primary: { 'Gastrocnemius': 100 },
      secondary: { 'Soleus': 60 }
    }
  },
  
  {
    id: 'legs-calf-raise-seated',
    name: 'Seated Calf Raise',
    nameTranslations: {
      en: 'Seated Calf Raise',
      fr: 'Mollets Assis'
    },
    aliases: ['Seated Calf', 'Soleus Raise'],
    
    category: {
      primary: 'Calves',
      secondary: [],
      bodyPart: 'Lower Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Dumbbell'],
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
    popularityScore: 80,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Machine', 'Soleus-Focus'],
    
    formCues: [
      'Assis, genoux sous le pad',
      'Cible le soléaire (gastros moins actifs)',
      'Important pour mollets complets',
      'Complémentaire au debout'
    ],
    
    muscleActivation: {
      primary: { 'Soleus': 100 },
      secondary: { 'Gastrocnemius': 40 }
    }
  },
  
  {
    id: 'legs-calf-raise-donkey',
    name: 'Donkey Calf Raise',
    nameTranslations: {
      en: 'Donkey Calf Raise',
      fr: 'Mollets Âne'
    },
    aliases: ['Donkey Calf', 'Bent Over Calf Raise'],
    
    category: {
      primary: 'Calves',
      secondary: [],
      bodyPart: 'Lower Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Bodyweight'],
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
    popularityScore: 65,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Old-School', 'Calf-Focus'],
    
    formCues: [
      'Penché à 90°, appui sur les avant-bras',
      'Charge sur les hanches',
      'Excellent étirement des gastros',
      'Version classique Arnold-era'
    ],
    
    muscleActivation: {
      primary: { 'Gastrocnemius': 100 },
      secondary: { 'Soleus': 50 }
    }
  },
]
