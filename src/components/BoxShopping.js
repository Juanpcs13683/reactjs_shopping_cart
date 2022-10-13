import React from "react";
import Button from "./Button";

const BoxShopping = ({title, shoppingList, nameShoppingButton, classShoppingButton, handleShoppingButton}) => (
    <div className="box">
        <h1>{title}</h1>
        {shoppingList.map(product => (
            <div className="shopping-container" key={product.id}>
                <p className="product"><b>{product.nameProduct}</b></p>
                <p className="price">$ {product.priceProduct}</p>
                <Button id={product.id} nameButton={nameShoppingButton} classButton={classShoppingButton} handleEvent={handleShoppingButton} />
            </div>
        ))}
    </div>
)

export default BoxShopping