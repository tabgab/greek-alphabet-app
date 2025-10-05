import React from 'react';
import { useProgress } from '../context/ProgressContext';

const Header = () => {
  const { getAvailableLetters } = useProgress();
  const unlockedCount = getAvailableLetters().length;
  const progressPercentage = Math.round((unlockedCount / 24) * 100);

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-title">
          <h1>Ελληνικό Αλφάβητο</h1>
          <p className="subtitle">Greek Alphabet Learning</p>
        </div>
        <div className="header-stats">
          <div className="progress-indicator">
            <span className="progress-label">Progress</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: progressPercentage > 50 ? '#10b981' : progressPercentage > 20 ? '#f59e0b' : '#ef4444'
                }}
              ></div>
            </div>
            <span className="progress-text">{unlockedCount}/24 Letters</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;