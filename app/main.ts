import Configuration from './config'

Configuration.SetOptions(location.search);

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import AppModule from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);