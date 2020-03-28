import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import OverlayComponent from './component/overlay.component';
import OverlayConfigComponent from './component/overlay-config.component';
import PlayerDetailComponent from './component/player-detail.component';
import IconComponent from './component/icon.component';
import Updater from './service/updater.service';
import ConfigService from './service/config.service';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    HttpModule 
  ],
  declarations: [ 
    OverlayComponent, 
    PlayerDetailComponent,
    IconComponent,
    OverlayConfigComponent
  ],
  bootstrap:    [ 
    OverlayComponent 
  ],
  providers:    [ 
    Updater,
    ConfigService 
  ]
})
export default class AppModule { }
