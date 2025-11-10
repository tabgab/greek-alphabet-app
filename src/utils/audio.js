import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

/**
 * Audio utility for handling Greek pronunciation
 * Uses native TTS on Android and Web Speech API on web
 */

const isNative = Capacitor.isNativePlatform();

/**
 * Speak Greek text using native TTS or Web Speech API
 */
export const speakGreek = async (text, options = {}) => {
  const rate = options.rate || 0.8;
  const pitch = options.pitch || 1.0;
  const volume = options.volume || 1.0;

  try {
    if (isNative) {
      // Use native TTS plugin on Android
      await TextToSpeech.speak({
        text: text,
        lang: 'el-GR', // Greek language
        rate: rate,
        pitch: pitch,
        volume: volume,
        category: 'ambient'
      });
    } else {
      // Use Web Speech API on web
      return new Promise((resolve, reject) => {
        if (!window.speechSynthesis) {
          reject(new Error('Speech synthesis not supported'));
          return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Try to find Greek voice
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

        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;

        utterance.onend = () => resolve();
        utterance.onerror = (event) => reject(event);

        window.speechSynthesis.speak(utterance);
      });
    }
  } catch (error) {
    console.error('Error speaking:', error);
    throw error;
  }
};

/**
 * Stop any ongoing speech
 */
export const stopSpeech = async () => {
  try {
    if (isNative) {
      await TextToSpeech.stop();
    } else if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  } catch (error) {
    console.error('Error stopping speech:', error);
  }
};

/**
 * Check if TTS is available
 */
export const isSpeechAvailable = async () => {
  try {
    if (isNative) {
      // Check if TTS is supported on the device
      const result = await TextToSpeech.getSupportedLanguages();
      return result && result.languages && result.languages.length > 0;
    } else {
      return typeof window !== 'undefined' && 
             window.speechSynthesis !== undefined;
    }
  } catch (error) {
    console.error('Error checking speech availability:', error);
    return false;
  }
};

/**
 * Get supported languages (mainly for native)
 */
export const getSupportedLanguages = async () => {
  try {
    if (isNative) {
      const result = await TextToSpeech.getSupportedLanguages();
      return result.languages || [];
    } else {
      // For web, return available voices
      const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
      return voices.map(voice => voice.lang);
    }
  } catch (error) {
    console.error('Error getting supported languages:', error);
    return [];
  }
};
