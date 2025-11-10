# Learn Greek - Android App Guide

This guide explains how to build and deploy the Learn Greek app as a native Android application using Capacitor.

## Overview

The AndroidAPP branch contains a Capacitor-wrapped version of the React web app that runs natively on Android devices with minimal code changes. The app maintains 95% code compatibility with the web version while providing native Android features and performance.

## Architecture

### Technology Stack
- **Capacitor 7.x** - Native bridge for Android
- **React 19** - UI framework (unchanged from web version)
- **Capacitor Preferences** - Native storage (replaces localStorage)
- **Web Speech API** - Audio pronunciation (works on Android Chrome WebView)

### Key Changes from Web Version
1. **Storage**: Uses Capacitor Preferences API instead of localStorage
2. **Mobile Optimization**: Viewport settings and safe area insets
3. **Build Process**: Additional steps to sync web assets to Android

## Prerequisites

### Required Software
1. **Node.js** (v14 or higher) - Already installed
2. **Android Studio** (Latest version)
   - Download from: https://developer.android.com/studio
   - Install Android SDK (API 33 or higher)
   - Install Android SDK Build-Tools
   - Install Android Emulator (optional, for testing)

3. **Java Development Kit (JDK)**
   - JDK 17 or higher required
   - Can be installed via Android Studio or separately

### Android Studio Setup

1. Install Android Studio
2. Open Android Studio and go to: **Tools → SDK Manager**
3. Install the following:
   - Android SDK Platform 33 (or higher)
   - Android SDK Build-Tools 33.x.x
   - Android SDK Platform-Tools
   - Android Emulator (if testing on emulator)
   - Google Play Services

4. Set up ANDROID_HOME environment variable:
   ```bash
   # Add to ~/.zshrc or ~/.bash_profile
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

5. Reload your shell:
   ```bash
   source ~/.zshrc  # or source ~/.bash_profile
   ```

## Development Workflow

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the React App

Every time you make changes to the React code, rebuild:

```bash
npm run build
```

### 3. Sync Changes to Android

After building, sync the web assets to Android:

```bash
npx cap sync android
```

This command:
- Copies the build folder to `android/app/src/main/assets/public`
- Updates Android plugins
- Syncs configuration changes

### 4. Open in Android Studio

```bash
npx cap open android
```

This opens the Android project in Android Studio.

### 5. Run the App

#### Option A: Using Android Studio
1. In Android Studio, select a device (physical or emulator)
2. Click the "Run" button (green triangle) or press Ctrl+R
3. App will build and launch on the selected device

#### Option B: Using Command Line (if adb is configured)
```bash
# Build debug APK
cd android
./gradlew assembleDebug

# Install on connected device
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

## Building for Release

### 1. Generate Keystore (First Time Only)

```bash
keytool -genkey -v -keystore learn-greek.keystore -alias learn-greek-key -keyalg RSA -keysize 2048 -validity 10000
```

Save this keystore file securely! You'll need it for all future updates.

### 2. Configure Signing

Create `android/keystore.properties`:

```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=learn-greek-key
storeFile=../learn-greek.keystore
```

⚠️ **Never commit this file to Git!** It's already in `.gitignore`.

### 3. Build Release APK

```bash
# Build the React app
npm run build

# Sync to Android
npx cap sync android

# Build release APK
cd android
./gradlew assembleRelease

# APK will be at: android/app/build/outputs/apk/release/app-release.apk
```

### 4. Build App Bundle (AAB) for Google Play

```bash
cd android
./gradlew bundleRelease

# AAB will be at: android/app/build/outputs/bundle/release/app-release.aab
```

## Testing

### Testing on Physical Device

1. Enable Developer Options on your Android device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"

2. Connect device via USB

3. Run from Android Studio or:
   ```bash
   npx cap run android
   ```

### Testing on Emulator

1. Open Android Studio → Tools → AVD Manager
2. Create a new Virtual Device (e.g., Pixel 6 with API 33)
3. Launch the emulator
4. Run the app from Android Studio

## App Configuration

### Update App Information

Edit `capacitor.config.ts`:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.learngreek.app',  // Change if needed
  appName: 'Learn Greek',        // App display name
  webDir: 'build'
};

