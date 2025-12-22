# 🏋️ Workout Tracker PWA

Une Progressive Web App de tracking d'entraînement musculation, optimisée pour iPhone et déployée sur Vercel.

## ✨ Fonctionnalités

- **📱 Mobile-First** : Interface optimisée pour l'iPhone avec support des safe areas
- **⚡ 1-2 Taps** : Log tes séries en 1-2 taps maximum
- **📴 Offline-First** : Fonctionne sans connexion grâce au Service Worker
- **🌙 Dark Theme** : Optimisé pour écrans OLED (économie batterie)
- **⏱️ Timer de repos** : Timer intégré avec notifications sonores/vibration
- **📊 Statistiques** : Graphiques de progression avec Recharts
- **📤 Export/Import** : Sauvegarde et restauration de données JSON
- **🔔 PWA** : Installable sur l'écran d'accueil

## 🚀 Installation

```bash
# Cloner le repo
git clone <url-repo>
cd workout-tracker

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build

# Preview du build
npm run preview
```

## 📁 Structure du projet

```
workout-tracker/
├── public/
│   ├── manifest.json      # Manifest PWA
│   ├── sw.js              # Service Worker
│   └── icons/             # Icônes PWA (différentes tailles)
├── src/
│   ├── components/
│   │   ├── HomeScreen.jsx      # Dashboard principal
│   │   ├── WorkoutSession.jsx  # Écran de séance active
│   │   ├── RestTimer.jsx       # Timer de repos
│   │   ├── SessionTemplates.jsx # Gestion des templates
│   │   ├── History.jsx         # Historique + calendrier
│   │   ├── ProgressCharts.jsx  # Graphiques stats
│   │   ├── Settings.jsx        # Paramètres
│   │   └── ExerciseLog.jsx     # Composant log d'exercice
│   ├── hooks/
│   │   ├── useLocalStorage.js  # Persistance localStorage
│   │   ├── useWorkoutData.js   # Données principales
│   │   └── useServiceWorker.js # Gestion PWA
│   ├── utils/
│   │   ├── storage.js          # API localStorage
│   │   ├── calculations.js     # Calculs (1RM, volume, etc.)
│   │   └── dateHelpers.js      # Utilitaires date
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css              # Tailwind + styles custom
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── package.json
```

## 🎨 Design System

### Couleurs (iOS-style)
- **Primary**: `#0A84FF` (Bleu iOS)
- **Success**: `#32D74B` (Vert)
- **Warning**: `#FF9F0A` (Orange)
- **Danger**: `#FF453A` (Rouge)
- **Background**: `#000000` (Noir pur OLED)
- **Surface**: `#1C1C1E` (Gris foncé)

### Touch Targets
Minimum 44×44px selon les guidelines Apple.

## 📊 Modèle de données

### Session Template
```javascript
{
  id: "uuid",
  name: "Push Day",
  exercises: [
    { id: "uuid", name: "Développé Couché", category: "Poitrine" }
  ],
  createdAt: "ISO date",
  lastUsed: "ISO date"
}
```

### Workout History Entry
```javascript
{
  id: "uuid",
  templateId: "uuid",
  templateName: "Push Day",
  date: "ISO date",
  duration: 3600, // secondes
  exercises: [
    {
      exerciseId: "uuid",
      name: "Développé Couché",
      category: "Poitrine",
      sets: [
        { reps: 10, weight: 80, rpe: 8, completedAt: "ISO date" }
      ]
    }
  ],
  totalVolume: 12000,
  notes: "Bonne séance"
}
```

### User Settings
```javascript
{
  theme: "dark",
  weightUnit: "kg",
  defaultRestTime: 120,
  soundEnabled: true,
  vibrationEnabled: true,
  showLastWorkout: true,
  autoStartRest: true
}
```

## 🔧 Technologies

- **React 18** : UI framework
- **Vite** : Build tool ultra-rapide
- **Tailwind CSS** : Styling utility-first
- **Recharts** : Graphiques
- **Lucide React** : Icônes
- **LocalStorage** : Persistance données
- **Service Worker** : Offline capability

## 🚀 Déploiement Vercel

1. Push sur GitHub
2. Connecter le repo à Vercel
3. Build settings auto-détectés
4. Deploy !

Variables d'environnement : aucune requise.

## 📱 Installation PWA

### iPhone (Safari)
1. Ouvrir l'app dans Safari
2. Tap sur le bouton Partager
3. Sélectionner "Sur l'écran d'accueil"

### Android (Chrome)
1. Ouvrir l'app dans Chrome
2. Tap sur le menu (⋮)
3. Sélectionner "Installer l'application"

## 📄 License

MIT
