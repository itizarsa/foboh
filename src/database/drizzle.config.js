import { defineConfig } from "drizzle-kit"

export default defineConfig({
	dialect: "sqlite",
	schema: "src/database/schema.js",
	out: "src/database/drizzle",
	dbCredentials: { url: "src/database/sqlite.db" }
})
