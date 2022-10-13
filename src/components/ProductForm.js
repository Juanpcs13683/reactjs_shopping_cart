import React from "react";

const ProductForm = ({ buttonText, handleSubmit, nameProduct, priceProduct, handleName, handlePrice }) => (
   <form className="productForm" onSubmit={handleSubmit}>
    <div>
        <input  value={nameProduct} onChange={handleName} placeholder="Product's name" required/>
    </div>
    <div>
        <input value={priceProduct} onChange={handlePrice} placeholder="Product's price" required/> 
    </div>
    <div>
        <button type="submit">{buttonText}</button>
    </div>
   </form>
)

export default ProductForm