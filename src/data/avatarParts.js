// ─── Avatar Crafter Data ─────────────────────────────────────────────
// All pixel art definitions, color palettes, and compositing logic
// Grid: 16 columns × 20 rows
// Token legend: 0=skip, 1=skin, 2=skinShadow, 3=hair, 4=hairShadow,
//   5=eye(glow), 6=eyeDark, 7=cloth, 8=clothShadow, 9=clothAccent,
//   10=mouth, 11=accessory, 12=accShadow

export const ROWS = 20
export const COLS = 16

// ─── COLOR PALETTES ──────────────────────────────────────────────────

export const SKIN_TONES = [
  { id: 'pale',    label: 'Pale',    main: '#fde0c8', shadow: '#e0b89a' },
  { id: 'light',   label: 'Light',   main: '#f5d0a9', shadow: '#d4a574' },
  { id: 'fair',    label: 'Fair',    main: '#e8b888', shadow: '#c4956a' },
  { id: 'medium',  label: 'Medium',  main: '#c4a882', shadow: '#a08060' },
  { id: 'tan',     label: 'Tan',     main: '#a78a60', shadow: '#8a6e48' },
  { id: 'brown',   label: 'Brown',   main: '#8b6540', shadow: '#6e4830' },
  { id: 'dark',    label: 'Dark',    main: '#5c3a20', shadow: '#3e2815' },
  { id: 'deep',    label: 'Deep',    main: '#3d2515', shadow: '#2a1a0e' },
]

export const HAIR_COLORS = [
  { id: 'black',     label: 'Black',      main: '#1a1a2e', shadow: '#0f0f1a' },
  { id: 'darkBrown', label: 'Dark Brown', main: '#3d2b1f', shadow: '#2a1c14' },
  { id: 'brown',     label: 'Brown',      main: '#6b4226', shadow: '#4a2e1a' },
  { id: 'auburn',    label: 'Auburn',     main: '#8b3a2a', shadow: '#6a2a1a' },
  { id: 'blonde',    label: 'Blonde',     main: '#d4a843', shadow: '#b08830' },
  { id: 'platinum',  label: 'Platinum',   main: '#d0d0e0', shadow: '#a0a0b0' },
  { id: 'red',       label: 'Red',        main: '#c23030', shadow: '#8b2020' },
  { id: 'blue',      label: 'Blue',       main: '#2050b0', shadow: '#153080' },
  { id: 'pink',      label: 'Pink',       main: '#d060a0', shadow: '#a04878' },
  { id: 'green',     label: 'Green',      main: '#30a050', shadow: '#207838' },
  { id: 'purple',    label: 'Purple',     main: '#7030b0', shadow: '#502080' },
  { id: 'white',     label: 'White',      main: '#e8e8f0', shadow: '#c0c0d0' },
]

export const EYE_COLORS = [
  { id: 'cyan',   label: 'Cyan',    main: '#a0ffee' },
  { id: 'red',    label: 'Red',     main: '#ff4455' },
  { id: 'green',  label: 'Green',   main: '#44ff88' },
  { id: 'blue',   label: 'Blue',    main: '#4488ff' },
  { id: 'purple', label: 'Purple',  main: '#bb55ff' },
  { id: 'gold',   label: 'Gold',    main: '#ffdd44' },
  { id: 'orange', label: 'Orange',  main: '#ff8844' },
  { id: 'white',  label: 'White',   main: '#eeeeff' },
]

export const CLOTHING_COLORS = [
  { id: 'navy',   label: 'Navy',    main: '#1c1c2e', shadow: '#0f0f1a', accent: '#2a2a44' },
  { id: 'black',  label: 'Black',   main: '#181820', shadow: '#0c0c14', accent: '#282830' },
  { id: 'red',    label: 'Red',     main: '#6b1a1a', shadow: '#4a0f0f', accent: '#8b2a2a' },
  { id: 'blue',   label: 'Blue',    main: '#1a3a6b', shadow: '#0f2a4a', accent: '#2a4a8b' },
  { id: 'green',  label: 'Green',   main: '#1a4a2a', shadow: '#0f3a1a', accent: '#2a6a3a' },
  { id: 'purple', label: 'Purple',  main: '#3a1a5a', shadow: '#2a0f4a', accent: '#4a2a7a' },
  { id: 'grey',   label: 'Grey',    main: '#3a3a4a', shadow: '#2a2a3a', accent: '#4a4a5a' },
  { id: 'white',  label: 'White',   main: '#c0c0d0', shadow: '#a0a0b0', accent: '#d8d8e0' },
  { id: 'brown',  label: 'Brown',   main: '#4a3020', shadow: '#352015', accent: '#5a4030' },
  { id: 'teal',   label: 'Teal',    main: '#1a4a4a', shadow: '#0f3535', accent: '#2a6060' },
]

