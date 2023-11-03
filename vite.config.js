import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [
		react({
			include: "**/*.tsx",
		}),
	],
	server: {
		watch: {
			usePolling: true,
		},
	},
	hmr: {
		overlay: false,
	},
});
