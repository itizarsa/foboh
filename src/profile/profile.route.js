import { create, read, update, remove } from "./profile.service.js"
import { validate } from "../validator/validator.middleware.js"
import { profileDto, idParamDto } from "./profile.dto.js"
import { wrapper } from "../common/controller.js"
import express from "express"

const router = express.Router()

router.post("/", validate(profileDto, "body"), wrapper(create))

router.get("/:id", validate(idParamDto, "params"), wrapper(read))

router.put("/:id", validate(idParamDto, "params"), validate(profileDto, "body"), wrapper(update))

router.delete("/:id", validate(idParamDto, "params"), wrapper(remove))

export default router
