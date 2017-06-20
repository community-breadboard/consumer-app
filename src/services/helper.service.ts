
import { Injectable } from '@angular/core';
import _ from "lodash";

@Injectable()
export class HelperService {

	constructor() {}

	public convertToCamelCase(snake_case_object): any {
		var camelCaseObject = {};
		_.forEach(
			snake_case_object, (value, key) => {
				if (_.isPlainObject(value) || _.isArray(value)) {     // checks that a value is a plain object or an array - for recursive key conversion
					value = this.convertToCamelCase(value);               // recursively update keys of any values that are also objects
				}
				camelCaseObject[_.camelCase(key)] = value;
			}
		)
		return camelCaseObject;
	};
}
