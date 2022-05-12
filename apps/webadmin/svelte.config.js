import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

console.log('project root:', process.cwd());

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
		paths: {
			base: '/admin'
		},
		vite: {
			base: '/admin/',
			server: {
				base: '/admin/',
				hmr: {
					path: '/admin/',
					host: '0.0.0.0',
					port: '3344'
				}
			}
		}
	}
};

export default config;
