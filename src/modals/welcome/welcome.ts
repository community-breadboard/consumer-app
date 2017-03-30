import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'welcome.html'
})
export class WelcomeModal {

	constructor(
		public platform: Platform,
		public params: NavParams,
		public viewCtrl: ViewController
	) {

	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}
