
import { Person } from './person';
import { ConsumerGroup } from './consumer-group';

export class Account {
	owner?: Person;
	balance: number;
	homeDelivery?: boolean;
	balanceIsLowThreshold?: number;
	firstTime?: boolean;
	group?: ConsumerGroup;
}
