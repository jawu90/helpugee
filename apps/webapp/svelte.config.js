import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		},
		trailingSlash: 'always',
		vite: {
			server: {
				hmr: {
					host: '0.0.0.0',
					port: '3345'
				}
			}
		}
	}
};

export default config;
