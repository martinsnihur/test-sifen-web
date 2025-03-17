/**
 * Interface for environment configuration
 * This defines the structure for environment-specific settings
 */
export interface Environment {
  // Environment identification
  production: boolean;
  
  // Feature flags
  features: {
    enableDarkMode: boolean;
    enableNotifications: boolean;
    enableAnalytics: boolean;
    enableDebugTools: boolean;
    enableBetaFeatures: boolean;
    enableExperimentalFeatures: boolean;
  };
  
  // Debug settings
  debug: {
    enableLogging: boolean;
    logLevel: 'error' | 'debug' | 'info' | 'warn';
    enableHttpDebugging: boolean;
    enableReduxDevTools: boolean;
    verboseErrors: boolean;
  };
  
  // Service URLs and keys
  services: {
    sifen: {
      url: string;
      apiKey: string;
      timeout: number;
    };
    analytics: {
      trackingId: string;
      enabled: boolean;
    };
    storage: {
      url: string;
      bucketName: string;
    };
    notification: {
      url: string;
      publicKey: string;
    };
    authentication: string;
  };
}

