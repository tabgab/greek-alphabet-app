import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';

// Exercise configuration with multiple question patterns
const EXERCISE_TYPES = {
  'multiple-choice': {
    name: 'Multiple Choice',
    description: 'Choose the correct answer from options',
    icon: '🔘',
    questionCount: 3 // Multiple question variations
  },
  'letter-to-sound': {
    name: 'Letter to Sound',
    description: 'Match Greek letters to their English sounds',
    icon: '🔊',
    questionCount: 2
  },
  'sound-to-letter': {
    name: 'Sound to Letter',
    description: 'Find the Greek letter that makes a specific sound',
    icon: '📝',
    questionCount: 3
  },
  'letter-matching': {
    name: 'Letter Matching',
    description: 'Match uppercase and lowercase letters',
    icon: '🔗',
    questionCount: 2
  },
  'word-association': {
    name: 'Sound Association',
    description: 'Match letters to words containing their sounds',
    icon: '🌐',
    questionCount: 3
  },
  'sound-identification': {
    name: 'Sound ID',
    description: 'Listen and identify the Greek letter by its sound',
    icon: '🎵',
    questionCount: 3
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
  const [sessionLetters, setSessionLetters] = useState(new Map()); // Track letters practiced in this session
  const [questionHistory, setQuestionHistory] = useState(new Set()); // Track recent questions to avoid repetition
  const [currentTargetLetter, setCurrentTargetLetter] = useState(null); // Track which letter we're focusing on

  // Function to play letter sound for listening exercises
  const playLetterSound = (sound) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(sound);

      // Try to find a Greek voice for better pronunciation
      const voices = window.speechSynthesis.getVoices();
      const greekVoice = voices.find(voice =>
        voice.lang.startsWith('el') ||
        voice.lang.startsWith('grc') ||
        voice.name.toLowerCase().includes('greek')
      );

      if (greekVoice) {
        utterance.voice = greekVoice;
        utterance.lang = greekVoice.lang;
      } else {
        utterance.lang = 'el-GR';
      }

      utterance.rate = 0.7; // Slower for clarity in listening exercises
      utterance.pitch = 1.1; // Slightly higher pitch for clarity

      window.speechSynthesis.speak(utterance);
    }
  };

  // Generate focused questions about a specific letter with multiple variations
  const generateQuestion = (exerciseType, targetLetter = null) => {
    const availableLetters = getAvailableLetters();

    if (availableLetters.length < 2) {
      return {
        type: 'insufficient-letters',
        question: 'Complete more letters to unlock practice exercises!',
        correctAnswer: null,
        options: []
      };
    }

    // Select a target letter to focus questions on (either provided or choose one)
    let focusLetter;
    if (targetLetter && availableLetters.some(l => l.id === targetLetter.id)) {
      focusLetter = targetLetter;
    } else {
      // Choose a letter that needs practice (less practiced in this session)
      const candidates = availableLetters.filter(letter => {
        const practiceCount = sessionLetters.get(letter.id) || 0;
        return practiceCount < 3; // Letters with less than 3 practices get priority
      });

      focusLetter = candidates.length > 0
        ? candidates[Math.floor(Math.random() * candidates.length)]
        : availableLetters[Math.floor(Math.random() * availableLetters.length)];
    }

    // Get other letters for options (excluding the focus letter)
    const otherLetters = availableLetters.filter(l => l.id !== focusLetter.id);
    const distractorLetters = otherLetters.sort(() => Math.random() - 0.5).slice(0, 3);

    let question = {};

    switch (exerciseType) {
      case 'multiple-choice':
        const letterQuestionPatterns = [
          `Which letter makes the "${focusLetter.englishSound}" sound?`,
          `What is the name of this letter: "${focusLetter.greekLetter}"?`,
          `Which letter sounds like "${focusLetter.exampleWords[0]}"?`,
          `What letter should you use for the "${focusLetter.englishSound}" sound?`,
          `Looking at the shape "${focusLetter.greekLetter}", what sound does it make?`,
          `If you see "${focusLetter.greekLetter}" in Greek text, how would you pronounce it?`,
          `Which letter represents the "${focusLetter.englishSound}" sound in Greek?`,
          `What Greek letter would you use to write the "${focusLetter.englishSound}" sound?`
        ];
        const randomLetterPattern = letterQuestionPatterns[Math.floor(Math.random() * letterQuestionPatterns.length)];

        question = {
          type: 'multiple-choice',
          question: randomLetterPattern,
          correctAnswer: focusLetter.name,
          options: [focusLetter, ...distractorLetters].map(l => l.name).sort(() => Math.random() - 0.5),
          letter: focusLetter
        };
        break;

      case 'letter-to-sound':
        const soundQuestionPatterns = [
          `What sound does "${focusLetter.greekLetter}" make?`,
          `How do you pronounce "${focusLetter.greekLetter}"?`,
          `What is the English sound for "${focusLetter.greekLetter}"?`,
          `If you see "${focusLetter.greekLetter}", what sound do you make?`,
          `What pronunciation matches "${focusLetter.greekLetter}"?`,
          `When you encounter "${focusLetter.greekLetter}" in Greek writing, what sound does it represent?`,
          `How would you say "${focusLetter.greekLetter}" out loud?`,
          `What English sound is closest to how "${focusLetter.greekLetter}" is pronounced?`
        ];
        const randomSoundQuestionPattern = soundQuestionPatterns[Math.floor(Math.random() * soundQuestionPatterns.length)];

        question = {
          type: 'letter-to-sound',
          question: randomSoundQuestionPattern,
          correctAnswer: focusLetter.englishSound,
          options: [focusLetter, ...distractorLetters].map(l => l.englishSound).sort(() => Math.random() - 0.5),
          letter: focusLetter
        };
        break;

      case 'sound-to-letter':
        const reverseQuestionPatterns = [
          `Which Greek letter makes the "${focusLetter.englishSound}" sound?`,
          `Which letter sounds like "${focusLetter.exampleWords[0]}"?`,
          `What letter should you use for the "${focusLetter.englishSound}" sound?`,
          `If you want to make the "${focusLetter.englishSound}" sound, which letter do you use?`,
          `Which of these letters makes the "${focusLetter.englishSound}" sound?`,
          `To write the "${focusLetter.englishSound}" sound in Greek, which letter would you choose?`,
          `If you hear the "${focusLetter.englishSound}" sound, which Greek letter represents it?`,
          `Which Greek letter corresponds to the "${focusLetter.englishSound}" pronunciation?`
        ];
        const randomReversePattern = reverseQuestionPatterns[Math.floor(Math.random() * reverseQuestionPatterns.length)];

        question = {
          type: 'sound-to-letter',
          question: randomReversePattern,
          correctAnswer: `${focusLetter.greekLetter} ${focusLetter.greekLowercase}`,
          options: [focusLetter, ...distractorLetters].map(l => `${l.greekLetter} ${l.greekLowercase}`).sort(() => Math.random() - 0.5),
          letter: focusLetter
        };
        break;

      case 'letter-matching':
        const matchQuestionPatterns = [
          `What is the lowercase form of "${focusLetter.greekLetter}"?`,
          `Which lowercase letter matches the uppercase "${focusLetter.greekLetter}"?`,
          `Complete the pair: ${focusLetter.greekLetter} → ?`,
          `If the uppercase is "${focusLetter.greekLetter}", what is the lowercase?`,
          `What does "${focusLetter.greekLetter}" become when written in lowercase?`
        ];
        const randomMatchQuestionPattern = matchQuestionPatterns[Math.floor(Math.random() * matchQuestionPatterns.length)];

        question = {
          type: 'letter-matching',
          question: randomMatchQuestionPattern,
          correctAnswer: focusLetter.greekLowercase,
          options: [focusLetter, ...distractorLetters].map(l => l.greekLowercase).sort(() => Math.random() - 0.5),
          letter: focusLetter
        };
        break;

      case 'word-association':
        const wordOptions = [
          focusLetter.exampleWords[0],
          ...(focusLetter.exampleWords[1] ? [focusLetter.exampleWords[1]] : []),
          ...(focusLetter.exampleWords[2] ? [focusLetter.exampleWords[2]] : [])
        ];
        const displayWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];

        const associationQuestionPatterns = [
          `Which letter makes the "${focusLetter.englishSound}" sound found in "${displayWord}"?`,
          `What letter would you use to start writing "${displayWord}" in Greek?`,
          `Which Greek letter sounds like the beginning of "${displayWord}"?`,
          `If "${displayWord}" starts with the "${focusLetter.englishSound}" sound, which letter is it?`,
          `Which letter represents the sound at the start of "${displayWord}"?`,
          `The word "${displayWord}" begins with the "${focusLetter.englishSound}" sound. Which Greek letter matches that?`,
          `To write "${displayWord}" in Greek, you'd start with which letter for the "${focusLetter.englishSound}" sound?`,
          `Which Greek letter would you use for the initial sound in "${displayWord}"?`
        ];
        const randomAssociationQuestionPattern = associationQuestionPatterns[Math.floor(Math.random() * associationQuestionPatterns.length)];

        question = {
          type: 'word-association',
          question: randomAssociationQuestionPattern,
          correctAnswer: focusLetter.name,
          options: [focusLetter, ...distractorLetters].map(l => l.name).sort(() => Math.random() - 0.5),
          letter: focusLetter
        };
        break;

      case 'sound-identification':
        // Select a random Greek word from the letter's examples
        const availableWords = focusLetter.commonWords.filter(word =>
          word.includes('(') && word.includes(')')
        );

        if (availableWords.length === 0) {
          // Fallback to letter sound if no words available
          question = {
            type: 'sound-identification',
            question: `Listen to this sound and identify which letter makes it:`,
            correctAnswer: focusLetter.name,
            options: [focusLetter, ...distractorLetters].map(l => l.name).sort(() => Math.random() - 0.5),
            letter: focusLetter,
            soundToPlay: focusLetter.englishSound,
            isWordBased: false
          };
        } else {
          const randomWordWithTranslation = availableWords[Math.floor(Math.random() * availableWords.length)];
          // Extract Greek word and translation
          const greekWord = randomWordWithTranslation.split('(')[0].trim();
          const englishTranslation = randomWordWithTranslation.split('(')[1].replace(')', '').trim();

          const wordIdentificationPatterns = [
            `Listen to this Greek word and identify which letter it starts with:`,
            `What Greek letter makes the beginning sound of this word?`,
            `Listen carefully - which letter starts this Greek word?`,
            `Identify the Greek letter by the starting sound of this word:`,
            `Which letter sound do you hear at the beginning of this word?`
          ];
          const randomWordPattern = wordIdentificationPatterns[Math.floor(Math.random() * wordIdentificationPatterns.length)];

          question = {
            type: 'sound-identification',
            question: randomWordPattern,
            correctAnswer: focusLetter.name,
            options: [focusLetter, ...distractorLetters].map(l => l.name).sort(() => Math.random() - 0.5),
            letter: focusLetter,
            soundToPlay: greekWord,
            wordToShow: greekWord,
            translationToShow: englishTranslation,
            isWordBased: true
          };
        }
        break;

      default:
        return generateQuestion('multiple-choice', focusLetter);
    }

    return question;
  };

  const startExercise = (exerciseType) => {
    setSelectedExerciseType(exerciseType);

    // Generate first question and set target letter
    const firstQuestion = generateQuestion(exerciseType);
    setCurrentQuestion(firstQuestion);

    // Set the target letter for this exercise session
    if (firstQuestion.letter) {
      setCurrentTargetLetter(firstQuestion.letter);
    }

    // Auto-play sound for sound-identification exercises
    if (exerciseType === 'sound-identification' && firstQuestion.soundToPlay) {
      setTimeout(() => {
        playLetterSound(firstQuestion.soundToPlay);
      }, 500); // Small delay to let UI render first
    }

    setSelectedAnswer(null);
    setShowResult(false);
    setQuestionNumber(1);
    setScore(0);
    setSessionStats({ correct: 0, total: 0 });
    setSessionLetters(new Map());
    setQuestionHistory(new Set()); // Clear question history for new exercise
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

      // Track this letter as practiced in this session
      if (currentQuestion.letter) {
        setSessionLetters(prev => {
          const letterId = currentQuestion.letter.id;
          const currentCount = prev.get(letterId) || 0;
          return new Map(prev.set(letterId, currentCount + 1));
        });
      }
    }
  };

  const nextQuestion = () => {
    if (questionNumber >= 10) { // End of exercise after 10 questions
      finishExercise();
      return;
    }

    setQuestionNumber(prev => prev + 1);

    // Generate question with maximum variety across all unlocked letters
    let newQuestion;

    // For ALL exercises, ensure maximum variety by using different letters more frequently
    // Only 20% chance to continue with same letter, 80% chance for new letter
    if (currentTargetLetter && Math.random() > 0.8) {
      newQuestion = generateQuestion(selectedExerciseType, currentTargetLetter);
    } else {
      // Choose a completely new letter (not the current target)
      newQuestion = generateQuestion(selectedExerciseType);
      if (newQuestion.letter) {
        setCurrentTargetLetter(newQuestion.letter);
      }
    }

    // Prevent question and LETTER repetition with stricter rules
    let attempts = 0;
    const maxAttempts = 15;
    const recentQuestions = Array.from(questionHistory);

    // Ensure variety: no same letter in consecutive questions, and avoid recent question text
    while (
      (questionHistory.has(newQuestion.question) ||
       (newQuestion.letter && currentTargetLetter && newQuestion.letter.id === currentTargetLetter.id && attempts < 3) ||
       (recentQuestions.length >= 2 && recentQuestions.slice(-2).includes(newQuestion.question)) ||
       (recentQuestions.length >= 1 && recentQuestions.slice(-1)[0] === newQuestion.question))
      && attempts < maxAttempts
    ) {
      newQuestion = generateQuestion(selectedExerciseType, null); // Force new letter selection
      attempts++;
    }

    // Update question history (keep last 20 questions for better variety)
    setQuestionHistory(prev => {
      const newHistory = new Set(prev);
      newHistory.add(newQuestion.question);
      if (newHistory.size > 20) {
        const items = Array.from(newHistory);
        // Keep the 15 most recent questions
        const recentItems = items.slice(-15);
        return new Set(recentItems);
      }
      return newHistory;
    });

    setCurrentQuestion(newQuestion);
    setSelectedAnswer(null);
    setShowResult(false);

    // Auto-play sound for sound-identification exercises
    if (selectedExerciseType === 'sound-identification' && newQuestion.soundToPlay) {
      setTimeout(() => {
        playLetterSound(newQuestion.soundToPlay);
      }, 300); // Small delay to let UI update first
    }
  };

  const finishExercise = () => {
    // Save scores for all letters practiced in this session
    if (sessionStats.total > 0 && sessionLetters.size > 0) {
      const averageScore = Math.round((sessionStats.correct / sessionStats.total) * 100);

      // Update score for each letter that was practiced in this session
      sessionLetters.forEach((practiceCount, letterId) => {
        // Give higher scores for letters that were practiced more
        const letterScore = Math.min(100, averageScore + (practiceCount * 5));
        updateScore(letterId, letterScore);
      });
    }

    setSelectedExerciseType(null);
    setCurrentQuestion(null);
    setScore(0);
    setSessionStats({ correct: 0, total: 0 });
    setSessionLetters(new Map());
    setQuestionHistory(new Set()); // Clear question history
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
                    <div className="letter-display-container">
                      <div className="both-cases-display">
                        <span className="greek-letter-large">{currentQuestion.letter.greekLetter}</span>
                        <span className="greek-letter-large">{currentQuestion.letter.greekLowercase}</span>
                      </div>
                      <span className="case-indicator">({currentQuestion.letter.name})</span>
                    </div>
                  )}
                  {currentQuestion.type === 'letter-matching' && (
                    <div className="letter-display-container">
                      <span className="greek-letter-large">
                        {currentQuestion.direction === 'up-to-low' ? currentQuestion.letter.greekLetter : currentQuestion.letter.greekLowercase}
                      </span>
                      <span className="case-indicator">
                        ({currentQuestion.direction === 'up-to-low' ? 'Uppercase' : 'Lowercase'} {currentQuestion.letter.name})
                      </span>
                    </div>
                  )}
                  {currentQuestion.type === 'case-recognition' && (
                    <div className="letter-display-container">
                      {currentQuestion.subType === 'identify-case' && (
                        <span className="greek-letter-large">
                          {currentQuestion.correctAnswer === 'uppercase' ? currentQuestion.letter.greekLetter : currentQuestion.letter.greekLowercase}
                        </span>
                      )}
                      {(currentQuestion.subType === 'find-uppercase' || currentQuestion.subType === 'find-lowercase') && (
                        <div className="both-cases-question">
                          <span className="greek-letter-medium">{currentQuestion.letter.greekLetter}</span>
                          <span className="case-separator">↔</span>
                          <span className="greek-letter-medium">{currentQuestion.letter.greekLowercase}</span>
                        </div>
                      )}
                      {currentQuestion.subType === 'same-letter-different-case' && (
                        <span className="greek-letter-large">
                          {currentQuestion.question.includes('lowercase') ? currentQuestion.letter.greekLetter : currentQuestion.letter.greekLowercase}
                        </span>
                      )}
                    </div>
                  )}
                  {currentQuestion.type === 'sound-identification' && (
                    <div className="sound-identification-container">
                      <div className="sound-prompt">
                        <span className="sound-icon">🔊</span>
                        <span className="sound-text">
                          {currentQuestion.isWordBased
                            ? `Listen to the Greek word`
                            : `Listen to the sound`
                          }
                        </span>
                      </div>
                      {currentQuestion.isWordBased && currentQuestion.wordToShow && (
                        <div className="word-display">
                          <div className="word-with-translation">
                            <span className="greek-word-large">{currentQuestion.wordToShow}</span>
                            {currentQuestion.translationToShow && (
                              <span className="word-translation">"{currentQuestion.translationToShow}"</span>
                            )}
                          </div>
                        </div>
                      )}
                      <button
                        className="replay-sound-btn"
                        onClick={() => playLetterSound(currentQuestion.soundToPlay)}
                        title={currentQuestion.isWordBased ? "Replay the word" : "Replay the sound"}
                      >
                        🔄 {currentQuestion.isWordBased ? 'Replay Word' : 'Replay Sound'}
                      </button>
                    </div>
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
