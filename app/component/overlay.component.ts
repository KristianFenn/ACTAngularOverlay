import { Component, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActUpdateEvent, ActUpdate } from '../models/update.model';
import Updater from '../service/updater.service';
import EventDispatcher from '../service/event.dispatcher';
import Encounter from '../models/encounter.model';
import Player from '../models/player.model';
import PlayerTableField from '../models/player-table.model';
import Configuration, { Layout } from '../config';
import Paths from '../path';

@Component({
  selector: 'overlay',
  templateUrl: Paths.GetHtml('overlay'),
  styleUrls: [
    Paths.GetCss('common'),
    Paths.GetCss('overlay')
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
  showTable: boolean;

  constructor(updater: Updater, http: Http) {
    this.updater = updater;
    this.http = http;

    this.updater.subscribe((data) => {
      this.showTable = Configuration.ShouldShowTable(data.players.length);
      this.encounter = data;
    });

    this.showOptions = false;
    this.showOverlay = true;
    this.config = Configuration;
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    this.updater.updateEncounter(event.detail);
  }

  private loadTestData(dataSet: string) {
    this.http.get(`/app/test/${dataSet}.json`).subscribe(data => {
      this.updater.updateEncounter(data.json());
    });
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
}
