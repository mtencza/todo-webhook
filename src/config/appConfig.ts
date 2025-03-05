export interface AppConfig {
  reportInterval: 'minute' | 'hourly' | 'daily';
  maxRetention: number;
}

export const defaultConfig: AppConfig = {
  reportInterval: 'minute',
  maxRetention: 7 * 24 * 60 * 60 * 1000, // 7 days
};
