import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProducersPage } from '../pages/producers/producers';
import { AccountPage } from '../pages/account/account';
import { HomePage } from '../pages/home/home';
import { OrderModal } from '../modals/order/order';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    ProducersPage,
    AccountPage,
    HomePage,
	OrderModal,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProducersPage,
    AccountPage,
    HomePage,
	OrderModal,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
