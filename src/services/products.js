import axios from "axios";

// url base to connect the server
const baseUrl = 'http://localhost:3001/products'
const baseUrlShopping = 'http://localhost:3001/shoppingCart'

//method to get all the data
const getAllProducts = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getAllShopping = () => {
    const request = axios.get(baseUrlShopping)
    return request.then(response => response.data)
}

//method to add a new product
const createProduct = (newProduct) => {
    const request = axios.post(baseUrl, newProduct)
    return request.then(response => response.data)
}

const createShopping = (newProduct) => {
    const request = axios.post(baseUrlShopping, newProduct)
    return request.then(response => response.data)
}

//method to update a product
const updateProduct = (id, newProduct) => {
    const request = axios.put(`${baseUrl}/${id}`, newProduct)
    return request.then(response => response.data)
}

//method to delete a product
const delProduct = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const delShopping = (id) => {
    const request = axios.delete(`${baseUrlShopping}/${id}`)
    return request.then(response => response.data)
}

export default {getAllProducts, getAllShopping, createProduct, createShopping, updateProduct, delProduct, delShopping}