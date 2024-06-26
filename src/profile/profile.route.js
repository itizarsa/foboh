import { create, read, update, remove } from "./profile.service.js"
import { profileDto, idParamDto } from "./profile.dto.js"
import { validateRequest } from "../common/openapi.js"
import { wrapper } from "../common/controller.js"
import express from "express"

const router = express.Router()

router.post("/", validateRequest({ body: profileDto }), wrapper(create))

router.get("/:id", validateRequest({ params: idParamDto }), wrapper(read))

router.put("/:id", validateRequest({ params: idParamDto, body: profileDto }), wrapper(update))

router.delete("/:id", validateRequest({ params: idParamDto }), wrapper(remove))

export default router
