import React, { useState } from 'react';

const Navigation = ({ currentSection, setCurrentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'learn', label: 'Learn', icon: '📚' },
    { id: 'practice', label: 'Practice', icon: '🎯' },
    { id: 'phrases', label: 'Phrases', icon: '💬' },
    { id: 'phrases-practice', label: 'Phrase Practice', icon: '🗣️' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'cheatsheet', label: 'Cheat Sheet', icon: '📋' }
  ];

  const handleNavItemClick = (itemId) => {
    setCurrentSection(itemId);
    setIsMenuOpen(false); // Close menu after selection on mobile
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Hamburger button - only visible on mobile */}
      <button
        className="hamburger-btn"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
      >
        <span className="hamburger-icon">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </span>
      </button>

      {/* Overlay backdrop - only visible when menu is open on mobile */}
      {isMenuOpen && (
        <div
          className="nav-overlay"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navigation menu */}
      <nav
        className={`app-navigation ${isMenuOpen ? 'menu-open' : ''}`}
        role="navigation"
        aria-label="Main application navigation"
      >
        <div className="nav-container">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              className={`nav-item ${currentSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavItemClick(item.id)}
              aria-label={`Navigate to ${item.label} section`}
              aria-current={currentSection === item.id ? 'page' : undefined}
              tabIndex={0}
              onKeyDown={(e) => {
                // Handle keyboard navigation
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  const nextIndex = e.key === 'ArrowDown'
                    ? Math.min(index + 1, navItems.length - 1)
                    : Math.max(index - 1, 0);
                  setCurrentSection(navItems[nextIndex].id);
                }
              }}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
