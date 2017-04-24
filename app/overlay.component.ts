import { Component, HostListener, ViewChild, AfterViewInit  } from '@angular/core'
import { ActUpdateEvent } from './models/update.model'
import Updater from './updater.service'
import EventDispatcher from './event.dispatcher'
import Encounter from './models/encounter.model'
import Player from './models/player.model'
import PlayerTableField from './models/player-table.model'
import Configuration from './config'

@Component({
  selector: 'overlay',
  templateUrl: Configuration.GetSharedPath('overlay.html'),
  styleUrls: [ 
    Configuration.GetSharedPath('common.css'),
    Configuration.GetSharedPath('overlay.css')
  ]
})
export default class OverlayComponent {
  encounter: Encounter;
  updater: Updater;
  tableFields: Array<PlayerTableField>;
  showOptions: boolean;

  private mainPlayerFn = (p: Player) => p.isMainPlayer() ? 'main-player' : '';
  private redTextFn = (v: number) => v > 0 ? 'text-red' : '';

  constructor(updater: Updater) {
    this.updater = updater;
    this.updater.subscribe((data) => this.encounter = data );

    this.tableFields = [
      new PlayerTableField(10, (p) => p.rank,         "Rank", this.mainPlayerFn),
      new PlayerTableField(10, (p) => p.class,        "Class",  null, true),
      new PlayerTableField(30, (p) => p.name,         "Player", this.mainPlayerFn),
      new PlayerTableField(10, (p) => p.dps,          "DPS",   this.mainPlayerFn),
      new PlayerTableField(40, (p) => p.maxhit,       "Highest Hit"),
      new PlayerTableField(10, (p) => p.critPercent,  "Crit%"),
      new PlayerTableField(10, (p) => p.misses,       "Miss",   (p) => this.redTextFn(p.misses) ),
      new PlayerTableField(10, (p) => p.deaths,       "Death",  (p) => this.redTextFn(p.deaths) )
    ];

    this.showOptions = false;
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    this.updater.updateEncounter(event.detail);
  }

  optionsClicked() {
    this.showOptions = !this.showOptions;
  }
}