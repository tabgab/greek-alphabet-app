// Greek Phrases Data Structure
// 100 most useful Greek phrases with pronunciation and translations

export const greekPhrases = [
  // Basic Greetings & Politeness (15 phrases)
  {
    id: 1,
    category: 'greetings',
    greek: 'Γεια σας',
    pronunciation: 'YAH-sahs',
    english: 'Hello (formal)',
    difficulty: 1,
    notes: 'Used when addressing someone formally or a group of people'
  },
  {
    id: 2,
    category: 'greetings',
    greek: 'Γεια σου',
    pronunciation: 'YAH-soo',
    english: 'Hello (informal)',
    difficulty: 1,
    notes: 'Used with friends, family, or people your age or younger'
  },
  {
    id: 3,
    category: 'greetings',
    greek: 'Καλημέρα',
    pronunciation: 'kah-lee-MEH-rah',
    english: 'Good morning',
    difficulty: 1,
    notes: 'Used until about noon'
  },
  {
    id: 4,
    category: 'greetings',
    greek: 'Καλησπέρα',
    pronunciation: 'kah-lee-SPEH-rah',
    english: 'Good evening',
    difficulty: 1,
    notes: 'Used from late afternoon onwards'
  },
  {
    id: 5,
    category: 'greetings',
    greek: 'Καληνύχτα',
    pronunciation: 'kah-lee-NEEKH-tah',
    english: 'Good night',
    difficulty: 1,
    notes: 'Used when saying goodbye late in the evening'
  },
  {
    id: 6,
    category: 'greetings',
    greek: 'Αντίο',
    pronunciation: 'ahn-DEE-oh',
    english: 'Goodbye',
    difficulty: 1,
    notes: 'Standard way to say goodbye'
  },
  {
    id: 7,
    category: 'greetings',
    greek: 'Ευχαριστώ',
    pronunciation: 'ef-khah-ree-STOH',
    english: 'Thank you',
    difficulty: 1,
    notes: 'Essential polite expression'
  },
  {
    id: 8,
    category: 'greetings',
    greek: 'Παρακαλώ',
    pronunciation: 'pah-rah-kah-LOH',
    english: 'Please / You\'re welcome',
    difficulty: 1,
    notes: 'Used both for "please" and "you\'re welcome"'
  },
  {
    id: 9,
    category: 'greetings',
    greek: 'Συγγνώμη',
    pronunciation: 'see-GNOH-mee',
    english: 'Excuse me / Sorry',
    difficulty: 2,
    notes: 'Used to apologize or get someone\'s attention'
  },
  {
    id: 10,
    category: 'greetings',
    greek: 'Με συγχωρείτε',
    pronunciation: 'meh see-khoh-REE-teh',
    english: 'Excuse me (formal)',
    difficulty: 2,
    notes: 'More formal way to get attention or apologize'
  },
  {
    id: 11,
    category: 'greetings',
    greek: 'Τι κάνετε;',
    pronunciation: 'tee KAH-neh-teh',
    english: 'How are you? (formal)',
    difficulty: 2,
    notes: 'Polite way to ask how someone is doing'
  },
  {
    id: 12,
    category: 'greetings',
    greek: 'Τι κάνεις;',
    pronunciation: 'tee KAH-nees',
    english: 'How are you? (informal)',
    difficulty: 2,
    notes: 'Casual way to ask how someone is doing'
  },
  {
    id: 13,
    category: 'greetings',
    greek: 'Καλά, ευχαριστώ',
    pronunciation: 'kah-LAH, ef-khah-ree-STOH',
    english: 'Fine, thank you',
    difficulty: 2,
    notes: 'Standard response to "How are you?"'
  },
  {
    id: 14,
    category: 'greetings',
    greek: 'Χαίρομαι που σας γνωρίζω',
    pronunciation: 'KHEH-roh-meh poo sahs gnoh-REE-zoh',
    english: 'Nice to meet you',
    difficulty: 3,
    notes: 'Used when meeting someone for the first time'
  },
  {
    id: 15,
    category: 'greetings',
    greek: 'Καλώς ήρθατε',
    pronunciation: 'kah-LOHS EER-thah-teh',
    english: 'Welcome',
    difficulty: 2,
    notes: 'Used to welcome guests or visitors'
  },

  // Basic Communication (15 phrases)
  {
    id: 16,
    category: 'communication',
    greek: 'Ναι',
    pronunciation: 'neh',
    english: 'Yes',
    difficulty: 1,
    notes: 'Basic affirmative response'
  },
  {
    id: 17,
    category: 'communication',
    greek: 'Όχι',
    pronunciation: 'OH-khee',
    english: 'No',
    difficulty: 1,
    notes: 'Basic negative response'
  },
  {
    id: 18,
    category: 'communication',
    greek: 'Δεν καταλαβαίνω',
    pronunciation: 'thehn kah-tah-lah-VEH-noh',
    english: 'I don\'t understand',
    difficulty: 2,
    notes: 'Very useful when learning'
  },
  {
    id: 19,
    category: 'communication',
    greek: 'Μιλάτε αγγλικά;',
    pronunciation: 'mee-LAH-teh ah-glee-KAH',
    english: 'Do you speak English?',
    difficulty: 2,
    notes: 'Helpful when you need assistance'
  },
  {
    id: 20,
    category: 'communication',
    greek: 'Μιλάω λίγα ελληνικά',
    pronunciation: 'mee-LAH-oh LEE-gah eh-lee-nee-KAH',
    english: 'I speak a little Greek',
    difficulty: 2,
    notes: 'Good to know when starting conversations'
  },
  {
    id: 21,
    category: 'communication',
    greek: 'Πώς λέγεται;',
    pronunciation: 'pohs LEH-geh-teh',
    english: 'How do you say it?',
    difficulty: 2,
    notes: 'For learning new words'
  },
  {
    id: 22,
    category: 'communication',
    greek: 'Τι σημαίνει;',
    pronunciation: 'tee see-MEH-nee',
    english: 'What does it mean?',
    difficulty: 2,
    notes: 'For understanding new words'
  },
  {
    id: 23,
    category: 'communication',
    greek: 'Μπορείτε να επαναλάβετε;',
    pronunciation: 'boh-REE-teh nah eh-pah-nah-LAH-veh-teh',
    english: 'Can you repeat?',
    difficulty: 3,
    notes: 'When you need something said again'
  },
  {
    id: 24,
    category: 'communication',
    greek: 'Πιο αργά, παρακαλώ',
    pronunciation: 'pee-oh ahr-GAH, pah-rah-kah-LOH',
    english: 'Slower, please',
    difficulty: 2,
    notes: 'When someone is speaking too fast'
  },
  {
    id: 25,
    category: 'communication',
    greek: 'Μπορείτε να με βοηθήσετε;',
    pronunciation: 'boh-REE-teh nah meh voh-ee-THEE-seh-teh',
    english: 'Can you help me?',
    difficulty: 3,
    notes: 'When you need assistance'
  },
  {
    id: 26,
    category: 'communication',
    greek: 'Δεν ξέρω',
    pronunciation: 'thehn KSEH-roh',
    english: 'I don\'t know',
    difficulty: 1,
    notes: 'Honest response when you don\'t have an answer'
  },
  {
    id: 27,
    category: 'communication',
    greek: 'Είμαι από την Αμερική',
    pronunciation: 'EE-meh ah-POH teen ah-meh-ree-KEE',
    english: 'I am from America',
    difficulty: 2,
    notes: 'Change country name as needed'
  },
  {
    id: 28,
    category: 'communication',
    greek: 'Με λένε...',
    pronunciation: 'meh LEH-neh',
    english: 'My name is...',
    difficulty: 2,
    notes: 'Add your name after this phrase'
  },
  {
    id: 29,
    category: 'communication',
    greek: 'Πώς σας λένε;',
    pronunciation: 'pohs sahs LEH-neh',
    english: 'What is your name?',
    difficulty: 2,
    notes: 'Polite way to ask someone\'s name'
  },
  {
    id: 30,
    category: 'communication',
    greek: 'Μαθαίνω ελληνικά',
    pronunciation: 'mah-THEH-noh eh-lee-nee-KAH',
    english: 'I am learning Greek',
    difficulty: 2,
    notes: 'Great conversation starter'
  },

  // Directions & Travel (15 phrases)
  {
    id: 31,
    category: 'directions',
    greek: 'Που είναι...;',
    pronunciation: 'poo EE-neh',
    english: 'Where is...?',
    difficulty: 2,
    notes: 'Essential for finding places'
  },
  {
    id: 32,
    category: 'directions',
    greek: 'Πώς πάω στο...;',
    pronunciation: 'pohs PAH-oh stoh',
    english: 'How do I get to...?',
    difficulty: 2,
    notes: 'For getting directions'
  },
  {
    id: 33,
    category: 'directions',
    greek: 'Δεξιά',
    pronunciation: 'theh-kee-AH',
    english: 'Right',
    difficulty: 1,
    notes: 'Direction indicator'
  },
  {
    id: 34,
    category: 'directions',
    greek: 'Αριστερά',
    pronunciation: 'ah-ree-steh-RAH',
    english: 'Left',
    difficulty: 1,
    notes: 'Direction indicator'
  },
  {
    id: 35,
    category: 'directions',
    greek: 'Ευθεία',
    pronunciation: 'ef-THEE-ah',
    english: 'Straight',
    difficulty: 2,
    notes: 'Direction indicator'
  },
  {
    id: 36,
    category: 'directions',
    greek: 'Κοντά',
    pronunciation: 'kohn-DAH',
    english: 'Near',
    difficulty: 1,
    notes: 'Distance indicator'
  },
  {
    id: 37,
    category: 'directions',
    greek: 'Μακριά',
    pronunciation: 'mah-kree-AH',
    english: 'Far',
    difficulty: 1,
    notes: 'Distance indicator'
  },
  {
    id: 38,
    category: 'directions',
    greek: 'Εδώ',
    pronunciation: 'eh-THOH',
    english: 'Here',
    difficulty: 1,
    notes: 'Location indicator'
  },
  {
    id: 39,
    category: 'directions',
    greek: 'Εκεί',
    pronunciation: 'eh-KEE',
    english: 'There',
    difficulty: 1,
    notes: 'Location indicator'
  },
  {
    id: 40,
    category: 'directions',
    greek: 'Στο κέντρο',
    pronunciation: 'stoh KEHN-troh',
    english: 'In the center',
    difficulty: 2,
    notes: 'Referring to city center'
  },
  {
    id: 41,
    category: 'directions',
    greek: 'Ο σταθμός',
    pronunciation: 'oh stah-THOS',
    english: 'The station',
    difficulty: 2,
    notes: 'Train or bus station'
  },
  {
    id: 42,
    category: 'directions',
    greek: 'Το αεροδρόμιο',
    pronunciation: 'toh ah-eh-roh-THROH-mee-oh',
    english: 'The airport',
    difficulty: 3,
    notes: 'Important for travelers'
  },
  {
    id: 43,
    category: 'directions',
    greek: 'Το ξενοδοχείο',
    pronunciation: 'toh kseh-noh-thoh-KHEE-oh',
    english: 'The hotel',
    difficulty: 2,
    notes: 'Common destination'
  },
  {
    id: 44,
    category: 'directions',
    greek: 'Η παραλία',
    pronunciation: 'ee pah-rah-LEE-ah',
    english: 'The beach',
    difficulty: 2,
    notes: 'Popular destination in Greece'
  },
  {
    id: 45,
    category: 'directions',
    greek: 'Χάθηκα',
    pronunciation: 'KHAH-thee-kah',
    english: 'I am lost',
    difficulty: 2,
    notes: 'When you need help finding your way'
  },

  // Dining & Food (15 phrases)
  {
    id: 46,
    category: 'dining',
    greek: 'Πεινάω',
    pronunciation: 'pee-NAH-oh',
    english: 'I am hungry',
    difficulty: 1,
    notes: 'When you need food'
  },
  {
    id: 47,
    category: 'dining',
    greek: 'Διψάω',
    pronunciation: 'thee-PSAH-oh',
    english: 'I am thirsty',
    difficulty: 1,
    notes: 'When you need a drink'
  },
  {
    id: 48,
    category: 'dining',
    greek: 'Το μενού, παρακαλώ',
    pronunciation: 'toh meh-NOO, pah-rah-kah-LOH',
    english: 'The menu, please',
    difficulty: 2,
    notes: 'First thing to ask in a restaurant'
  },
  {
    id: 49,
    category: 'dining',
    greek: 'Θα θέλω...',
    pronunciation: 'thah THEH-loh',
    english: 'I would like...',
    difficulty: 2,
    notes: 'For ordering food or drinks'
  },
  {
    id: 50,
    category: 'dining',
    greek: 'Νερό',
    pronunciation: 'neh-ROH',
    english: 'Water',
    difficulty: 1,
    notes: 'Essential drink'
  },
  {
    id: 51,
    category: 'dining',
    greek: 'Κρασί',
    pronunciation: 'krah-SEE',
    english: 'Wine',
    difficulty: 1,
    notes: 'Popular Greek drink'
  },
  {
    id: 52,
    category: 'dining',
    greek: 'Μπίρα',
    pronunciation: 'BEE-rah',
    english: 'Beer',
    difficulty: 1,
    notes: 'Popular drink'
  },
  {
    id: 53,
    category: 'dining',
    greek: 'Καφές',
    pronunciation: 'kah-FEHS',
    english: 'Coffee',
    difficulty: 1,
    notes: 'Very important in Greek culture'
  },
  {
    id: 54,
    category: 'dining',
    greek: 'Το λογαριασμό, παρακαλώ',
    pronunciation: 'toh loh-gah-ree-ahs-MOH, pah-rah-kah-LOH',
    english: 'The bill, please',
    difficulty: 3,
    notes: 'To ask for the check'
  },
  {
    id: 55,
    category: 'dining',
    greek: 'Νόστιμο!',
    pronunciation: 'NOH-stee-moh',
    english: 'Delicious!',
    difficulty: 2,
    notes: 'To compliment the food'
  },
  {
    id: 56,
    category: 'dining',
    greek: 'Χορτάτος',
    pronunciation: 'khor-TAH-tohs',
    english: 'Full (satisfied)',
    difficulty: 2,
    notes: 'When you\'ve had enough to eat'
  },
  {
    id: 57,
    category: 'dining',
    greek: 'Ψάρι',
    pronunciation: 'PSAH-ree',
    english: 'Fish',
    difficulty: 2,
    notes: 'Common Greek food'
  },
  {
    id: 58,
    category: 'dining',
    greek: 'Κρέας',
    pronunciation: 'KREH-ahs',
    english: 'Meat',
    difficulty: 2,
    notes: 'General term for meat'
  },
  {
    id: 59,
    category: 'dining',
    greek: 'Χορτοφάγος είμαι',
    pronunciation: 'khor-toh-FAH-gohs EE-meh',
    english: 'I am vegetarian',
    difficulty: 3,
    notes: 'Important dietary information'
  },
  {
    id: 60,
    category: 'dining',
    greek: 'Πολύ καλό!',
    pronunciation: 'poh-LEE kah-LOH',
    english: 'Very good!',
    difficulty: 2,
    notes: 'To praise something'
  },

  // Shopping (10 phrases)
  {
    id: 61,
    category: 'shopping',
    greek: 'Πόσο κοστίζει;',
    pronunciation: 'POH-soh koh-STEE-zee',
    english: 'How much does it cost?',
    difficulty: 2,
    notes: 'Essential for shopping'
  },
  {
    id: 62,
    category: 'shopping',
    greek: 'Ακριβό',
    pronunciation: 'ah-kree-VOH',
    english: 'Expensive',
    difficulty: 2,
    notes: 'When something costs too much'
  },
  {
    id: 63,
    category: 'shopping',
    greek: 'Φθηνό',
    pronunciation: 'fthee-NOH',
    english: 'Cheap',
    difficulty: 2,
    notes: 'When something is affordable'
  },
  {
    id: 64,
    category: 'shopping',
    greek: 'Θα το πάρω',
    pronunciation: 'thah toh PAH-roh',
    english: 'I\'ll take it',
    difficulty: 2,
    notes: 'When you decide to buy something'
  },
  {
    id: 65,
    category: 'shopping',
    greek: 'Μόνο κοιτάζω',
    pronunciation: 'MOH-noh kee-TAH-zoh',
    english: 'Just looking',
    difficulty: 2,
    notes: 'When browsing without buying'
  },
  {
    id: 66,
    category: 'shopping',
    greek: 'Έχετε...;',
    pronunciation: 'EH-kheh-teh',
    english: 'Do you have...?',
    difficulty: 2,
    notes: 'To ask for specific items'
  },
  {
    id: 67,
    category: 'shopping',
    greek: 'Τι ώρα κλείνετε;',
    pronunciation: 'tee OH-rah KLEE-neh-teh',
    english: 'What time do you close?',
    difficulty: 2,
    notes: 'Important for planning'
  },
  {
    id: 68,
    category: 'shopping',
    greek: 'Μεγάλο',
    pronunciation: 'meh-GAH-loh',
    english: 'Big/Large',
    difficulty: 1,
    notes: 'For sizes'
  },
  {
    id: 69,
    category: 'shopping',
    greek: 'Μικρό',
    pronunciation: 'mee-KROH',
    english: 'Small',
    difficulty: 1,
    notes: 'For sizes'
  },
  {
    id: 70,
    category: 'shopping',
    greek: 'Πληρώνω με κάρτα',
    pronunciation: 'plee-ROH-noh meh KAR-tah',
    english: 'I pay by card',
    difficulty: 2,
    notes: 'Modern payment method'
  },

  // Numbers & Time (10 phrases)
  {
    id: 71,
    category: 'numbers',
    greek: 'Ένα',
    pronunciation: 'EH-nah',
    english: 'One',
    difficulty: 1,
    notes: 'Basic number'
  },
  {
    id: 72,
    category: 'numbers',
    greek: 'Δύο',
    pronunciation: 'THEE-oh',
    english: 'Two',
    difficulty: 1,
    notes: 'Basic number'
  },
  {
    id: 73,
    category: 'numbers',
    greek: 'Τρία',
    pronunciation: 'TREE-ah',
    english: 'Three',
    difficulty: 1,
    notes: 'Basic number'
  },
  {
    id: 74,
    category: 'numbers',
    greek: 'Τι ώρα είναι;',
    pronunciation: 'tee OH-rah EE-neh',
    english: 'What time is it?',
    difficulty: 2,
    notes: 'To ask the time'
  },
  {
    id: 75,
    category: 'numbers',
    greek: 'Σήμερα',
    pronunciation: 'SEE-meh-rah',
    english: 'Today',
    difficulty: 1,
    notes: 'Time reference'
  },
  {
    id: 76,
    category: 'numbers',
    greek: 'Αύριο',
    pronunciation: 'AV-ree-oh',
    english: 'Tomorrow',
    difficulty: 1,
    notes: 'Time reference'
  },
  {
    id: 77,
    category: 'numbers',
    greek: 'Χθες',
    pronunciation: 'khthehs',
    english: 'Yesterday',
    difficulty: 2,
    notes: 'Time reference'
  },
  {
    id: 78,
    category: 'numbers',
    greek: 'Δέκα',
    pronunciation: 'THEH-kah',
    english: 'Ten',
    difficulty: 1,
    notes: 'Important round number'
  },
  {
    id: 79,
    category: 'numbers',
    greek: 'Εκατό',
    pronunciation: 'eh-kah-TOH',
    english: 'One hundred',
    difficulty: 2,
    notes: 'Large round number'
  },
  {
    id: 80,
    category: 'numbers',
    greek: 'Πόσα χρόνια είστε;',
    pronunciation: 'POH-sah KHROH-nee-ah EE-steh',
    english: 'How old are you?',
    difficulty: 3,
    notes: 'To ask someone\'s age'
  },

  // Emergencies (10 phrases)
  {
    id: 81,
    category: 'emergencies',
    greek: 'Βοήθεια!',
    pronunciation: 'voh-EE-thee-ah',
    english: 'Help!',
    difficulty: 1,
    notes: 'Emergency call for help'
  },
  {
    id: 82,
    category: 'emergencies',
    greek: 'Καλέστε την αστυνομία',
    pronunciation: 'kah-LEH-steh teen ah-stee-noh-MEE-ah',
    english: 'Call the police',
    difficulty: 3,
    notes: 'In case of trouble'
  },
  {
    id: 83,
    category: 'emergencies',
    greek: 'Καλέστε γιατρό',
    pronunciation: 'kah-LEH-steh yah-TROH',
    english: 'Call a doctor',
    difficulty: 2,
    notes: 'Medical emergency'
  },
  {
    id: 84,
    category: 'emergencies',
    greek: 'Πονάω',
    pronunciation: 'poh-NAH-oh',
    english: 'I\'m in pain',
    difficulty: 2,
    notes: 'Medical issue'
  },
  {
    id: 85,
    category: 'emergencies',
    greek: 'Που είναι το νοσοκομείο;',
    pronunciation: 'poo EE-neh toh noh-soh-koh-MEE-oh',
    english: 'Where is the hospital?',
    difficulty: 3,
    notes: 'Medical emergency'
  },
  {
    id: 86,
    category: 'emergencies',
    greek: 'Έχασα το διαβατήριό μου',
    pronunciation: 'EH-khah-sah toh thee-ah-vah-TEE-ree-oh moo',
    english: 'I lost my passport',
    difficulty: 3,
    notes: 'Travel emergency'
  },
  {
    id: 87,
    category: 'emergencies',
    greek: 'Πυρκαγιά!',
    pronunciation: 'peer-kah-YAH',
    english: 'Fire!',
    difficulty: 2,
    notes: 'Emergency alert'
  },
  {
    id: 88,
    category: 'emergencies',
    greek: 'Είμαι άρρωστος',
    pronunciation: 'EE-meh AH-roh-stohs',
    english: 'I am sick',
    difficulty: 2,
    notes: 'Health problem'
  },
  {
    id: 89,
    category: 'emergencies',
    greek: 'Χρειάζομαι βοήθεια',
    pronunciation: 'khree-AH-zoh-meh voh-EE-thee-ah',
    english: 'I need help',
    difficulty: 2,
    notes: 'General request for assistance'
  },
  {
    id: 90,
    category: 'emergencies',
    greek: 'Τηλέφωνο',
    pronunciation: 'tee-LEH-foh-noh',
    english: 'Telephone',
    difficulty: 1,
    notes: 'To ask for a phone'
  },

  // Social Interactions (10 phrases)
  {
    id: 91,
    category: 'social',
    greek: 'Τι δουλειά κάνετε;',
    pronunciation: 'tee thoo-lee-AH KAH-neh-teh',
    english: 'What do you do for work?',
    difficulty: 3,
    notes: 'Getting to know someone'
  },
  {
    id: 92,
    category: 'social',
    greek: 'Από πού είστε;',
    pronunciation: 'ah-POH poo EE-steh',
    english: 'Where are you from?',
    difficulty: 2,
    notes: 'Common conversation starter'
  },
  {
    id: 93,
    category: 'social',
    greek: 'Μου αρέσει η Ελλάδα',
    pronunciation: 'moo ah-REH-see ee eh-LAH-thah',
    english: 'I like Greece',
    difficulty: 2,
    notes: 'Positive comment about the country'
  },
  {
    id: 94,
    category: 'social',
    greek: 'Συγχαρητήρια!',
    pronunciation: 'see-gkha-ree-TEE-ree-ah',
    english: 'Congratulations!',
    difficulty: 3,
    notes: 'For celebrations'
  },
  {
    id: 95,
    category: 'social',
    greek: 'Χρόνια πολλά!',
    pronunciation: 'KHROH-nee-ah poh-LAH',
    english: 'Happy birthday/Many happy returns',
    difficulty: 2,
    notes: 'Used for birthdays and celebrations'
  },
  {
    id: 96,
    category: 'social',
    greek: 'Πολύ ωραία!',
    pronunciation: 'poh-LEE oh-REH-ah',
    english: 'Very beautiful/nice!',
    difficulty: 2,
    notes: 'To express admiration'
  },
  {
    id: 97,
    category: 'social',
    greek: 'Με παρακολουθείτε;',
    pronunciation: 'meh pah-rah-koh-loo-THEE-teh',
    english: 'Do you follow me?',
    difficulty: 3,
    notes: 'To check understanding in conversation'
  },
  {
    id: 98,
    category: 'social',
    greek: 'Έχω οικογένεια',
    pronunciation: 'EH-khoh ee-koh-GEH-nee-ah',
    english: 'I have a family',
    difficulty: 2,
    notes: 'Personal information sharing'
  },
  {
    id: 99,
    category: 'social',
    greek: 'Καλή τύχη!',
    pronunciation: 'kah-LEE TEE-khee',
    english: 'Good luck!',
    difficulty: 2,
    notes: 'Wishing someone well'
  },
  {
    id: 100,
    category: 'social',
    greek: 'Τα λέμε αργότερα',
    pronunciation: 'tah LEH-meh ahr-GOH-teh-rah',
    english: 'See you later',
    difficulty: 2,
    notes: 'Casual way to say goodbye until later'
  }
];

// Helper functions for working with phrases data
export const getPhraseById = (id) => greekPhrases.find(phrase => phrase.id === id);
export const getPhrasesByCategory = (category) => greekPhrases.filter(phrase => phrase.category === category);
export const getPhrasesByDifficulty = (difficulty) => greekPhrases.filter(phrase => phrase.difficulty <= difficulty);
export const getRandomPhrases = (count) => {
  const shuffled = [...greekPhrases].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Categories configuration
export const phraseCategories = {
  greetings: { name: 'Greetings & Politeness', icon: '👋', color: '#4CAF50' },
  communication: { name: 'Basic Communication', icon: '💬', color: '#2196F3' },
  directions: { name: 'Directions & Travel', icon: '🗺️', color: '#FF9800' },
  dining: { name: 'Dining & Food', icon: '🍽️', color: '#E91E63' },
  shopping: { name: 'Shopping', icon: '🛍️', color: '#9C27B0' },
  numbers: { name: 'Numbers & Time', icon: '🕐', color: '#607D8B' },
  emergencies: { name: 'Emergencies', icon: '🚨', color: '#F44336' },
  social: { name: 'Social Interactions', icon: '👥', color: '#795548' }
};
