
import { Component } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
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
		private authService: AuthService,
		private authHttp: AuthHttp) {}


	ionViewCanEnter() {
		return this.authService.isAuthenticated();
	}

	ionViewWillEnter() {
		this.authHttp.get(this.dataService.currentUserUrl)
			.catch(this.dataService.handleError)
			.subscribe((res: Response) => {
				this.dataService.state.consumer = new Consumer(res.json());
				this.balance = this.dataService.state.consumer.balance;
			})

		var self = this;
		this.events.subscribe('balance:changed', (newBalance) => {
			this.balance = self.dataService.state.consumer.balance;
		});

		this.selectedIndex = 0;

	}

}
