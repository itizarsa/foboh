import { sqliteTable, text, integer, real, primaryKey } from "drizzle-orm/sqlite-core"

export const PricingProfiles = sqliteTable("pricing_profiles", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	description: text("description"),
	isDefault: integer("is_default", { mode: "boolean" }).default(false),
	expirationDate: text("expiration_date").notNull(),
	adjustmentType: text("adjustment_type", { enum: ["FIXED", "DYNAMIC"] }).notNull(),
	adjustmentMode: text("adjustment_mode", { enum: ["INCREASE", "DECREASE"] }).notNull(),
	adjustmentValue: real("adjustment_value").notNull()
})

export const Products = sqliteTable("products", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	sku: text("sku").notNull().unique(),
	brand: text("brand"),
	category: text("category"),
	subCategory: text("sub_category"),
	segment: text("segment"),
	basePrice: real("base_price").notNull()
})

export const PricingProfileProducts = sqliteTable("pricing_profile_products", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	pricingProfileId: integer("pricing_profile_id")
		.notNull()
		.references(() => PricingProfiles.id),
	productId: integer("product_id")
		.notNull()
		.references(() => Products.id)
})
