
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { ServiceDaysPage } from '../serviceDays/serviceDays';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Consumer } from '../../models/consumer';
import { Events, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import { Response }  from '@angular/http';


@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {

	tab1Root: any = HomePage;
	tab2Root: any = ServiceDaysPage;
	tab3Root: any = AccountPage;

	balance: number;
	selectedIndex: number = 0;

	constructor(
		private dataService: DataService,
		public events: Events,
		public modalCtrl: ModalController,
		private authService: AuthService) {}


	ionViewCanEnter() {
		return this.authService.isAuthenticated();
	}

	getData(): void {
		this.balance = this.dataService.state.consumer.balance;
	}
	ionViewWillEnter() {

		this.getData();

		this.events.subscribe('balance:changed', () => {
			this.getData();
		});

		this.selectedIndex = 0;

	}

}
