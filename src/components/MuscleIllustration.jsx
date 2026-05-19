import React from 'react'

// Shared defs: glow filter + specular highlight + muscle gradient
const Defs = ({ id, color }) => (
  <defs>
    <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    {/* Specular highlight — bright spot upper-left of each muscle */}
    <radialGradient id={`${id}-spec`} cx="36%" cy="28%" r="52%" gradientUnits="objectBoundingBox">
      <stop offset="0%" stopColor="white" stopOpacity="0.42" />
      <stop offset="55%" stopColor="white" stopOpacity="0.06" />
      <stop offset="100%" stopColor="white" stopOpacity="0" />
    </radialGradient>
    {/* Color gradient — top bright, bottom slightly darker */}
    <linearGradient id={`${id}-grad`} x1="0.3" y1="0" x2="0.7" y2="1">
      <stop offset="0%" stopColor={color} stopOpacity="1" />
      <stop offset="100%" stopColor={color} stopOpacity="0.72" />
    </linearGradient>
  </defs>
)

// Athletic front silhouette — V-taper body
const FrontBody = () => (
  <g fill="var(--muscle-body)" stroke="var(--muscle-stroke)" strokeWidth="0.45" strokeLinejoin="round">
    <ellipse cx="40" cy="11" rx="8.5" ry="9.5" />
    <path d="M36.5 19.5 L43.5 19.5 L43 27 L37 27 Z" />
    <path d="M28 24 C17 27 12 40 12 54 L14 79 L66 79 L68 54 C68 40 63 27 52 24 C48 23 44 22 40 22 C36 22 32 23 28 24 Z" />
    <path d="M12 29 C8 36 7 51 10 58 C13 63 22 63 25 58 C28 51 27 36 23 29 C20 25 14 25 12 29 Z" />
    <path d="M10 59 C8 64 9 75 12 80 C14 83 19 83 21 80 C23 75 23 64 21 59 Z" />
    <path d="M68 29 C72 36 73 51 70 58 C67 63 58 63 55 58 C52 51 53 36 57 29 C60 25 66 25 68 29 Z" />
    <path d="M70 59 C72 64 71 75 68 80 C66 83 61 83 59 80 C57 75 57 64 59 59 Z" />
    <path d="M14 80 C12 90 13 105 17 111 L37 111 C38 105 37 90 38 80 Z" />
    <path d="M66 80 C68 90 67 105 63 111 L43 111 C42 105 43 90 42 80 Z" />
    <ellipse cx="29" cy="44" rx="13" ry="20" fill="white" stroke="none" opacity="0.04" />
  </g>
)

// Athletic back silhouette
const BackBody = () => (
  <g fill="var(--muscle-body)" stroke="var(--muscle-stroke)" strokeWidth="0.45" strokeLinejoin="round">
    <ellipse cx="40" cy="11" rx="8.5" ry="9.5" />
    <path d="M36.5 19.5 L43.5 19.5 L43 27 L37 27 Z" />
    <path d="M28 24 C17 27 12 40 12 54 L14 79 L66 79 L68 54 C68 40 63 27 52 24 C48 23 44 22 40 22 C36 22 32 23 28 24 Z" />
    <path d="M12 29 C8 36 7 51 10 58 C13 63 22 63 25 58 C28 51 27 36 23 29 C20 25 14 25 12 29 Z" />
    <path d="M10 59 C8 64 9 75 12 80 C14 83 19 83 21 80 C23 75 23 64 21 59 Z" />
    <path d="M68 29 C72 36 73 51 70 58 C67 63 58 63 55 58 C52 51 53 36 57 29 C60 25 66 25 68 29 Z" />
    <path d="M70 59 C72 64 71 75 68 80 C66 83 61 83 59 80 C57 75 57 64 59 59 Z" />
    <path d="M14 80 C12 90 13 105 17 111 L37 111 C38 105 37 90 38 80 Z" />
    <path d="M66 80 C68 90 67 105 63 111 L43 111 C42 105 43 90 42 80 Z" />
    <ellipse cx="29" cy="44" rx="13" ry="20" fill="white" stroke="none" opacity="0.04" />
  </g>
)

// Reusable: muscle path with gradient fill + specular overlay
const Muscle = ({ d, id, opacity = 0.92 }) => (
  <>
    <path d={d} fill={`url(#${id}-grad)`} filter={`url(#${id}-glow)`} opacity={opacity} />
    <path d={d} fill={`url(#${id}-spec)`} />
  </>
)

