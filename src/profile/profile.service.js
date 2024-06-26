import { PricingProfileProducts, PricingProfiles, Products } from "../database/schema.js"
import { promiseWrapper } from "../common/utils.js"
import { db } from "../database/database.js"
import { eq, inArray } from "drizzle-orm"

const create = async ({ body }) => {
	const { products, ...input } = body

	return await db.transaction(async tx => {
		const profileQuery = tx.insert(PricingProfiles).values(input).returning()

		const { result: profiles, error: profileError } = await promiseWrapper(profileQuery)

		if (profileError) {
			if (profileError.code === "SQLITE_CONSTRAINT_UNIQUE")
				return {
					status: 400,
					error: { message: profileError.message.replace("SqliteError: ") }
				}

			return { status: 500, error: profileError }
		}

		const profile = profiles.at(0)

		const productQuery = tx
			.select({ id: Products.id })
			.from(Products)
			.where(inArray(Products.id, products))

		const { result: productsResult, error: productError } = await promiseWrapper(productQuery)

		if (profileError) return { status: 500, error: productError }

		if (!productsResult.length)
			return { status: 400, error: { message: "Atleast one valid product should be given." } }

		const profileProducts = productsResult.map(product => ({
			pricingProfileId: profile.id,
			productId: product.id
		}))

		const profileProductsQuery = tx.insert(PricingProfileProducts).values(profileProducts)

		const { error: ppError } = await promiseWrapper(profileProductsQuery)

		if (ppError) return { status: 500, error: ppError }

		return { status: 201, data: profile }
	})
}

const read = async ({ params }) => {
	const query = db
		.select()
		.from(PricingProfiles)
		.where(eq(PricingProfiles.id, params.id))
		.limit(1)

	const { result, error } = await promiseWrapper(query)

	if (error) return { status: 500, error }

	if (!result.length)
		return {
			status: 404,
			error: { message: `Pricing profiles with id ${params.id} not found` }
		}

	return { status: 200, data: result.at(0) }
}

const update = async ({ params, body }) => {
	const query = db
		.update(PricingProfiles)
		.set(body)
		.where(eq(PricingProfiles.id, params.id))
		.returning()

	const { result, error } = await promiseWrapper(query)

	if (error) {
		if (error.code === "SQLITE_CONSTRAINT_UNIQUE")
			return { status: 400, error: { message: error.message.replace("SqliteError: ") } }

		return { status: 500, error }
	}

	if (!result.length)
		return {
			status: 404,
			error: { message: `Pricing profiles with id ${params.id} not found` }
		}

	return { status: 200, data: result.at(0) }
}

const remove = async ({ params }) => {
	const query = db.delete(PricingProfiles).where(eq(PricingProfiles.id, params.id))

	const { error } = await promiseWrapper(query)

	if (error) return { status: 500, error }

	return { status: 204, data: {} }
}

export { create, read, update, remove }
