import { cache } from "./logger.store.js"
import rTracer from "cls-rtracer"
import Pino from "pino"

const isDev = process.env.NODE_ENV === "development"

const transport = isDev ? { target: "pino-pretty" } : undefined

const logger = new Pino({ transport, timestamp: false })

const addLog = (key, data) => {
	const reqId = rTracer.id()

	if (!reqId) return

	const log = cache.get(reqId)

	if (!log) return

	log[key] = data

	cache.set(reqId, log)
}

export { logger, addLog }
