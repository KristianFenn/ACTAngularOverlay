import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OverlayComponent } from './component/overlay.component';
import { OverlayConfigComponent } from './component/overlay-config.component';
import { PlayerDetailComponent } from './component/player-detail.component';
import { IconComponent } from './component/icon.component';
import { Updater } from './service/updater.service';
import { ConfigService } from './service/config.service';
import { AutoHideService } from './service/autohide.service';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    HttpClientModule 
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
    ConfigService,
    AutoHideService
  ]
})
export default class AppModule { }
