import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 2277,
		strictPort: true, // If 2277 is taken, it will fail instead of picking 2278
	}
});
