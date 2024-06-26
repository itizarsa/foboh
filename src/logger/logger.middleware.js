import { logger } from "./logger.utils.js"
import { cache } from "./logger.store.js"
import rTracer from "cls-rtracer"

const loggerMiddleware = (req, res, next) => {
	if (req.method === "OPTIONS") return next()

	const reqId = rTracer.id()

	const startTime = Date.now()

	cache.set(reqId, {})

	res.on("finish", () => {
		const data = cache.take(reqId)

		const responseTime = Date.now() - startTime

		const fwd = req.headers["x-forwarded-for"]

		const message = `method=${req.method} url=${req.url} status=${res.statusCode} request_id=${reqId} fwd=${fwd}`

		const ip = req.headers["x-forwarded-for"]
			? req.headers["x-forwarded-for"].split(",")[0]
			: undefined

		const request = {
			id: reqId,
			ip,
			method: req.method,
			url: req.url,
			body: req.body,
			headers: req.headers,
			path: req.route?.path ?? req.path
		}

		const log = {
			req: request,
			statusCode: res.statusCode,
			responseTime,
			context: data,
			message
		}

		logger.info(log)
	})

	return next()
}

export { loggerMiddleware }
