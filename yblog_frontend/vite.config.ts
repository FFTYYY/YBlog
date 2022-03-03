import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()] , 
	build: {
		rollupOptions:{
			input: {
				default: "./templates/articlezone/about_index.html" , 
				editor: "./templates/articlezone/article_editor_index.html" , 
				viewer: "./templates/articlezone/article_viewer_index.html" , 
				nodetree: "./templates/articlezone/nodetree_index.html" , 
			},
		} , 
		outDir: "../yblog/articlezone/" , 
		assetsDir: "./static/articlezone/" , 
		emptyOutDir: false , 
	} , 
})

