import { Component, HostListener } from '@angular/core'
import { Updater } from '../service/updater.service'
import { Encounter } from '../models/encounter.model'
import { ActUpdateEvent } from '../models/update.model'
import { Player } from '../models/player.model'

@Component({
  selector: 'overlay',
  templateUrl: 'app/overlay/overlay.html',
  styleUrls: [ 'app/overlay/overlay.css' ]
})
export class OverlayComponent {
  encounter: Encounter;
  updater: Updater;
  firstPlayer: Player;

  constructor(updater: Updater) {
    this.updater = updater;
    this.updater.notifier.subscribe((data) => this.encounter = data );
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    this.updater.updateEncounter(event.detail);
  }
}