import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'order.html'
})
export class OrderModal {

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
