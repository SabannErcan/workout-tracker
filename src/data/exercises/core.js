/**
 * 🎯 CORE EXERCISES (Abdominaux & Core)
 * ~18 exercices couvrant abs, obliques, lower back, transverse
 */

export const coreExercises = [
  // ═══════════════════════════════════════════════════════════════
  // RECTUS ABDOMINIS - CRUNCHES & SIT-UPS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'core-crunch',
    name: 'Crunch',
    nameTranslations: {
      en: 'Crunch',
      fr: 'Crunch Abdominal'
    },
    aliases: ['Ab Crunch', 'Crunch Classique', 'Basic Crunch'],
    
    category: {
      primary: 'Core',
      secondary: [],
      bodyPart: 'Core',
      movementPattern: 'Flexion'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Cable', 'Machine'],
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
    popularityScore: 90,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Bodyweight', 'Beginner-Friendly', 'Upper-Abs'],
    
    formCues: [
      'Allongé, genoux pliés',
      'Mains derrière la tête (pas de traction!)',
      'Décolle les omoplates du sol',
      'Contracte les abdos, pas le cou',
      'ROM courte mais contrôlée'
    ],
    
    commonMistakes: [
      '❌ Tirer sur le cou',
      '❌ Monter trop haut (devient hip flexor)',
      '❌ Mouvement rapide et saccadé',
      '❌ Retenir sa respiration'
    ],
    
    muscleActivation: {
      primary: { 'Rectus Abdominis (Upper)': 100 },
      secondary: { 'Obliques': 30 }
    }
  },
  
  {
    id: 'core-cable-crunch',
    name: 'Cable Crunch',
    nameTranslations: {
      en: 'Cable Crunch',
      fr: 'Crunch Poulie Haute'
    },
    aliases: ['Kneeling Cable Crunch', 'Rope Crunch'],
    
    category: {
      primary: 'Core',
      secondary: [],
      bodyPart: 'Core',
      movementPattern: 'Flexion'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Machine'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 88,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Cable', 'Progressive-Overload', 'Weighted'],
    
    formCues: [
      'À genoux face à la poulie haute',
      'Corde derrière la tête',
      'Crunch vers le sol',
      'Hanches fixes!',
      'Permet de charger progressivement'
    ],
    
    muscleActivation: {
      primary: { 'Rectus Abdominis': 100 },
      secondary: { 'Obliques': 35 }
    }
  },
  
  {
    id: 'core-sit-up',
    name: 'Sit-Up',
    nameTranslations: {
      en: 'Sit-Up',
      fr: 'Sit-Up / Relevé de Buste'
    },
    aliases: ['Full Sit-Up', 'Relevé de Buste'],
    
    category: {
      primary: 'Core',
      secondary: ['Hip Flexors'],
      bodyPart: 'Core',
      movementPattern: 'Flexion'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Classic', 'Hip-Flexor'],
    
    formCues: [
      'Remonte tout le buste',
      'Implique plus les fléchisseurs de hanches',
      'Pieds ancrés ou libres',
      'Plus fonctionnel que crunch'
    ],
    
    muscleActivation: {
      primary: { 'Rectus Abdominis': 90, 'Hip Flexors': 85 },
      secondary: { 'Obliques': 35 }
    }
  },
  
  {
    id: 'core-reverse-crunch',
    name: 'Reverse Crunch',
    nameTranslations: {
      en: 'Reverse Crunch',
      fr: 'Crunch Inversé'
    },
    aliases: ['Reverse Crunch', 'Crunch Inversé', 'Lower Ab Crunch'],
    
    category: {
      primary: 'Core',
      secondary: [],
      bodyPart: 'Core',
      movementPattern: 'Flexion'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Bench'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 85,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Bodyweight', 'Lower-Abs'],
    
    formCues: [
      'Allongé, jambes levées',
      'Monte le bassin vers le plafond',
      'Focus partie basse des abdos',
      'Ne pas utiliser le momentum'
    ],
    
    muscleActivation: {
      primary: { 'Rectus Abdominis (Lower)': 100 },
      secondary: { 'Obliques': 35, 'Hip Flexors': 30 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // LEG RAISES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'core-hanging-leg-raise',
    name: 'Hanging Leg Raise',
    nameTranslations: {
      en: 'Hanging Leg Raise',
      fr: 'Relevé de Jambes Suspendu'
    },
    aliases: ['Hanging Leg Raise', 'Hanging Knee Raise'],
    
    category: {
      primary: 'Core',
      secondary: ['Hip Flexors'],
      bodyPart: 'Core',
      movementPattern: 'Flexion'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Captain\'s Chair'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Barre de traction'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 90,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Lower-Abs', 'Challenging'],
    
    formCues: [
      'Suspendu à une barre',
      'Monte les jambes (tendues = plus dur)',
      'Jusqu\'à parallèle ou plus',
      'Évite le balancement',
      'Contrôle la descente'
    ],
    
    variations: [
      { id: 'core-hanging-knee-raise', name: 'Hanging Knee Raise', targetShift: 'Easier' },
      { id: 'core-toes-to-bar', name: 'Toes to Bar', targetShift: 'Harder' }
    ],
    
    muscleActivation: {
      primary: { 'Rectus Abdominis (Lower)': 100, 'Hip Flexors': 90 },
      secondary: { 'Obliques': 45, 'Forearms (Grip)': 50 }
    }
  },
  
  {
    id: 'core-lying-leg-raise',
    name: 'Lying Leg Raise',
    nameTranslations: {
      en: 'Lying Leg Raise',
      fr: 'Relevé de Jambes Allongé'
    },
    aliases: ['Floor Leg Raise', 'Flat Leg Raise'],
    
    category: {
      primary: 'Core',
      secondary: ['Hip Flexors'],
      bodyPart: 'Core',
      movementPattern: 'Flexion'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Bench'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 85,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Bodyweight', 'Lower-Abs', 'Home-Gym'],
    
    formCues: [
      'Allongé au sol, bras le long du corps',
      'Jambes tendues, monte vers le plafond',
      'Bas du dos collé au sol',
      'Descente contrôlée'
    ],
    
    muscleActivation: {
      primary: { 'Rectus Abdominis (Lower)': 95, 'Hip Flexors': 85 },
      secondary: { 'Obliques': 30 }
    }
  },
  
  {
    id: 'core-captains-chair-leg-raise',
    name: 'Captain\'s Chair Leg Raise',
    nameTranslations: {
      en: 'Captain\'s Chair Leg Raise',
      fr: 'Relevé de Jambes Chaise Romaine'
    },
    aliases: ['Roman Chair Leg Raise', 'Vertical Knee Raise'],
    
    category: {
      primary: 'Core',
      secondary: ['Hip Flexors'],
      bodyPart: 'Core',
      movementPattern: 'Flexion'
    },
    
    equipment: {
      type: 'Machine',
      alternatives: ['Bodyweight'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Machine', 'Lower-Abs', 'Stable'],
    
    formCues: [
      'Dos contre le dossier',
      'Bras sur les accoudoirs',
      'Monte les genoux ou jambes tendues',
      'Plus stable que suspendu'
    ],
    
    muscleActivation: {
      primary: { 'Rectus Abdominis (Lower)': 100, 'Hip Flexors': 85 },
      secondary: { 'Obliques': 40 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // PLANKS & ISOMETRIC
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'core-plank',
    name: 'Plank',
    nameTranslations: {
      en: 'Plank',
      fr: 'Planche / Gainage'
    },
    aliases: ['Front Plank', 'Gainage', 'Planche'],
    
    category: {
      primary: 'Core',
      secondary: ['Shoulders', 'Back'],
      bodyPart: 'Core',
      movementPattern: 'Isometric'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Isometric',
      plane: 'Sagittal',
      range: 'None'
    },
    
    difficulty: 'Beginner',
    popularityScore: 95,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Isometric', 'Bodyweight', 'Core-Stability', 'Functional'],
    
    formCues: [
      'Sur les avant-bras et les orteils',
      'Corps droit comme une planche',
      'Ne pas lever ou baisser les hanches',
      'Engage tout le core',
      'Respire normalement'
    ],
    
    commonMistakes: [
      '❌ Hanches trop hautes ou trop basses',
      '❌ Retenir sa respiration',
      '❌ Regarder vers le haut',
      '❌ Relâcher le ventre'
    ],
    
    variations: [
      { id: 'core-side-plank', name: 'Side Plank', targetShift: 'Obliques' },
      { id: 'core-plank-shoulder-tap', name: 'Plank Shoulder Tap', targetShift: 'Anti-rotation' }
    ],
    
    muscleActivation: {
      primary: { 'Transverse Abdominis': 100, 'Rectus Abdominis': 85 },
      secondary: { 'Obliques': 70, 'Erector Spinae': 65, 'Shoulders': 50 }
    }
  },
  
  {
    id: 'core-side-plank',
    name: 'Side Plank',
    nameTranslations: {
      en: 'Side Plank',
      fr: 'Planche Latérale'
    },
    aliases: ['Lateral Plank', 'Planche Latérale'],
    
    category: {
      primary: 'Core',
      secondary: ['Shoulders'],
      bodyPart: 'Core',
      movementPattern: 'Isometric'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Isometric',
      plane: 'Frontal',
      range: 'None'
    },
    
    difficulty: 'Beginner',
    popularityScore: 88,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Isometric', 'Bodyweight', 'Obliques', 'Core-Stability'],
    
    formCues: [
      'Sur le côté, un avant-bras au sol',
      'Corps aligné, hanches levées',
      'Tiens le plus longtemps possible',
      'Excellent pour obliques et stabilité'
    ],
    
    muscleActivation: {
      primary: { 'Obliques': 100, 'Quadratus Lumborum': 90 },
      secondary: { 'Transverse Abdominis': 70, 'Gluteus Medius': 55 }
    }
  },
  
  {
    id: 'core-dead-bug',
    name: 'Dead Bug',
    nameTranslations: {
      en: 'Dead Bug',
      fr: 'Dead Bug'
    },
    aliases: ['Dead Bug Exercise'],
    
    category: {
      primary: 'Core',
      secondary: [],
      bodyPart: 'Core',
      movementPattern: 'Anti-Extension'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Isometric',
      plane: 'Sagittal',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 80,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Anti-Extension', 'Rehab', 'Core-Stability'],
    
    formCues: [
      'Allongé sur le dos, bras vers le plafond',
      'Genoux à 90°',
      'Étends un bras et la jambe opposée',
      'Bas du dos collé au sol',
      'Excellent pour anti-extension'
    ],
    
    muscleActivation: {
      primary: { 'Transverse Abdominis': 100, 'Rectus Abdominis': 85 },
      secondary: { 'Hip Flexors': 50 }
    }
  },
  
  {
    id: 'core-bird-dog',
    name: 'Bird Dog',
    nameTranslations: {
      en: 'Bird Dog',
      fr: 'Bird Dog / Chien-Oiseau'
    },
    aliases: ['Quadruped Extension'],
    
    category: {
      primary: 'Core',
      secondary: ['Glutes', 'Shoulders'],
      bodyPart: 'Core',
      movementPattern: 'Anti-Rotation'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Isometric',
      plane: 'Sagittal',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 78,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Bodyweight', 'Anti-Rotation', 'Rehab', 'Balance'],
    
    formCues: [
      'À quatre pattes',
      'Étends un bras et la jambe opposée',
      'Garde le dos plat et stable',
      'Anti-rotation du core',
      'Excellent pour bas du dos'
    ],
    
    muscleActivation: {
      primary: { 'Transverse Abdominis': 95, 'Erector Spinae': 85 },
      secondary: { 'Glutes': 65, 'Deltoids': 50 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // OBLIQUES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'core-russian-twist',
    name: 'Russian Twist',
    nameTranslations: {
      en: 'Russian Twist',
      fr: 'Russian Twist / Rotation Russe'
    },
    aliases: ['Seated Twist', 'Rotation Russe'],
    
    category: {
      primary: 'Core',
      secondary: [],
      bodyPart: 'Core',
      movementPattern: 'Rotation'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: ['Dumbbell', 'Medicine Ball', 'Plate'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Rotation',
      plane: 'Transverse',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 88,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Obliques', 'Rotation', 'Home-Gym'],
    
    formCues: [
      'Assis, torse incliné en arrière',
      'Pieds levés ou au sol',
      'Tourne le torse de gauche à droite',
      'Peut tenir un poids pour progresser'
    ],
    
    muscleActivation: {
      primary: { 'Obliques': 100 },
      secondary: { 'Rectus Abdominis': 60, 'Hip Flexors': 40 }
    }
  },
  
  {
    id: 'core-bicycle-crunch',
    name: 'Bicycle Crunch',
    nameTranslations: {
      en: 'Bicycle Crunch',
      fr: 'Crunch Bicyclette'
    },
    aliases: ['Bicycle', 'Air Bike', 'Crunch Vélo'],
    
    category: {
      primary: 'Core',
      secondary: [],
      bodyPart: 'Core',
      movementPattern: 'Rotation'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Rotation',
      plane: 'Multi',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 90,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Bodyweight', 'Obliques', 'Classic'],
    
    formCues: [
      'Allongé, mains derrière la tête',
      'Coude vers genou opposé en alternant',
      'Mouvement de pédalage',
      'Rotation complète du torse'
    ],
    
    muscleActivation: {
      primary: { 'Obliques': 100, 'Rectus Abdominis': 90 },
      secondary: { 'Hip Flexors': 50 }
    }
  },
  
  {
    id: 'core-woodchop-cable',
    name: 'Cable Woodchop',
    nameTranslations: {
      en: 'Cable Woodchop',
      fr: 'Woodchop Poulie / Bûcheron'
    },
    aliases: ['Woodchop', 'Bûcheron', 'Cable Chop'],
    
    category: {
      primary: 'Core',
      secondary: ['Shoulders'],
      bodyPart: 'Core',
      movementPattern: 'Rotation'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Medicine Ball', 'Resistance Band'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Rotation',
      plane: 'Diagonal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Cable', 'Rotation', 'Functional', 'Athletic'],
    
    formCues: [
      'Debout de côté à la poulie',
      'Tire en diagonale haut vers bas (ou inverse)',
      'Rotation du torse avec les bras',
      'Excellent pour sport et rotation'
    ],
    
    variations: [
      { id: 'core-woodchop-low-to-high', name: 'Low to High Woodchop', targetShift: 'Upward rotation' },
      { id: 'core-woodchop-high-to-low', name: 'High to Low Woodchop', targetShift: 'Downward rotation' }
    ],
    
    muscleActivation: {
      primary: { 'Obliques': 100 },
      secondary: { 'Rectus Abdominis': 55, 'Shoulders': 45, 'Hip Rotators': 40 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // COMPOUND CORE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'core-ab-wheel-rollout',
    name: 'Ab Wheel Rollout',
    nameTranslations: {
      en: 'Ab Wheel Rollout',
      fr: 'Ab Wheel / Roulette Abdos'
    },
    aliases: ['Ab Rollout', 'Wheel Rollout', 'Roulette'],
    
    category: {
      primary: 'Core',
      secondary: ['Shoulders', 'Back'],
      bodyPart: 'Core',
      movementPattern: 'Anti-Extension'
    },
    
    equipment: {
      type: 'Other',
      alternatives: ['Barbell'],
      requiresRack: false,
      requiresSpotter: false,
      setupNotes: 'Ab wheel'
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 85,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Anti-Extension', 'Advanced', 'Full-Core'],
    
    formCues: [
      'À genoux, mains sur la roue',
      'Roule vers l\'avant en gardant le core engagé',
      'Ne pas arquer le dos',
      'Reviens en contractant les abdos',
      'Version debout = très avancée'
    ],
    
    muscleActivation: {
      primary: { 'Rectus Abdominis': 100, 'Transverse Abdominis': 95 },
      secondary: { 'Latissimus Dorsi': 60, 'Shoulders': 50, 'Hip Flexors': 45 }
    }
  },
  
  {
    id: 'core-mountain-climbers',
    name: 'Mountain Climbers',
    nameTranslations: {
      en: 'Mountain Climbers',
      fr: 'Mountain Climbers / Grimpeurs'
    },
    aliases: ['Climbers', 'Running Plank'],
    
    category: {
      primary: 'Core',
      secondary: ['Hip Flexors', 'Shoulders'],
      bodyPart: 'Full Body',
      movementPattern: 'Dynamic'
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
      plane: 'Sagittal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 88,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Cardio', 'HIIT', 'Bodyweight', 'Dynamic'],
    
    formCues: [
      'Position de planche haute',
      'Amène un genou vers la poitrine',
      'Alterne rapidement',
      'Cardio + core',
      'Garde les hanches basses'
    ],
    
    muscleActivation: {
      primary: { 'Core': 90, 'Hip Flexors': 90 },
      secondary: { 'Shoulders': 60, 'Quadriceps': 50 }
    }
  },
  
  {
    id: 'core-pallof-press',
    name: 'Pallof Press',
    nameTranslations: {
      en: 'Pallof Press',
      fr: 'Pallof Press'
    },
    aliases: ['Anti-Rotation Press', 'Cable Pallof'],
    
    category: {
      primary: 'Core',
      secondary: [],
      bodyPart: 'Core',
      movementPattern: 'Anti-Rotation'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Resistance Band'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Isometric',
      plane: 'Transverse',
      range: 'Short'
    },
    
    difficulty: 'Beginner',
    popularityScore: 78,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Cable', 'Anti-Rotation', 'Functional', 'Core-Stability'],
    
    formCues: [
      'Debout perpendiculaire à la poulie',
      'Câble au niveau de la poitrine',
      'Pousse les mains droit devant',
      'Résiste à la rotation',
      'Excellent anti-rotation'
    ],
    
    muscleActivation: {
      primary: { 'Obliques': 100, 'Transverse Abdominis': 95 },
      secondary: { 'Rectus Abdominis': 60, 'Glutes': 40 }
    }
  },
  
  {
    id: 'core-v-up',
    name: 'V-Up',
    nameTranslations: {
      en: 'V-Up',
      fr: 'V-Up / Jackknife'
    },
    aliases: ['Jackknife', 'Pike Crunch'],
    
    category: {
      primary: 'Core',
      secondary: ['Hip Flexors'],
      bodyPart: 'Core',
      movementPattern: 'Flexion'
    },
    
    equipment: {
      type: 'Bodyweight',
      alternatives: [],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Sagittal',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 82,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Bodyweight', 'Full-Abs', 'Challenging'],
    
    formCues: [
      'Allongé, bras et jambes tendus',
      'Monte simultanément haut et bas du corps',
      'Touche les orteils avec les mains',
      'Forme un V avec le corps',
      'Mouvement difficile!'
    ],
    
    muscleActivation: {
      primary: { 'Rectus Abdominis': 100, 'Hip Flexors': 90 },
      secondary: { 'Obliques': 45 }
    }
  },
]
