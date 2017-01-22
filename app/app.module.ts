import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OverlayComponent }  from './overlay/overlay.component';
import { PlayerHeaderComponent }  from './player-header/player-header.component';
import { PlayerDetailComponent }  from './player-detail/player-detail.component';
import { ClassIconComponent }  from './class-icon/class-icon.component';
import { Updater } from './service/updater.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    OverlayComponent, 
    PlayerDetailComponent,
    PlayerHeaderComponent,
    ClassIconComponent
  ],
  bootstrap:    [ OverlayComponent ],
  providers:    [ Updater ]
})
export class AppModule { }
