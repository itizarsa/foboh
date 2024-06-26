import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const PricingProfiles = sqliteTable("pricing_profiles", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	description: text("description"),
	isDefault: integer("is_default", { mode: "boolean" }).default(false),
	expirationDate: text("expiration_date").notNull(),
	adjustmentType: text("adjustment_type", { enum: ["FIXED", "DYNAMIC"] }).notNull(),
	adjustmentValue: real("adjustment_value").notNull(),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
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
		.references(() => Products.id),
	newPrice: real("new_price").notNull()
})

export const Customers = sqliteTable("customers", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	email: text("email").notNull().unique()
})

export const PricingProfileCustomers = sqliteTable("pricing_profile_customers", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	pricingProfileId: integer("pricing_profile_id")
		.notNull()
		.references(() => PricingProfiles.id),
	customerId: integer("customer_id")
		.notNull()
		.references(() => Customers.id)
})
