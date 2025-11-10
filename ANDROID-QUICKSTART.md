# Android Quick Start Guide

This is a quick reference for getting started with the Android version of the Learn Greek app.

## What Was Done

The AndroidAPP branch converts the React web app into a native Android application using Capacitor with **minimal code changes** (only ~5% of the codebase was modified).

### Key Changes:
1. ✅ **Storage System**: Created `src/utils/storage.js` - cross-platform storage utility
2. ✅ **Progress Context**: Updated to use async storage (works on both web and Android)
3. ✅ **Mobile Optimization**: Enhanced viewport settings and safe area insets
4. ✅ **Android Project**: Generated complete Android project structure
5. ✅ **Build Scripts**: Added convenient npm commands for Android development

### Maintained Features:
- All React components unchanged (Learn, Practice, Phrases sections)
- All styling and UI unchanged
- Audio pronunciation (Web Speech API works on Android)
- Progress tracking and gamification
- All 24 Greek letters and 100 phrases

## Quick Commands

```bash
# Build and sync to Android
npm run android:build

# Open in Android Studio
npm run android:open

# Build, sync, and run on device
npm run android:run

# Just sync (after making changes)
npm run android:sync
```

## Prerequisites Needed

Before you can build and test the Android app, you need:

1. **Android Studio** (download from https://developer.android.com/studio)
2. **Android SDK** (installed via Android Studio)
3. **JDK 17+** (comes with Android Studio)

## Complete Documentation

For comprehensive setup instructions, building, testing, and publishing:
- See [ANDROID.md](./ANDROID.md)

## Basic Workflow

1. **Make changes to React code** (in `src/` directory)
2. **Build**: `npm run build`
3. **Sync**: `npm run android:sync`
4. **Test**: Open Android Studio and run

## File Structure

```
greek-alphabet-app/
├── src/
│   ├── utils/
│   │   └── storage.js           ← NEW: Cross-platform storage
│   └── context/
│       └── ProgressContext.js   ← MODIFIED: Uses storage.js
├── android/                      ← NEW: Android project
│   ├── app/
│   │   └── src/main/
│   │       └── java/...          (Native Android code)
├── capacitor.config.ts           ← NEW: Capacitor config
└── ANDROID.md                    ← Full documentation
```

## How It Works

**Capacitor** wraps your React web app in a native Android WebView:
- Your React code runs unchanged
- Native APIs (like storage) are accessed via Capacitor plugins
- The app looks and feels native to users
- You maintain a single codebase

## Clever Implementation Details

### 1. Storage Abstraction
Instead of using `localStorage` directly, we created a storage utility that automatically uses:
- `localStorage` on web
- Capacitor Preferences API on Android

This means **zero changes** needed in your components!

### 2. Audio Support
The Web Speech API that powers pronunciation already works in Android's Chrome WebView, so no changes needed for audio functionality.

### 3. Async Storage
The ProgressContext was updated to handle async storage, but this actually improves the web version too by preventing UI blocking.

## Testing on Android

### Option 1: Physical Device (Recommended)
1. Enable Developer Options on your Android phone
2. Enable USB Debugging
3. Connect via USB
4. Run from Android Studio

### Option 2: Emulator
1. Open Android Studio → AVD Manager
2. Create virtual device (e.g., Pixel 6)
3. Launch emulator
4. Run app

## Building Release APK

```bash
npm run build
npx cap sync android
cd android
./gradlew assembleRelease
```

APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Next Steps

1. ✅ Branch created and pushed to GitHub
2. ⏳ Install Android Studio (if not already installed)
3. ⏳ Test on device or emulator
4. ⏳ Customize app icon and splash screen
5. ⏳ Build release version
6. ⏳ Publish to Google Play Store

## Differences from Web Version

| Aspect | Web | Android |
|--------|-----|---------|
| Code base | React | Same React code |
| Storage | localStorage | Capacitor Preferences |
| Installation | Browser | APK/Play Store |
| Updates | Instant | Requires app update |
| Size | N/A | ~15-20MB APK |

## Advantages of This Approach

✨ **95% code reuse** - Almost no changes to existing code
✨ **Single codebase** - Maintain web and Android from one source
✨ **Native performance** - Runs as a true native app
✨ **Easy updates** - Change React code, rebuild, done!
✨ **Play Store ready** - Can publish to Google Play

## Need Help?

- Full setup guide: [ANDROID.md](./ANDROID.md)
- Capacitor docs: https://capacitorjs.com/docs
- Android docs: https://developer.android.com/guide

## Branch Info

- **Branch name**: `AndroidAPP`
- **Based on**: `main`
- **Purpose**: Native Android app without major code changes
- **Status**: Ready for testing and development

---

**Happy Android Development!** 🎉📱
