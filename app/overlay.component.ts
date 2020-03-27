import { Component, HostListener, ViewChild, AfterViewInit  } from '@angular/core';
import { Http } from '@angular/http';
import { ActUpdateEvent, ActUpdate } from './models/update.model';
import Updater from './updater.service';
import EventDispatcher from './event.dispatcher';
import Encounter from './models/encounter.model';
import Player from './models/player.model';
import PlayerTableField from './models/player-table.model';
import Configuration from './config';

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
  http: Http;
  updater: Updater;
  tableFields: Array<PlayerTableField>;
  showOptions: boolean;
  showOverlay: boolean;
  config: Configuration;

  private mainPlayerFn = (p: Player) => p.isMainPlayer() ? 'main-player' : '';
  private redTextFn = (v: number) => v > 0 ? 'text-red' : '';

  constructor(updater: Updater, http: Http) {
    this.updater = updater;
    this.http = http;
    this.updater.subscribe((data) => this.encounter = data );

    this.tableFields = [
      new PlayerTableField(10, (p) => p.rank,         "Rank", this.mainPlayerFn),
      new PlayerTableField(10, (p) => p.class,        "Class",  null, true),
      new PlayerTableField(30, (p) => p.name,         "Player", this.mainPlayerFn),
      new PlayerTableField(10, (p) => p.dps,          "DPS",   this.mainPlayerFn),
      new PlayerTableField(40, (p) => p.maxhit,       "Highest Hit"),
      new PlayerTableField(10, (p) => p.deaths,       "Death",  (p) => this.redTextFn(p.deaths) )
    ];

    this.showOptions = false; 
    this.showOverlay = true;
    this.config = Configuration;
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    this.updater.updateEncounter(event.detail);
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  toggleHide() {
    this.showOverlay = !this.showOverlay;
  }

  loadAlliance() {
    this.loadTestData('alliance');
  }

  loadParty() {
    this.loadTestData('party');
  }

  private loadTestData(dataSet: string) {
    this.http.get(`/app/testdata/${dataSet}.json`).subscribe(data => {
      this.updater.updateEncounter(data.json());
    });
  }
}
