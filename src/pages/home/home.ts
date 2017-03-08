import { Component } from '@angular/core';

import { NavController, Platform, ModalController } from 'ionic-angular';

import { OrderModal } from '../../modals/order/order';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	segmentTitle: string = "shop";
	isAndroid: boolean = false;
	showOrderPreview: boolean = true;
	showTotalPreview: boolean = true;

	toggle(foodCategory: any) {
		foodCategory.expanded = !foodCategory.expanded;
	}

	openModal(slidingItem) {
		slidingItem.close();
		let modal = this.modalCtrl.create(OrderModal);
		modal.present();
	}
	add(item, slidingItem) {
		item.quantity = item.quantity + 1;
		slidingItem.close();
	}
	subtract(item, slidingItem) {
		item.quantity = item.quantity - 1;
		slidingItem.close();
	}

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, platform: Platform) {
		this.isAndroid = platform.is('android');
	}

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
					quantityLabel: 'loaf',
					quantityLabelPlural: 'loaves'
				},
				{
					name: 'Sourdough',
					quantity: 0,
					quantityLabel: 'loaf',
					quantityLabelPlural: 'loaves'
				},
				{
					name: 'Spent Grain',
					quantity: 1,
					quantityLabel: 'loaf',
					quantityLabelPlural: 'loaves'
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
					name: 'Milk',
					quantity: 1,
					quantityLabel: 'gallon',
					quantityLabelPlural: 'gallons'
				},
				{
					name: 'Eggs',
					quantity: 0,
					quantityLabel: 'dozen',
					quantityLabelPlural: 'dozen'
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
					quantityLabel: 'bag',
					quantityLabelPlural: 'bags'
				},
				{
					name: 'Brown Rice',
					quantity: 0,
					quantityLabel: 'bag',
					quantityLabelPlural: 'bags'
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
					quantityLabel: 'jar',
					quantityLabelPlural: 'jars'
				},
				{
					name: 'Ruby Kraut',
					quantity: 1,
					quantityLabel: 'jar',
					quantityLabelPlural: 'jars'
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
					quantityLabel: 'bunch',
					quantityLabelPlural: 'bunches'
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
					quantityLabel: 'pound',
					quantityLabelPlural: 'pounds'
				},
				{
					name: 'Hot Dogs',
					quantity: 1,
					quantityLabel: 'pack',
					quantityLabelPlural: 'packs'
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
					quantityLabel: 'bunch',
					quantityLabelPlural: 'bunches'
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
					quantityLabel: 'jar',
					quantityLabelPlural: 'jars'
				},
				{
					name: 'Jam',
					quantity: 0,
					quantityLabel: 'jar',
					quantityLabelPlural: 'jars'
				},
				{
					name: 'Maple Syrup',
					quantity: 0,
					quantityLabel: 'jar',
					quantityLabelPlural: 'jars'
				}
			]
		}
	];
}
