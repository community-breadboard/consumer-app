import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ModalController, Events, ItemSliding } from 'ionic-angular';
import _ from "lodash";

import { OrderModal } from '../../modals/order/order';
import { ItemModal } from '../../modals/item/item';
import { WelcomeModal } from '../../modals/welcome/welcome';
import { StartModal } from '../../modals/start/start';
import { State } from '../../models/state';
import { DataService } from '../../services/data.service';
import { FoodItem } from '../../models/food-item';
import { FoodCategory } from '../../models/food-category';


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
			this.includePaySegment = true;
			this.segmentTitle = 'pay';

		// not first time
		} else {

			if (this.showUserStartModal()) {
				this.openStartModal();
				this.userHasSeenStartModal = true;
			}
			this.segmentTitle = 'shop';
			this.includePaySegment = false;
		}
	}

	private getData(): void {
		this.state = this.dataService.getData();
		this.orderIsOutstanding = this.state.outstandingOrder !== null;
	}

	private showUserStartModal(): boolean {
		return (!this.userHasSeenStartModal && !this.orderIsOutstanding && !this.userHasSelectedAtLeastOneItem() && !this.userHasSelectedAPickupLocation());
	}

	segmentTitle: string;
	isAndroid: boolean = false;
	showOrderPreview: boolean = true;
	showOutstandingOrderPreview: boolean = false;
	showTotalPreview: boolean = true;
	includePaySegment: boolean = false;

	userHasSuccessfullyCompletedShoppingStep: boolean = false;
	userHasSuccessfullyCompletedPaymentStep: boolean = false;
	userHasSuccessfullyCompletedPickupStep: boolean = false;
	userHasSeenStartModal: boolean = false;
	state:State;
	orderIsOutstanding: boolean;

	mode: String = "place-order";

	private userHasSelectedAtLeastOneItem(): boolean {

		return _.some(this.state.foodCategories, function(foodCategory) {
			return _.some(foodCategory.foodItems, function(foodItem) {
				return foodItem.quantityOrdered > 0;
			});
		});
	}
	private userHasSelectedAPickupLocation(): boolean {
		return _.some(this.state.pickupLocations, function(location) {
			return location.selected === true;
		});
	}

	checkout(): void {

		this.state.orderInProgress = {
			foodItems: [],
			pickupLocation: null,
			totalCost: 0
		};
		var self = this;
		_.each(this.state.foodCategories, function(foodCategory) {
			_.each(foodCategory.foodItems, function(item) {
				if (item.quantityOrdered > 0) {
					self.state.orderInProgress.foodItems.push(_.cloneDeep(item));
					self.state.orderInProgress.totalCost += (item.quantityOrdered * item.unitCost);
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
		let modal = this.modalCtrl.create(ItemModal);
		modal.present();
	}

	private openWelcomeModal(): void {
		let modal = this.modalCtrl.create(WelcomeModal);
		modal.isOverlay = false;
		modal.present();
	}
	private openStartModal(): void {
		let modal = this.modalCtrl.create(StartModal);
		modal.isOverlay = false;
		modal.onDidDismiss(data => {
			if (data.useStandingOrder === true) {
				this.copyStandingOrderIntoOrder();
			} else if (data.createStandingOrder === true) {
				this.mode = 'create-standing-order';
			}
		});
		modal.present();
	}

	placeOrder() {
		let modal = this.modalCtrl.create(OrderModal);
		modal.present();
	}
	createStandingOrder() {
//		this.navCtrl.
	}


	private setFoodCategoryQuantityOrderedFromFoodItemQuantityOrdered() {
		_.each(this.state.foodCategories, function(foodCategory) {
			foodCategory.quantityOrdered = _.reduce(foodCategory.foodItems, function(sum, foodItem) {
				return (sum + foodItem.quantityOrdered);
			}, 0);
		});
	}
	private copyStandingOrderIntoOrder() {
		let self = this;
		_.each(self.state.foodCategories, function(foodCategory) {
			_.each(foodCategory.foodItems, function(item) {
				let itemFromStandingOrder: FoodItem = _.find(self.state.standingOrder.foodItems, function(fi: FoodItem) { return fi.id === item.id; });
				if ( itemFromStandingOrder ) {
					item.quantityOrdered = itemFromStandingOrder.quantityOrdered;
					self.userHasSuccessfullyCompletedShoppingStep = true;
				}
			});
		});
		self.setFoodCategoryQuantityOrderedFromFoodItemQuantityOrdered();
		if (this.state.standingOrder.pickupLocation) {
			_.each(self.state.pickupLocations, function(location) {
				if (location.id === self.state.standingOrder.pickupLocation.id) {
					location.selected = true;
					self.userHasSuccessfullyCompletedPickupStep = true;
				}
			});
		}
	}
	addCredit(amount: number): void {
		this.state.account.balance += amount;
		this.events.publish('account:changed');
	}

	add(category: FoodCategory, item: FoodItem, slidingItem: ItemSliding): void {
		category.quantityOrdered = category.quantityOrdered + 1;
		item.quantityOrdered = item.quantityOrdered + 1;
		slidingItem.close();
	}
	subtract(category: FoodCategory, item: FoodItem, slidingItem: ItemSliding): void {
		category.quantityOrdered = category.quantityOrdered - 1;
		item.quantityOrdered = item.quantityOrdered - 1;
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
		this.checkout();
	}

	goToSegment(segmentTitle): void {
		this.userHasSuccessfullyCompletedShoppingStep = this.userHasSelectedAtLeastOneItem();
		this.userHasSuccessfullyCompletedPaymentStep = this.state.account.balance > 0;
		this.userHasSuccessfullyCompletedPickupStep = this.userHasSelectedAPickupLocation();
		this.segmentTitle = segmentTitle;
	}

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		platform: Platform,
		private dataService: DataService,
		private events: Events) {

		this.isAndroid = platform.is('android');
	}


}
