import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"


const __dirname = dirname(fileURLToPath(import.meta.url))

const products = JSON.parse(readFileSync(join(__dirname, "../../data/products.json")))
const categories = [...new Set(products.map(product => product.category))]

export function all(req, res){
    const {search, max, category, onsale} = req.query

    
    let productsFiltered = products
    
    if(search){
        productsFiltered = productsFiltered.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))  
    }

    if(max && max>0){
        productsFiltered = productsFiltered.filter(product => product.price <= max)  
    }

    if(category){
        productsFiltered = productsFiltered.filter(product => product.category == category)
    }

    if(onsale && onsale=="true"){
        productsFiltered = productsFiltered.filter(product => product.sale)
    }

    res.render("products", {products: productsFiltered, categories, maxQuery: max, categoryQuery: category, onsaleQuery: onsale})
}

export function details(req, res){
    const id = req.params.id
    const product = products.find(product => product.id == id)
    
    res.render("details", {product})
}