import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.learngreek.app',
  appName: 'Learn Greek',
  webDir: 'build',
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#667EEA'
    }
  }
};

export default config;
