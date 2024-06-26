import Joi from "joi"

export const productDto = Joi.object({
	title: Joi.string().required(),
	sku: Joi.string().required(),
	brand: Joi.string().required(),
	category: Joi.string().required(),
	subCategory: Joi.string().required(),
	segment: Joi.string().required(),
	basePrice: Joi.number().positive().precision(2).required()
})

export const idParamDto = Joi.object({
	id: Joi.number().positive().required()
})
