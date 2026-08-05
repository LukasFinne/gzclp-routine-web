/// <reference types="node" />
// Vitest setup file: runs before tests are executed.
// Provides dummy Firebase environment variables if not present in the environment (e.g. in CI environments without a .env file).

const defaultEnv: Record<string, string> = {
  VITE_FIREBASE_API_KEY: "AIzaSyDummyKeyForTestingOnly123456",
  VITE_FIREBASE_AUTH_DOMAIN: "demo-app.firebaseapp.com",
  VITE_FIREBASE_DATABASE_URL: "https://demo-app.firebaseio.com",
  VITE_FIREBASE_PROJECT_ID: "demo-app",
  VITE_FIREBASE_STORAGE_BUCKET: "demo-app.appspot.com",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "1234567890",
  VITE_FIREBASE_APP_ID: "1:1234567890:web:1234567890",
};

for (const [key, value] of Object.entries(defaultEnv)) {
  process.env[key] ??= value;
}
