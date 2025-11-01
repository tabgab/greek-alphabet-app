# Greek Alphabet Learning App

An interactive web application for learning the Greek alphabet and essential Greek phrases.

## Features

### 📚 Greek Alphabet Learning
- **24 Greek Letters**: Learn all letters of the Greek alphabet
- **Uppercase & Lowercase**: Display and practice both forms of each letter
- **Interactive Learning**: Click on any letter to see detailed information
- **Audio Pronunciation**: Listen to native pronunciation using Web Speech API
- **Visual Aids**: Pictograms and memory helpers for each letter
- **Progress Tracking**: Track your learning progress for each letter
- **Gamification**: Unlock letters progressively as you learn

### 🗣️ Greek Phrases (100 Essential Phrases)
- **6 Categories**: Greetings, Dining, Directions, Shopping, Emergencies, Social
- **Progressive Learning**: Phrases unlock as you advance through difficulty levels
- **Audio Support**: Listen to native Greek pronunciation
- **Contextual Examples**: See how phrases are used in real situations
- **Interactive Practice**: 4 different exercise types to test your knowledge

### 🎯 Practice Modes

#### Alphabet Practice
- **Uppercase/Lowercase Recognition**: Test both letter forms
- **Sound Matching**: Match letters with their pronunciations
- **Name Recognition**: Identify letters by their Greek names

#### Phrase Practice
- **English to Greek**: Translate English phrases to Greek
- **Greek to English**: Understand Greek phrases in English
- **Pronunciation Matching**: Listen and identify correct pronunciations
- **Context Practice**: Choose appropriate phrases for different situations

### 📊 Progress Tracking
- Detailed statistics for alphabet learning
- Category-based phrase progress tracking
- Visual progress indicators
- Best scores and completion rates

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd greek-alphabet-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## Features in Detail

### Greek Alphabet Section
- Learn all 24 Greek letters (Α to Ω)
- See both uppercase and lowercase forms
- Hear correct pronunciation
- Learn Greek letter names
- Understand letter usage and examples
- Visual memory aids with pictograms

### Greek Phrases Section
- 100 carefully selected essential phrases
- Organized by practical categories:
  - 🙋 Greetings (15 phrases)
  - 🍽️ Dining (15 phrases)
  - 🗺️ Directions (15 phrases)
  - 🛍️ Shopping (15 phrases)
  - 🚨 Emergencies (15 phrases)
  - 👥 Social (25 phrases)
- 3 difficulty levels
- Native audio pronunciation
- Real-world usage examples

### Practice Exercises
Interactive quizzes to reinforce learning:
- Multiple choice questions
- Audio-based pronunciation tests
- Context-based phrase selection
- Immediate feedback with explanations
- Score tracking and progress monitoring

## Technology Stack

- **React 18**: Modern React with hooks
- **React Router**: Navigation between sections
- **Context API**: State management for progress tracking
- **Local Storage**: Persistent progress saving
- **Web Speech API**: Native Greek pronunciation
- **Responsive Design**: Works on desktop and mobile devices

## Browser Compatibility

- Chrome/Edge (recommended for best audio support)
- Firefox
- Safari
- Opera

**Note**: Audio pronunciation works best in Chrome/Edge with Greek language support.

## Deployment

### Docker Deployment

The app includes Docker configuration for easy deployment:

```bash
# Build the Docker image
docker build -t greek-alphabet-app .

# Run the container
docker run -p 80:80 greek-alphabet-app
```

### Manual Deployment

1. Build the production version:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Greek language content curated for practical learning
- Icons and visual aids designed for effective memorization
- Audio pronunciation powered by Web Speech API
- Built with Create React App

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy Learning! Καλή μάθηση! (Kalí máthisi!)**
