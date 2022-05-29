export type RequestDto = {
	region: string;
	category: string;
};

export type Feature = {
	id: number;
	label: string;
	category: string;
	geom: string; // JSON string of GEOM structure (e.g. {type: "Point", coordinates: [<lat>, <lng>]})
	data: {
		address: string;
		serviceProduct: string;
		openingHours: string;
		weSpeak: string;
		specificOfferForRefugees: boolean;
		fromDate: string | null; // date-time ISO string '2022-05-28T23:18:27.270Z'
		untilDate: string | null; // date-time ISO string '2022-05-28T23:18:27.270Z'
		other: string;
	};
	baseProperties: {
		createdAt: string; // date-time ISO string '2022-05-28T23:18:27.270Z';
		createdBy: string;
		modifiedAt: string | null;
		modifiedBy: string | null;
		isDeleted: boolean;
	};
};
