
import { Injectable } from '@angular/core';
import { State } from '../models/state';
import { Observable } from 'rxjs/Observable';
import { Response }  from '@angular/http';
import { Storage } from "@ionic/storage";
import { AuthHttp } from 'angular2-jwt';
import { FoodCategory } from '../models/food-category';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import _ from "lodash";


@Injectable()
export class DataService {

	baseUrl: string = 'http://localhost:3000';
	foodItemsForSaleUrl = this.baseUrl + '/current_user/food_items_for_sale.json';
	submitOrderUrl = this.baseUrl + '/current_user/submit_order';
	authUrl = this.baseUrl + '/user_token';
	currentUserUrl = this.baseUrl + '/current_user';

	state: State = new State();

	public getData(): Observable<State> {
		return this.authHttp.get(this.foodItemsForSaleUrl).map((res: Response) => {

			let foodCategories: FoodCategory[] = [];
			for (let foodCategoryJson of res.json()) {
				foodCategories.push(new FoodCategory(foodCategoryJson));
			}

			this.state.foodCategories = foodCategories;
			return this.state;
		});
	}

	public submitOrder(state: State): Observable<string> {

		let data: any = _.pick(state, ['consumer', 'outstandingOrder']);
		return this.authHttp.post(this.submitOrderUrl, data).map((res: Response) => {
			return 'success';
		});
	}
	
	public handleError (error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

	constructor (
		private storage: Storage,
		private authHttp: AuthHttp,
	) {}

/*
	private objectKeysToSnakeCase(obj: any): any {
		console.log("objectKeysToSnakeCase obj=", obj);
		var snakeCaseObject = {};
		_.forEach(
			obj,
			(value, key) => {
				console.log("v=", value);
				if (_.isPlainObject(value) || _.isArray(value)) {
					value = this.objectKeysToSnakeCase(value);
				}
				snakeCaseObject[_.snakeCase(key)] = value;
			}
		)
		return snakeCaseObject;
	}
*/

}
