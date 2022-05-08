import { browser } from '$app/env';

export type User = {
	id: string;
	username: string;
	forename: string;
	lastname: string;
};

export const API_BASE = browser
	? import.meta.env.VITE_PUBLIC_API_URL
	: import.meta.env.VITE_PRIVATE_API_URL;
