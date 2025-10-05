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
    commonWords: [
      'άλφα (alpha)',
      'αέρας (air)',
      'άνθρωπος (human)',
      'αυτός (this)',
      'αλλά (but)',
      'αγάπη (love)',
      'αυτοκίνητο (car)',
      'αδερφός (brother)'
    ]
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
    commonWords: [
      'βήτα (beta)',
      'βιβλίο (book)',
      'βασιλιάς (king)',
      'βαλίτσα (suitcase)',
      'βενζίνη (gasoline)',
      'βιταμίνη (vitamin)',
      'βιολί (violin)',
      'βραβείο (award)',
      'βόλος (marble)'
    ]
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
    commonWords: [
      'γάμμα (gamma)',
      'γάτα (cat)',
      'γρήγορος (fast)',
      'γυναίκα (woman)',
      'γράμμα (letter)',
      'γέφυρα (bridge)',
      'γυαλί (glass)',
      'γιορτή (celebration)'
    ]
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
    commonWords: [
      'δέλτα (delta)',
      'δέντρο (tree)',
      'δρόμος (road)',
      'δάσκαλος (teacher)',
      'δωμάτιο (room)',
      'δεξιά (right)',
      'δυο (two)',
      'δουλειά (work)'
    ]
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
    commonWords: [
      'έψιλον (epsilon)',
      'ένα (one)',
      'εγώ (I)',
      'εσύ (you)',
      'εδώ (here)',
      'έξω (outside)',
      'ελληνικά (Greek language)',
      'εστιατόριο (restaurant)',
      'εφημερίδα (newspaper)'
    ]
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
    commonWords: [
      'ζήτα (zeta)',
      'ζώο (animal)',
      'ζέστη (heat)',
      'ζωή (life)',
      'ζωγραφιά (painting)',
      'ζαχαρούχο (sugary)',
      'ζώνη (belt)',
      'ζυμαρικά (pasta)'
    ]
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
    commonWords: [
      'ήτα (eta)',
      'ήλιος (sun)',
      'ήρεμος (calm)',
      'ήδη (already)',
      'ήχος (sound)',
      'ήρωας (hero)',
      'ήσυχος (quiet)',
      'ήπειρος (continent)'
    ]
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
    commonWords: [
      'θήτα (theta)',
      'θέατρο (theater)',
      'θεός (god)',
      'θέλω (want)',
      'θερμός (hot)',
      'θέμα (topic)',
      'θεία (aunt)',
      'θεωρία (theory)'
    ]
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
    commonWords: [
      'ιώτα (iota)',
      'ιδέα (idea)',
      'ίσως (maybe)',
      'είμαι (am/are)',
      'ιδιος (own)',
      'ιερός (sacred)',
      'ιστορία (history)',
      'ιδιωτικός (private)'
    ]
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
    commonWords: [
      'κάππα (kappa)',
      'καλό (good)',
      'κόκκινος (red)',
      'καιρός (weather)',
      'καφές (coffee)',
      'κάθε (each)',
      'κεντρικός (central)',
      'καθαρός (clean)',
      'κοντά (near)'
    ]
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
    commonWords: [
      'λάμδα (lambda)',
      'λάθος (wrong)',
      'λόγος (word)',
      'λεπτό (minute)',
      'λιώνω (melt)',
      'λευκός (white)',
      'λαχανικά (vegetables)',
      'λυπημένος (sad)',
      'λόφος (hill)'
    ]
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
    commonWords: [
      'μυ (mu)',
      'μαμά (mom)',
      'μήλο (apple)',
      'μαζί (together)',
      'μουσική (music)',
      'μαύρος (black)',
      'μάτι (eye)',
      'μικρός (small)',
      'μόνος (alone)'
    ]
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
    commonWords: [
      'νυ (nu)',
      'ναι (yes)',
      'νούμερο (number)',
      'νέος (new)',
      'νοσοκομείο (hospital)',
      'νόμος (law)',
      'νύχτα (night)',
      'νησί (island)',
      'νόστιμος (tasty)'
    ]
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
    commonWords: [
      'ξι (xi)',
      'ξένος (stranger)',
      'ξενοδοχείο (hotel)',
      'ξύλο (wood)',
      'ξέχασα (forgot)',
      'ξανθός (blonde)',
      'ξηρός (dry)',
      'ξυπνάω (wake up)',
      'ξαφνικός (sudden)'
    ]
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
    commonWords: [
      'όμικρον (omicron)',
      'όμορφος (beautiful)',
      'όνομα (name)',
      'όπου (where)',
      'όχι (no)',
      'όροφος (floor)',
      'όλα (all)',
      'όμοιος (similar)',
      'όσο (as much as)'
    ]
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
    commonWords: [
      'πι (pi)',
      'πίτα (pie)',
      'παιδί (child)',
      'πρώτος (first)',
      'πόλη (city)',
      'πράσινος (green)',
      'παράδειγμα (example)',
      'πηγαίνω (go)',
      'πολύ (very)'
    ]
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
    commonWords: [
      'ρω (rho)',
      'ρόδα (rose)',
      'ρήμα (verb)',
      'ρούχα (clothes)',
      'ρόλος (role)',
      'ρίχνω (throw)',
      'ραβδί (stick)',
      'ρυθμός (rhythm)',
      'ρέμα (stream)'
    ]
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
    commonWords: [
      'σίγμα (sigma)',
      'σημαία (flag)',
      'σπίτι (house)',
      'σαν (like)',
      'σήμερα (today)',
      'σχολείο (school)',
      'σύζυγος (spouse)',
      'συγνώμη (sorry)',
      'σώμα (body)'
    ]
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
    commonWords: [
      'ταυ (tau)',
      'τραπέζι (table)',
      'τηλέφωνο (phone)',
      'τέλος (end)',
      'τέχνη (art)',
      'τόπος (place)',
      'τυχαίος (random)',
      'τρελός (crazy)',
      'τυρί (cheese)'
    ]
  },
  {
    id: 20,
    name: 'Upsilon',
    greekLetter: 'Υ',
    greekLowercase: 'υ',
    englishSound: 'ee',
    englishComparison: 'Like "ee" in "free" (French u)',
    pictogram: 'y', // Visual representation
    exampleWords: ['free', 'machine', 'unique'],
    category: 'vowel',
    difficulty: 3,
    visualAid: 'Like a "Y" or a "u" with a tail',
    commonWords: [
      'ύψιλον (upsilon)',
      'ύμνος (hymn)',
      'υγιής (healthy)',
      'υπό (under)',
      'υπάρχω (exist)',
      'υψηλός (high)',
      'υπολογιστή (computer)',
      'υπεύθυνος (responsible)',
      'υδραυλικός (plumber)'
    ]
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
    commonWords: [
      'φι (phi)',
      'φίλος (friend)',
      'φως (light)',
      'φαγητό (food)',
      'φυσικά (naturally)',
      'φοιτητής (student)',
      'φωτιά (fire)',
      'φάρμακο (medicine)',
      'φίδι (snake)'
    ]
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
    commonWords: [
      'χι (chi)',
      'χρόνος (time)',
      'χέρι (hand)',
      'χρήμα (money)',
      'χώρος (space)',
      'χαρά (joy)',
      'χθες (yesterday)',
      'χήρα (widow)',
      'χαμόγελο (smile)'
    ]
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
    commonWords: [
      'ψι (psi)',
      'ψυχή (soul)',
      'ψάρι (fish)',
      'ψέμα (lie)',
      'ψυγείο (fridge)',
      'ψήφος (vote)',
      'ψαλιδίζει (cuts)',
      'ψιλή (fine)',
      'ψύχραιμος (calm)'
    ]
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
    commonWords: [
      'ωμέγα (omega)',
      'ωραίος (beautiful)',
      'ώμος (shoulder)',
      'ώρα (hour)',
      'ωκεανός (ocean)',
      'ώστε (so that)',
      'ωφέλιμος (beneficial)',
      'ώριμος (ripe)',
      'ωραίο (nice)'
    ]
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