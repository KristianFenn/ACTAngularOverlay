import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OverlayComponent } from './component/overlay.component';
import { OverlayConfigComponent } from './component/overlay-config.component';
import { PlayerDetailComponent } from './component/player-detail.component';
import { IconComponent } from './component/icon.component';
import { IUpdater, Updater } from './service/updater.service';
import { IConfigService, ConfigService } from './service/config.service';
import { IAutoHideService, AutoHideService } from './service/autohide.service';
import { PlayerDetailBarsComponent } from './component/layouts/player-detail-bars.component';
import { PlayerDetailTableComponent } from './component/layouts/player-detail-table.component';
import { PlayerDetailPillsComponent } from './component/layouts/player-detail-pills.component';

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
    OverlayConfigComponent,
    PlayerDetailBarsComponent,
    PlayerDetailTableComponent,
    PlayerDetailPillsComponent
  ],
  bootstrap:    [ 
    OverlayComponent 
  ],
  providers:    [ 
    { provide: IUpdater, useClass: Updater },
    { provide: IConfigService, useClass: ConfigService },
    { provide: IAutoHideService, useClass: AutoHideService }
  ]
})
export default class AppModule { }
