import { derived, writable } from 'svelte/store';
import * as jose from 'jose';

export const jwtToken = writable<string>();

export const data = derived(jwtToken, ([token]) => {
	return { ...jose.decodeJwt(token), token };
});
