import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	segmentTitle: string = "shop";
	isAndroid: boolean = false;

	items = [
		'Bread',
		'Dairy / Eggs',
		'Meat',
		'Dry Goods',
		'Ferments',
		'Sweets',
		'Flowers',
		'Roots / Storage',
		'Juice'
	];

	itemSelected(item: string) {
		console.log("Selected Item", item);
	}

	constructor(public navCtrl: NavController, platform: Platform) {
		this.isAndroid = platform.is('android');
	}
}
