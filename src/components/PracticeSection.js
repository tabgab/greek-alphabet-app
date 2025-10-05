import React, { useState } from 'react';
import { getRandomLetters } from '../greekAlphabetData';
import { useProgress } from '../context/ProgressContext';

// Exercise configuration
const EXERCISE_TYPES = {
  'multiple-choice': {
    name: 'Multiple Choice',
    description: 'Choose the correct answer from options',
    icon: '🔘'
  },
  'letter-to-sound': {
    name: 'Letter to Sound',
    description: 'Match Greek letters to their English sounds',
    icon: '🔊'
  },
  'sound-to-letter': {
    name: 'Sound to Letter',
    description: 'Find the Greek letter that makes a specific sound',
    icon: '📝'
  },
  'letter-matching': {
    name: 'Letter Matching',
    description: 'Match uppercase and lowercase letters',
    icon: '🔗'
  },
  'word-association': {
    name: 'Sound Association',
    description: 'Match letters to words containing their sounds',
    icon: '🔗'
  }
};

const PracticeSection = () => {
  const { updateScore, incrementStreak, getAvailableLetters } = useProgress();
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  // Generate a new question based on exercise type
  const generateQuestion = (exerciseType) => {
    const availableLetters = getAvailableLetters();

    if (availableLetters.length < 2) {
      return {
        type: 'insufficient-letters',
        question: 'Complete more letters to unlock practice exercises!',
        correctAnswer: null,
        options: []
      };
    }

    const letters = getRandomLetters(4).filter(letter =>
      availableLetters.some(available => available.id === letter.id)
    );

    if (letters.length < 2) {
      letters.push(...availableLetters.slice(0, 2));
    }

    let question = {};

    switch (exerciseType) {
      case 'multiple-choice':
        const correctLetter = letters[0];
        question = {
          type: 'multiple-choice',
          question: `Which letter makes the "${correctLetter.englishSound}" sound?`,
          correctAnswer: correctLetter.name,
          options: letters.map(l => l.name).sort(() => Math.random() - 0.5),
          letter: correctLetter
        };
        break;

      case 'letter-to-sound':
        const letterForSound = letters[0];
        question = {
          type: 'letter-to-sound',
          question: `What sound does "${letterForSound.greekLetter}" make?`,
          correctAnswer: letterForSound.englishSound,
          options: letters.map(l => l.englishSound).sort(() => Math.random() - 0.5),
          letter: letterForSound
        };
        break;

      case 'sound-to-letter':
        const soundLetter = letters[0];
        question = {
          type: 'sound-to-letter',
          question: `Which Greek letter makes the "${soundLetter.englishSound}" sound (like "${soundLetter.exampleWords[0]}")?`,
          correctAnswer: soundLetter.greekLetter,
          options: letters.map(l => l.greekLetter).sort(() => Math.random() - 0.5),
          letter: soundLetter
        };
        break;

      case 'letter-matching':
        const matchLetter = letters[0];
        question = {
          type: 'letter-matching',
          question: `Match the uppercase "${matchLetter.greekLetter}" to its lowercase form`,
          correctAnswer: matchLetter.greekLowercase,
          options: letters.map(l => l.greekLowercase).sort(() => Math.random() - 0.5),
          letter: matchLetter
        };
        break;

      case 'word-association':
        const wordLetter = letters[0];
        // Create a better word association by using words that actually demonstrate the sound
        const soundWordMap = {
          'ah': 'father',
          'beh': 'baby',
          'gah': 'game',
          'theh': 'this',
          'eh': 'bed',
          'dzeh': 'zebra',
          'ee': 'see',
          'oh': 'more',
          'pee': 'pie',
          'roh': 'road',
          'sih': 'sing',
          'tah': 'take',
          'fee': 'phone',
          'hee': 'loch',
          'psee': 'lapse',
          'lah': 'lamp',
          'mee': 'mouse',
          'nee': 'nice',
          'ksee': 'taxi',
          'kah': 'kite'
        };

        const displayWord = soundWordMap[wordLetter.englishSound] || wordLetter.exampleWords[0];

        question = {
          type: 'word-association',
          question: `Which letter makes the "${wordLetter.englishSound}" sound (like in "${displayWord}")?`,
          correctAnswer: wordLetter.name,
          options: letters.map(l => l.name).sort(() => Math.random() - 0.5),
          letter: wordLetter
        };
        break;

      default:
        return generateQuestion('multiple-choice');
    }

    return question;
  };

  const startExercise = (exerciseType) => {
    setSelectedExerciseType(exerciseType);
    setCurrentQuestion(generateQuestion(exerciseType));
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
      const points = Math.max(10, 20 - (questionNumber * 2)); // Decreasing points
      setScore(prev => prev + points);
      incrementStreak();
    }
  };

  const nextQuestion = () => {
    if (questionNumber >= 10) { // End of exercise after 10 questions
      finishExercise();
      return;
    }

    setQuestionNumber(prev => prev + 1);
    setCurrentQuestion(generateQuestion(selectedExerciseType));
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const finishExercise = () => {
    // Save final score
    if (sessionStats.total > 0) {
      const averageScore = Math.round((sessionStats.correct / sessionStats.total) * 100);
      updateScore(currentQuestion.letter.id, averageScore);
    }

    setSelectedExerciseType(null);
    setCurrentQuestion(null);
    setScore(0);
    setSessionStats({ correct: 0, total: 0 });
  };

  const getOptionButtonClass = (option) => {
    let baseClass = 'option-btn';
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

  if (!selectedExerciseType) {
    return (
      <div className="practice-section">
        <div className="section-header">
          <h2>Practice Exercises</h2>
          <p>Choose an exercise type to test your Greek alphabet knowledge.</p>

          <div className="exercise-types">
            {Object.entries(EXERCISE_TYPES).map(([type, config]) => (
              <button
                key={type}
                className="exercise-type-btn"
                onClick={() => startExercise(type)}
              >
                <div className="exercise-icon">{config.icon}</div>
                <div className="exercise-info">
                  <h3>{config.name}</h3>
                  <p>{config.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="practice-section">
      <div className="section-header">
        <div className="exercise-header">
          <h2>{EXERCISE_TYPES[selectedExerciseType].name}</h2>
          <div className="exercise-progress">
            <span>Question {questionNumber}/10</span>
            <span>Score: {score}</span>
          </div>
        </div>

        <div className="exercise-container">
          <div className="exercise-question">
            <h3>{currentQuestion.question}</h3>
            {currentQuestion.type === 'insufficient-letters' ? (
              <div className="insufficient-letters">
                <p>📚 You need at least 2 unlocked letters to practice.</p>
                <p>Complete some letters in the Learn section first!</p>
              </div>
            ) : (
              currentQuestion.letter && (
                <div className="question-letter">
                  {currentQuestion.type === 'letter-to-sound' && (
                    <span className="greek-letter-large">{currentQuestion.letter.greekLetter}</span>
                  )}
                  {currentQuestion.type === 'letter-matching' && (
                    <span className="greek-letter-large">{currentQuestion.letter.greekLetter}</span>
                  )}
                </div>
              )
            )}
          </div>

          <div
            className="exercise-options"
            role="radiogroup"
            aria-label="Answer options"
          >
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={getOptionButtonClass(option)}
                onClick={() => setSelectedAnswer(option)}
                disabled={showResult}
                role="radio"
                aria-checked={selectedAnswer === option}
                aria-label={`Option ${index + 1}: ${option}`}
                tabIndex={showResult ? -1 : 0}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="exercise-actions">
            {!showResult ? (
              <button
                className="check-btn"
                onClick={checkAnswer}
                disabled={!selectedAnswer}
              >
                Check Answer
              </button>
            ) : (
              <button className="next-btn" onClick={nextQuestion}>
                {questionNumber >= 10 ? 'Finish Exercise' : 'Next Question'}
              </button>
            )}
          </div>

          {showResult && (
            <div className="exercise-feedback">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <div className="correct-feedback">
                  <span className="feedback-icon">🎉</span>
                  <div className="feedback-content">
                    <h4>Correct!</h4>
                    <p>Great job! +{Math.max(10, 20 - (questionNumber * 2))} points</p>
                  </div>
                </div>
              ) : (
                <div className="incorrect-feedback">
                  <span className="feedback-icon">❌</span>
                  <div className="feedback-content">
                    <h4>Not quite right</h4>
                    <p>The correct answer is <strong>{currentQuestion.correctAnswer}</strong></p>
                    {currentQuestion.letter && (
                      <p className="hint">
                        💡 {currentQuestion.letter.englishComparison}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="session-stats">
            <span>Session: {sessionStats.correct}/{sessionStats.total} correct</span>
            <span>Average: {sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeSection;