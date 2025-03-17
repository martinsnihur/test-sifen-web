import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  features: {
    enableDarkMode: true,
    enableNotifications: true,
    enableAnalytics: true,
    enableDebugTools: false,
    enableBetaFeatures: false,
    enableExperimentalFeatures: false
  },
  debug: {
    enableLogging: false,
    logLevel: 'error',
    enableHttpDebugging: false,
    enableReduxDevTools: false,
    verboseErrors: false
  },
  services: {
    sifen: {
      url: 'https://api.sifen-production.com/v1',
      apiKey: 'YOUR_PROD_API_KEY',
      timeout: 30000
    },
    analytics: {
      trackingId: 'UA-PROD-ID',
      enabled: true
    },
    storage: {
      url: 'https://storage.sifen-production.com',
      bucketName: 'sifen-prod'
    },
    notification: {
      url: 'https://notify.sifen-production.com',
      publicKey: 'YOUR_PROD_PUBLIC_KEY'
    },
    authentication: 'https://auth.sifen-production.com'
  }
};

