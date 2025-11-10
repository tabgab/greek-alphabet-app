import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

/**
 * Storage utility that works seamlessly on both web and Android
 * Uses Capacitor Preferences API on native platforms, localStorage on web
 */

const isNative = Capacitor.isNativePlatform();

export const storage = {
  async getItem(key) {
    if (isNative) {
      try {
        const { value } = await Preferences.get({ key });
        return value;
      } catch (error) {
        console.error('Error getting item from Preferences:', error);
        return null;
      }
    } else {
      return localStorage.getItem(key);
    }
  },

  async setItem(key, value) {
    if (isNative) {
      try {
        await Preferences.set({ key, value });
      } catch (error) {
        console.error('Error setting item in Preferences:', error);
      }
    } else {
      localStorage.setItem(key, value);
    }
  },

  async removeItem(key) {
    if (isNative) {
      try {
        await Preferences.remove({ key });
      } catch (error) {
        console.error('Error removing item from Preferences:', error);
      }
    } else {
      localStorage.removeItem(key);
    }
  },

  async clear() {
    if (isNative) {
      try {
        await Preferences.clear();
      } catch (error) {
        console.error('Error clearing Preferences:', error);
      }
    } else {
      localStorage.clear();
    }
  }
};
