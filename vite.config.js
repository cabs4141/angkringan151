import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    host: "0.0.0.0",
  },
});
