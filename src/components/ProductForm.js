import React from "react";

const ProductForm = ({ buttonText, handleSubmit, nameProduct, priceProduct, handleName, handlePrice }) => (
   <form onSubmit={handleSubmit}>
    <div>
        Name of product: <input value={nameProduct} onChange={handleName} />
    </div>
    <div>
        Price of product: <input value={priceProduct} onChange={handlePrice} /> 
    </div>
    <div>
        <button type="submit">{buttonText}</button>
    </div>
   </form>
)

export default ProductForm