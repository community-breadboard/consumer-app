
import { Component, OnInit } from '@angular/core';

import { HomePage } from '../home/home';
import { ProducersPage } from '../producers/producers';
import { AccountPage } from '../account/account';
import { ScenariosPage } from '../scenarios/scenarios';
import { DataService } from '../../services/data.service';
import { Account } from '../../models/account';
import { Events } from 'ionic-angular';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
	// this tells the tabs component which Pages
	// should be each tab's root Page
	tab1Root: any = HomePage;
	tab2Root: any = ProducersPage;
	tab3Root: any = AccountPage;
	tab4Root: any = ScenariosPage;

	account: Account;

	getData() {
		this.account = this.dataService.getData().account;
	}

	constructor(private dataService: DataService, public events: Events) {}

	ngOnInit() {
		this.getData();
		var self = this;
		this.events.subscribe('account:changed', function() {
			self.getData();
		});
	}


}
