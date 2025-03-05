import { createApp } from './app';
import { EventProcessor } from './services/eventProcessor';
import { defaultConfig } from './config/appConfig';
import { ReportGenerator } from './services/reportGenerator';

const eventProcessor = new EventProcessor();
const reportGenerator = new ReportGenerator(eventProcessor, defaultConfig);

console.log('Initializing App');
const app = createApp(eventProcessor, reportGenerator);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
