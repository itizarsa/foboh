import { PricingProfiles } from "../database/schema.js"
import { promiseWrapper } from "../common/utils.js"
import { db } from "../database/database.js"
import { eq } from "drizzle-orm"

const create = async ({ body }) => {
	const { products, ...input } = body

	const query = db.insert(PricingProfiles).values([input]).returning()

	const { result, error } = await promiseWrapper(query)

	if (error) {
		if (error.code === "SQLITE_CONSTRAINT_UNIQUE")
			return { status: 400, error: { message: error.message.replace("SqliteError: ") } }

		return { status: 500, error }
	}

	return { status: 201, data: result.at(0) }
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
