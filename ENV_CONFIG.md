# Environment Configuration

## AI Mode Configuration

Sistemas supports two modes for API key management:

### MANAGED Mode (Development/Internal Use)

For managed development where you control the API key, create a `.env.local` file in the `sistemas` directory:

```env
AI_MODE=MANAGED
GEMINI_API_KEY=your_api_key_here
```

With `AI_MODE=MANAGED`, the application will use the API key from the environment variable directly. Users won't be prompted to enter their own key.

### BYOK Mode (Bring Your Own Key - Production)

For production deployments where users provide their own API keys:

```env
AI_MODE=BYOK
```

When `AI_MODE=BYOK` (or not set, as BYOK is the default), users will be prompted to enter their own Gemini API key through a modal dialog when they start an interview session. The API key is stored securely in the browser's localStorage and is never sent to any server.

## Getting a Gemini API Key

Users can get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

## Security Notes

- Never commit your `.env.local` file to version control (it's already in `.gitignore`)
- In BYOK mode, API keys are stored only in the user's browser localStorage
- No API keys are sent to or stored on any backend server
- Default mode is BYOK if `AI_MODE` is not specified
