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

	foodCategories = [
		{
			label: 'Bread',
			image: 'bread.jpeg',
			amt: 2,
			expanded: false,
			items: [
				{
					name: 'Oma\'s Best',
					quantity: 1,
					quantityLabel: 'loaf'
				},
				{
					name: 'Sourdough',
					quantity: 0,
					quantityLabel: 'loaf'
				},
				{
					name: 'Spent Grain',
					quantity: 1,
					quantityLabel: 'loaf'
				}
			]

		},
		{
			label: 'Dairy / Eggs',
			image: 'dairy.jpeg',
			amt: 1,
			expanded: false,
			items: [
				{
					name: 'Unpasteurized Milk',
					quantity: 1,
					quantityLabel: 'gallon'
				},
				{
					name: 'Eggs',
					quantity: 0,
					quantityLabel: 'dozen'
				}

			]
		},
		{
			label: 'Dry Goods',
			image: 'drygoods.jpeg',
			amt: 0,
			expanded: false,
			items: [
				{
					name: 'Rolled Oats',
					quantity: 0,
					quantityLabel: 'bag'
				},
				{
					name: 'Brown Rice',
					quantity: 0,
					quantityLabel: 'bag'
				}

			]
		},
		{
			label: 'Ferments',
			image: 'ferments.jpeg',
			amt: 1,
			expanded: false,
			items: [
				{
					name: 'Sauerkraut',
					quantity: 0,
					quantityLabel: 'jar'
				},
				{
					name: 'Ruby Kraut',
					quantity: 1,
					quantityLabel: 'jar'
				}

			]
		},
		{
			label: 'Flowers',
			image: 'flowers.jpeg',
			amt: 1,
			expanded: false,
			items: [
				{
					name: 'Assortment',
					quantity: 1,
					quantityLabel: 'bunch'
				}
			]
		},
		{
			label: 'Meat',
			image: 'meat.jpeg',
			amt: 1,
			expanded: false,
			items: [
				{
					name: 'Ground Beef',
					quantity: 0,
					quantityLabel: 'pound'
				},
				{
					name: 'Hot Dogs',
					quantity: 1,
					quantityLabel: 'pack'
				}

			]
		},
		{
			label: 'Roots / Storage',
			image: 'roots.jpeg',
			amt: 0,
			expanded: false,
			items: [
				{
					name: 'Assortment',
					quantity: 0,
					quantityLabel: 'bunch'
				}
			]
		},
		{
			label: 'Sweets',
			image: 'sweets.jpeg',
			amt: 0,
			expanded: false,
			items: [
				{
					name: 'Honey',
					quantity: 0,
					quantityLabel: 'jar'
				},
				{
					name: 'Jam',
					quantity: 0,
					quantityLabel: 'jar'
				},
				{
					name: 'Maple Syrup',
					quantity: 0,
					quantityLabel: 'jar'
				}
			]
		}
	];

	itemSelected(item: string) {
		console.log("Selected Item", item);
	}

	toggle(foodCategory: any) {
		foodCategory.expanded = !foodCategory.expanded;
		console.log("cat", foodCategory);
	}

	openModal() {
		console.log("Open Modal");
	}
	constructor(public navCtrl: NavController, platform: Platform) {
		this.isAndroid = platform.is('android');
	}
}
