import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProducersPage } from '../pages/producers/producers';
import { AccountPage } from '../pages/account/account';
import { HomePage } from '../pages/home/home';
import { CreditPage } from '../pages/credit/credit';
import { ScenariosPage } from '../pages/scenarios/scenarios';
import { OrderModal } from '../modals/order/order';
import { ItemModal } from '../modals/item/item';
import { WelcomeModal } from '../modals/welcome/welcome';
import { StartModal } from '../modals/start/start';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    ProducersPage,
    AccountPage,
    HomePage,
	ScenariosPage,
	CreditPage,
	OrderModal,
	ItemModal,
	WelcomeModal,
	StartModal,
    TabsPage
  ],
  imports: [
	BrowserModule,
	HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProducersPage,
    AccountPage,
    HomePage,
	ScenariosPage,
	CreditPage,
	OrderModal,
	ItemModal,
	WelcomeModal,
	StartModal,
    TabsPage
  ],
  providers: [
	  StatusBar,
  	  SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
