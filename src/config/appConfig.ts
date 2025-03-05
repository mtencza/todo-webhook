export interface AppConfig {
  reportInterval: 'minute' | 'hourly' | 'daily';
  maxRetention: number;
}

export const defaultConfig: AppConfig = {
  reportInterval: 'minute',
  maxRetention: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export function getScheduleFromInterval(
  reportInterval: 'minute' | 'hourly' | 'daily'
) {
  switch (reportInterval) {
    case 'minute':
      return '*/1 * * * *'; // Every minute
    case 'hourly':
      return '0 * * * *'; // every hour
    case 'daily':
      return '0 0 * * *'; // Midnight every day
    default:
      console.warn(`Invalid interval: ${reportInterval}. Default to hourly.`);
      return '0 * * * *';
  }
}
