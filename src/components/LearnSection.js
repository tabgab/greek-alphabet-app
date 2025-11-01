import React, { useState } from 'react';
import { greekAlphabet } from '../greekAlphabetData';
import { useProgress } from '../context/ProgressContext';

// Pictogram mapping for visual learning
const pictogramMap = {
  'triangle': '△',
  'circle-half': '◐',
  'angle-right': '∟',
  'square': '□',
  'zap': '⚡',
  'h-square': '⊏',
  'circle': '○',
  'line': '─',
  'k': '⚰',
  'm': '╲╱',
  'n': '╱╲',
  'bars': '≡',
  'table': '⊤',
  'r': '◟',
  's': 'Ͻ',
  't': '┬',
  'y': '◠',
  'trident': 'Ψ',
  'omega': 'Ω',
  'angle': '∠',
  'plus': '+',
  'star': '⭐'
};

const getPictogram = (iconName) => {
  return pictogramMap[iconName] || '◇';
};

// Visual description helper
const getVisualDescription = (letter) => {
  const descriptions = {
    'Alpha': 'an upside-down "A" without the crossbar',
    'Beta': 'a "B" with connected loops',
    'Gamma': 'an upside-down "L" or a right angle',
    'Delta': 'a triangle pointing upwards',
    'Epsilon': 'a backwards "3" or a square "E"',
    'Zeta': 'a "Z" with a horizontal line through it',
    'Eta': 'an "H" or a square "n"',
    'Theta': 'an "O" with a horizontal line through the middle',
    'Iota': 'a straight vertical line',
    'Kappa': 'a "K" without the bottom line',
    'Lambda': 'an upside-down "V" or triangle without base',
    'Mu': 'an "M" with curved sides',
    'Nu': 'a "N" with straighter diagonal',
    'Xi': 'three horizontal lines of different lengths',
    'Omicron': 'a perfect circle',
    'Pi': 'a "n" with a horizontal line on top',
    'Rho': 'a "P" without the loop closed',
    'Sigma': 'a "C" rotated 90 degrees clockwise',
    'Tau': 'a "T" without the left side',
    'Upsilon': 'a "Y" or a "u" with a tail',
    'Phi': 'an "O" with a vertical line through it',
    'Chi': 'an "X" or two crossing lines',
    'Psi': 'a trident or "n" with vertical line',
    'Omega': 'a rounded "W" or horseshoe shape'
  };
  return descriptions[letter.name] || 'a unique shape to remember';
};

// Practice tip helper
const getPracticeTip = (letter) => {
  const tips = {
    'Alpha': 'Practice saying "father" - notice how your mouth opens the same way',
    'Beta': 'Think of "baby" - both start with the lip movement',
    'Gamma': 'Like "game" but from the back of your throat',
    'Delta': 'Like the "th" in "this" - put your tongue between your teeth',
    'Epsilon': 'Like "bed" - short and crisp',
    'Zeta': 'Like "suds" - the "ds" sound together',
    'Eta': 'Like "see" - but hold it a bit longer',
    'Theta': 'Like "think" - breathe out while saying "th"',
    'Iota': 'Like "machine" - the long "ee" sound',
    'Kappa': 'Like "kite" - sharp and from the back of your throat',
    'Lambda': 'Like "lamp" - clear and strong',
    'Mu': 'Like "mouse" - purse your lips together',
    'Nu': 'Like "nice" - soft and gentle',
    'Xi': 'Like "taxi" - the "ks" sound together',
    'Omicron': 'Like "more" - round your lips',
    'Pi': 'Like "pie" - sharp "p" sound',
    'Rho': 'Like "road" - rolled "r" sound',
    'Sigma': 'Like "sing" - hissing "s" sound',
    'Tau': 'Like "take" - sharp "t" sound',
    'Upsilon': 'Like "free" - but with rounded lips',
    'Phi': 'Like "phone" - blow air through your lips',
    'Chi': 'Like Scottish "loch" - from the back of your throat',
    'Psi': 'Like "lapse" - the "ps" sound together',
    'Omega': 'Like "more" - but hold it longer and round your lips more'
  };
  return tips[letter.name] || 'Practice the sound with the example words above';
};

