import Joi from "joi"

export const profileDto = Joi.object({
	name: Joi.string().required(),
	description: Joi.string(),
	isDefault: Joi.boolean().default(false),
	expirationDate: Joi.date().min("now").iso().raw().required(),
	adjustmentType: Joi.string().valid("FIXED", "DYNAMIC").required(),
	adjustmentMode: Joi.string().valid("INCREASE", "DECREASE").required(),
	adjustmentValue: Joi.number().positive().precision(2).required(),
	products: Joi.array().items(Joi.number()).min(1).required()
})

export const idParamDto = Joi.object({
	id: Joi.number().positive().required()
})
