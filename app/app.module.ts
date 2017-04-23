import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import OverlayComponent from './overlay/overlay.component';
import OverlayHeaderComponent from './overlay-header/overlay-header'
import PlayerHeaderComponent from './player-header/player-header.component';
import PlayerDetailComponent from './player-detail/player-detail.component';
import IconComponent from './icon/icon.component';
import Updater from './service/updater.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
    OverlayComponent, 
    PlayerDetailComponent,
    PlayerHeaderComponent,
    IconComponent,
    OverlayHeaderComponent
  ],
  bootstrap:    [ OverlayComponent ],
  providers:    [ Updater ]
})
export default class AppModule { }
