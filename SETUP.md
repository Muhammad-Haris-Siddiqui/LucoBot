# LucoBot Frontend Setup Guide

## Overview
This is the frontend application for the LucoBot receptionist robot. It provides the robot's interface, camera integration, and user interaction capabilities.

## Prerequisites
- Node.js 18 or higher
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Backend robot server running (see backend documentation)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install iOS dependencies (macOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

## Configuration

### 1. Update Backend IP Address
Edit `config/apiConfig.js` and update the `BASE_URL` to match your backend server's IP address:

```javascript
BASE_URL: 'http://YOUR_BACKEND_IP:8000',
```

### 2. Android Permissions
The app requires the following permissions:
- Camera access
- Microphone access
- Internet access

These are automatically requested by the app.

## Running the App

### Android
```bash
npm run android
```

### iOS (macOS only)
```bash
npm run ios
```

## Features Implemented

### ✅ Completed
- [x] Robot face with animated expressions
- [x] Camera integration for continuous frame capture
- [x] API service layer for backend communication
- [x] Dynamic UI based on robot responses
- [x] Text input and button interactions
- [x] Speech-to-Text integration
- [x] Error handling and loading states
- [x] Landscape orientation lock
- [x] Immersive mode for full-screen experience

### 🔄 In Progress
- [ ] Testing with actual backend
- [ ] Performance optimization
- [ ] Error recovery mechanisms

### 📋 Next Steps
1. **Test with Backend**: Connect to your robot backend server
2. **Configure IP**: Update the IP address in `config/apiConfig.js`
3. **Test Camera**: Ensure camera permissions work correctly
4. **Test Speech**: Verify speech-to-text functionality
5. **Test Interactions**: Verify all UI interactions work properly

## Troubleshooting

### Camera Issues
- Ensure camera permissions are granted
- Check if camera is being used by another app
- Restart the app if camera doesn't initialize

### Network Issues
- Verify backend server is running
- Check IP address in `config/apiConfig.js`
- Ensure device and backend are on same network

### Speech Recognition Issues
- Ensure microphone permissions are granted
- Check if speech recognition is available on device
- Try restarting the app

## Development Notes

### Project Structure
```
├── components/
│   ├── RoboFace.js          # Animated robot face
│   ├── CameraComponent.js    # Camera integration
│   ├── RobotInterface.js     # User interaction UI
│   └── SpeechToText.js      # Voice input
├── services/
│   └── apiService.js        # Backend API communication
├── config/
│   └── apiConfig.js         # API configuration
└── screens/
    └── HomeScreen.js        # Main screen
```

### Key Dependencies
- `react-native-camera`: Camera functionality
- `@react-native-voice/voice`: Speech recognition
- `react-native-svg`: Robot face graphics
- `react-native-orientation-locker`: Landscape lock
- `react-native-immersive`: Full-screen mode

## API Endpoints Used
- `GET /`: Check robot status
- `POST /process_frame`: Send camera frames
- `POST /submit_input`: Send user input
- `GET /status`: Get current robot status
- `POST /official_response`: Simulate official response

## Robot States Supported
- `IDLE`: Robot waiting
- `CONFIRMING_IDENTITY`: Checking visitor identity
- `ENROLL_NAME`: Learning new visitor name
- `WAITING_FOR_OFFICIAL`: Waiting for official response
- `SPEAKING`: Robot speaking
- `LISTENING`: Robot listening
- `SURPRISED`: Surprised expression
- `HAPPY`: Happy expression

## Contributing
1. Follow the existing code style
2. Test changes thoroughly
3. Update documentation as needed
4. Ensure all features work on both Android and iOS 