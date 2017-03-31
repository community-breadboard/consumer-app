import { Component, OnInit } from '@angular/core';

import { ViewController } from 'ionic-angular';
import { State } from '../../models/state';
import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'start.html',
  providers: [DataService]
})
export class StartModal implements OnInit {

	state: State;
	userHasAStandingOrder: boolean;

	ngOnInit() {
		this.state = this.dataService.getData();
		this.userHasAStandingOrder = (this.state.standingOrder !== null);
	}
	constructor(private viewCtrl: ViewController, private dataService: DataService) {}

	useBlankSlate() {
		this.viewCtrl.dismiss({useStandingOrder:false});
	}
	useStandingOrder() {
		this.viewCtrl.dismiss({useStandingOrder:true});
	}
}