export const ACCESSORY_COLORS = [
  { id: 'silver',  label: 'Silver',  main: '#888899', shadow: '#555566' },
  { id: 'black',   label: 'Black',   main: '#222233', shadow: '#111122' },
  { id: 'gold',    label: 'Gold',    main: '#c0a030', shadow: '#907820' },
  { id: 'red',     label: 'Red',     main: '#aa2020', shadow: '#771515' },
  { id: 'blue',    label: 'Blue',    main: '#2050aa', shadow: '#153577' },
  { id: 'white',   label: 'White',   main: '#ccccdd', shadow: '#9999aa' },
  { id: 'pink',    label: 'Pink',    main: '#cc5599', shadow: '#993a6a' },
  { id: 'green',   label: 'Green',   main: '#30a050', shadow: '#207838' },
]

export const BG_COLORS = [
  { id: 'none',       label: 'None',       color: null },
  { id: 'dark',       label: 'Dark',       color: '#0a0a12' },
  { id: 'midnight',   label: 'Midnight',   color: '#0f0f2a' },
  { id: 'charcoal',   label: 'Charcoal',   color: '#1a1a1a' },
  { id: 'navy',       label: 'Navy',       color: '#0a1428' },
  { id: 'forest',     label: 'Forest',     color: '#0a1a0f' },
  { id: 'wine',       label: 'Wine',       color: '#1a0a10' },
  { id: 'slate',      label: 'Slate',      color: '#2a2a35' },
  { id: 'ocean',      label: 'Ocean',      color: '#0a2030' },
  { id: 'purple',     label: 'Purple',     color: '#150a28' },
]

// ─── PART DEFINITIONS ────────────────────────────────────────────────
// Each grid: 20 rows × 16 cols. 0 = skip (transparent on that layer).

// BASE SKIN - face shape, neck, hands (always rendered first)
export const BASE_SKIN = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,1,1,1,2,1,1,1,1,1,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0],
  [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0],
]

// ─── HAIR STYLES ─────────────────────────────────────────────────────

