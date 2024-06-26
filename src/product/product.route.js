import { create, read, update, remove } from "./product.service.js"
import { validate } from "../validator/validator.middleware.js"
import { productDto, idParamDto } from "./product.dto.js"
import { wrapper } from "../common/controller.js"
import express from "express"

const router = express.Router()

router.post("/", validate(productDto, "body"), wrapper(create))

router.get("/:id", validate(idParamDto, "params"), wrapper(read))

router.put("/:id", validate(idParamDto, "params"), validate(productDto, "body"), wrapper(update))

router.delete("/:id", validate(idParamDto, "params"), wrapper(remove))

export default router
