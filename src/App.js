import axios from "axios";
import React, { useEffect, useState } from "react";
import Logo from "./components/Author";
import BoxProduct from "./components/BoxProduct";
import BoxShopping from "./components/BoxShopping";
import ProductForm from "./components/ProductForm";
import Notification from "./services/Notification";
import productServices from "./services/products";

function App() {
  const[nameProduct, setNameProduct] = useState('')
  const[priceProduct, setPriceProduct] = useState('')
  const[products, setProducts] = useState([])
  const[shoppingCart, setShoppingCart] = useState ([])
  const[message, setMessage] = useState('')
  const[classNotification, setClassNotification] = useState('')

  //get all the items for product and shopping lists
  useEffect(()=>{
    productServices.getAllProducts().then(initialProducts =>{
     // console.log('get products fulfilled')
      setProducts(initialProducts)
   // console.log(initialProducts)
  })

    productServices.getAllShopping().then(initialShopping =>{
     // console.log('get shopping done')
      setShoppingCart(initialShopping)
     // console.log(initialShopping)
    })
      

  },[])





//add a new product to product list //necesito validar que los nombres sean diferentes y mesages de error
const addProduct = event => {
  event.preventDefault()
  const productObj = {
    nameProduct: nameProduct,
    priceProduct: priceProduct
  }

 productServices.createProduct(productObj)
  .then(response => {
    console.log('post fulfilled')
    setProducts(products.concat(response))
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


//handle functions // falta hacer el mensage de exito o error
const handleAddShoppingProduct = (event) => {
const id = event.target.id
productServices.delProduct(id).then(response => {
  console.log('delete done')
  //setProducts(products.map(product => product.id !== id))
  //message
})

console.log(products.find(product => product.id == id))
productServices.createShopping(products.find(product => product.id == id))
.then(response => {
  console.log('item added to shopping')
  console.log('response added',response)
  productServices.getAllProducts().then(response=>setProducts(response))
  console.log('product added to shopping')
  productServices.getAllShopping().then(response => setShoppingCart(response))
  console.log('pruduct added to shopping')
  
})

}

const handleUpdateProduct = (event) => {
  console.log('button update pressed')
  const product = products.find(product => product.id == event.target.id)
  console.log(product)
 setNameProduct(product.nameProduct)
  setPriceProduct(product.priceProduct)

}

// delte product from products list // falta mensaje
const handleDeleteProduct = (event) => {
  console.log('button delete pressed')
  productServices.delProduct(event.target.id)
  .then(response=> productServices.getAllProducts().then(response=> setProducts(response)))
}

//remove item from shopping list //falta message of fail or error
const handleRemoveShopping = (event) => {
  const id = event.target.id
  const product = shoppingCart.find(product => product.id == id)
  const changedProduct = {...product, id: ''}
  if(window.confirm('Do you want to remove this item?')){
productServices.createProduct(changedProduct)
.then(response => {
  productServices.delShopping(id).then(
    response => console.log('mensaje de exito al borrar de shopping'))
  console.log('mensaje de removed successful')
  productServices.getAllProducts().then(response => setProducts(response))
  console.log('get products succsessful')
  productServices.getAllShopping().then(response=>setShoppingCart(response))
  console.log('shopping successful')
  setMessage('Item removed successfully')
  setClassNotification('succesMessage')
  setTimeout(() => {
    setMessage('')
    setClassNotification('')
  }, 5000);
})}
}
  return (
    <div className="App">
      <Logo />
      <ProductForm buttonText={"Add Products"} handleSubmit={addProduct} handleName={handleName} handlePrice={handlePrice} nameProduct={nameProduct} priceProduct={priceProduct} />
      <Notification message={message} classMessage={classNotification} />
      <div className="box div">
        <BoxProduct title="Products" productList={products} nameAddShoppingButton="Add item" classAddShoppingButton="addShoppingButton" handleAddShoppingProduct={handleAddShoppingProduct}
        nameUpdateButton="Update" classUpdateButton="updateButton" handleUpdateProduct={handleUpdateProduct}
        nameDeleteButton="Delete" classDeleteButton="deleteButton" handleDeleteProduct={handleDeleteProduct}/>
        <BoxShopping title='Shopping' shoppingList={shoppingCart} nameShoppingButton="remove item" classAddShoppingButton="shoppingButton" handleShoppingButton={handleRemoveShopping}/>
      </div>
    </div>
  );
}

export default App;
