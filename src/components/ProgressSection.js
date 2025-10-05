import React from 'react';
import { useProgress } from '../context/ProgressContext';

const ProgressSection = () => {
  const {
    userProgress,
    getUnlockedAchievements,
    getLockedAchievements,
    getExerciseStats,
    getProgressMetrics
  } = useProgress();

  const progress = getProgressMetrics();
  const unlockedAchievements = getUnlockedAchievements();
  const lockedAchievements = getLockedAchievements();
  const stats = getExerciseStats();

  return (
    <div className="progress-section">
      <div className="section-header">
        <h2>Your Progress</h2>
        <p>Track your learning journey and celebrate your achievements!</p>
      </div>

      <div className="progress-stats">
        <div className="stat-card primary">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{progress.completedLetters}/24</h3>
            <p>Letters Mastered</p>
          </div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{progress.totalScore.toLocaleString()}</h3>
            <p>Total Points</p>
          </div>
        </div>

        <div className="stat-card accent">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3>{userProgress.streakCount}</h3>
            <p>Day Streak</p>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{progress.averageScore}%</h3>
            <p>Average Score</p>
          </div>
        </div>
      </div>

      <div className="progress-overview">
        <div className="overview-item">
          <div className="overview-label">Current Level</div>
          <div className="overview-value level-{progress.currentLevel}">
            Level {progress.currentLevel}
          </div>
        </div>
        <div className="overview-item">
          <div className="overview-label">Unlocked Letters</div>
          <div className="overview-value">{progress.unlockedLetters}/24</div>
        </div>
        <div className="overview-item">
          <div className="overview-label">Study Time</div>
          <div className="overview-value">{Math.round(stats.studyTimeMinutes)}min</div>
        </div>
      </div>

      <div className="progress-details">
        <div className="progress-chart">
          <h3>Alphabet Progress</h3>
          <div className="chart-container">
            <div className="progress-circle">
              <svg viewBox="0 0 100 100" className="circular-progress">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress.completionProgress / 100)}`}
                  transform="rotate(-90 50 50)"
                  className="progress-ring"
                />
              </svg>
              <span className="progress-percentage">
                {progress.completionProgress}%
              </span>
            </div>
          </div>
        </div>

        <div className="detailed-stats">
          <h3>Exercise Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Questions Answered</span>
              <span className="stat-value">{stats.totalQuestions}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Correct Answers</span>
              <span className="stat-value">{stats.correctAnswers}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Accuracy Rate</span>
              <span className="stat-value">
                {stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0}%
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Best Streak</span>
              <span className="stat-value">{stats.bestStreak} days</span>
            </div>
          </div>
        </div>

        <div className="achievements">
          <h3>Achievements</h3>
          <div className="achievements-summary">
            <span className="achievement-count">
              {unlockedAchievements.length} of 8 unlocked
            </span>
          </div>

          <div className="achievements-list">
            {unlockedAchievements.map(achievement => (
              <div key={achievement.id} className="achievement unlocked">
                <span className="achievement-icon">{achievement.icon}</span>
                <div className="achievement-content">
                  <h4>{achievement.name}</h4>
                  <p>{achievement.description}</p>
                  <span className="achievement-reward">Reward: {achievement.reward}</span>
                </div>
                <span className="achievement-date">
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </span>
              </div>
            ))}

            {lockedAchievements.slice(0, 3).map(achievement => (
              <div key={achievement.id} className="achievement locked">
                <span className="achievement-icon locked">🔒</span>
                <div className="achievement-content">
                  <h4>{achievement.name}</h4>
                  <p>{achievement.description}</p>
                  <span className="achievement-reward">Reward: {achievement.reward}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;