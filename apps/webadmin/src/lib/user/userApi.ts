import { browser, dev } from '$app/env';

export type User = {
	id: string;
	username: string;
	forename: string;
	lastname: string;
};

const isDevBrowser = dev && browser;
const isDevServer = dev && !browser;
const isProdServer = !dev && !browser;
const baseUrl = isDevBrowser
	? 'http://localhost:3030'
	: isDevServer
	? 'http://helpugee-backend:3030'
	: isProdServer
	? 'http://helpugee-backend:3030'
	: 'http://localhost:3030';
// : '';

export const API_BASE = `${baseUrl}/api/v1`;
