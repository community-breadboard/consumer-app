import { Component, OnInit } from '@angular/core';

import { NavController, Events, ToastController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { UiService } from '../../services/ui.service';
import { AuthService } from '../../services/auth.service';
import { Consumer } from '../../models/consumer';

@Component({
	selector: 'page-credit',
	templateUrl: 'credit.html'
})
export class CreditPage implements OnInit {

	predefinedAmounts: number[];
	amountToAdd: number;
	consumer: Consumer;
	alertMessage: String;
	showAlertMessage: boolean = false;
	alertClass: String;

	constructor(
		public navCtrl: NavController,
		private dataService: DataService,
		private events: Events,
		public toastCtrl: ToastController,
		private authService: AuthService,
		private uiService: UiService) {

	}

	addCredit() {
    /*
		this.dataService.state.consumer.balance = +this.dataService.state.consumer.balance + +this.amountToAdd;
		this.dataService.addCredit(this.authService.currentUser, +this.amountToAdd).subscribe(status => {
			this.showToast(this.amountToAdd);
			this.events.publish('balance:changed');
			this.navCtrl.pop();
		},
		error => {
			console.error(error);
			this.uiService.showError("Server Error");
		});
    */
	}
	ionViewCanEnter() {
		return this.authService.isAuthenticated();
	}

	showToast(amt) {
		let toast = this.toastCtrl.create({
			message: '$' + amt + ' was added to your account',
			duration: 3000
		});
		toast.present();
	}


	ngOnInit() {
		this.predefinedAmounts = [100,200,400];
		this.amountToAdd = 200;
	}

}
