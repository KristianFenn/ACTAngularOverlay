import { Component, HostListener } from '@angular/core'
import { ActUpdateEvent } from '../models/update.model'
import Updater from '../service/updater.service'
import Encounter from '../models/encounter.model'
import Player from '../models/player.model'
import PlayerTableField from '../models/player-table.model'
import Configuration from '../config'

@Component({
  selector: 'overlay',
  templateUrl: Configuration.GetThemePath('overlay.html'),
  styleUrls: [ 
    Configuration.GetSharedPath('common.css'),
    Configuration.GetSharedPath('overlay.css'),
    Configuration.GetThemePath('overlay.css')
  ]
})
export default class OverlayComponent {
  encounter: Encounter;
  updater: Updater;
  tableFields: Array<PlayerTableField>;

  constructor(updater: Updater) {
    this.updater = updater;
    this.updater.subscribe((data) => this.encounter = data );

    this.tableFields = [
      new PlayerTableField(10, (p) => p.rank,         "Rank"),
      new PlayerTableField(10, (p) => p.class,        "Class",  null, true),
      new PlayerTableField(30, (p) => p.name,         "Player", (p) => p.isMainPlayer() ? "main-player" : ""),
      new PlayerTableField(10, (p) => p.dps,          "DPS",    (p) => p.isMainPlayer() ? "main-player" : ""),
      new PlayerTableField(40, (p) => p.maxhit,       "Highest Hit"),
      new PlayerTableField(10, (p) => p.critPercent,  "Crit%"),
      new PlayerTableField(10, (p) => p.misses,       "Miss",   (p) => p.misses > 0 ? "text-red" : "" ),
      new PlayerTableField(10, (p) => p.deaths,       "Death",  (p) => p.deaths > 0 ? "text-red" : "" )
    ];
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    this.updater.updateEncounter(event.detail);
  }
}
