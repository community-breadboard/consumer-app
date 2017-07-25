import { ProducerEntity } from './producer-entity';
import { OrderPickupSchedule } from './order-pickup-schedule';

export class Family {
	name: string;
	producerEntity: ProducerEntity;
	orderPickupSchedule: OrderPickupSchedule;

	constructor(json: any) {
		this.name = json.name;
		this.producerEntity = new ProducerEntity(json.producer_entity)
    if (json.order_pickup_schedule) {
      this.orderPickupSchedule = new OrderPickupSchedule(json.order_pickup_schedule);
    }
	}
}
