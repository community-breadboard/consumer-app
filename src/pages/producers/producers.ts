import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-producers',
  templateUrl: 'producers.html'
})
export class ProducersPage {

  constructor(public navCtrl: NavController, authService: AuthService) {

  }

}
