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
  styleUrls: [ Configuration.GetThemePath('overlay.css') ]
})
export class OverlayComponent {
  encounter: Encounter;
  updater: Updater;
  tableFields: Array<PlayerTableField>;

  constructor(updater: Updater) {
    this.updater = updater;
    this.updater.notifier.subscribe((data) => this.encounter = data );

    this.tableFields = [
      new PlayerTableField(5, "class", "Class"),
      new PlayerTableField(30, "name", "Player", (value) => value === "YOU" ? "main-player" : ""),
      new PlayerTableField(10, "dps", "DPS"),
      new PlayerTableField(30, "maxhit", "Highest Hit"),
      new PlayerTableField(5, "critPercent", "Crit%"),
      new PlayerTableField(5, "misses", "Miss", (value) => value > 0 ? "redtext" : "" ),
      new PlayerTableField(5, "deaths", "Death", (value) => value > 0 ? "redtext" : "" )
    ];
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    this.updater.updateEncounter(event.detail);
  }
}
