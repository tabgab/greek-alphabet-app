// Greek Alphabet Data Structure
// Contains all 24 Greek letters with English comparisons and pictogram mappings

export const greekAlphabet = [
  {
    id: 1,
    name: 'Alpha',
    greekLetter: 'Α',
    greekLowercase: 'α',
    englishSound: 'ah',
    englishComparison: 'Like "a" in "father"',
    pictogram: 'triangle', // Visual representation
    exampleWords: ['apple', 'father', 'alpha'],
    category: 'vowel',
    difficulty: 1,
    visualAid: 'Think of it as an upside-down "A" without the bar',
    commonWords: ['άλφα', 'αέρας (air)', 'άνθρωπος (human)']
  },
  {
    id: 2,
    name: 'Beta',
    greekLetter: 'Β',
    greekLowercase: 'β',
    englishSound: 'beh',
    englishComparison: 'Like "b" in "baby"',
    pictogram: 'circle-half', // Visual representation
    exampleWords: ['baby', 'ball', 'beta'],
    category: 'consonant',
    difficulty: 1,
    visualAid: 'Like a "B" but with the loops connected',
    commonWords: ['βήτα', 'μπάλα (ball)', 'βιβλίο (book)']
  },
  {
    id: 3,
    name: 'Gamma',
    greekLetter: 'Γ',
    greekLowercase: 'γ',
    englishSound: 'gah',
    englishComparison: 'Like "g" in "game" (hard g)',
    pictogram: 'angle-right', // Visual representation
    exampleWords: ['game', 'go', 'gamma'],
    category: 'consonant',
    difficulty: 2,
    visualAid: 'Like an upside-down "L" or a right angle',
    commonWords: ['γάμμα', 'γάτα (cat)', 'γρήγορος (fast)']
  },
  {
    id: 4,
    name: 'Delta',
    greekLetter: 'Δ',
    greekLowercase: 'δ',
    englishSound: 'theh',
    englishComparison: 'Like "th" in "this"',
    pictogram: 'triangle', // Visual representation
    exampleWords: ['this', 'that', 'delta'],
    category: 'consonant',
    difficulty: 2,
    visualAid: 'Like a triangle pointing up',
    commonWords: ['δέλτα', 'δέντρο (tree)', 'δρόμος (road)']
  },
  {
    id: 5,
    name: 'Epsilon',
    greekLetter: 'Ε',
    greekLowercase: 'ε',
    englishSound: 'eh',
    englishComparison: 'Like "e" in "bed"',
    pictogram: 'square', // Visual representation
    exampleWords: ['bed', 'egg', 'epsilon'],
    category: 'vowel',
    difficulty: 1,
    visualAid: 'Like a backwards "3" or a square "E"',
    commonWords: ['έψιλον', 'ένα (one)', 'εγώ (I)']
  },
  {
    id: 6,
    name: 'Zeta',
    greekLetter: 'Ζ',
    greekLowercase: 'ζ',
    englishSound: 'dzeh',
    englishComparison: 'Like "ds" in "suds"',
    pictogram: 'zap', // Visual representation
    exampleWords: ['suds', 'zebra', 'zeta'],
    category: 'consonant',
    difficulty: 3,
    visualAid: 'Like a "Z" but with a horizontal line through it',
    commonWords: ['ζήτα', 'ζώο (animal)', 'ζέστη (heat)']
  },
  {
    id: 7,
    name: 'Eta',
    greekLetter: 'Η',
    greekLowercase: 'η',
    englishSound: 'ee',
    englishComparison: 'Like "ee" in "see"',
    pictogram: 'h-square', // Visual representation
    exampleWords: ['see', 'tree', 'eta'],
    category: 'vowel',
    difficulty: 2,
    visualAid: 'Like an "H" or a square "n"',
    commonWords: ['ήτα', 'ήλιος (sun)', 'ήρεμος (calm)']
  },
  {
    id: 8,
    name: 'Theta',
    greekLetter: 'Θ',
    greekLowercase: 'θ',
    englishSound: 'theh',
    englishComparison: 'Like "th" in "think"',
    pictogram: 'circle', // Visual representation
    exampleWords: ['think', 'thick', 'theta'],
    category: 'consonant',
    difficulty: 3,
    visualAid: 'Like an "O" with a horizontal line through the middle',
    commonWords: ['θήτα', 'θέατρο (theater)', 'θεός (god)']
  },
  {
    id: 9,
    name: 'Iota',
    greekLetter: 'Ι',
    greekLowercase: 'ι',
    englishSound: 'ee',
    englishComparison: 'Like "i" in "machine"',
    pictogram: 'line', // Visual representation
    exampleWords: ['machine', 'police', 'iota'],
    category: 'vowel',
    difficulty: 1,
    visualAid: 'Like a straight line "I"',
    commonWords: ['ιώτα', 'ιδέα (idea)', 'ίσως (maybe)']
  },
  {
    id: 10,
    name: 'Kappa',
    greekLetter: 'Κ',
    greekLowercase: 'κ',
    englishSound: 'kah',
    englishComparison: 'Like "k" in "kite"',
    pictogram: 'k', // Visual representation
    exampleWords: ['kite', 'car', 'kappa'],
    category: 'consonant',
    difficulty: 1,
    visualAid: 'Like a "K" without the bottom line',
    commonWords: ['κάππα', 'καλό (good)', 'κόκκινος (red)']
  },
  {
    id: 11,
    name: 'Lambda',
    greekLetter: 'Λ',
    greekLowercase: 'λ',
    englishSound: 'lah',
    englishComparison: 'Like "l" in "lamp"',
    pictogram: 'triangle', // Visual representation
    exampleWords: ['lamp', 'light', 'lambda'],
    category: 'consonant',
    difficulty: 2,
    visualAid: 'Like an upside-down "V" or a triangle without base',
    commonWords: ['λάμδα', 'λάθος (wrong)', 'λόγος (word)']
  },
  {
    id: 12,
    name: 'Mu',
    greekLetter: 'Μ',
    greekLowercase: 'μ',
    englishSound: 'mee',
    englishComparison: 'Like "m" in "mouse"',
    pictogram: 'm', // Visual representation
    exampleWords: ['mouse', 'man', 'mu'],
    category: 'consonant',
    difficulty: 1,
    visualAid: 'Like an "M" but with curved sides',
    commonWords: ['μυ', 'μαμά (mom)', 'μήλο (apple)']
  },
  {
    id: 13,
    name: 'Nu',
    greekLetter: 'Ν',
    greekLowercase: 'ν',
    englishSound: 'nee',
    englishComparison: 'Like "n" in "nice"',
    pictogram: 'n', // Visual representation
    exampleWords: ['nice', 'now', 'nu'],
    category: 'consonant',
    difficulty: 1,
    visualAid: 'Like a "N" but with the diagonal line straighter',
    commonWords: ['νυ', 'ναι (yes)', 'νούμερο (number)']
  },
  {
    id: 14,
    name: 'Xi',
    greekLetter: 'Ξ',
    greekLowercase: 'ξ',
    englishSound: 'ksee',
    englishComparison: 'Like "ks" in "taxi"',
    pictogram: 'bars', // Visual representation
    exampleWords: ['taxi', 'box', 'xi'],
    category: 'consonant',
    difficulty: 4,
    visualAid: 'Like three horizontal lines of different lengths',
    commonWords: ['ξι', 'ξένος (stranger)', 'ξενοδοχείο (hotel)']
  },
  {
    id: 15,
    name: 'Omicron',
    greekLetter: 'Ο',
    greekLowercase: 'ο',
    englishSound: 'oh',
    englishComparison: 'Like "o" in "more"',
    pictogram: 'circle', // Visual representation
    exampleWords: ['more', 'go', 'omicron'],
    category: 'vowel',
    difficulty: 1,
    visualAid: 'Like a perfect circle "O"',
    commonWords: ['όμικρον', 'όμορφος (beautiful)', 'όνομα (name)']
  },
  {
    id: 16,
    name: 'Pi',
    greekLetter: 'Π',
    greekLowercase: 'π',
    englishSound: 'pee',
    englishComparison: 'Like "p" in "pie"',
    pictogram: 'table', // Visual representation
    exampleWords: ['pie', 'pizza', 'pi'],
    category: 'consonant',
    difficulty: 2,
    visualAid: 'Like a "n" with a horizontal line on top',
    commonWords: ['πι', 'πίτα (pie)', 'παιδί (child)']
  },
  {
    id: 17,
    name: 'Rho',
    greekLetter: 'Ρ',
    greekLowercase: 'ρ',
    englishSound: 'roh',
    englishComparison: 'Like "r" in "road"',
    pictogram: 'r', // Visual representation
    exampleWords: ['road', 'run', 'rho'],
    category: 'consonant',
    difficulty: 2,
    visualAid: 'Like a "P" without the loop closed',
    commonWords: ['ρω', 'ρόδα (rose)', 'ρήμα (verb)']
  },
  {
    id: 18,
    name: 'Sigma',
    greekLetter: 'Σ',
    greekLowercase: 'σ/ς',
    englishSound: 'sih',
    englishComparison: 'Like "s" in "sing"',
    pictogram: 's', // Visual representation
    exampleWords: ['sing', 'sun', 'sigma'],
    category: 'consonant',
    difficulty: 2,
    visualAid: 'Like a "C" rotated 90 degrees clockwise, or "ς" at end of words',
    commonWords: ['σίγμα', 'σημαία (flag)', 'σπίτι (house)']
  },
  {
    id: 19,
    name: 'Tau',
    greekLetter: 'Τ',
    greekLowercase: 'τ',
    englishSound: 'tah',
    englishComparison: 'Like "t" in "take"',
    pictogram: 't', // Visual representation
    exampleWords: ['take', 'time', 'tau'],
    category: 'consonant',
    difficulty: 1,
    visualAid: 'Like a "T" without the left side',
    commonWords: ['ταυ', 'τραπέζι (table)', 'τηλέφωνο (phone)']
  },
  {
    id: 20,
    name: 'Upsilon',
    greekLetter: 'Υ',
    greekLowercase: 'υ',
    englishSound: 'ee',
    englishComparison: 'Like "ee" in "free" (French u)',
    pictogram: 'y', // Visual representation
    exampleWords: ['free', 'university', 'upsilon'],
    category: 'vowel',
    difficulty: 3,
    visualAid: 'Like a "Y" or a "u" with a tail',
    commonWords: ['ύψιλον', 'ύμνος (hymn)', 'υγιής (healthy)']
  },
  {
    id: 21,
    name: 'Phi',
    greekLetter: 'Φ',
    greekLowercase: 'φ',
    englishSound: 'fee',
    englishComparison: 'Like "f" in "phone"',
    pictogram: 'circle', // Visual representation
    exampleWords: ['phone', 'photo', 'phi'],
    category: 'consonant',
    difficulty: 3,
    visualAid: 'Like an "O" with a vertical line through it',
    commonWords: ['φι', 'φίλος (friend)', 'φως (light)']
  },
  {
    id: 22,
    name: 'Chi',
    greekLetter: 'Χ',
    greekLowercase: 'χ',
    englishSound: 'hee',
    englishComparison: 'Like "ch" in "loch" (Scottish)',
    pictogram: 'x', // Visual representation
    exampleWords: ['loch', 'achoo', 'chi'],
    category: 'consonant',
    difficulty: 4,
    visualAid: 'Like an "X" or two crossing lines',
    commonWords: ['χι', 'χρόνος (time)', 'χέρι (hand)']
  },
  {
    id: 23,
    name: 'Psi',
    greekLetter: 'Ψ',
    greekLowercase: 'ψ',
    englishSound: 'psee',
    englishComparison: 'Like "ps" in "lapse"',
    pictogram: 'trident', // Visual representation
    exampleWords: ['lapse', 'psychology', 'psi'],
    category: 'consonant',
    difficulty: 4,
    visualAid: 'Like a trident or "n" with a vertical line',
    commonWords: ['ψι', 'ψυχή (soul)', 'ψάρι (fish)']
  },
  {
    id: 24,
    name: 'Omega',
    greekLetter: 'Ω',
    greekLowercase: 'ω',
    englishSound: 'oh',
    englishComparison: 'Like "o" in "more" (longer)',
    pictogram: 'omega', // Visual representation
    exampleWords: ['more', 'go', 'omega'],
    category: 'vowel',
    difficulty: 2,
    visualAid: 'Like a rounded "W" or horseshoe shape',
    commonWords: ['ωμέγα', 'ωραίος (beautiful)', 'ώμος (shoulder)']
  }
];

// Helper functions for working with the alphabet data
export const getLetterById = (id) => greekAlphabet.find(letter => letter.id === id);
export const getLetterByName = (name) => greekAlphabet.find(letter => letter.name.toLowerCase() === name.toLowerCase());
export const getLettersByDifficulty = (difficulty) => greekAlphabet.filter(letter => letter.difficulty <= difficulty);
export const getVowels = () => greekAlphabet.filter(letter => letter.category === 'vowel');
export const getConsonants = () => greekAlphabet.filter(letter => letter.category === 'consonant');
export const getRandomLetters = (count) => {
  const shuffled = [...greekAlphabet].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};