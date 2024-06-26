import express from "express"

const app = express()

const port = process.env.PORT || 7777

app.use(express.json({ limit: "10mb" }))

app.use(express.urlencoded({ extended: true, limit: "10mb" }))

app.all("*", (req, res) => {
	return res.status(404).json({ message: `Cannot ${req.method} ${req.url}` })
})

app.use((err, req, res, next) => res.status(400).send({ message: err?.message }))

app.listen(port, () => console.log(`App listening on ${port}`))

process.on("unhandledRejection", error => {
	const { message, stack } = error

	console.error({ type: "unhandledRejection", message: message || error, stack })
})

process.on("uncaughtException", (err, origin) => {
	console.error({ type: "uncaughtException", err, origin })
})
