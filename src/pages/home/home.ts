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
		{
			label: 'Bread',
			image: 'bread.jpeg'
		},
		{
			label: 'Dairy / Eggs',
			image: 'dairy.jpeg'
		},
		{
			label: 'Dry Goods',
			image: 'drygoods.jpeg'
		},
		{
			label: 'Ferments',
			image: 'ferments.jpeg'
		},
		{
			label: 'Flowers',
			image: 'flowers.jpeg'
		},
		{
			label: 'Meat',
			image: 'meat.jpeg'
		},
		{
			label: 'Roots / Storage',
			image: 'roots.jpeg'
		},
		{
			label: 'Sweets',
			image: 'sweets.jpeg'
		}
	];

	itemSelected(item: string) {
		console.log("Selected Item", item);
	}

	constructor(public navCtrl: NavController, platform: Platform) {
		this.isAndroid = platform.is('android');
	}
}
