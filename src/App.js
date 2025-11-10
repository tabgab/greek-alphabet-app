import React, { useState, useEffect } from 'react';
import './App.css';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

// Import components (we'll create these next)
import Header from './components/Header';
import Navigation from './components/Navigation';
import LearnSection from './components/LearnSection';
import PracticeSection from './components/PracticeSection';
import PhrasesSection from './components/PhrasesSection';
import PhrasesPracticeSection from './components/PhrasesPracticeSection';
import ProgressSection from './components/ProgressSection';
import CheatSheetSection from './components/CheatSheetSection';
import { ProgressProvider } from './context/ProgressContext';

function App() {
  const [currentSection, setCurrentSection] = useState('learn');

  // Configure status bar for Android
  useEffect(() => {
    const configureStatusBar = async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          // Show the status bar
          await StatusBar.show();
          // Set style to dark (dark text on light background)
          await StatusBar.setStyle({ style: Style.Dark });
          // Set background color to match header gradient
          await StatusBar.setBackgroundColor({ color: '#667eea' });
        } catch (error) {
          console.error('Error configuring status bar:', error);
        }
      }
    };

    configureStatusBar();
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'learn':
        return <LearnSection />;
      case 'practice':
        return <PracticeSection />;
      case 'phrases':
        return <PhrasesSection />;
      case 'phrases-practice':
        return <PhrasesPracticeSection />;
      case 'progress':
        return <ProgressSection />;
      case 'cheatsheet':
        return <CheatSheetSection />;
      default:
        return <LearnSection />;
    }
  };

  return (
    <ProgressProvider>
      <div className="App">
        <Header />
        <div className="app-container">
          <Navigation
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
          <main
            className="main-content"
            role="main"
            aria-label="Greek alphabet learning content"
          >
            {renderSection()}
          </main>
        </div>

        {/* Skip to main content link for screen readers */}
        <a
          href="#main-content"
          className="skip-link"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
      </div>
    </ProgressProvider>
  );
}

export default App;
