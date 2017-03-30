import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'welcome.html'
})
export class WelcomeModal {

	constructor(private viewCtrl: ViewController) {}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}
