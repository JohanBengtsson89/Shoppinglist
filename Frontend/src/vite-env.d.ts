/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_AWS_PROJECT_REGION: string;
  VITE_AWS_COGNITO_REGION: string;
  VITE_AWS_USER_POOL_ID: string;
  VITE_AWS_USER_POOL_WEB_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
