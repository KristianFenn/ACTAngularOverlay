import { Component, HostListener } from '@angular/core'
import { Updater } from '../service/updater.service'
import { Encounter } from '../models/encounter.model'
import { ActUpdateEvent } from '../models/update.model'
import { Player } from '../models/player.model'
import { PlayerTableField } from '../models/player-table.model'

@Component({
  selector: 'overlay',
  templateUrl: 'app/overlay/overlay.html',
  styleUrls: [ 'app/overlay/overlay.css' ]
})
export class OverlayComponent {
  encounter: Encounter;
  updater: Updater;
  tableFields: Array<PlayerTableField>;

  constructor(updater: Updater) {
    this.updater = updater;
    this.updater.notifier.subscribe((data) => this.encounter = data );

    this.tableFields = [
      new PlayerTableField(10, "class", "Class"),
      new PlayerTableField(30, "name", "Player"),
      new PlayerTableField(10, "dps", "DPS")
    ]
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    this.updater.updateEncounter(event.detail);
  }
}