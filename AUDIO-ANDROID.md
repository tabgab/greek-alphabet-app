# Audio Functionality on Android - Known Issues & Solutions

## Current Status

The app has been built with native Text-to-Speech support using the `@capacitor-community/text-to-speech` plugin, but audio may not work immediately on all Android devices due to WebView limitations.

## Known Issues

### Web Speech API Limitations
- The standard Web Speech API does NOT work in Android WebView
- This is a known limitation of the Android WebView component
- Most hybrid apps face this issue

### TTS Plugin Limitations
- The Capacitor TTS plugin may require additional device configuration
- Some Android devices need TTS engines to be manually enabled
- First-time initialization may fail silently

## Solutions & Workarounds

### Option 1: Configure Device TTS (Recommended)

**Have the user configure their device:**

1. **Check TTS Engine:**
   - Go to: Settings → Language & Input → Text-to-Speech
   - Ensure "Google Text-to-Speech" or "Samsung TTS" is installed
   - Set it as the preferred engine

2. **Install Greek Language Pack:**
   - Open Google Text-to-Speech settings
   - Click "Install voice data"
   - Download "Greek" language pack
   - This provides native Greek pronunciation

3. **Test TTS:**
   - In TTS settings, there's usually a "Listen to an example" button
   - Test if TTS works at all on the device

### Option 2: Use Pre-recorded Audio Files

For guaranteed audio playback, replace TTS with pre-recorded audio:

**Implementation Steps:**

1. **Record Audio Files:**
   - Record native Greek speaker pronunciation
   - Save as `.mp3` or `.ogg` files
   - Organize by letter/phrase ID

2. **Add to Assets:**
   ```
   public/audio/
   ├── letters/
   │   ├── alpha.mp3
   │   ├── beta.mp3
   │   └── ...
   └── phrases/
       ├── hello.mp3
       ├── goodbye.mp3
       └── ...
   ```

3. **Update Audio Utility:**
   ```javascript
   export const playAudio = (audioFile) => {
     const audio = new Audio(`/audio/${audioFile}.mp3`);
     audio.play();
   };
   ```

### Option 3: Hybrid Approach

Combine both methods:
- Use TTS if available
- Fall back to pre-recorded audio if TTS fails

```javascript
export const speakGreek = async (text, audioFile) => {
  try {
    // Try TTS first
    await TextToSpeech.speak({ text, lang: 'el-GR' });
  } catch (error) {
    // Fallback to audio file
    const audio = new Audio(`/audio/${audioFile}.mp3`);
    await audio.play();
  }
};
```

### Option 4: Native Android Module

For full control, create a custom Capacitor plugin:

1. **Create Native Plugin:**
   - Implements Android's native TTS API directly
   - Better control over initialization and errors
   - Can request permissions explicitly

2. **Resources:**
   - Capacitor Plugin Development: https://capacitorjs.com/docs/plugins
   - Android TTS API: https://developer.android.com/reference/android/speech/tts/TextToSpeech

## Current Implementation

The app currently uses:
- **Web:** Web Speech API (works in Chrome/Edge)
- **Android:** `@capacitor-community/text-to-speech` plugin

### Code Structure

```javascript
// src/utils/audio.js
import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

export const speakGreek = async (text, options = {}) => {
  if (Capacitor.isNativePlatform()) {
    // Native TTS for Android
    await TextToSpeech.speak({
      text: text,
      lang: 'el-GR',
      rate: options.rate || 0.8
    });
  } else {
    // Web Speech API for browsers
    // ...existing implementation
  }
};
```

## Testing Audio

### On Device:
1. Check device volume (media volume, not ringtone)
2. Ensure device is not in silent/vibrate mode
3. Test with a simple phrase first
4. Check TTS settings on device

### Debug Steps:

1. **Check Logcat:**
   ```bash
   adb logcat | grep -i "tts\|textToSpeech"
   ```

2. **Test TTS Availability:**
   Add this to a component:
   ```javascript
   import { TextToSpeech } from '@capacitor-community/text-to-speech';
   
   const testTTS = async () => {
     try {
       const langs = await TextToSpeech.getSupportedLanguages();
       console.log('Supported languages:', langs);
       await TextToSpeech.speak({ text: 'test', lang: 'el-GR' });
     } catch (error) {
       console.error('TTS Error:', error);
     }
   };
   ```

## Recommendations

For **production deployment**, I recommend:

1. **Use Pre-recorded Audio:**
   - Most reliable solution
   - Consistent quality across devices
   - No device configuration required
   - Professional Greek pronunciation

2. **Add TTS as Enhancement:**
   - Keep TTS as a "bonus" feature
   - Fall back gracefully if unavailable
   - Show user-friendly message if TTS fails

3. **User Settings:**
   - Add option to enable/disable audio
   - Let users choose TTS vs pre-recorded
   - Provide audio troubleshooting tips

## Example: Pre-recorded Audio Implementation

```javascript
// src/utils/audio.js
const audioCache = {};

export const playPrerecordedAudio = async (audioId) => {
  try {
    // Check cache first
    if (!audioCache[audioId]) {
      audioCache[audioId] = new Audio(`/audio/${audioId}.mp3`);
    }
    
    const audio = audioCache[audioId];
    audio.currentTime = 0; // Reset to start
    await audio.play();
  } catch (error) {
    console.error('Audio playback error:', error);
  }
};

// Update components to use:
<button onClick={() => playPrerecordedAudio('alpha')}>
  🔊
</button>
```

## Resources

- **Free Greek TTS:** https://www.naturalreaders.com/online/ (for recording)
- **Audio Recording:** Audacity (free, cross-platform)
- **Capacitor Audio:** https://capacitorjs.com/docs/apis/audio
- **TTS Plugin Docs:** https://github.com/capacitor-community/text-to-speech

## Conclusion

The current implementation should work on devices with properly configured TTS, but pre-recorded audio is the most reliable solution for a production app.

To test if TTS is working:
1. Check device TTS settings
2. Ensure Greek language is available
3. Try speaking from another app to verify TTS works

If TTS doesn't work after proper device configuration, implementing pre-recorded audio is the recommended approach.
