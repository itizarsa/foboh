import { capitilize } from "./utils.js"
import {
	ExpressOpenAPI,
	getJoiRequestValidatorPlugin,
	getJoiResponseValidatorPlugin,
	RequestValidationError,
	ResponseValidationError
} from "express-joi-openapi"

const expressOpenApi = new ExpressOpenAPI()

const validateRequest = expressOpenApi.registerPlugin(getJoiRequestValidatorPlugin())

const validateResponse = expressOpenApi.registerPlugin(getJoiResponseValidatorPlugin())

const specification = app => {
	const specification = expressOpenApi.populateSpecification(app)

	specification.setInfo({ title: "FOBOH", description: "Profile pricing module" })
	specification.addServer({ url: "/" })
	specification.addTag({ name: "Profile" })
	specification.addTag({ name: "Product" })

	const json = specification.toJSON()

	delete json["paths"]["*"]
	delete json["paths"]["/api/openapi"]
	delete json["paths"]["/api/health"]

	const paths = Object.entries(json.paths).reduce((paths, elem) => {
		const [path, operations] = elem

		const tag = capitilize(path.split("/").at(2))

		const summaries = { get: "Read", post: "Create", put: "Update", delete: "Delete" }

		const mod = Object.entries(operations).reduce((acc, elem) => {
			const [verb, item] = elem

			item.tags = [tag]

			item.summary = summaries[verb]

			acc[verb] = item

			return acc
		}, {})

		paths[path] = mod

		return paths
	}, {})

	json.paths = paths

	return json
}

export {
	validateRequest,
	validateResponse,
	specification,
	RequestValidationError,
	ResponseValidationError
}
