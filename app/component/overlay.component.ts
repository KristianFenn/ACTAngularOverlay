import { Component, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import Paths from '../path';

import ConfigService from '../service/config.service';
import Updater from '../service/updater.service';

import OverlayConfig from '../models/config.model';
import { ActUpdateEvent } from '../models/update.model';
import Encounter from '../models/encounter.model';
import PlayerTableField from '../models/player-table.model';
import AutoHideService from '../service/autohide.service';

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
  private autohideService: AutoHideService;
  encounter: Encounter;
  tableFields: Array<PlayerTableField>;
  showOptions: boolean;
  showOverlay: boolean;
  config: OverlayConfig;
  showTable: boolean;

  constructor(updater: Updater, configService: ConfigService, http: Http, autohideService: AutoHideService) {
    this.updater = updater;
    this.http = http;
    this.config = configService.getConfiguration();
    this.autohideService = autohideService;

    this.autohideService.onShouldShow.subscribe(() => this.showOverlay = true);
    this.autohideService.onShouldHide.subscribe(() => this.showOverlay = false);

    this.updater.subscribe((data) => {
      this.encounter = data;
      this.autohideService.resetAutohide();
    });

    this.showOptions = false;
    this.showOverlay = true;

    if (this.config.test) {
      this.loadTestData(this.config.test);
    }
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
    this.autohideService.resetAutohide();
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
