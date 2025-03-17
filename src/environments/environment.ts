import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  features: {
    enableDarkMode: true,
    enableNotifications: true,
    enableAnalytics: false,
    enableDebugTools: true,
    enableBetaFeatures: true,
    enableExperimentalFeatures: true
  },
  debug: {
    enableLogging: true,
    logLevel: 'debug',
    enableHttpDebugging: true,
    enableReduxDevTools: true,
    verboseErrors: true
  },
  services: {
    sifen: {
      url: 'http://localhost:3000/api/v1',
      apiKey: 'YOUR_DEV_API_KEY',
      timeout: 5000
    },
    analytics: {
      trackingId: 'UA-DEV-ID',
      enabled: false
    },
    storage: {
      url: 'http://localhost:3001',
      bucketName: 'sifen-dev'
    },
    notification: {
      url: 'http://localhost:3002',
      publicKey: 'YOUR_DEV_PUBLIC_KEY'
    },
    authentication: 'http://localhost:3003'
  }
};

