import { Component, HostListener } from '@angular/core';
import { Updater } from '../service/updater.service'
import { Encounter } from '../models/encounter.model'
import { ActUpdateEvent } from '../models/update.model'

@Component({
  selector: 'overlay',
  templateUrl: 'app/overlay/overlay.html',
})
export class OverlayComponent {
  encounter: Encounter;
  updater: Updater;

  constructor(updater: Updater) {
    this.updater = updater;
    this.updater.notifier.subscribe((data) => this.encounter = data);
  }

  @HostListener('document:onOverlayDataUpdate', ['$event'])
  onDataUpdate(event: ActUpdateEvent) {
    console.log(JSON.stringify(event.detail));
    this.updater.updateEncounter(event.detail);
  }
}