// ─── CHEST ────────────────────────────────────────────────────────────────────
export function ChestSVG({ color }) {
  const id = 'ch'
  return (
    <svg viewBox="0 0 80 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <Defs id={id} color={color} />
      <FrontBody />
      {/* Left pectoralis major — fan from sternum to delt-pec junction */}
      <Muscle id={id} d="M38 27 C33 23 20 24 15 33 C12 40 14 51 21 55 C28 59 39 56 40 48 C41 42 40 34 38 27 Z" />
      {/* Right pectoralis major */}
      <Muscle id={id} d="M42 27 C47 23 60 24 65 33 C68 40 66 51 59 55 C52 59 41 56 40 48 C39 42 40 34 42 27 Z" />
      {/* Clavicular head highlight */}
      <path d="M38 27 C35 25 26 26 20 31 C24 28 33 26 38 27 Z" fill="white" opacity="0.12" />
      <path d="M42 27 C45 25 54 26 60 31 C56 28 47 26 42 27 Z" fill="white" opacity="0.12" />
      {/* Sternum dividing line */}
      <line x1="40" y1="27" x2="40" y2="50" stroke={color} strokeWidth="0.7" opacity="0.4" />
      {/* Lower pec crease */}
      <path d="M17 53 C26 58 36 58 40 54 C44 58 54 58 63 53" stroke={color} strokeWidth="0.55" fill="none" opacity="0.35" />
    </svg>
  )
}

// ─── BACK ─────────────────────────────────────────────────────────────────────
export function BackSVG({ color }) {
  const id = 'bk'
  return (
    <svg viewBox="0 0 80 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <Defs id={id} color={color} />
      <BackBody />
      {/* Trapezius — upper diamond */}
      <Muscle id={id} d="M37 21 C29 22 17 27 13 33 C17 37 29 40 40 38 C51 40 63 37 67 33 C63 27 51 22 43 21 Z" />
      {/* Left latissimus dorsi — dramatic wing */}
      <Muscle id={id} d="M13 39 C11 51 13 65 22 74 C28 79 37 77 39 69 C40 63 38 51 33 42 C27 38 19 36 13 39 Z" />
      {/* Right latissimus dorsi */}
      <Muscle id={id} d="M67 39 C69 51 67 65 58 74 C52 79 43 77 41 69 C40 63 42 51 47 42 C53 38 61 36 67 39 Z" />
      {/* Teres major hints */}
      <path d="M14 40 C12 44 13 49 16 51 C18 47 17 42 14 40 Z" fill={color} opacity="0.5" />
      <path d="M66 40 C68 44 67 49 64 51 C62 47 63 42 66 40 Z" fill={color} opacity="0.5" />
      {/* Spine line */}
      <line x1="40" y1="26" x2="40" y2="78" stroke={color} strokeWidth="0.55" opacity="0.22" />
      {/* Trap lower edge */}
      <path d="M19 37 C29 41 51 41 61 37" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Lat inner separation */}
      <path d="M35 43 C37 55 38 65 39 70" stroke={color} strokeWidth="0.5" fill="none" opacity="0.28" />
      <path d="M45 43 C43 55 42 65 41 70" stroke={color} strokeWidth="0.5" fill="none" opacity="0.28" />
    </svg>
  )
}

// ─── SHOULDERS ────────────────────────────────────────────────────────────────
export function ShoulderSVG({ color }) {
  const id = 'sh'
  return (
    <svg viewBox="0 0 80 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <Defs id={id} color={color} />
      <FrontBody />
      {/* Left deltoid — full rounded cap */}
      <Muscle id={id} d="M12 30 C8 36 7 50 11 57 C14 61 22 62 26 57 C30 50 29 36 24 29 C20 25 14 25 12 30 Z" />
      {/* Right deltoid */}
      <Muscle id={id} d="M68 30 C72 36 73 50 69 57 C66 61 58 62 54 57 C50 50 51 36 56 29 C60 25 66 25 68 30 Z" />
      {/* Anterior head highlight strip */}
      <path d="M21 27 C18 30 17 42 19 52 C21 46 22 34 21 27 Z" fill="white" opacity="0.14" />
      <path d="M59 27 C62 30 63 42 61 52 C59 46 58 34 59 27 Z" fill="white" opacity="0.14" />
      {/* Deltoid head separations */}
      <path d="M19 27 C17 37 16 50 18 56" stroke={color} strokeWidth="0.65" fill="none" opacity="0.32" />
      <path d="M61 27 C63 37 64 50 62 56" stroke={color} strokeWidth="0.65" fill="none" opacity="0.32" />
      <path d="M13 33 C11 43 11 53 13 57" stroke={color} strokeWidth="0.5" fill="none" opacity="0.2" />
      <path d="M67 33 C69 43 69 53 67 57" stroke={color} strokeWidth="0.5" fill="none" opacity="0.2" />
    </svg>
  )
}

