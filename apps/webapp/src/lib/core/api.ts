import { browser } from '$app/env';

export const API_BASE = browser
	? import.meta.env.VITE_PUBLIC_API_URL
	: import.meta.env.VITE_PRIVATE_API_URL;
