import { derived, writable } from 'svelte/store';
import * as jose from 'jose';

export const jwtToken = writable<string>();

export const data = derived<typeof jwtToken, jose.JWTPayload>(jwtToken, ([token]) => {
	return { ...jose.decodeJwt(token), token };
});