export const HAIR_STYLES = [
  {
    id: 'none', label: 'Bald', icon: '👨‍🦲',
    grid: Array(20).fill(null).map(() => Array(16).fill(0)),
  },
  {
    id: 'spiky', label: 'Spiky', icon: '⚡',
    grid: [
      [0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0],
      [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
      [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [0,0,0,4,3,3,3,3,3,3,3,3,4,0,0,0],
      [0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0],
      ...e(15),
    ],
  },
  {
    id: 'messy', label: 'Messy', icon: '🌪️',
    grid: [
      [0,0,0,3,0,3,3,3,3,3,3,0,3,0,0,0],
      [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
      [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
      [0,0,4,3,3,3,3,3,3,3,3,3,3,4,0,0],
      [0,0,0,4,3,3,0,0,0,3,3,4,0,0,0,0],
      [0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,0],
      ...e(14),
    ],
  },
  {
    id: 'long', label: 'Long', icon: '💇',
    grid: [
      [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
      [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
      [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
      [0,0,3,4,0,0,3,3,3,0,0,4,3,0,0,0],
      [0,0,3,0,0,0,0,0,0,0,0,0,3,0,0,0],
      [0,0,3,0,0,0,0,0,0,0,0,0,3,0,0,0],
      [0,0,4,0,0,0,0,0,0,0,0,0,4,0,0,0],
      [0,0,4,0,0,0,0,0,0,0,0,4,0,0,0,0],
      [0,0,4,0,0,0,0,0,0,0,0,4,0,0,0,0],
      [0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0],
      ...e(9),
    ],
  },
  {
    id: 'short', label: 'Short', icon: '✂️',
    grid: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
      [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [0,0,0,0,4,4,0,0,0,0,4,4,0,0,0,0],
      ...e(15),
    ],
  },
  {
    id: 'mohawk', label: 'Mohawk', icon: '🔥',
    grid: [
      [0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0],
      [0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0],
      [0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0],
      [0,0,0,0,0,4,3,3,3,3,4,0,0,0,0,0],
      [0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0],
      ...e(15),
    ],
  },
  {
    id: 'emo', label: 'Emo', icon: '🖤',
    grid: [
      [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
      [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [0,0,3,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [0,0,3,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [0,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0],
      [0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ...e(13),
    ],
  },
  {
    id: 'curly', label: 'Curly', icon: '🌀',
    grid: [
      [0,0,0,3,0,3,0,3,3,0,3,0,3,0,0,0],
      [0,0,3,0,3,3,3,3,3,3,3,3,0,3,0,0],
      [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
      [0,0,4,3,3,3,3,3,3,3,3,3,3,4,0,0],
      [0,0,0,4,0,3,0,0,0,3,0,4,0,0,0,0],
      [0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0],
      ...e(14),
    ],
  },
]

// ─── EYE STYLES ──────────────────────────────────────────────────────

export const EYE_STYLES = [
  {
    id: 'normal', label: 'Normal', icon: '👁️',
    grid: [
      ...e(6),
      [0,0,0,0,6,5,0,0,0,5,6,0,0,0,0,0],
      ...e(13),
    ],
  },
  {
    id: 'wide', label: 'Wide', icon: '👀',
    grid: [
      ...e(5),
      [0,0,0,0,6,5,0,0,0,5,6,0,0,0,0,0],
      [0,0,0,0,6,5,0,0,0,5,6,0,0,0,0,0],
      ...e(13),
    ],
  },
  {
    id: 'narrow', label: 'Narrow', icon: '😑',
    grid: [
      ...e(6),
      [0,0,0,0,0,5,0,0,0,5,0,0,0,0,0,0],
      ...e(13),
    ],
  },
  {
    id: 'closed', label: 'Closed', icon: '😌',
    grid: [
      ...e(6),
      [0,0,0,0,6,6,0,0,0,6,6,0,0,0,0,0],
      ...e(13),
    ],
  },
  {
    id: 'fierce', label: 'Fierce', icon: '😠',
    grid: [
      ...e(5),
      [0,0,0,0,6,0,0,0,0,0,6,0,0,0,0,0],
      [0,0,0,0,6,5,0,0,0,5,6,0,0,0,0,0],
      ...e(13),
    ],
  },
  {
    id: 'anime', label: 'Anime', icon: '✨',
    grid: [
      ...e(5),
      [0,0,0,6,6,6,0,0,0,6,6,6,0,0,0,0],
      [0,0,0,6,5,5,0,0,0,5,5,6,0,0,0,0],
      [0,0,0,0,6,6,0,0,0,6,6,0,0,0,0,0],
      ...e(12),
    ],
  },
  {
    id: 'wink', label: 'Wink', icon: '😉',
    grid: [
      ...e(6),
      [0,0,0,0,6,5,0,0,0,6,6,0,0,0,0,0],
      ...e(13),
    ],
  },
  {
    id: 'cyber', label: 'Cyber', icon: '🤖',
    grid: [
      ...e(5),
      [0,0,0,6,5,5,6,0,6,5,5,6,0,0,0,0],
      [0,0,0,0,6,6,0,0,0,6,6,0,0,0,0,0],
      ...e(13),
    ],
  },
]

// ─── MOUTH STYLES ────────────────────────────────────────────────────

export const MOUTH_STYLES = [
  {
    id: 'neutral', label: 'Neutral', icon: '😐',
    grid: [
      ...e(8),
      [0,0,0,0,0,0,6,0,6,0,0,0,0,0,0,0],
      ...e(11),
    ],
  },
  {
    id: 'smile', label: 'Smile', icon: '😊',
    grid: [
      ...e(8),
      [0,0,0,0,0,0,6,10,6,0,0,0,0,0,0,0],
      ...e(11),
    ],
  },
  {
    id: 'grin', label: 'Grin', icon: '😁',
    grid: [
      ...e(8),
      [0,0,0,0,0,6,10,10,10,6,0,0,0,0,0,0],
      ...e(11),
    ],
  },
  {
    id: 'open', label: 'Open', icon: '😮',
    grid: [
      ...e(8),
      [0,0,0,0,0,0,6,10,6,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0],
      ...e(10),
    ],
  },
  {
    id: 'smirk', label: 'Smirk', icon: '😏',
    grid: [
      ...e(8),
      [0,0,0,0,0,0,0,0,6,10,0,0,0,0,0,0],
      ...e(11),
    ],
  },
  {
    id: 'cat', label: 'Cat', icon: '😺',
    grid: [
      ...e(8),
      [0,0,0,0,0,6,0,10,0,6,0,0,0,0,0,0],
      [0,0,0,0,0,0,6,0,6,0,0,0,0,0,0,0],
      ...e(10),
    ],
  },
]

// ─── CLOTHING STYLES ─────────────────────────────────────────────────

export const CLOTHING_STYLES = [
  {
    id: 'hoodie', label: 'Hoodie', icon: '🧥',
    grid: [
      ...e(10),
      [0,0,0,0,0,9,9,9,9,9,0,0,0,0,0,0],
      [0,0,0,7,7,7,7,7,7,7,7,7,7,0,0,0],
      [0,0,7,7,7,7,7,7,7,7,7,7,7,7,0,0],
      [0,7,7,7,7,9,7,7,7,9,7,7,7,7,7,0],
      [0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0],
      [0,7,7,8,7,7,7,7,7,7,7,8,7,7,7,0],
      [0,0,7,7,7,7,7,7,7,7,7,7,7,7,0,0],
      [0,0,0,7,7,7,7,7,7,7,7,7,7,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
    ],
  },
  {
    id: 'tshirt', label: 'T-Shirt', icon: '👕',
    grid: [
      ...e(10),
      [0,0,0,0,0,0,9,9,9,0,0,0,0,0,0,0],
      [0,0,0,0,7,7,7,7,7,7,7,0,0,0,0,0],
      [0,0,0,7,7,7,7,7,7,7,7,7,0,0,0,0],
      [0,0,7,7,7,7,7,7,7,7,7,7,7,0,0,0],
      [0,0,0,7,7,7,7,7,7,7,7,7,0,0,0,0],
      [0,0,0,7,7,7,7,7,7,7,7,7,0,0,0,0],
      [0,0,0,0,7,7,7,7,7,7,7,0,0,0,0,0],
      [0,0,0,0,7,7,7,7,7,7,7,0,0,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
    ],
  },
  {
    id: 'jacket', label: 'Jacket', icon: '🧥',
    grid: [
      ...e(10),
      [0,0,0,0,0,9,9,9,9,9,0,0,0,0,0,0],
      [0,0,0,7,7,7,7,8,7,7,7,7,7,0,0,0],
      [0,0,7,7,7,7,7,8,7,7,7,7,7,7,0,0],
      [0,7,7,7,7,7,7,8,7,7,7,7,7,7,7,0],
      [0,7,7,7,7,7,7,8,7,7,7,7,7,7,7,0],
      [0,7,7,8,7,7,7,8,7,7,7,8,7,7,7,0],
      [0,0,7,7,7,7,7,8,7,7,7,7,7,7,0,0],
      [0,0,0,7,7,7,7,8,7,7,7,7,7,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
    ],
  },
  {
    id: 'tank', label: 'Tank Top', icon: '🎽',
    grid: [
      ...e(10),
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,7,7,7,7,7,0,0,0,0,0,0],
      [0,0,0,0,7,7,7,7,7,7,7,0,0,0,0,0],
      [0,0,0,7,7,7,7,7,7,7,7,7,0,0,0,0],
      [0,0,0,7,7,7,7,7,7,7,7,7,0,0,0,0],
      [0,0,0,7,7,7,7,7,7,7,7,7,0,0,0,0],
      [0,0,0,0,7,7,7,7,7,7,7,0,0,0,0,0],
      [0,0,0,0,7,7,7,7,7,7,7,0,0,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
    ],
  },
  {
    id: 'suit', label: 'Suit', icon: '🤵',
    grid: [
      ...e(10),
      [0,0,0,0,0,9,9,9,9,9,0,0,0,0,0,0],
      [0,0,0,7,7,7,9,7,9,7,7,7,7,0,0,0],
      [0,0,7,7,7,7,9,7,9,7,7,7,7,7,0,0],
      [0,7,7,7,7,7,0,9,0,7,7,7,7,7,7,0],
      [0,7,7,7,7,7,0,9,0,7,7,7,7,7,7,0],
      [0,7,7,8,7,7,0,9,0,7,7,8,7,7,7,0],
      [0,0,7,7,7,7,0,9,0,7,7,7,7,7,0,0],
      [0,0,0,7,7,7,7,7,7,7,7,7,7,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
    ],
  },
  {
    id: 'turtleneck', label: 'Turtleneck', icon: '🧣',
    grid: [
      ...e(9),
      [0,0,0,0,0,7,7,7,7,7,0,0,0,0,0,0],
      [0,0,0,0,7,7,7,7,7,7,7,0,0,0,0,0],
      [0,0,0,7,7,7,7,7,7,7,7,7,7,0,0,0],
      [0,0,7,7,7,7,7,7,7,7,7,7,7,7,0,0],
      [0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0],
      [0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0],
      [0,7,7,8,7,7,7,7,7,7,7,8,7,7,7,0],
      [0,0,7,7,7,7,7,7,7,7,7,7,7,7,0,0],
      [0,0,0,7,7,7,7,7,7,7,7,7,7,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
      [0,0,0,0,8,8,0,0,0,8,8,0,0,0,0,0],
    ],
  },
]

// ─── ACCESSORIES ─────────────────────────────────────────────────────

export const ACCESSORIES = [
  {
    id: 'none', label: 'None', icon: '❌',
    grid: Array(20).fill(null).map(() => Array(16).fill(0)),
  },
  {
    id: 'headphones', label: 'Headphones', icon: '🎧',
    grid: [
      ...e(2),
      [0,0,11,11,0,0,0,0,0,0,0,0,11,11,0,0],
      [0,0,11,0,0,0,0,0,0,0,0,0,0,11,0,0],
      [0,0,11,12,0,0,0,0,0,0,0,0,12,11,0,0],
      ...e(15),
    ],
  },
  {
    id: 'glasses', label: 'Glasses', icon: '👓',
    grid: [
      ...e(5),
      [0,0,0,11,11,11,11,0,11,11,11,11,0,0,0,0],
      [0,0,0,11,0,0,11,12,11,0,0,11,0,0,0,0],
      [0,0,0,0,11,11,0,0,0,11,11,0,0,0,0,0],
      ...e(12),
    ],
  },
  {
    id: 'sunglasses', label: 'Sunglasses', icon: '🕶️',
    grid: [
      ...e(5),
      [0,0,0,11,11,11,11,11,11,11,11,11,0,0,0,0],
      [0,0,0,11,12,12,11,12,11,12,12,11,0,0,0,0],
      ...e(13),
    ],
  },
  {
    id: 'cap', label: 'Cap', icon: '🧢',
    grid: [
      [0,0,0,0,11,11,11,11,11,11,11,11,0,0,0,0],
      [0,0,0,11,11,11,11,11,11,11,11,11,11,0,0,0],
      [0,0,11,11,11,11,11,11,11,11,11,11,11,11,0,0],
      [0,11,12,12,12,12,12,12,12,12,12,12,12,12,11,0],
      ...e(16),
    ],
  },
  {
    id: 'mask', label: 'Mask', icon: '😷',
    grid: [
      ...e(7),
      [0,0,0,0,11,11,11,11,11,11,11,0,0,0,0,0],
      [0,0,0,0,11,11,11,11,11,11,11,0,0,0,0,0],
      [0,0,0,0,0,11,11,11,11,11,0,0,0,0,0,0],
      ...e(10),
    ],
  },
  {
    id: 'eyepatch', label: 'Eye Patch', icon: '🏴‍☠️',
    grid: [
      ...e(4),
      [0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,11,11,0,0,0,0,0],
      ...e(13),
    ],
  },
  {
    id: 'earring', label: 'Earring', icon: '💎',
    grid: [
      ...e(8),
      [0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ...e(10),
    ],
  },
]

// Helper: generate N empty rows
function e(count) {
  return Array(count).fill(null).map(() => Array(16).fill(0))
}

// ─── COMPOSITING ─────────────────────────────────────────────────────

export function compositeAvatar(config) {
  // Create empty grid
  const grid = Array(ROWS).fill(null).map(() => Array(COLS).fill(0))

  // Find selected parts
  const hairDef   = HAIR_STYLES.find(h => h.id === config.hairStyle)
  const eyeDef    = EYE_STYLES.find(e => e.id === config.eyeStyle)
  const mouthDef  = MOUTH_STYLES.find(m => m.id === config.mouthStyle)
  const clothDef  = CLOTHING_STYLES.find(c => c.id === config.clothingStyle)
  const accDef    = ACCESSORIES.find(a => a.id === config.accessory)

  // Apply layers in order (later overrides earlier)
  const layers = [
    BASE_SKIN,
    clothDef?.grid,
    hairDef?.grid,
    eyeDef?.grid,
    mouthDef?.grid,
    accDef?.grid,
  ].filter(Boolean)

  for (const layer of layers) {
    for (let r = 0; r < ROWS; r++) {
      if (!layer[r]) continue
      for (let c = 0; c < COLS; c++) {
        if (layer[r][c] !== 0) {
          grid[r][c] = layer[r][c]
        }
      }
    }
  }

  return grid
}

// ─── COLOR RESOLUTION ────────────────────────────────────────────────

export function getColorMap(config) {
  const skin  = SKIN_TONES.find(s => s.id === config.skin)     || SKIN_TONES[3]
  const hair  = HAIR_COLORS.find(h => h.id === config.hairColor) || HAIR_COLORS[0]
  const eye   = EYE_COLORS.find(e => e.id === config.eyeColor)   || EYE_COLORS[0]
  const cloth = CLOTHING_COLORS.find(c => c.id === config.clothingColor) || CLOTHING_COLORS[0]
  const acc   = ACCESSORY_COLORS.find(a => a.id === config.accessoryColor) || ACCESSORY_COLORS[0]

  return {
    1:  skin.main,
    2:  skin.shadow,
    3:  hair.main,
    4:  hair.shadow,
    5:  eye.main,
    6:  '#0f0f1a',
    7:  cloth.main,
    8:  cloth.shadow,
    9:  cloth.accent,
    10: '#8b4050',
    11: acc.main,
    12: acc.shadow,
  }
}

// ─── SVG GENERATION ──────────────────────────────────────────────────

export function buildSvgMarkup(grid, colorMap, bgColor = null) {
  const rects = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const token = grid[r][c]
      if (token === 0) continue
      const color = colorMap[token]
      if (!color) continue
      const isEye = token === 5
      const glow = isEye ? ' filter="url(#eyeGlow)"' : ''
      rects.push(`  <rect x="${c}" y="${r}" width="1" height="1" fill="${color}"${glow} />`)
    }
  }

  const bgRect = bgColor ? `  <rect width="${COLS}" height="${ROWS}" fill="${bgColor}" />\n` : ''

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${COLS} ${ROWS}" shape-rendering="crispEdges" style="image-rendering:pixelated">
  <defs>
    <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="0.6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
${bgRect}${rects.join('\n')}
</svg>`
}

// ─── DEFAULT CONFIG ──────────────────────────────────────────────────

export const DEFAULT_CONFIG = {
  skin: 'medium',
  hairStyle: 'spiky',
  hairColor: 'black',
  eyeStyle: 'normal',
  eyeColor: 'cyan',
  mouthStyle: 'neutral',
  clothingStyle: 'hoodie',
  clothingColor: 'navy',
  accessory: 'headphones',
  accessoryColor: 'silver',
  bg: 'none',
}

// ─── RANDOMIZE ───────────────────────────────────────────────────────

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function randomConfig() {
  return {
    skin: pickRandom(SKIN_TONES).id,
    hairStyle: pickRandom(HAIR_STYLES).id,
    hairColor: pickRandom(HAIR_COLORS).id,
    eyeStyle: pickRandom(EYE_STYLES).id,
    eyeColor: pickRandom(EYE_COLORS).id,
    mouthStyle: pickRandom(MOUTH_STYLES).id,
    clothingStyle: pickRandom(CLOTHING_STYLES).id,
    clothingColor: pickRandom(CLOTHING_COLORS).id,
    accessory: pickRandom(ACCESSORIES).id,
    accessoryColor: pickRandom(ACCESSORY_COLORS).id,
    bg: pickRandom(BG_COLORS).id,
  }
}
