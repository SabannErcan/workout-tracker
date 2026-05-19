const KG_TO_LBS = 2.20462

// Convert a stored kg value to the display unit
export function toDisplay(kg, unit) {
  if (kg == null || isNaN(kg)) return kg
  if (unit === 'lbs') return Math.round(kg * KG_TO_LBS * 2) / 2  // nearest 0.5 lbs
  return kg
}

// Convert a value entered in display unit back to kg for storage
export function toKg(val, unit) {
  if (val == null || isNaN(val)) return val
  if (unit === 'lbs') return Math.round(val / KG_TO_LBS * 10) / 10
  return val
}

// Weight increment step for +/- buttons
export function weightStep(unit) {
  return unit === 'lbs' ? 5 : 2.5
}
