import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

function discountCalc(precio, desc){
    
    const oferta = precio - ((precio*desc)/100) 

    return oferta
}


const __dirname = dirname(fileURLToPath(import.meta.url))

const products = JSON.parse(readFileSync(join(__dirname, "../../data/products.json")))
const categories = [...new Set(products.map(product => product.category))]

export function all(req, res) {
    const { search, min, max, category, onsale, freeshipping, sortby } = req.query


    let productsFiltered = products

    if (sortby) {
        switch (sortby) {
            case "price-asc":
                productsFiltered = productsFiltered.sort((a, b) => {
                    const priceA = a.sale ? discountCalc(a.price, a.discount) : a.price
                    const priceB = b.sale ? discountCalc(b.price, b.discount) : b.price
                    
                    return priceA - priceB})
                break;
            case "price-desc":
                productsFiltered = productsFiltered.sort((a, b) => {
                    const priceB = b.sale ? discountCalc(b.price, b.discount) : b.price
                    const priceA = a.sale ? discountCalc(a.price, a.discount) : a.price
                    
                    return priceB - priceA })
                break;
            case "name-asc":
                productsFiltered = productsFiltered.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                break;
            case "name-desc":
                productsFiltered = productsFiltered.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
                break;
        }
    }

    if (search) {
        productsFiltered = productsFiltered.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (min && min > 0) {
        productsFiltered = productsFiltered.filter(product => {
            const price = product.sale ? discountCalc(product.price, product.discount) : product.price
            return price >= min
        })
    }

    if (max && max > 0) {
        productsFiltered = productsFiltered.filter(product => {
            const price = product.sale ? discountCalc(product.price, product.discount) : product.price
            return price <= max
        })
    }

    if (freeshipping && onsale) {
        productsFiltered = productsFiltered.filter(product => product.shipping && product.sale)
    } else if (freeshipping) {
        productsFiltered = productsFiltered.filter(product => product.shipping)
    } else if (onsale) {
        productsFiltered = productsFiltered.filter(product => product.sale)
    }

    if (category) {
        productsFiltered = productsFiltered.filter(product => product.category == category)
    }


    res.render("products", {
        products: productsFiltered,
        categories,
        minQuery: min,
        maxQuery: max,
        searchQuery: search,
        categoryQuery: category,
        onsaleQuery: onsale,
        freeshippingQuery: freeshipping,
        sortByQuery: sortby
    })
}

export function details(req, res) {
    const id = req.params.id
    const product = products.find(product => product.id == id)

    res.render("details", { product })
}