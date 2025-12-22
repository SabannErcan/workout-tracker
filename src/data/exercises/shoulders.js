/**
 * 💪 SHOULDER EXERCISES (Épaules)
 * ~18 exercices couvrant anterior, lateral, posterior deltoids
 */

export const shoulderExercises = [
  // ═══════════════════════════════════════════════════════════════
  // OVERHEAD PRESSING - COMPOUND
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'shoulders-overhead-press-barbell',
    name: 'Overhead Press - Barbell',
    nameTranslations: {
      en: 'Barbell Overhead Press',
      fr: 'Développé Militaire Barre'
    },
    aliases: ['Military Press', 'OHP', 'Shoulder Press', 'Développé Militaire', 'Press'],
    
    category: {
      primary: 'Shoulders',
      secondary: ['Triceps', 'Core'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Machine'],
      requiresRack: true,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 96,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Strength', 'Mass-Building', 'Functional'],
    
    formCues: [
      'Debout, barre au niveau des clavicules',
      'Prise légèrement plus large que les épaules',
      'Pousse la barre verticalement',
      'Passe la tête sous la barre en haut',
      'Verrouille les coudes en haut',
      'Core engagé, fessiers serrés'
    ],
    
    commonMistakes: [
      '❌ Arquer excessivement le dos',
      '❌ Ne pas passer la tête sous la barre',
      '❌ Pousser vers l\'avant (pas vertical)',
      '❌ Momentum des jambes (sauf Push Press)'
    ],
    
    variations: [
      { id: 'shoulders-push-press', name: 'Push Press', targetShift: 'Explosive, more weight' },
      { id: 'shoulders-seated-ohp', name: 'Seated OHP', targetShift: 'More isolation' },
      { id: 'shoulders-behind-neck-press', name: 'Behind Neck Press', targetShift: 'More lateral delt' }
    ],
    
    muscleActivation: {
      primary: { 'Anterior Deltoid': 100 },
      secondary: { 'Lateral Deltoid': 75, 'Triceps': 70, 'Upper Chest': 50, 'Core': 45 }
    }
  },
  
  {
    id: 'shoulders-overhead-press-dumbbell',
    name: 'Overhead Press - Dumbbell',
    nameTranslations: {
      en: 'Dumbbell Overhead Press',
      fr: 'Développé Épaules Haltères'
    },
    aliases: ['DB Shoulder Press', 'Dumbbell Press', 'Développé Haltères'],
    
    category: {
      primary: 'Shoulders',
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
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 94,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Unilateral', 'Home-Gym', 'Beginner-Friendly'],
    
    formCues: [
      'Assis ou debout',
      'Haltères à hauteur des oreilles',
      'Pousse verticalement',
      'Plus de ROM que barre',
      'Travail indépendant chaque côté'
    ],
    
    muscleActivation: {
      primary: { 'Anterior Deltoid': 100 },
      secondary: { 'Lateral Deltoid': 80, 'Triceps': 65, 'Stabilizers': 60 }
    }
  },
  
  {
    id: 'shoulders-seated-ohp',
    name: 'Seated Overhead Press',
    nameTranslations: {
      en: 'Seated Overhead Press',
      fr: 'Développé Assis'
    },
    aliases: ['Seated Press', 'Seated Shoulder Press'],
    
    category: {
      primary: 'Shoulders',
      secondary: ['Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Machine'],
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
    isFunctional: false,
    
    tags: ['Compound', 'Strict-Form', 'Mass-Building'],
    
    formCues: [
      'Banc à 90° ou légèrement incliné',
      'Dos bien calé contre le dossier',
      'Élimine le momentum des jambes',
      'Plus d\'isolation épaules'
    ],
    
    muscleActivation: {
      primary: { 'Anterior Deltoid': 100 },
      secondary: { 'Lateral Deltoid': 75, 'Triceps': 70 }
    }
  },
  
  {
    id: 'shoulders-push-press',
    name: 'Push Press',
    nameTranslations: {
      en: 'Push Press',
      fr: 'Push Press / Épaulé Jeté Partiel'
    },
    aliases: ['Power Press', 'Push Press Barre'],
    
    category: {
      primary: 'Shoulders',
      secondary: ['Triceps', 'Legs', 'Core'],
      bodyPart: 'Full Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell'],
      requiresRack: true,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Push',
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 82,
    isCompound: true,
    isFunctional: true,
    
    tags: ['Compound', 'Power', 'Explosive', 'Olympic', 'Full-Body'],
    
    formCues: [
      'Légère flexion genoux (dip)',
      'Utilise les jambes pour initier',
      'Permet plus de charge que strict',
      'Mouvement explosif',
      'Excellent pour puissance'
    ],
    
    muscleActivation: {
      primary: { 'Anterior Deltoid': 95 },
      secondary: { 'Quadriceps': 60, 'Triceps': 65, 'Core': 55 }
    }
  },
  
  {
    id: 'shoulders-arnold-press',
    name: 'Arnold Press',
    nameTranslations: {
      en: 'Arnold Press',
      fr: 'Arnold Press / Développé Arnold'
    },
    aliases: ['Arnold Dumbbell Press', 'Rotating Press'],
    
    category: {
      primary: 'Shoulders',
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
      plane: 'Vertical',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 85,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Rotation', 'Full-Range', 'Classic'],
    
    formCues: [
      'Départ paumes vers toi (curl position)',
      'Tourne les paumes pendant la montée',
      'Finis paumes vers l\'avant',
      'Rotation complète = plus de ROM',
      'Travaille les 3 chefs du deltoïde'
    ],
    
    muscleActivation: {
      primary: { 'Anterior Deltoid': 95 },
      secondary: { 'Lateral Deltoid': 85, 'Triceps': 60, 'Rear Deltoid': 40 }
    }
  },
  
  {
    id: 'shoulders-machine-press',
    name: 'Machine Shoulder Press',
    nameTranslations: {
      en: 'Machine Shoulder Press',
      fr: 'Développé Épaules Machine'
    },
    aliases: ['Shoulder Press Machine', 'Seated Machine Press'],
    
    category: {
      primary: 'Shoulders',
      secondary: ['Triceps'],
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
      plane: 'Vertical',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 82,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Beginner-Friendly', 'Safe', 'Machine'],
    
    formCues: [
      'Assieds-toi bien calé',
      'Ajuste le siège correctement',
      'Poignées au niveau des épaules',
      'Mouvement guidé = plus sûr'
    ],
    
    muscleActivation: {
      primary: { 'Anterior Deltoid': 100 },
      secondary: { 'Lateral Deltoid': 70, 'Triceps': 65 }
    }
  },
  
  {
    id: 'shoulders-smith-machine-press',
    name: 'Smith Machine Shoulder Press',
    nameTranslations: {
      en: 'Smith Machine Shoulder Press',
      fr: 'Développé Épaules Smith Machine'
    },
    aliases: ['Smith Press', 'Guided Shoulder Press'],
    
    category: {
      primary: 'Shoulders',
      secondary: ['Triceps'],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Smith Machine',
      alternatives: ['Barbell', 'Machine'],
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
    popularityScore: 78,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Guided', 'Safe', 'Overload'],
    
    formCues: [
      'Banc sous la Smith Machine',
      'Trajectoire guidée',
      'Moins de stabilisateurs',
      'Bon pour surcharge ou finisher'
    ],
    
    muscleActivation: {
      primary: { 'Anterior Deltoid': 100 },
      secondary: { 'Triceps': 70, 'Lateral Deltoid': 65 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // LATERAL DELTOID - ISOLATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'shoulders-lateral-raise-dumbbell',
    name: 'Lateral Raise - Dumbbell',
    nameTranslations: {
      en: 'Dumbbell Lateral Raise',
      fr: 'Élévations Latérales Haltères'
    },
    aliases: ['Side Raise', 'Lateral Raise', 'Élévations Latérales', 'Side Delt Raise'],
    
    category: {
      primary: 'Shoulders',
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
      plane: 'Lateral',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 95,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Lateral-Delt', 'Shoulder-Width', 'High-Rep'],
    
    formCues: [
      'Debout ou assis, haltères sur les côtés',
      'Monte les bras sur les côtés',
      'Coudes légèrement fléchis',
      'Monte jusqu\'à parallèle au sol',
      'Pouces légèrement vers le bas en haut',
      'Contrôle la descente'
    ],
    
    commonMistakes: [
      '❌ Utiliser trop lourd (momentum)',
      '❌ Monter les épaules (shrug)',
      '❌ Coudes tendus (stress articulation)',
      '❌ Aller au-dessus de parallèle (traps take over)'
    ],
    
    variations: [
      { id: 'shoulders-lateral-raise-cable', name: 'Cable Lateral Raise', targetShift: 'Constant tension' },
      { id: 'shoulders-lateral-raise-leaning', name: 'Leaning Lateral Raise', targetShift: 'More stretch' }
    ],
    
    muscleActivation: {
      primary: { 'Lateral Deltoid': 100 },
      secondary: { 'Anterior Deltoid': 35, 'Upper Trapezius': 25 }
    }
  },
  
  {
    id: 'shoulders-lateral-raise-cable',
    name: 'Lateral Raise - Cable',
    nameTranslations: {
      en: 'Cable Lateral Raise',
      fr: 'Élévations Latérales Poulie'
    },
    aliases: ['Cable Side Raise', 'Poulie Latérale'],
    
    category: {
      primary: 'Shoulders',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Dumbbell', 'Machine'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Lateral',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 88,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Cable', 'Constant-Tension', 'Lateral-Delt'],
    
    formCues: [
      'Poulie basse, debout sur le côté',
      'Tire le câble latéralement',
      'Tension constante toute la ROM',
      'Peut se faire un bras à la fois ou les deux'
    ],
    
    muscleActivation: {
      primary: { 'Lateral Deltoid': 100 },
      secondary: { 'Anterior Deltoid': 30 }
    }
  },
  
  {
    id: 'shoulders-lateral-raise-machine',
    name: 'Lateral Raise - Machine',
    nameTranslations: {
      en: 'Machine Lateral Raise',
      fr: 'Élévations Latérales Machine'
    },
    aliases: ['Lateral Raise Machine'],
    
    category: {
      primary: 'Shoulders',
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
      plane: 'Lateral',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 80,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Machine', 'Beginner-Friendly', 'Lateral-Delt'],
    
    muscleActivation: {
      primary: { 'Lateral Deltoid': 100 },
      secondary: { 'Anterior Deltoid': 25 }
    }
  },
  
  {
    id: 'shoulders-lateral-raise-leaning',
    name: 'Leaning Lateral Raise',
    nameTranslations: {
      en: 'Leaning Lateral Raise',
      fr: 'Élévations Latérales Inclinées'
    },
    aliases: ['Incline Lateral Raise', 'Leaning Side Raise'],
    
    category: {
      primary: 'Shoulders',
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
      plane: 'Lateral',
      range: 'Full'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 75,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Stretch-Emphasis', 'Advanced-Technique'],
    
    formCues: [
      'Tiens-toi à un support, penche-toi',
      'Plus de tension en position basse',
      'Meilleur stretch du deltoïde latéral',
      'Un bras à la fois'
    ],
    
    muscleActivation: {
      primary: { 'Lateral Deltoid': 100 },
      secondary: {}
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // ANTERIOR DELTOID - ISOLATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'shoulders-front-raise-dumbbell',
    name: 'Front Raise - Dumbbell',
    nameTranslations: {
      en: 'Dumbbell Front Raise',
      fr: 'Élévations Frontales Haltères'
    },
    aliases: ['Front Raise', 'Élévations Frontales', 'Anterior Raise'],
    
    category: {
      primary: 'Shoulders',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Barbell', 'Cable', 'Plate'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Frontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 78,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Anterior-Delt', 'High-Rep'],
    
    formCues: [
      'Haltères devant les cuisses',
      'Monte un bras à la fois ou les deux',
      'Monte jusqu\'à parallèle au sol',
      'Coudes légèrement fléchis',
      'Note: deltoïde antérieur souvent surdéveloppé (pressing)'
    ],
    
    muscleActivation: {
      primary: { 'Anterior Deltoid': 100 },
      secondary: { 'Lateral Deltoid': 30, 'Upper Chest': 25 }
    }
  },
  
  {
    id: 'shoulders-front-raise-cable',
    name: 'Front Raise - Cable',
    nameTranslations: {
      en: 'Cable Front Raise',
      fr: 'Élévations Frontales Poulie'
    },
    aliases: ['Cable Anterior Raise'],
    
    category: {
      primary: 'Shoulders',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Frontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 72,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Cable', 'Constant-Tension'],
    
    muscleActivation: {
      primary: { 'Anterior Deltoid': 100 },
      secondary: { 'Lateral Deltoid': 25 }
    }
  },
  
  {
    id: 'shoulders-front-raise-plate',
    name: 'Front Raise - Plate',
    nameTranslations: {
      en: 'Plate Front Raise',
      fr: 'Élévations Frontales Disque'
    },
    aliases: ['Plate Raise'],
    
    category: {
      primary: 'Shoulders',
      secondary: [],
      bodyPart: 'Upper Body',
      movementPattern: 'Push'
    },
    
    equipment: {
      type: 'Other',
      alternatives: ['Dumbbell'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Push',
      plane: 'Frontal',
      range: 'Full'
    },
    
    difficulty: 'Beginner',
    popularityScore: 68,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Home-Gym', 'Anterior-Delt'],
    
    formCues: [
      'Tiens un disque avec les deux mains',
      'Monte jusqu\'à hauteur des yeux',
      'Simple mais efficace'
    ],
    
    muscleActivation: {
      primary: { 'Anterior Deltoid': 100 },
      secondary: { 'Lateral Deltoid': 30 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // POSTERIOR DELTOID - ISOLATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'shoulders-rear-delt-fly-dumbbell',
    name: 'Rear Delt Fly - Dumbbell',
    nameTranslations: {
      en: 'Dumbbell Rear Delt Fly',
      fr: 'Oiseau / Élévations Postérieures Haltères'
    },
    aliases: ['Bent Over Reverse Fly', 'Rear Fly', 'Oiseau', 'Reverse Fly'],
    
    category: {
      primary: 'Shoulders',
      secondary: ['Back'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Cable', 'Machine'],
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
    isFunctional: true,
    
    tags: ['Isolation', 'Rear-Delt', 'Posture', 'Shoulder-Health'],
    
    formCues: [
      'Penché à 45-90° (ou sur banc incliné)',
      'Bras pendants avec haltères',
      'Monte les bras sur les côtés',
      'Coudes légèrement fléchis',
      'Serre les omoplates en haut',
      'Essentiel pour équilibre épaule'
    ],
    
    commonMistakes: [
      '❌ Se relever pendant le mouvement',
      '❌ Utiliser trop lourd',
      '❌ Momentum',
      '❌ Ne pas contracter les rhomboïdes'
    ],
    
    muscleActivation: {
      primary: { 'Rear Deltoid': 100 },
      secondary: { 'Rhomboids': 65, 'Mid-Traps': 55 }
    }
  },
  
  {
    id: 'shoulders-rear-delt-fly-cable',
    name: 'Rear Delt Fly - Cable',
    nameTranslations: {
      en: 'Cable Rear Delt Fly',
      fr: 'Oiseau Poulie'
    },
    aliases: ['Cable Reverse Fly', 'High Cable Rear Fly'],
    
    category: {
      primary: 'Shoulders',
      secondary: ['Back'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Cable',
      alternatives: ['Dumbbell', 'Machine'],
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
    popularityScore: 82,
    isCompound: false,
    isFunctional: true,
    
    tags: ['Isolation', 'Cable', 'Constant-Tension', 'Rear-Delt'],
    
    formCues: [
      'Poulies croisées à hauteur d\'épaule',
      'Croise les câbles devant toi',
      'Écarte les bras en arrière',
      'Tension constante'
    ],
    
    muscleActivation: {
      primary: { 'Rear Deltoid': 100 },
      secondary: { 'Rhomboids': 60, 'Mid-Traps': 50 }
    }
  },
  
  {
    id: 'shoulders-rear-delt-machine',
    name: 'Rear Delt Machine (Reverse Pec Deck)',
    nameTranslations: {
      en: 'Reverse Pec Deck',
      fr: 'Pec Deck Inversé / Machine Oiseau'
    },
    aliases: ['Reverse Fly Machine', 'Rear Delt Machine'],
    
    category: {
      primary: 'Shoulders',
      secondary: ['Back'],
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
      plane: 'Horizontal',
      range: 'Medium'
    },
    
    difficulty: 'Beginner',
    popularityScore: 85,
    isCompound: false,
    isFunctional: false,
    
    tags: ['Isolation', 'Machine', 'Beginner-Friendly', 'Rear-Delt'],
    
    formCues: [
      'Face à la machine (inverse du pec deck)',
      'Poignées devant, écarte vers l\'arrière',
      'Mouvement guidé',
      'Excellent pour finisher'
    ],
    
    muscleActivation: {
      primary: { 'Rear Deltoid': 100 },
      secondary: { 'Rhomboids': 55 }
    }
  },
  
  // ═══════════════════════════════════════════════════════════════
  // SPECIALTY MOVEMENTS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'shoulders-upright-row',
    name: 'Upright Row',
    nameTranslations: {
      en: 'Upright Row',
      fr: 'Rowing Menton / Tirage Vertical'
    },
    aliases: ['Upright Row', 'Tirage Menton', 'High Pull'],
    
    category: {
      primary: 'Shoulders',
      secondary: ['Back'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Barbell',
      alternatives: ['Dumbbell', 'Cable', 'EZ Bar'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Multi-joint',
      force: 'Pull',
      plane: 'Vertical',
      range: 'Medium'
    },
    
    difficulty: 'Intermediate',
    popularityScore: 72,
    isCompound: true,
    isFunctional: false,
    
    tags: ['Compound', 'Lateral-Delt', 'Traps', 'Controversial'],
    
    formCues: [
      'Prise serrée ou moyenne',
      'Tire vers le menton (coudes hauts)',
      'ATTENTION: potentiel impingement épaule',
      'Alternative: prise large ou haltères',
      'Arrête au niveau du sternum si inconfort'
    ],
    
    commonMistakes: [
      '❌ Monter trop haut (risque épaule)',
      '❌ Prise trop serrée',
      '❌ Ignorer la douleur d\'épaule'
    ],
    
    muscleActivation: {
      primary: { 'Lateral Deltoid': 90, 'Upper Trapezius': 85 },
      secondary: { 'Anterior Deltoid': 55, 'Biceps': 45 }
    }
  },
  
  {
    id: 'shoulders-lu-raise',
    name: 'Lu Raise',
    nameTranslations: {
      en: 'Lu Raise',
      fr: 'Lu Raise / Élévation Lu'
    },
    aliases: ['Prone Y Raise', 'IYT Raise'],
    
    category: {
      primary: 'Shoulders',
      secondary: ['Back'],
      bodyPart: 'Upper Body',
      movementPattern: 'Pull'
    },
    
    equipment: {
      type: 'Dumbbell',
      alternatives: ['Plate'],
      requiresRack: false,
      requiresSpotter: false
    },
    
    mechanics: {
      joint: 'Single-joint',
      force: 'Pull',
      plane: 'Multi',
      range: 'Full'
    },
    
    difficulty: 'Advanced',
    popularityScore: 65,
    isCompound: false,
    isFunctional: true,
    
    tags: ['Isolation', 'Shoulder-Health', 'Warmup', 'Mobility'],
    
    formCues: [
      'Penché ou sur banc incliné',
      'Monte les bras en Y',
      'Rotation externe en haut',
      'Excellent pour échauffement',
      'Nommé après Lu Xiaojun (haltérophile)'
    ],
    
    muscleActivation: {
      primary: { 'Rear Deltoid': 85, 'Lateral Deltoid': 80 },
      secondary: { 'External Rotators': 70, 'Lower Traps': 65 }
    }
  },
]
