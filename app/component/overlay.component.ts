import { Component, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import Paths from '../path';

import ConfigService from '../service/config.service';
import Updater from '../service/updater.service';

import OverlayConfig from '../models/config.model';
import { ActUpdateEvent, ActUpdate } from '../models/update.model';
import Encounter from '../models/encounter.model';
import PlayerTableField from '../models/player-table.model';

@Component({
  selector: 'overlay',
  templateUrl: Paths.GetHtml('overlay'),
  styleUrls: [
    Paths.GetCss('common'),
    Paths.GetCss('overlay')
  ]
})
export default class OverlayComponent {
  private updater: Updater;
  private http: Http;
  encounter: Encounter;
  tableFields: Array<PlayerTableField>;
  showOptions: boolean;
  showOverlay: boolean;
  config: OverlayConfig;
  showTable: boolean;

  constructor(updater: Updater, configService: ConfigService, http: Http) {
    this.updater = updater;
    this.http = http;

    this.updater.subscribe((data) => this.encounter = data);

    this.showOptions = false;
    this.showOverlay = true;
    this.config = configService.getConfiguration();

    if (this.config.test) {
      this.loadTestData(this.config.test);
    }
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
    this.http.get(`/app/test/${dataSet}.json`).subscribe(data => {
      this.updater.updateEncounter(data.json());
    });
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    this.updater.updateEncounter(event.detail);
  }
}
