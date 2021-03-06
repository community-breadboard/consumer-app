import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ModalController, Events, ItemSliding } from 'ionic-angular';
import _ from "lodash";
import { OrderModal } from '../../modals/order/order';
import { ItemModal } from '../../modals/item/item';
import { State } from '../../models/state';
import { DataService } from '../../services/data.service';
import { FoodItem } from '../../models/food-item';
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
	}

	ionViewCanEnter() {
		return this.authService.isAuthenticated();
	}


	private getData(): void {

		this.dataService.getData().subscribe(state => {
			this.state = state;
//			console.log("state=", this.state);

			if (this.state.consumer.mostRecentOrder && this.state.consumer.mostRecentOrder.isOpen) {
				this.segmentTitle = 'pickup';
			} else {
				this.segmentTitle = 'shop';
			}

		},
		error => {
			console.error(error);
			this.uiService.showError("Server Error");
		});
	}

	segmentTitle: string;
	isAndroid: boolean = false;
	showOrderPreview: boolean = false;
	showOutstandingOrderPreview: boolean = false;
	showTotalPreview: boolean = true;

	userHasSuccessfullyCompletedShoppingStep: boolean = false;
	userHasSuccessfullyCompletedPaymentStep: boolean = false;
	userHasSuccessfullyCompletedPickupStep: boolean = false;
	userHasSuccessfullyCompletedCheckoutStep: boolean = false;

	state:State = {};


	private userHasSelectedAtLeastOneItem(): boolean {

		return _.some(this.state.foodCategories, function(foodCategory) {
			return _.some(foodCategory.foodItems, function(foodItem) {
				return foodItem.quantityOrdered > 0;
			});
		});
	}
	checkout(): void {

		this.state.orderInProgress = {
			foodItems: [],
			totalCost: 0,
			isOpen: true,
			datePlaced: null,
			isPlaced: false,
			orderPickupSchedule: _.cloneDeep(this.state.consumer.family.orderPickupSchedule)
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
		this.goToSegment('checkout');
	}

	toggle(foodCategory: any): void {
    _.each(this.state.foodCategories, function(cat) {
      if (cat.id !== foodCategory.id) {
        cat.expanded = false;
      }
    });
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
	submitOrder() {
		this.state.outstandingOrder = _.cloneDeep(this.state.orderInProgress);
		this.dataService.submitOrder(this.state).subscribe(status => {
			this.userHasSuccessfullyCompletedCheckoutStep = true;
			this.goToSegment('pickup');
		},
		error => {
			console.error(error);
			this.uiService.showError("Server Error");
		});
	}

	goToSegment(segmentTitle): void {
		this.userHasSuccessfullyCompletedShoppingStep = this.userHasSelectedAtLeastOneItem();
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
