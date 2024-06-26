import Joi from "joi"

const bodyValidator = schema => (req, res, next) => {
	const { error } = Joi.compile(schema).validate(req.body, { abortEarly: false })

	if (error) {
		const errorMessage = error.details.map(details => {
			const { message, context } = details

			const { key, value } = context

			return { message, field: key, rejectedValue: value }
		})

		return res.status(400).json({ message: "Validation failed", errors: errorMessage })
	}

	return next()
}

export { bodyValidator }
