import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as ng from '@angular/core'
import AppModule from './app.module';

ng.enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);