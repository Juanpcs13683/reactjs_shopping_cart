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

  const product = products.find(product => product.nameProduct === productObj.nameProduct)
  console.log(product)
  const id = product ? product.id : false
  console.log('id',id)


  products.find(product=> product.nameProduct === productObj.nameProduct) || shoppingCart.find(product=> product.nameProduct === productObj.nameProduct)?
  window.confirm('this item already exists, do you want to update it?')?
  id? productServices.updateProduct(id, productObj)
  .then(returnedObj=> {
    setProducts(products.map(p => p.id !== id ? p : returnedObj))
    setNameProduct('')
    setPriceProduct('')
    setMessage('Product updated successfuly')
    setClassNotification('successMessage')
    setTimeout(() => {
      setMessage('')
      setClassNotification('')
    }, 5000);
}).catch(error=>{
  setMessage('Error trying to update the product')
  setClassNotification('errorMessage')
  setTimeout(() => {
    setMessage('')
    setClassNotification('')
  }, 5000);
})
  :window.alert('id not found, product in Shopping Cart')
  :console.log('negacion de el confirm')
  :productServices.createProduct(productObj)
  .then(response => {
    setProducts(products.concat(response))
    setNameProduct('')
    setPriceProduct('')
    setMessage('Product added successfuly')
    setClassNotification('successMessage')
    setTimeout(() => {
      setMessage('')
      setClassNotification('')
    }, 5000);
  }).catch(error=>{
    setMessage('Error trying to add the product', error)
    setClassNotification('errorMessage')
    setTimeout(() => {
      setMessage('')
      setClassNotification('')
    }, 5000);
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


//handle functions // done
const handleAddShoppingProduct = (event) => {
const id = parseInt(event.target.id)
const product = products.find(prod => prod.id === id)
console.log(products.find(product => product.id === id))
productServices.createShopping({...product, id:null})
.then(response => {
  console.log('item added to shopping')
  productServices.delProduct(id).then(response => {
    //console.log('delete done')
    //setProducts(products.map(product => product.id !== id))
    //message
  })
 
  //console.log('response added',response)
  productServices.getAllProducts().then(response=>setProducts(response))
  //console.log('product added to shopping')
  productServices.getAllShopping().then(response => setShoppingCart(response))
  //console.log('pruduct added to shopping')

  //Setting the notification
  setMessage('Item added successfuly')
  setClassNotification('successMessage')
  setTimeout(() => {
    setMessage('')
    setClassNotification('')
  }, 5000);
  
}).catch(error=>{
  setMessage('Error adding product to shopping cart', error)
  setClassNotification('errorMessage')
  setTimeout(() => {
    setMessage('')
    setClassNotification('')
  }, 5000);
})

}

// set name and price in the form to let them be modified
const handleUpdateProduct = (event) => {
  const product = products.find(product => product.id === parseInt( event.target.id))
 setNameProduct(product.nameProduct)
  setPriceProduct(product.priceProduct)

}

// delte product from products list // done
const handleDeleteProduct = (event) => {
  if(window.confirm('Are you sure to remove this product?')){
  productServices.delProduct(event.target.id)
  .then(response=>{ 
    productServices.getAllProducts()
    .then(allProducts=> setProducts(allProducts))
    setMessage('Item removed successfuly')
    setClassNotification('successMessage')
    setTimeout(() => {
      setMessage('')
      setClassNotification('')
    }, 5000);
  }).catch(error=>{
    setMessage('Error removing this item', error)
    setClassNotification('errorMessage')
    setTimeout(() => {
      setMessage('')
      setClassNotification('')
    }, 5000);
  })
}}

//remove item from shopping list //done
const handleRemoveShopping = (event) => {
  const id = parseInt(event.target.id)
  const product = shoppingCart.find(product => product.id === id)
  const changedProduct = {...product, id:null}
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
  setClassNotification('successMessage')
  setTimeout(() => {
    setMessage('')
    setClassNotification('')
  }, 5000);
}).catch(error=>{
  setMessage('Error removing item from shopping cart')
  setClassNotification('errorMessage')
  setTimeout(() => {
    setMessage('')
    setClassNotification('')
  }, 5000);
})
}
}
  return (
    <div className="App">
      <Logo />
      <ProductForm buttonText={"Add Products"} handleSubmit={addProduct} handleName={handleName} handlePrice={handlePrice} nameProduct={nameProduct} priceProduct={priceProduct} />
      <Notification message={message} classMessage={classNotification} />
      <div className="box_div">
        <BoxProduct title="Products" productList={products} nameAddShoppingButton="Add item" classAddShoppingButton="addShoppingButton" handleAddShoppingProduct={handleAddShoppingProduct}
        nameUpdateButton="Update" classUpdateButton="updateButton" handleUpdateProduct={handleUpdateProduct}
        nameDeleteButton="Delete" classDeleteButton="deleteButton" handleDeleteProduct={handleDeleteProduct}/>
        <BoxShopping title='Shopping Cart' shoppingList={shoppingCart} nameShoppingButton="remove item" classShoppingButton="shoppingButton" handleShoppingButton={handleRemoveShopping}/>
      </div>
    </div>
  );
}

export default App;
