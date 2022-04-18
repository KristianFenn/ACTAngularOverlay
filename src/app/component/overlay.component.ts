import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IConfigService } from '../service/config.service';
import { Updater } from '../service/updater.service';

import { ActUpdateEvent, ActUpdate } from '../models/update.model';
import { Encounter } from '../models/encounter.model';
import { AutoHideService } from '../service/autohide.service';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: [ './overlay.component.scss' ]
})
export class OverlayComponent {
  private updater: Updater;
  private httpClient: HttpClient;
  private autohideService: AutoHideService;
  encounter: Encounter;
  showOptions: boolean;
  showOverlay: boolean;
  fontSize: number;
  testMode: boolean;

  constructor(updater: Updater, configService: IConfigService, httpClient: HttpClient, autohideService: AutoHideService) {
    this.updater = updater;
    this.httpClient = httpClient;
    this.autohideService = autohideService;
    this.encounter = new Encounter();

    this.autohideService.onShouldShowChanged.subscribe(
      shouldShow => this.showOverlay = shouldShow);
      
    this.updater.subscribe((data) => {
      this.encounter = data.encounter;
      if (data.active) {
        this.autohideService.resetAutohideTimer();
      }
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
    this.httpClient.get<ActUpdate>(`/assets/test/${dataSet}.json`).subscribe((data: ActUpdate) => {
      this.updater.updateEncounter(data, this.encounter);
    });
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    this.updater.updateEncounter(event.detail, this.encounter);
  }
}
