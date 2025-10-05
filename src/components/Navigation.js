import React from 'react';

const Navigation = ({ currentSection, setCurrentSection }) => {
  const navItems = [
    { id: 'learn', label: 'Learn', icon: '📚' },
    { id: 'practice', label: 'Practice', icon: '🎯' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'cheatsheet', label: 'Cheat Sheet', icon: '📋' }
  ];

  return (
    <nav
      className="app-navigation"
      role="navigation"
      aria-label="Main application navigation"
    >
      <div className="nav-container">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            className={`nav-item ${currentSection === item.id ? 'active' : ''}`}
            onClick={() => setCurrentSection(item.id)}
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
  );
};

export default Navigation;