const LearnSection = () => {
  const { isLetterUnlocked, getAvailableLetters, getLockedLettersCount, getOverallProgress } = useProgress();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [filter, setFilter] = useState('available'); // 'all', 'available', 'locked', 'vowels', 'consonants'

  // Function to pronounce Greek words using Web Speech API
  const speakGreek = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Try to find a Greek voice
      const voices = window.speechSynthesis.getVoices();
      const greekVoice = voices.find(voice =>
        voice.lang.startsWith('el') || // Modern Greek
        voice.lang.startsWith('grc') || // Ancient Greek
        voice.name.toLowerCase().includes('greek')
      );

      if (greekVoice) {
        utterance.voice = greekVoice;
        utterance.lang = greekVoice.lang;
      } else {
        // Fallback to English with Greek text
        utterance.lang = 'el-GR';
        utterance.rate = 0.8; // Slightly slower for clarity
      }

      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech synthesis not supported in this browser');
    }
  };

  const getFilteredLetters = () => {
    switch (filter) {
      case 'available':
        return getAvailableLetters();
      case 'locked':
        return greekAlphabet.filter(letter => !isLetterUnlocked(letter.id));
      case 'vowels':
        return getAvailableLetters().filter(letter => letter.category === 'vowel');
      case 'consonants':
        return getAvailableLetters().filter(letter => letter.category === 'consonant');
      default:
        return getAvailableLetters();
    }
  };

  const filteredLetters = getFilteredLetters();

  const LetterCard = ({ letter }) => {
    const { isLetterUnlocked, isLetterCompleted, getBestScore } = useProgress();
    const unlocked = isLetterUnlocked(letter.id);
    const completed = isLetterCompleted(letter.id);
    const bestScore = getBestScore(letter.id);

    return (
      <div
        className={`letter-card ${letter.category} ${selectedLetter?.id === letter.id ? 'selected' : ''} ${unlocked ? 'unlocked' : 'locked'}`}
        onClick={() => unlocked && setSelectedLetter(letter)}
        role="button"
        tabIndex={unlocked ? 0 : -1}
        aria-label={`${letter.name} Greek letter. ${unlocked ? 'Click to view details' : 'Locked - complete previous levels to unlock'}`}
        aria-pressed={selectedLetter?.id === letter.id}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && unlocked) {
            e.preventDefault();
            setSelectedLetter(letter);
          }
        }}
      >
        <div className="letter-display">
          <div className="letter-main">
            <div className="letter-cases">
              <span className={`greek-letter uppercase ${unlocked ? '' : 'locked'}`} title="Uppercase">
                {letter.greekLetter}
              </span>
              <span className={`greek-letter lowercase ${unlocked ? '' : 'locked'}`} title="Lowercase">
                {letter.greekLowercase}
              </span>
            </div>
            <span className="letter-name">{letter.name}</span>
            {!unlocked && <span className="lock-icon">🔒</span>}
          </div>
          <div className={`pictogram ${unlocked ? '' : 'locked'}`}>{getPictogram(letter.pictogram)}</div>
        </div>

        {unlocked ? (
          <>
            <div className="letter-sound">
              <span className="sound-text">/{letter.englishSound}/</span>
            </div>
            <div className="letter-comparison">
              <span className="comparison-text">{letter.englishComparison}</span>
            </div>
            <div className="letter-progress">
              {completed && (
                <div className="completion-indicator">
                  <span className="completion-badge">✓</span>
                  <span className="best-score">{bestScore}%</span>
                </div>
              )}
            </div>
            <div className="difficulty-indicator">
              <span className={`difficulty-badge difficulty-${letter.difficulty}`}>
                Level {letter.difficulty}
              </span>
            </div>
          </>
        ) : (
          <div className="locked-message">
            <p>Complete Level {letter.difficulty - 1} letters to unlock</p>
          </div>
        )}
      </div>
    );
  };

  const LetterDetail = ({ letter }) => (
    <div className="letter-detail">
      <div className="detail-header">
        <div className="letter-visualization">
          <div className="both-cases-display">
            <div className="case-item">
              <span className="detail-greek uppercase">{letter.greekLetter}</span>
              <label className="case-label">Uppercase</label>
            </div>
            <div className="case-separator">↔</div>
            <div className="case-item">
              <span className="detail-greek lowercase">{letter.greekLowercase}</span>
              <label className="case-label">Lowercase</label>
            </div>
          </div>
          <div className="pictogram-large">{getPictogram(letter.pictogram)}</div>
        </div>
        <div className="detail-info">
          <h3>{letter.name}</h3>
          <p className="pronunciation">Pronounced: <strong>/{letter.englishSound}/</strong></p>
          <div className="letter-category">
            <span className={`category-badge ${letter.category}`}>
              {letter.category.charAt(0).toUpperCase() + letter.category.slice(1)}
            </span>
            <span className={`difficulty-badge difficulty-${letter.difficulty}`}>
              Level {letter.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="comparison-section">
          <h4>🔍 English Comparison</h4>
          <p>{letter.englishComparison}</p>
        </div>

        <div className="visual-aid-section">
          <h4>👁️ Visual Learning Aid</h4>
          <p>{letter.visualAid}</p>
          <div className="visual-example">
            <span className="visual-prompt">Think of it as:</span>
            <span className="visual-description">{getVisualDescription(letter)}</span>
          </div>
          <div className="case-comparison">
            <h5>Letter Forms Comparison</h5>
            <div className="case-comparison-display">
              <div className="case-comparison-item">
                <span className="comparison-letter">{letter.greekLetter}</span>
                <span className="comparison-description">Uppercase - used at beginning of sentences and proper nouns</span>
              </div>
              <div className="case-comparison-item">
                <span className="comparison-letter">{letter.greekLowercase}</span>
                <span className="comparison-description">Lowercase - used in regular text and words</span>
              </div>
            </div>
          </div>
        </div>

        <div className="examples-section">
          <h4>📝 Example Words (English)</h4>
          <p className="examples-subtitle">Words that start with similar sounds:</p>
          <div className="example-words">
            {letter.exampleWords.map((word, index) => (
              <span key={index} className="example-word">{word}</span>
            ))}
          </div>
        </div>

        {letter.commonWords.length > 0 && (
          <div className="greek-words-section">
            <h4>🇬🇷 Greek Examples</h4>
            <p className="greek-subtitle">Common Greek words using this letter (click to hear pronunciation):</p>
            <div className="greek-words">
              {letter.commonWords.map((wordWithTranslation, index) => {
                // Split word and translation (format: "word (translation)")
                const match = wordWithTranslation.match(/^(.+?)\s*\((.+)\)$/);
                if (match) {
                  const greekWord = match[1].trim();
                  const englishTranslation = match[2].trim();
                  return (
                    <div key={index} className="greek-word-item">
                      <div className="greek-word-container">
                        <span className="greek-word-text">{greekWord}</span>
                        <button
                          className="pronunciation-btn"
                          onClick={() => speakGreek(greekWord)}
                          aria-label={`Pronounce ${greekWord}`}
                          title={`Hear pronunciation of ${greekWord}`}
                        >
                          🔊
                        </button>
                      </div>
                      <span className="greek-word-translation">{englishTranslation}</span>
                    </div>
                  );
                }
                return (
                  <div key={index} className="greek-word-item">
                    <span className="greek-word">{wordWithTranslation}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="practice-section">
          <h4>🎯 Practice Tip</h4>
          <p>{getPracticeTip(letter)}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="learn-section">
      <div className="section-header">
        <h2>Learn the Greek Alphabet</h2>
        <p>Click on any letter to see detailed information and pronunciation guides.</p>

        <div className="progress-summary">
          <div className="progress-stats">
            <span className="stat">
              <strong>{getAvailableLetters().length}</strong> Available Letters
            </span>
            <span className="stat">
              <strong>{getLockedLettersCount()}</strong> Locked Letters
            </span>
            <span className="stat">
              Progress: <strong>{getOverallProgress()}%</strong>
            </span>
          </div>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
            onClick={() => setFilter('available')}
          >
            Available ({getAvailableLetters().length})
          </button>
          <button
            className={`filter-btn ${filter === 'locked' ? 'active' : ''}`}
            onClick={() => setFilter('locked')}
          >
            Locked ({getLockedLettersCount()})
          </button>
          <button
            className={`filter-btn ${filter === 'vowels' ? 'active' : ''}`}
            onClick={() => setFilter('vowels')}
          >
            Vowels ({getAvailableLetters().filter(l => l.category === 'vowel').length})
          </button>
          <button
            className={`filter-btn ${filter === 'consonants' ? 'active' : ''}`}
            onClick={() => setFilter('consonants')}
          >
            Consonants ({getAvailableLetters().filter(l => l.category === 'consonant').length})
          </button>
        </div>
      </div>

      <div className="learn-content">
        <div className="letters-grid">
          {filteredLetters.map(letter => (
            <LetterCard key={letter.id} letter={letter} />
          ))}
        </div>

        {selectedLetter && (
          <div className="letter-detail-panel">
            <LetterDetail letter={selectedLetter} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnSection;
