import React, { useState } from 'react';
import { greekPhrases, phraseCategories, getPhrasesByCategory } from '../greekPhrasesData';
import { useProgress } from '../context/ProgressContext';

// Exercise types for phrases
const PHRASE_EXERCISE_TYPES = {
  'translation-to-greek': {
    name: 'English to Greek',
    description: 'Choose the correct Greek phrase for the English meaning',
    icon: '🇬🇷',
    difficulty: 1
  },
  'greek-to-translation': {
    name: 'Greek to English',
    description: 'Choose the correct English translation',
    icon: '🇺🇸',
    difficulty: 1
  },
  'pronunciation-matching': {
    name: 'Pronunciation Practice',
    description: 'Listen and identify the correct Greek phrase',
    icon: '🔊',
    difficulty: 2
  },
  'conversation-context': {
    name: 'Context Practice',
    description: 'Choose the appropriate phrase for the situation',
    icon: '💬',
    difficulty: 2
  }
};

const PhrasesPracticeSection = () => {
  const { updatePhraseScore, isPhraseCompleted } = useProgress();
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  // Function to play phrase audio
  const speakGreek = (text, rate = 0.7) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      const greekVoice = voices.find(voice => 
        voice.lang.startsWith('el') || voice.name.toLowerCase().includes('greek')
      );

      if (greekVoice) {
        utterance.voice = greekVoice;
        utterance.lang = greekVoice.lang;
      } else {
        utterance.lang = 'el-GR';
      }

      utterance.rate = rate;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Generate practice questions
  const generateQuestion = (exerciseType, category) => {
    let availablePhrases = category === 'all' ? greekPhrases : getPhrasesByCategory(category);
    
    // Focus on unlearned phrases first for better learning experience
    const unlearnedPhrases = availablePhrases.filter(p => !isPhraseCompleted(p.id));
    if (unlearnedPhrases.length >= 4) {
      availablePhrases = unlearnedPhrases;
    }
    
    // Ensure we have enough phrases for questions
    if (availablePhrases.length < 4) {
      availablePhrases = greekPhrases; // Fallback to all phrases
    }

    // Simple randomization - pick target phrase and 3 random distractors
    const targetPhrase = availablePhrases[Math.floor(Math.random() * availablePhrases.length)];
    const remainingPhrases = availablePhrases.filter(p => p.id !== targetPhrase.id);
    const shuffled = remainingPhrases.sort(() => Math.random() - 0.5);
    const distractors = shuffled.slice(0, 3);

    // Safety check
    if (!targetPhrase) {
      console.error('No target phrase found');
      return null;
    }

    let question = {};

    switch (exerciseType) {
      case 'translation-to-greek':
        question = {
          type: 'translation-to-greek',
          question: `What is the Greek phrase for: "${targetPhrase.english}"?`,
          correctAnswer: targetPhrase.greek,
          options: [targetPhrase.greek, ...distractors.map(p => p.greek)].sort(() => Math.random() - 0.5),
          targetPhrase: targetPhrase,
          context: targetPhrase.notes
        };
        break;

      case 'greek-to-translation':
        question = {
          type: 'greek-to-translation',
          question: `What does "${targetPhrase.greek}" mean in English?`,
          correctAnswer: targetPhrase.english,
          options: [targetPhrase.english, ...distractors.map(p => p.english)].sort(() => Math.random() - 0.5),
          targetPhrase: targetPhrase,
          greekPhrase: targetPhrase.greek
        };
        break;

      case 'pronunciation-matching':
        question = {
          type: 'pronunciation-matching',
          question: 'Listen to the Greek phrase and choose the correct pronunciation:',
          correctAnswer: targetPhrase.pronunciation,
          options: [targetPhrase.pronunciation, ...distractors.map(p => p.pronunciation)].sort(() => Math.random() - 0.5),
          targetPhrase: targetPhrase,
          audioPhrase: targetPhrase.greek,
          autoPlay: true
        };
        break;

      case 'conversation-context':
        const contexts = {
          greetings: ['meeting someone for the first time', 'arriving at a hotel', 'entering a shop'],
          dining: ['in a restaurant', 'ordering drinks', 'complimenting food'],
          directions: ['asking for help finding a place', 'when lost', 'at a tourist information'],
          shopping: ['in a store', 'at a market', 'buying souvenirs'],
          emergencies: ['at a hospital', 'calling for help', 'reporting a problem'],
          social: ['at a party', 'making conversation', 'saying goodbye']
        };

        const categoryContexts = contexts[targetPhrase.category] || ['in conversation'];
        const randomContext = categoryContexts[Math.floor(Math.random() * categoryContexts.length)];

        question = {
          type: 'conversation-context',
          question: `What would you say ${randomContext}?`,
          correctAnswer: targetPhrase.greek,
          options: [targetPhrase.greek, ...distractors.map(p => p.greek)].sort(() => Math.random() - 0.5),
          targetPhrase: targetPhrase,
          context: `You are ${randomContext}. Choose the most appropriate Greek phrase.`,
          englishHint: targetPhrase.english
        };
        break;

      default:
        return generateQuestion('translation-to-greek', category);
    }

    return question;
  };

  const startExercise = (exerciseType) => {
    setSelectedExerciseType(exerciseType);
    const firstQuestion = generateQuestion(exerciseType, selectedCategory);
    
    // Safety check for question generation
    if (!firstQuestion) {
      console.error('Failed to generate question');
      return;
    }
    
    setCurrentQuestion(firstQuestion);
    
    // Auto-play audio for pronunciation exercises
    if (exerciseType === 'pronunciation-matching' && firstQuestion.audioPhrase) {
      setTimeout(() => speakGreek(firstQuestion.audioPhrase), 500);
    }

    setSelectedAnswer(null);
    setShowResult(false);
    setQuestionNumber(1);
    setScore(0);
    setSessionStats({ correct: 0, total: 0 });
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;

    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (isCorrect) {
      const points = Math.max(10, 25 - (questionNumber * 2));
      setScore(prev => prev + points);
      
      // Update phrase score
      if (currentQuestion.targetPhrase) {
        const currentScore = 100; // Full score for correct answer
        updatePhraseScore(currentQuestion.targetPhrase.id, currentScore);
      }
    }
  };

  const nextQuestion = () => {
    if (questionNumber >= 10) {
      finishExercise();
      return;
    }

    setQuestionNumber(prev => prev + 1);
    const newQuestion = generateQuestion(selectedExerciseType, selectedCategory);
    
    // Safety check
    if (!newQuestion) {
      console.error('Failed to generate next question');
      finishExercise();
      return;
    }
    
    setCurrentQuestion(newQuestion);
    setSelectedAnswer(null);
    setShowResult(false);

    // Auto-play audio for pronunciation exercises
    if (selectedExerciseType === 'pronunciation-matching' && newQuestion.audioPhrase) {
      setTimeout(() => speakGreek(newQuestion.audioPhrase), 300);
    }
  };

  const finishExercise = () => {
    setSelectedExerciseType(null);
    setCurrentQuestion(null);
    setScore(0);
    setSessionStats({ correct: 0, total: 0 });
  };

  const getOptionButtonClass = (option) => {
    let baseClass = 'practice-btn';
    if (selectedAnswer === option) baseClass += ' selected';
    if (showResult) {
      if (option === currentQuestion.correctAnswer) {
        baseClass += ' correct';
      } else if (selectedAnswer === option) {
        baseClass += ' incorrect';
      }
    }
    return baseClass;
  };

  // Exercise selection screen - matching LearnSection style
  if (!selectedExerciseType) {
    return (
      <div className="learn-section">
        <div className="section-header">
          <h2>Practice Greek Phrases</h2>
          <p>Test your knowledge with interactive exercises.</p>

          <div className="progress-summary">
            <div className="progress-stats">
              <span className="stat">
                <strong>{Object.keys(PHRASE_EXERCISE_TYPES).length}</strong> Exercise Types
              </span>
              <span className="stat">
                <strong>{Object.keys(phraseCategories).length}</strong> Categories
              </span>
              <span className="stat">
                Interactive <strong>Learning</strong>
              </span>
            </div>
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              📚 All Categories
            </button>
            {Object.entries(phraseCategories).map(([key, category]) => {
              const categoryPhrases = getPhrasesByCategory(key);
              const completedCount = categoryPhrases.filter(p => isPhraseCompleted(p.id)).length;
              const totalCount = categoryPhrases.length;
              
              return (
                <button
                  key={key}
                  className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(key)}
                >
                  {category.icon} {category.name} ({completedCount}/{totalCount})
                </button>
              );
            })}
          </div>
        </div>

        <div className="learn-content">
          <div className="letters-grid">
            {Object.entries(PHRASE_EXERCISE_TYPES).map(([type, config]) => (
              <div
                key={type}
                className="letter-card unlocked"
                onClick={() => startExercise(type)}
                role="button"
                tabIndex={0}
                aria-label={`Start ${config.name} exercise`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    startExercise(type);
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.1))',
                  border: '2px solid rgba(76, 175, 80, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(76, 175, 80, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(76, 175, 80, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(76, 175, 80, 0.3)';
                }}
              >
                <div className="letter-display">
                  <div className="letter-main">
                    <div className="exercise-icon-large" style={{ fontSize: '3rem' }}>{config.icon}</div>
                    <span className="letter-name" style={{ 
                      fontWeight: 'bold',
                      color: '#504949ff',
                      fontSize: '1.2rem',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                    }}>{config.name}</span>
                  </div>
                </div>
                <div className="letter-sound">
                  <span className="sound-text" style={{ 
                    color: '#1b1818ff',
                    fontSize: '0.9rem'
                  }}>{config.description}</span>
                </div>
                <div className="difficulty-indicator">
                  <span className={`difficulty-badge difficulty-${config.difficulty}`} style={{
                    backgroundColor: config.difficulty === 1 ? '#4CAF50' : '#FF9800',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    Level {config.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Practice session screen - matching LearnSection style
  return (
      <div className="learn-section">
      <div className="section-header">
        <button
          onClick={finishExercise}
          className="practice-btn"
          style={{
            marginBottom: '20px',
            padding: '10px 20px',
            backgroundColor: 'rgba(255, 152, 0, 0.2)',
            border: '2px solid rgba(255, 152, 0, 0.5)',
            color: '#ffffff',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Back to Exercise Selection
        </button>

        <div className="progress-summary">
          <div className="progress-stats">
            <span className="stat">
              Question <strong>{questionNumber}/10</strong>
            </span>
            <span className="stat">
              Score: <strong>{score}</strong>
            </span>
            <span className="stat">
              Accuracy: <strong>{sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0}%</strong>
            </span>
          </div>
        </div>

        <h2>{PHRASE_EXERCISE_TYPES[selectedExerciseType].name}</h2>
        <p>Category: {selectedCategory === 'all' ? 'All Categories' : phraseCategories[selectedCategory]?.name}</p>
      </div>

      <div className="learn-content">
        <div className="letter-detail">
          <div className="detail-header">
            <div className="letter-visualization">
              <div className="practice-question-display">
                <h3>{currentQuestion.question}</h3>
                
                {currentQuestion.context && (
                  <div className="question-context">
                    <p className="context-info">💡 {currentQuestion.context}</p>
                  </div>
                )}

                {currentQuestion.type === 'greek-to-translation' && (
                  <div className="greek-phrase-display">
                    <span className="greek-phrase-large">{currentQuestion.greekPhrase}</span>
                    <button
                      className="play-phrase-btn"
                      onClick={() => speakGreek(currentQuestion.greekPhrase)}
                      title="Listen to pronunciation"
                    >
                      🔊 Play
                    </button>
                  </div>
                )}

                {currentQuestion.type === 'pronunciation-matching' && (
                  <div className="audio-exercise">
                    <div className="audio-controls">
                      <button
                        className="practice-btn"
                        onClick={() => speakGreek(currentQuestion.audioPhrase)}
                      >
                        🔊 Play Greek Phrase
                      </button>
                      <button
                        className="practice-btn"
                        onClick={() => speakGreek(currentQuestion.audioPhrase, 0.4)}
                      >
                        🐌 Play Slowly
                      </button>
                    </div>
                    <p className="audio-instruction">Click play and choose the correct pronunciation guide:</p>
                  </div>
                )}

                {currentQuestion.type === 'conversation-context' && currentQuestion.englishHint && (
                  <div className="context-hint">
                    <p className="hint-text">💭 Think: "{currentQuestion.englishHint}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="detail-content">
            <div className="comparison-section">
              <h4>Choose the correct answer:</h4>
              <div className="practice-options" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '15px'
              }}>
                {currentQuestion.options.map((option, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'stretch' }}>
                    <button
                      className={`practice-btn ${getOptionButtonClass(option)}`}
                      onClick={() => setSelectedAnswer(option)}
                      disabled={showResult}
                      style={{
                        flex: 1,
                        padding: '15px',
                        textAlign: 'left',
                        minHeight: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}
                    >
                      <span className="option-text">{option}</span>
                    </button>
                    {(currentQuestion.type === 'translation-to-greek' || currentQuestion.type === 'conversation-context') && (
                      <button
                        className="pronunciation-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakGreek(option);
                        }}
                        title="Listen to pronunciation"
                        style={{
                          minWidth: '50px',
                          padding: '10px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#2563eb';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#3b82f6';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        🔊
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="practice-section">
              <div className="practice-buttons">
                {!showResult ? (
                  <button
                    className="practice-btn primary"
                    onClick={checkAnswer}
                    disabled={!selectedAnswer}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button className="practice-btn primary" onClick={nextQuestion}>
                    {questionNumber >= 10 ? 'Finish Practice' : 'Next Question'}
                  </button>
                )}
              </div>
            </div>

            {showResult && (
              <div className="visual-aid-section">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <div className="correct-feedback">
                    <h4>🎉 Excellent!</h4>
                    <p>+{Math.max(10, 25 - (questionNumber * 2))} points</p>
                    {currentQuestion.targetPhrase && (
                      <div className="phrase-info">
                        <p><strong>Greek:</strong> {currentQuestion.targetPhrase.greek}</p>
                        <p><strong>Pronunciation:</strong> [{currentQuestion.targetPhrase.pronunciation}]</p>
                        <p><strong>English:</strong> {currentQuestion.targetPhrase.english}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="incorrect-feedback">
                    <h4>❌ Not quite right</h4>
                    <p>The correct answer was: <strong>{currentQuestion.correctAnswer}</strong></p>
                    {currentQuestion.targetPhrase && (
                      <div className="phrase-info">
                        <p><strong>Greek:</strong> {currentQuestion.targetPhrase.greek}</p>
                        <p><strong>Pronunciation:</strong> [{currentQuestion.targetPhrase.pronunciation}]</p>
                        <p><strong>English:</strong> {currentQuestion.targetPhrase.english}</p>
                        {currentQuestion.targetPhrase.notes && (
                          <p><strong>Note:</strong> {currentQuestion.targetPhrase.notes}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhrasesPracticeSection;
