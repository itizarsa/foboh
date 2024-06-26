import { specification, RequestValidationError, ResponseValidationError } from "./common/openapi.js"
import { loggerMiddleware } from "./logger/logger.middleware.js"
import { logger } from "./logger/logger.utils.js"
import product from "./product/product.route.js"
import profile from "./profile/profile.route.js"
import { randomUUID } from "crypto"
import rTracer from "cls-rtracer"
import express from "express"

const app = express()

const port = process.env.PORT || 7777

app.use(express.json({ limit: "10mb" }))

app.use(express.urlencoded({ extended: true, limit: "10mb" }))

app.use(express.static("public"))

app.use(rTracer.expressMiddleware({ requestIdFactory: () => randomUUID() }))

app.use(loggerMiddleware)

app.use("/api/profile", profile)

app.use("/api/product", product)

app.get("/api/openapi", (req, res) => res.status(200).json(specification(app)))

app.get("/api/health", (req, res) => res.status(200).json({ message: "OK" }))

app.all("*", (req, res) => {
	return res.status(404).json({ message: `Cannot ${req.method} ${req.url}` })
})

app.use((err, req, res, next) => {
	if (err instanceof RequestValidationError) {
		const errorMessage = err.validationError.details.map(details => {
			const { message, context } = details

			const { key, value } = context

			return { message, field: key, rejectedValue: value }
		})

		return res
			.status(400)
			.json({ message: "Validation failed", segment: err.segment, errors: errorMessage })
	}

	if (err instanceof ResponseValidationError) {
		logger.error({ type: "ResponseValidationError", message: err.message, errors: err })

		return res.status(500).json({ error: { message: "Server Error: Invalid Response Schema" } })
	}

	return res.status(400).send({ message: err?.message })
})

app.listen(port, () => logger.info(`App listening on ${port}`))

process.on("unhandledRejection", error => {
	const { message, stack } = error

	logger.error({ type: "unhandledRejection", message: message || error, stack })
})

process.on("uncaughtException", (err, origin) => {
	logger.error({ type: "uncaughtException", err, origin })
})
