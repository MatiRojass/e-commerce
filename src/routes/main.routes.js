import { Router } from "express"
const router = Router()
import { home, about, contact } from "../controllers/main.js"
import productsRouter from "./products.routes.js"


router.get("/", home)
router.get("/about", about)
router.get("/contact", contact)

router.use("/products", productsRouter)


export default router