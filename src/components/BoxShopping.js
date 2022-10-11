import React from "react";
import products from "../services/products";
import Button from "./Button";

const BoxShopping = ({title, shoppingList, nameShoppingButton, classShoppingButton, handleShoppingButton}) => (
    <div>
        <h1>{title}</h1>
        {shoppingList.map(product => (
            <div key={product.id}>
                <p><b>{product.nameProduct}</b></p>
                <p>$ {product.priceProduct}</p>
                <Button nameButton={nameShoppingButton} classButton={classShoppingButton} handleEvent={handleShoppingButton} />
            </div>
        ))}
    </div>
)

export default BoxShopping