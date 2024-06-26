import { loggerMiddleware } from "./logger/logger.middleware.js"
import { logger } from "./logger/logger.utils.js"
import { randomUUID } from "crypto"
import rTracer from "cls-rtracer"
import express from "express"

const app = express()

const port = process.env.PORT || 7777

app.use(express.json({ limit: "10mb" }))

app.use(express.urlencoded({ extended: true, limit: "10mb" }))

app.use(rTracer.expressMiddleware({ requestIdFactory: () => randomUUID() }))

app.use(loggerMiddleware)

app.all("*", (req, res) => {
	return res.status(404).json({ message: `Cannot ${req.method} ${req.url}` })
})

app.use((err, req, res, next) => res.status(400).send({ message: err?.message }))

app.listen(port, () => logger.info(`App listening on ${port}`))

process.on("unhandledRejection", error => {
	const { message, stack } = error

	logger.error({ type: "unhandledRejection", message: message || error, stack })
})

process.on("uncaughtException", (err, origin) => {
	logger.error({ type: "uncaughtException", err, origin })
})
