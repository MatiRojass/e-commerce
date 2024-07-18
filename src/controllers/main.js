import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))

const products = JSON.parse(readFileSync(join(__dirname, "../../data/products.json")))

export function home(req, res) {

    const onsales = products.filter(product => product.sale == true).slice(0, 5)

    const featureds = products.filter(product => product.featured == true).slice(0, 5)

    res.render("index", { onsales: onsales, featureds: featureds })
}

export function about(req, res) {
    res.render("about")
}

export function contact(req, res) {
    res.render("contact")
}