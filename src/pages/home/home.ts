import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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

	constructor(public navCtrl: NavController) {

	}

}
