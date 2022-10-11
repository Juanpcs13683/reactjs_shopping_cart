import axios from "axios";
import React, { useEffect, useState } from "react";
import Logo from "./components/Author";
import BoxProduct from "./components/BoxProduct";
import BoxShopping from "./components/BoxShopping";
import ProductForm from "./components/ProductForm";
import productServices from "./services/products";

function App() {
  const[nameProduct, setNameProduct] = useState('')
  const[priceProduct, setPriceProduct] = useState('')
  const[products, setProducts] = useState([])
  const[shoppingCart, setShoppingCart] = useState ([])

  //get all the items
  useEffect(()=>{
    productServices.getAllProducts().then(initialProducts =>{
      console.log('get products fulfilled')
      setProducts(initialProducts)
   // console.log(initialProducts)
  })

    productServices.getAllShopping().then(initialShopping =>{
      console.log('get shopping done')
      setShoppingCart(initialShopping)
     // console.log(initialShopping)
    })
      

  },[])





//add a note
const addProduct = event => {
  event.preventDefault()
  const productObj = {
    nameProduct: nameProduct,
    priceProduct: priceProduct
  }

  axios.post('http://localhost:3001/products', productObj)
  .then(response => {
    console.log('post fulfilled')
    setProducts(products.concat(response.data))
    setNameProduct('')
    setPriceProduct('')
    
  })

}

const addProductShopping = event => {
  event.preventDefault()
  const productObj = {
    nameProduct: nameProduct,
    priceProduct: priceProduct
  }

  productServices.createProduct()
  .then(returnedProduct => {
    console.log('post fulfilled')
    setShoppingCart(shoppingCart.concat(returnedProduct))
    setNameProduct('')
    setPriceProduct('')
    
  })
}

// set the state of the consts of data
const handleName = (event) => {
  console.log('handle name', event.target.value)
  setNameProduct(event.target.value)
}

const handlePrice = (event) => {
  console.log('handle price', event.target.value)
  setPriceProduct(event.target.value)
}


//handle functions
const handleAddShoppingProduct = () => {
console.log('button add pressed')
}

const handleUpdateProduct = () => {
  console.log('button update pressed')
}

const handleDeleteProduct = () => {
  console.log('button delete pressed')
}
  return (
    <div className="App">
      <Logo />
      <ProductForm buttonText={"Add Products"} handleSubmit={addProduct} handleName={handleName} handlePrice={handlePrice} />
      <div className="box div">
        <BoxProduct title="Products" productList={products} nameAddShoppingButton="Add item" classAddShoppingButton="addShoppingButton" handleAddShoppingProduct={handleAddShoppingProduct}
        nameUpdateButton="Update" classUpdateButton="updateButton" handleUpdateProduct={handleUpdateProduct}
        nameDeleteButton="Delete" classDeleteButton="deleteButton" handleDeleteProduct={handleDeleteProduct}/>
        <BoxShopping title='Shopping' shoppingList={shoppingCart} nameShoppingButton="remove item" classAddShoppingButton="shoppingButton" handleAddShoppingProduct={handleDeleteProduct}/>
      </div>
    </div>
  );
}

export default App;
