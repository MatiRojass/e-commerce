import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const products = JSON.parse(readFileSync(join(__dirname, "../../data/products.json")))

export function home(req, res) {
    res.render("index", { products })
}
export function about(req, res) {
    res.render("about")
}
export function contact(req, res) {
    res.render("contact")
}