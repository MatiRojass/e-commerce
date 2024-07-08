import { Router } from "express"
import { all, details } from "../controllers/products.js"
const router = Router()

router.get("/", all)
router.get("/:id", details)

export default router