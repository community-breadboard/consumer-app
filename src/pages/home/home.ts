import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	segmentTitle: string = "shop";
	isAndroid: boolean = false;
	showOrderPreview: boolean = true;
	showTotalPreview: boolean = true;

	items = [
		{
			label: 'Bread',
			image: 'bread.jpeg',
			amt: 2
		},
		{
			label: 'Dairy / Eggs',
			image: 'dairy.jpeg',
			amt: 1
		},
		{
			label: 'Dry Goods',
			image: 'drygoods.jpeg',
			amt: 0
		},
		{
			label: 'Ferments',
			image: 'ferments.jpeg',
			amt: 1
		},
		{
			label: 'Flowers',
			image: 'flowers.jpeg',
			amt: 1
		},
		{
			label: 'Meat',
			image: 'meat.jpeg',
			amt: 1
		},
		{
			label: 'Roots / Storage',
			image: 'roots.jpeg',
			amt: 0
		},
		{
			label: 'Sweets',
			image: 'sweets.jpeg',
			amt: 0
		}
	];

	itemSelected(item: string) {
		console.log("Selected Item", item);
	}

	constructor(public navCtrl: NavController, platform: Platform) {
		this.isAndroid = platform.is('android');
	}
}
