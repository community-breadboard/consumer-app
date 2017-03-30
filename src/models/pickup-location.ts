import { Location } from './location';

export class PickupLocation {
	id: number;
	name: string;
	abbreviatedName: string;
	location: Location;
	nextPickup: string;
	pickupStartTime: string;
	pickupEndTime: string;
	available: boolean;
	unavailableReason: string;
	selected: boolean;
}
