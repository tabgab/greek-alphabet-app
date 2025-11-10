import React, { useState } from 'react';
import { greekPhrases, phraseCategories, getPhrasesByCategory, getPhrasesByDifficulty } from '../greekPhrasesData';
import { useProgress } from '../context/ProgressContext';
import { speakGreek } from '../utils/audio';

const PhrasesSection = () => {
  const { isPhraseUnlocked, isPhraseCompleted, getBestPhraseScore, updatePhraseScore } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState('greetings');
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [learnedFilter, setLearnedFilter] = useState('all');

  // Function to speak Greek phrases using improved audio utility
  const handleSpeak = async (text, rate = 0.7) => {
    try {
      await speakGreek(text, { rate });
    } catch (error) {
      console.error('Failed to speak:', error);
    }
  };

  // Mark phrase as learned/practiced
  const markPhraseAsLearned = (phraseId) => {
    updatePhraseScore(phraseId, 100);
  };

  // Get filtered phrases based on current filters
  const getFilteredPhrases = () => {
    let phrases;
    
    if (difficultyFilter !== 'all' && selectedCategory === 'all') {
      const maxDifficulty = parseInt(difficultyFilter);
      phrases = getPhrasesByDifficulty(maxDifficulty);
    } else {
      phrases = selectedCategory === 'all' ? greekPhrases : getPhrasesByCategory(selectedCategory);
      
      if (difficultyFilter !== 'all') {
        const maxDifficulty = parseInt(difficultyFilter);
        phrases = phrases.filter(phrase => phrase.difficulty <= maxDifficulty);
      }
    }

    phrases = phrases.filter(phrase => isPhraseUnlocked(phrase.id));

    if (searchTerm) {
      phrases = phrases.filter(phrase =>
        phrase.greek.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phrase.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phrase.pronunciation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (learnedFilter === 'learned') {
      phrases = phrases.filter(phrase => isPhraseCompleted(phrase.id));
    } else if (learnedFilter === 'unlearned') {
      phrases = phrases.filter(phrase => !isPhraseCompleted(phrase.id));
    }

    return phrases;
  };

  const filteredPhrases = getFilteredPhrases();

  const getCategoryStats = (category) => {
    const categoryPhrases = category === 'all' ? greekPhrases : getPhrasesByCategory(category);
    const learned = categoryPhrases.filter(phrase => isPhraseCompleted(phrase.id)).length;
    return { total: categoryPhrases.length, learned };
  };

  const PhraseCard = ({ phrase }) => {
    const isCompleted = isPhraseCompleted(phrase.id);
    const bestScore = getBestPhraseScore(phrase.id);
    const isUnlocked = isPhraseUnlocked(phrase.id);

    return (
      <div
        className={`letter-card ${phrase.category} ${selectedPhrase?.id === phrase.id ? 'selected' : ''} ${isUnlocked ? 'unlocked' : 'locked'}`}
        onClick={() => isUnlocked && setSelectedPhrase(phrase)}
        role="button"
        tabIndex={isUnlocked ? 0 : -1}
        aria-label={`${phrase.english}. ${isUnlocked ? 'Click to view details' : 'Locked - complete previous levels to unlock'}`}
        aria-pressed={selectedPhrase?.id === phrase.id}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && isUnlocked) {
            e.preventDefault();
            setSelectedPhrase(phrase);
          }
        }}
      >
        <div className="letter-display">
          <div className="letter-main">
            <div className="greek-phrase-display">
              <span className={`greek-letter ${isUnlocked ? '' : 'locked'}`}>
                {phrase.greek}
              </span>
            </div>
            <span className="letter-name">{phrase.english}</span>
            {!isUnlocked && <span className="lock-icon">🔒</span>}
          </div>
          <div className={`pictogram ${isUnlocked ? '' : 'locked'}`}>
            {phraseCategories[phrase.category].icon}
          </div>
        </div>

        {isUnlocked ? (
          <>
            <div className="letter-sound">
              <span className="sound-text">[{phrase.pronunciation}]</span>
              <button
                className="pronunciation-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeak(phrase.greek);
                }}
                title="Listen to Greek pronunciation"
              >
                🔊
              </button>
            </div>
            <div className="letter-comparison">
              <span className="comparison-text">{phraseCategories[phrase.category].name}</span>
            </div>
            <div className="letter-progress">
              {isCompleted && (
                <div className="completion-indicator">
                  <span className="completion-badge">✓</span>
                  <span className="best-score">{bestScore}%</span>
                </div>
              )}
            </div>
            <div className="difficulty-indicator">
              <span className={`difficulty-badge difficulty-${phrase.difficulty}`}>
                Level {phrase.difficulty}
              </span>
            </div>
          </>
        ) : (
          <div className="locked-message">
            <p>Complete previous phrases to unlock</p>
          </div>
        )}
      </div>
    );
  };

  const PhraseDetail = ({ phrase }) => (
    <div className="letter-detail">
      <div className="detail-header">
        <div className="letter-visualization">
          <div className="both-cases-display">
            <div className="phrase-main-display">
              <span className="detail-greek">{phrase.greek}</span>
              <button
                className="pronunciation-btn-large"
                onClick={() => handleSpeak(phrase.greek)}
                title="Listen to Greek pronunciation"
              >
                🔊
              </button>
            </div>
          </div>
          <div className="pictogram-large">{phraseCategories[phrase.category].icon}</div>
        </div>
        <div className="detail-info">
          <h3>{phrase.english}</h3>
          <p className="pronunciation">Pronunciation: <strong>[{phrase.pronunciation}]</strong></p>
          <div className="letter-category">
            <span className={`category-badge ${phrase.category}`}>
              {phraseCategories[phrase.category].name}
            </span>
            <span className={`difficulty-badge difficulty-${phrase.difficulty}`}>
              Level {phrase.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="comparison-section">
          <h4>🇬🇷 Greek Phrase</h4>
          <div className="greek-phrase-large">
            <span className="greek-text">{phrase.greek}</span>
            <button
              className="play-btn"
              onClick={() => handleSpeak(phrase.greek)}
              title="Listen to pronunciation"
            >
              🔊 Play
            </button>
          </div>
        </div>

        <div className="visual-aid-section">
          <h4>🎯 Pronunciation Guide</h4>
          <div className="pronunciation-guide-large">
            <span className="pronunciation-text">[{phrase.pronunciation}]</span>
            <button
              className="play-btn"
              onClick={() => handleSpeak(phrase.pronunciation, 0.6)}
              title="Listen to pronunciation guide"
            >
              🎯 Play Guide
            </button>
          </div>
        </div>

        <div className="examples-section">
          <h4>🇺🇸 English Translation</h4>
          <p className="translation-text">{phrase.english}</p>
        </div>

        {phrase.notes && (
          <div className="greek-words-section">
            <h4>📝 Usage Notes</h4>
            <p>{phrase.notes}</p>
          </div>
        )}

        <div className="practice-section">
          <h4>🎯 Practice Controls</h4>
          <div className="practice-buttons">
            <button
              className="practice-btn"
              onClick={() => handleSpeak(phrase.greek, 0.7)}
            >
              🔄 Repeat
            </button>
            <button
              className="practice-btn"
              onClick={() => handleSpeak(phrase.greek, 0.5)}
            >
              🐌 Slow
            </button>
            <button
              className={`practice-btn ${isPhraseCompleted(phrase.id) ? 'completed' : ''}`}
              onClick={() => markPhraseAsLearned(phrase.id)}
            >
              {isPhraseCompleted(phrase.id) ? '✅ Learned' : '📚 Mark as Learned'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="learn-section">
      <div className="section-header">
        <h2>Greek Phrases</h2>
        <p>Learn 100 essential Greek phrases with pronunciation guides.</p>

        <div className="progress-summary">
          <div className="progress-stats">
            <span className="stat">
              <strong>{greekPhrases.filter(p => isPhraseUnlocked(p.id)).length}</strong> Available Phrases
            </span>
            <span className="stat">
              <strong>{greekPhrases.filter(p => isPhraseCompleted(p.id)).length}</strong> Learned Phrases
            </span>
            <span className="stat">
              Progress: <strong>{Math.round((greekPhrases.filter(p => isPhraseCompleted(p.id)).length / greekPhrases.length) * 100)}%</strong>
            </span>
          </div>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search phrases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All ({greekPhrases.length})
          </button>
          {Object.entries(phraseCategories).map(([key, category]) => {
            const stats = getCategoryStats(key);
            return (
              <button
                key={key}
                className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key)}
              >
                {category.icon} {category.name} ({stats.learned}/{stats.total})
              </button>
            );
          })}
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${difficultyFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('all')}
          >
            All Levels
          </button>
          <button
            className={`filter-btn ${difficultyFilter === '1' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('1')}
          >
            Level 1
          </button>
          <button
            className={`filter-btn ${difficultyFilter === '2' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('2')}
          >
            Level 2
          </button>
          <button
            className={`filter-btn ${difficultyFilter === '3' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('3')}
          >
            Level 3
          </button>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${learnedFilter === 'all' ? 'active' : ''}`}
            onClick={() => setLearnedFilter('all')}
          >
            All Phrases
          </button>
          <button
            className={`filter-btn ${learnedFilter === 'learned' ? 'active' : ''}`}
            onClick={() => setLearnedFilter('learned')}
          >
            Learned Only
          </button>
          <button
            className={`filter-btn ${learnedFilter === 'unlearned' ? 'active' : ''}`}
            onClick={() => setLearnedFilter('unlearned')}
          >
            Not Learned
          </button>
        </div>
      </div>

      <div className="learn-content">
        <div className="phrases-list" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginTop: '15px'
        }}>
          {filteredPhrases.map(phrase => (
            <PhraseCard key={phrase.id} phrase={phrase} />
          ))}
        </div>

        {selectedPhrase && (
          <div className="letter-detail-panel">
            <PhraseDetail phrase={selectedPhrase} />
          </div>
        )}

        {filteredPhrases.length === 0 && (
          <div className="no-results">
            <h3>No phrases found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhrasesSection;
