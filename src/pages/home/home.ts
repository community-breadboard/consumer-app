import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ModalController, Events, ItemSliding } from 'ionic-angular';
import _ from "lodash";
import { OrderModal } from '../../modals/order/order';
import { ItemModal } from '../../modals/item/item';
import { State } from '../../models/state';
import { DataService } from '../../services/data.service';
import { FoodItem } from '../../models/food-item';
import { Consumer } from '../../models/consumer';
import { FoodCategory } from '../../models/food-category';
import { AuthService } from '../../services/auth.service';
import { UiService } from '../../services/ui.service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {

	ngOnInit(): void {
		this.getData();
		this.segmentTitle = 'shop';
	}

	ionViewCanEnter() {
		return this.authService.isAuthenticated();
	}

	ionViewWillEnter() {
//		this.getData();
//		console.log("user=", this.authService.getUser());
//		this.segmentTitle = this.orderIsOutstanding? 'pickup': 'shop';
//		this.includePaySegment = false;
	}

	private getData(): void {

		this.dataService.getData().subscribe(state => {
			this.state = state;
			this.orderIsOutstanding = this.state.outstandingOrder !== null;
		},
		error => {
			console.error(error);
			this.uiService.showError("Server Error");
		});

//		this.state = this.dataService.getData();
	}

	segmentTitle: string;
	isAndroid: boolean = false;
	showOrderPreview: boolean = false;
	showOutstandingOrderPreview: boolean = false;
	showTotalPreview: boolean = false;
	includePaySegment: boolean = false;

	userHasSuccessfullyCompletedShoppingStep: boolean = false;
	userHasSuccessfullyCompletedPaymentStep: boolean = false;
	userHasSuccessfullyCompletedPickupStep: boolean = false;
	userHasSuccessfullyCompletedCheckoutStep: boolean = false;
	//userHasSeenStartModal: boolean = false;
	state:State = {};
	orderIsOutstanding: boolean;

	setDefaultLocation: boolean = true;

	private userHasSelectedAtLeastOneItem(): boolean {

		return _.some(this.state.foodCategories, function(foodCategory) {
			return _.some(foodCategory.foodItems, function(foodItem) {
				return foodItem.quantityOrdered > 0;
			});
		});
	}
	/*
	private userHasSelectedAPickupLocation(): boolean {
		return _.some(this.state.pickupLocations, function(location) {
			return location.selected === true;
		});
	}
*/
	checkout(): void {

		this.state.orderInProgress = {
			foodItems: [],
//			pickupLocation: null,
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
/*
		_.each(this.state.pickupLocations, function(loc) {
			if (loc.selected === true) {
				self.state.orderInProgress.pickupLocation = _.cloneDeep(loc);
			}
		});
*/
		this.goToSegment('checkout');
	}

	toggle(foodCategory: any): void {
		foodCategory.expanded = !foodCategory.expanded;
	}

	openItemDetailsModal(slidingItem: ItemSliding, item: FoodItem): void {
		slidingItem.close();
		let modal = this.modalCtrl.create(ItemModal, {item: item});
		modal.present();
	}

	placeOrder() {
		let modal = this.modalCtrl.create(OrderModal);
		modal.present();
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
/*
	selectPickupLocation(loc): void {
		_.each(this.state.pickupLocations, function(location) {
			location.selected = false;
		});
		loc.selected = true;

		if (this.setDefaultLocation) {
			if (this.state.standingOrder) {
				this.state.standingOrder.pickupLocation = loc;
			} else {
				this.state.standingOrder = {
					pickupLocation: loc,
					foodItems: []
				}
			}
		}
	}
*/
	payWithPaypal() {
		this.state.outstandingOrder = {
//			pickupLocation: _.cloneDeep(this.state.orderInProgress.pickupLocation),
			foodItems: _.cloneDeep(this.state.orderInProgress.foodItems),
			alertSet: false,
			addedToCalendar: false
		}
		this.userHasSuccessfullyCompletedCheckoutStep = true;
//		this.orderIsOutstanding = true;
		this.goToSegment('pickup');
	}

	goToSegment(segmentTitle): void {
		this.userHasSuccessfullyCompletedShoppingStep = this.userHasSelectedAtLeastOneItem();
		this.userHasSuccessfullyCompletedPaymentStep = this.state.account.balance > 0;
//		this.userHasSuccessfullyCompletedPickupStep = this.userHasSelectedAPickupLocation();
		if (this.segmentTitle === 'pickup') {
			// once an order is placed, it is final.   They can't go back and edit an order
			this.segmentTitle = 'pickup';
		} else if (segmentTitle === 'checkout' && !this.userHasSuccessfullyCompletedShoppingStep) {
			this.segmentTitle = 'shop';
		} else {
			this.segmentTitle = segmentTitle;
		}
	}

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		platform: Platform,
		private dataService: DataService,
		private authService: AuthService,
		private uiService: UiService,
		private events: Events) {

		this.isAndroid = platform.is('android');
	}


}
