import { Component, HostListener } from '@angular/core'
import { Updater } from '../service/updater.service'
import { Encounter } from '../models/encounter.model'
import { ActUpdateEvent } from '../models/update.model'
import { Player } from '../models/player.model'
import { PlayerTableField } from '../models/player-table.model'
import { Configuration } from '../config'

@Component({
  selector: 'overlay',
  templateUrl: Configuration.GetThemePath('overlay.html'),
  styleUrls: [ 
    Configuration.GetSharedPath('common.css'),
    Configuration.GetSharedPath('overlay.css'),
    Configuration.GetThemePath('overlay.css')
  ]
})
export class OverlayComponent {
  encounter: Encounter;
  updater: Updater;
  tableFields: Array<PlayerTableField>;

  constructor(updater: Updater) {
    this.updater = updater;
    this.updater.subscribe((data) => this.encounter = data );

    this.tableFields = [
      new PlayerTableField(10, "class", "Class"),
      new PlayerTableField(30, "name", "Player", (value) => value.isMainPlayer() ? "main-player" : ""),
      new PlayerTableField(10, "dps", "DPS", (value) => value.isMainPlayer() ? "main-player" : ""),
      new PlayerTableField(40, "maxhit", "Highest Hit"),
      new PlayerTableField(10, "critPercent", "Crit%"),
      new PlayerTableField(10, "misses", "Miss", (value) => value.misses > 0 ? "text-red" : "" ),
      new PlayerTableField(10, "deaths", "Death", (value) => value.deaths > 0 ? "text-red" : "" )
    ];
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    this.updater.updateEncounter(event.detail);
  }
}
