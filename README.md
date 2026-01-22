<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1N_Jq9_b5AXd_Jtc_G4u5fw380CeNW9WO

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Create a `.env.local` file based on [.env.example](.env.example):
   - For **MANAGED** mode (development): Set `AI_MODE=MANAGED` and provide your `GEMINI_API_KEY`
   - For **BYOK** mode (production): Set `AI_MODE=BYOK` (or leave it unset) - users will provide their own keys
3. Run the app:
   `npm run dev`

See [ENV_CONFIG.md](ENV_CONFIG.md) for detailed configuration options.

