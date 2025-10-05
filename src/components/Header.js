import React from 'react';

const Header = () => {
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
              <div className="progress-fill" style={{ width: '0%' }}></div>
            </div>
            <span className="progress-text">0/24 Letters</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;