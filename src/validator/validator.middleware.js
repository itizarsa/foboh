import Joi from "joi"

const validate = (schema, type) => (req, res, next) => {
	const { error, value } = Joi.compile(schema).validate(req[type], { abortEarly: false })

	if (error) {
		const errorMessage = error.details.map(details => {
			const { message, context } = details

			const { key, value } = context

			return { message, field: key, rejectedValue: value }
		})

		return res.status(400).json({ message: "Validation failed", errors: errorMessage })
	}

	req[type] = value

	return next()
}

export { validate }
