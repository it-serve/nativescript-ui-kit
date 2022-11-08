import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedFlashlight } from '@demo/shared';
import { flashlight } from '@it-serve/flashlight';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedFlashlight {
  testIt(args) {
    if (flashlight.isAvailable()) {
      flashlight.on();
    } else {
      alert('A flashlight is not available on your device.');
    }
  }
}
