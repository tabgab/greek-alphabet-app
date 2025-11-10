import { Capacitor } from '@capacitor/core';

/**
 * Audio utility for handling Greek pronunciation
 * Works on both web and Android using Web Speech API
 */

const isNative = Capacitor.isNativePlatform();

// Cache voices when they're loaded
let voicesCache = [];
let voicesLoaded = false;

// Load voices
const loadVoices = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return;
  }

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    voicesCache = voices;
    voicesLoaded = true;
  }
};

// Initialize voices
if (typeof window !== 'undefined' && window.speechSynthesis) {
  // Load voices initially
  loadVoices();
  
  // Also listen for voices changed event (important for Chrome/Android)
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

/**
 * Find the best Greek voice available
 */
const findGreekVoice = () => {
  if (!voicesLoaded) {
    loadVoices();
  }

  // Try to find a Greek voice
  const greekVoice = voicesCache.find(voice =>
    voice.lang.startsWith('el') || // Modern Greek
    voice.lang.startsWith('grc') || // Ancient Greek
    voice.name.toLowerCase().includes('greek')
  );

  return greekVoice || null;
};

/**
 * Speak Greek text with proper configuration
 */
export const speakGreek = (text, options = {}) => {
  return new Promise((resolve, reject) => {
    // Check if speech synthesis is supported
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Ensure voices are loaded
      if (!voicesLoaded) {
        loadVoices();
      }

      // Wait a bit for voices to load on Android
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);

        // Try to use Greek voice
        const greekVoice = findGreekVoice();
        
        if (greekVoice) {
          utterance.voice = greekVoice;
          utterance.lang = greekVoice.lang;
        } else {
          // Fallback to Greek locale
          utterance.lang = 'el-GR';
        }

        // Configure speech parameters
        utterance.rate = options.rate || 0.8; // Slower for clarity
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume || 1.0;

        // Add event handlers
        utterance.onend = () => {
          resolve();
        };

        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          reject(event);
        };

        // Speak the text
        window.speechSynthesis.speak(utterance);
      }, isNative ? 100 : 0); // Small delay on native platforms
    } catch (error) {
      console.error('Error in speakGreek:', error);
      reject(error);
    }
  });
};

/**
 * Stop any ongoing speech
 */
export const stopSpeech = () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Check if speech synthesis is available
 */
export const isSpeechAvailable = () => {
  return typeof window !== 'undefined' && 
         window.speechSynthesis !== undefined;
};

/**
 * Get available Greek voices
 */
export const getGreekVoices = () => {
  if (!voicesLoaded) {
    loadVoices();
  }

  return voicesCache.filter(voice =>
    voice.lang.startsWith('el') ||
    voice.lang.startsWith('grc') ||
    voice.name.toLowerCase().includes('greek')
  );
};
