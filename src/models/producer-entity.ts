export class ProducerEntity {
	name: string;
	webSiteUrl: string;
	description: string;
	offerings: string[];

	constructor(json) {
		this.name = json.name;
		this.webSiteUrl = json.web_site_url;
		this.description = json.description;
		this.offerings = json.offerings? json.offerings.split(',') : [];
	}
}
