import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@auth": path.resolve(__dirname, "./src/features/auth"),
      "@dashboard": path.resolve(__dirname, "./src/features/dashboard"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@api": path.resolve(__dirname, "./src/shared/api"),
      "@hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@utils": path.resolve(__dirname, "./src/shared/utils"),
      "@stores": path.resolve(__dirname, "./src/shared/stores"),
      "@configs": path.resolve(__dirname, "./src/shared/configs"),
      "@components": path.resolve(__dirname, "./src/shared/components"),
    },
  },
});
