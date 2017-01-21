import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OverlayComponent }  from './overlay/overlay.component';
import { PlayerComponent }  from './player/player.component';
import { Updater } from './service/updater.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    OverlayComponent, 
    PlayerComponent 
  ],
  bootstrap:    [ OverlayComponent ],
  providers:    [ Updater ]
})
export class AppModule { }