// ─── ARMS ─────────────────────────────────────────────────────────────────────
export function ArmSVG({ color }) {
  const id = 'ar'
  return (
    <svg viewBox="0 0 80 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <Defs id={id} color={color} />
      <FrontBody />
      {/* Left biceps — full upper arm with peak */}
      <Muscle id={id} d="M12 30 C8 37 8 52 11 58 C14 63 22 63 25 58 C28 52 27 37 24 30 C21 26 15 26 12 30 Z" />
      {/* Right biceps */}
      <Muscle id={id} d="M68 30 C72 37 72 52 69 58 C66 63 58 63 55 58 C52 52 53 37 56 30 C59 26 65 26 68 30 Z" />
      {/* Bicep peak highlight */}
      <path d="M17 30 C16 36 16 44 17 50 C18 44 19 36 17 30 Z" fill="white" opacity="0.18" />
      <path d="M63 30 C64 36 64 44 63 50 C62 44 61 36 63 30 Z" fill="white" opacity="0.18" />
      {/* Forearms */}
      <path d="M10 59 C8 64 9 75 12 80 C14 83 19 83 21 80 C23 75 23 64 21 59 Z" fill={color} opacity="0.52" />
      <path d="M70 59 C72 64 71 75 68 80 C66 83 61 83 59 80 C57 75 57 64 59 59 Z" fill={color} opacity="0.52" />
      {/* Bicep head separation */}
      <path d="M18 30 C17 40 17 52 18 58" stroke={color} strokeWidth="0.65" fill="none" opacity="0.35" />
      <path d="M62 30 C63 40 63 52 62 58" stroke={color} strokeWidth="0.65" fill="none" opacity="0.35" />
    </svg>
  )
}

// ─── LEGS ─────────────────────────────────────────────────────────────────────
export function LegSVG({ color }) {
  const id = 'lg'
  return (
    <svg viewBox="0 0 80 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <Defs id={id} color={color} />
      <FrontBody />
      {/* Left quadriceps */}
      <Muscle id={id} d="M14 80 C12 90 13 105 17 111 L37 111 C38 105 37 90 38 80 Z" />
      {/* Right quadriceps */}
      <Muscle id={id} d="M66 80 C68 90 67 105 63 111 L43 111 C42 105 43 90 42 80 Z" />
      {/* Rectus femoris center highlight */}
      <path d="M25 80 C24 90 24 104 25 111 C27 104 27 90 25 80 Z" fill="white" opacity="0.14" />
      <path d="M55 80 C56 90 56 104 55 111 C53 104 53 90 55 80 Z" fill="white" opacity="0.14" />
      {/* Vastus medialis teardrop (left) */}
      <path d="M17 101 C16 107 19 111 25 111 C21 107 18 103 17 101 Z" fill={color} opacity="0.65" />
      {/* Vastus medialis (right) */}
      <path d="M63 101 C64 107 61 111 55 111 C59 107 62 103 63 101 Z" fill={color} opacity="0.65" />
      {/* Quad separation lines */}
      <line x1="26" y1="81" x2="25" y2="109" stroke={color} strokeWidth="0.7" opacity="0.35" />
      <line x1="33" y1="81" x2="32" y2="109" stroke={color} strokeWidth="0.5" opacity="0.22" />
      <line x1="54" y1="81" x2="55" y2="109" stroke={color} strokeWidth="0.7" opacity="0.35" />
      <line x1="47" y1="81" x2="48" y2="109" stroke={color} strokeWidth="0.5" opacity="0.22" />
    </svg>
  )
}

// ─── CORE ─────────────────────────────────────────────────────────────────────
export function CoreSVG({ color }) {
  const id = 'co'
  return (
    <svg viewBox="0 0 80 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <Defs id={id} color={color} />
      <FrontBody />
      {/* 6-pack — 3 rows × 2 columns */}
      {[0, 1, 2].map(row => (
        <g key={row}>
          <rect x="30.5" y={47 + row * 10} width="8" height="7.5" rx="2.5"
            fill={`url(#${id}-grad)`} filter={`url(#${id}-glow)`} opacity="0.93" />
          <rect x="30.5" y={47 + row * 10} width="8" height="7.5" rx="2.5"
            fill={`url(#${id}-spec)`} />
          <rect x="41.5" y={47 + row * 10} width="8" height="7.5" rx="2.5"
            fill={`url(#${id}-grad)`} filter={`url(#${id}-glow)`} opacity="0.93" />
          <rect x="41.5" y={47 + row * 10} width="8" height="7.5" rx="2.5"
            fill={`url(#${id}-spec)`} />
        </g>
      ))}
      {/* Obliques */}
      <path d="M25 46 C23 54 23 65 27 73 L31 70 L28 55 Z" fill={`url(#${id}-grad)`} opacity="0.65" />
      <path d="M25 46 C23 54 23 65 27 73 L31 70 L28 55 Z" fill={`url(#${id}-spec)`} />
      <path d="M55 46 C57 54 57 65 53 73 L49 70 L52 55 Z" fill={`url(#${id}-grad)`} opacity="0.65" />
      <path d="M55 46 C57 54 57 65 53 73 L49 70 L52 55 Z" fill={`url(#${id}-spec)`} />
      {/* Linea alba */}
      <line x1="40" y1="46" x2="40" y2="76" stroke={color} strokeWidth="0.65" opacity="0.42" />
      {/* Linea semilunaris */}
      <path d="M30 46 C29 56 29 65 30 75" stroke={color} strokeWidth="0.5" fill="none" opacity="0.28" />
      <path d="M50 46 C51 56 51 65 50 75" stroke={color} strokeWidth="0.5" fill="none" opacity="0.28" />
    </svg>
  )
}
