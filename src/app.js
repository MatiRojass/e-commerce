import express from "express"
import {dirname, join} from "node:path"
import { fileURLToPath } from "url"
const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs")
app.set("views", join(__dirname, "./views"))

app.use(express.static(join(__dirname, "../public")))

import mainRoutes from "./routes/main.routes.js"
app.use("/", mainRoutes)

app.listen(3000, ()=>{
    console.log("Server corriendo en el puerto 3000 :)\nURL: http://localhost:3000")
})