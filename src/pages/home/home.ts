import { Component, OnInit } from '@angular/core';

import { NavController, Platform, ModalController } from 'ionic-angular';

import { OrderModal } from '../../modals/order/order';
import { WelcomeModal } from '../../modals/welcome/welcome';

import _ from "lodash";

import { ItemSliding } from 'ionic-angular';
import { State } from '../../models/state';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	ngOnInit(): void {
		this.getData();
	}

	ionViewWillEnter() {
		this.getData();
		if (this.state.account.firstTime) {
			this.openWelcomeModal();
		}
	}

	getData(): void {
		this.state = this.dataService.getData();
	}

	segmentTitle: string = "shop";
	isAndroid: boolean = false;
	showOrderPreview: boolean = true;
	showTotalPreview: boolean = true;

	userHasSuccessfullyCompletedShoppingStep: boolean = false;
	userHasSuccessfullyCompletedPickupStep: boolean = false;
	state:State;

	userHasSelectedAtLeastOneItem(): boolean {

		return _.some(this.state.foodCategories, function(foodCategory) {
			return _.some(foodCategory.items, function(item) {
				return item.quantity > 0;
			});
		});
	}
	userHasSelectedAPickupLocation(): boolean {
		return _.some(this.state.pickupLocations, function(location) {
			return location.selected === true;
		});
	}

	checkout(): void {

		this.state.orderInProgress = {
			items: [],
			pickupLocation: null,
			totalCost: 0
		};
		var self = this;
		_.each(this.state.foodCategories, function(foodCategory) {
			_.each(foodCategory.items, function(item) {
				if (item.quantity > 0) {
					self.state.orderInProgress.items.push(_.cloneDeep(item));
					self.state.orderInProgress.totalCost += (item.quantity * item.unitCost);
				}
			});
		});

		_.each(this.state.pickupLocations, function(loc) {
			if (loc.selected === true) {
				self.state.orderInProgress.pickupLocation = _.cloneDeep(loc);
			}
		});

		this.goToSegment('checkout');
	}
	toggle(foodCategory: any): void {
		foodCategory.expanded = !foodCategory.expanded;
	}

	openItemDetailsModal(slidingItem: ItemSliding): void {
		slidingItem.close();
		let modal = this.modalCtrl.create(OrderModal);
		modal.present();
	}

	private openWelcomeModal(): void {
		let modal = this.modalCtrl.create(WelcomeModal);
		modal.isOverlay = true;
		modal.present();
	}


	add(category, item, slidingItem): void {
		category.amt = category.amt + 1;
		item.quantity = item.quantity + 1;
		slidingItem.close();
	}
	subtract(category, item, slidingItem): void {
		category.amt = category.amt - 1;
		item.quantity = item.quantity - 1;
		if (!this.userHasSelectedAtLeastOneItem()) {
			this.userHasSuccessfullyCompletedShoppingStep = false;
		}
		slidingItem.close();
	}

	selectPickupLocation(loc): void {
		_.each(this.state.pickupLocations, function(location) {
			location.selected = false;
		});
		loc.selected = true;
//		this.checkout();
	}

	goToSegment(segmentTitle): void {
		this.userHasSuccessfullyCompletedShoppingStep = this.userHasSelectedAtLeastOneItem();
		this.userHasSuccessfullyCompletedPickupStep = this.userHasSelectedAPickupLocation();
		this.segmentTitle = segmentTitle;
	}

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, platform: Platform, private dataService: DataService) {
		this.isAndroid = platform.is('android');
	}


}