export default config;
```

### Update Android Manifest

Edit `android/app/src/main/AndroidManifest.xml` to configure permissions, app name, etc.

### Update App Icon

Replace icons in:
- `android/app/src/main/res/mipmap-*/ic_launcher.png`
- Use Android Studio's Image Asset Studio for best results

## NPM Scripts

Add these to `package.json` for convenience:

```json
{
  "scripts": {
    "android:build": "npm run build && npx cap sync android",
    "android:open": "npx cap open android",
    "android:run": "npm run android:build && npx cap run android",
    "android:release": "cd android && ./gradlew assembleRelease"
  }
}
```

Then you can use:
```bash
npm run android:build  # Build and sync
npm run android:open   # Open in Android Studio
npm run android:run    # Build and run on device
```

## Troubleshooting

### Build Errors

**Problem**: Gradle sync failed
**Solution**: 
- Check that Android SDK is properly installed
- Verify ANDROID_HOME is set correctly
- Try: `cd android && ./gradlew clean`

**Problem**: Module not found errors
**Solution**: 
- Run `npm install` again
- Delete `node_modules` and reinstall

### Runtime Issues

**Problem**: White screen on app launch
**Solution**:
- Make sure you ran `npm run build` before `npx cap sync`
- Check browser console in Android Studio (View → Tool Windows → Logcat)

**Problem**: Storage not persisting
**Solution**:
- Check that `storage.js` is properly imported
- Verify Capacitor Preferences plugin is installed

**Problem**: Audio not working
**Solution**:
- Web Speech API may not work on all devices
- Consider adding fallback TTS service
- Test on physical device, not just emulator

### Android Studio Issues

**Problem**: Cannot find Android Studio
**Solution**: Specify path in `capacitor.config.ts`:
```typescript
const config: CapacitorConfig = {
  // ...
  android: {
    path: '/path/to/android/studio'
  }
};
```

## File Structure

```
greek-alphabet-app/
├── android/                 # Native Android project
│   ├── app/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── assets/
│   │   │       │   └── public/    # Your React build (auto-generated)
│   │   │       ├── AndroidManifest.xml
│   │   │       └── res/           # Android resources (icons, etc.)
│   │   └── build.gradle
│   └── build.gradle
├── src/                     # React source code
│   ├── utils/
│   │   └── storage.js       # Cross-platform storage utility
│   └── ...
├── public/
│   └── index.html           # Mobile-optimized HTML
├── capacitor.config.ts      # Capacitor configuration
└── package.json
```

## Publishing to Google Play Store

### 1. Create Google Play Developer Account
- Cost: $25 one-time fee
- Register at: https://play.google.com/console

### 2. Prepare Store Listing
- App screenshots (at least 2)
- Feature graphic (1024x500)
- App icon (512x512)
- Short description (80 chars)
- Full description (4000 chars max)
- Privacy policy URL

### 3. Build Release AAB
```bash
npm run build
npx cap sync android
cd android
./gradlew bundleRelease
```

### 4. Upload to Play Console
1. Create new app in Play Console
2. Fill in store listing details
3. Upload AAB file
4. Complete content rating questionnaire
5. Set pricing (free or paid)
6. Select countries
7. Submit for review

### 5. Updates
For future updates:
1. Update version in `android/app/build.gradle`:
   ```gradle
   versionCode 2  // Increment
   versionName "1.1"  // Increment
   ```
2. Build new AAB
3. Upload to Play Console
4. Submit update

## Performance Optimization

### Image Optimization
- Use WebP format for images
- Implement lazy loading
- Compress assets before building

### Code Splitting
React automatically code-splits with dynamic imports:
```javascript
const Component = React.lazy(() => import('./Component'));
```

### Caching
Capacitor automatically caches web assets for offline use.

## Security Considerations

1. **Never commit**: 
   - Keystore files
   - keystore.properties
   - API keys or secrets

2. **Use environment variables** for sensitive data

3. **Enable ProGuard** for release builds (code obfuscation):
   Edit `android/app/build.gradle`:
   ```gradle
   buildTypes {
       release {
           minifyEnabled true
           proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
       }
   }
   ```

## Resources

- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Developer Guide**: https://developer.android.com/guide
- **React Native alternative**: If you need more native features, consider React Native

## Support

For issues specific to the Android build:
1. Check Android Studio Logcat for errors
2. Verify all prerequisites are installed
3. Try cleaning: `cd android && ./gradlew clean`
4. Check Capacitor docs for plugin-specific issues

## Differences from Web Version

| Feature | Web | Android |
|---------|-----|---------|
| Storage | localStorage | Capacitor Preferences |
| Audio | Web Speech API | Web Speech API (Chrome WebView) |
| Installation | Browser | APK/Play Store |
| Updates | Instant | App update required |
| Offline | Service Worker | Native caching |
| Performance | Browser-dependent | Consistent native performance |

## Next Steps

1. Test thoroughly on multiple Android devices
2. Optimize app size and performance
3. Add native features if needed (push notifications, etc.)
4. Publish to Google Play Store
5. Monitor crash reports and user feedback

---

**Happy Android Development!** 🚀
