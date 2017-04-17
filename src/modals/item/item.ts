import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';
import { FoodItem } from '../../models/food-item';

@Component({
  templateUrl: 'item.html'
})
export class ItemModal {

	item: FoodItem;

	constructor(
		public platform: Platform,
		public params: NavParams,
		public viewCtrl: ViewController
	) {

		this.item = params.get('item');

	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}
