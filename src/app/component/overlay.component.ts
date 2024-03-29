import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IConfigService } from '../service/config.service';
import { IUpdater } from '../service/updater.service';
import { IAutoHideService } from '../service/autohide.service';

import { ActUpdate } from '../models/update.model';
import { IEncounter, Encounter } from '../models/encounter.model';

@Component({
  selector: 'overlay',
  templateUrl: 'overlay.component.html',
  styleUrls: [ 'overlay.component.scss' ]
})
export class OverlayComponent {
  private updater: IUpdater;
  private httpClient: HttpClient;
  private autohideService: IAutoHideService;
  encounter: IEncounter;
  showOptions: boolean;
  showOverlay: boolean;
  fontSize: number;
  testMode: boolean;

  constructor(
    updater: IUpdater, configService: IConfigService, httpClient: HttpClient, autohideService: IAutoHideService, ref: ChangeDetectorRef) {
    this.updater = updater;
    this.httpClient = httpClient;
    this.autohideService = autohideService;
    this.encounter = new Encounter();

    this.autohideService.onShouldShowChanged.subscribe(shouldShow => {
      this.showOverlay = shouldShow;
    });
      
    this.updater.onEncounterUpdated.subscribe((data) => {
      this.encounter = data.encounter;
      ref.detectChanges();
    });
    
    configService.onConfigChanged.subscribe(config => {
      this.fontSize = config.fontSize;
    });

    this.showOptions = false;
    this.showOverlay = true;
    this.testMode = false;

    const config = configService.getConfiguration();
    this.fontSize = config.fontSize;

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
}