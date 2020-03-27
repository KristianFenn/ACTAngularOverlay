import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import OverlayComponent from './overlay.component';
import OverlayOptionsComponent from './overlay-options.component';
import PlayerHeaderComponent from './player-header.component';
import PlayerDetailComponent from './player-detail.component';
import IconComponent from './icon.component';
import Updater from './updater.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ 
    OverlayComponent, 
    PlayerDetailComponent,
    PlayerHeaderComponent,
    IconComponent,
    OverlayOptionsComponent
  ],
  bootstrap:    [ OverlayComponent ],
  providers:    [ Updater ]
})
export default class AppModule { }
