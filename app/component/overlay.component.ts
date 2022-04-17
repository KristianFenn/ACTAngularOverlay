import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Paths from '../path';

import ConfigService from '../service/config.service';
import Updater from '../service/updater.service';

import { ActUpdateEvent, ActUpdate } from '../models/update.model';
import Encounter from '../models/encounter.model';
import PlayerTableField from '../models/player-table.model';
import AutoHideService from '../service/autohide.service';
import { Observable } from 'rxjs';

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
  private httpClient: HttpClient;
  private autohideService: AutoHideService;
  encounter: Encounter;
  tableFields: Array<PlayerTableField>;
  showOptions: boolean;
  showOverlay: boolean;
  showTable: boolean;
  fontSize: number;
  testMode: boolean;
  version: Observable<Response>;

  constructor(updater: Updater, configService: ConfigService, httpClient: HttpClient, autohideService: AutoHideService) {
    this.updater = updater;
    this.httpClient = httpClient;
    this.autohideService = autohideService;

    this.autohideService.onShouldShowChanged.subscribe(
      shouldShow => this.showOverlay = shouldShow);
      
    this.updater.subscribe((data) => {
      this.encounter = data;
      this.autohideService.resetAutohideTimer();
    });
    
    configService.onConfigChanged.subscribe(config => this.fontSize = config.fontSize);

    this.showOptions = false;
    this.showOverlay = true;
    this.testMode = false;

    let config = configService.getConfiguration();
    this.fontSize = config.fontSize

    if (config.test) {
      this.testMode = true;
      this.loadTestData(config.test);
    }

  }

  toggleOptions() {
    this.showOptions = !this.showOptions;

    if (this.showOptions) {
      this.autohideService.pauseAutohide();
    } else {
      this.autohideService.resumeAutohide();
    }
  }

  toggleHide() {
    this.showOverlay = !this.showOverlay;

    if (this.showOverlay) {
      this.autohideService.resumeAutohide();
    } else {
      this.autohideService.pauseAutohide();
    }
  }

  loadAlliance() {
    this.loadTestData('alliance');
  }

  loadParty() {
    this.loadTestData('party');
  }

  private loadTestData(dataSet: string) {
    this.httpClient.get<ActUpdate>(`/test/${dataSet}.json`).subscribe(data => {
      this.updater.updateEncounter(data);
    });
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    this.updater.updateEncounter(event.detail);
  }
}
