// 0001 | import { defineConfig } from "vite"
// 0002 | import react from "@vitejs/plugin-react"
// 0003 | import path from "node:path"
// 0004 | 
// 0005 | export default defineConfig({
// 0006 |   plugins: [react()],
// 0007 |   resolve: {
// 0008 |     alias: {
// 0009 |       "@": path.resolve(__dirname, "./src"),
// 0010 |     },
// 0011 |   },
// 0012 | })
