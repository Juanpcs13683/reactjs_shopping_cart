import React from "react";
import Button from "./Button";

const BoxProduct = (props) => (
    <div>
        <h1>{props.title}</h1>
        {props.productList.map(product =>(
            <div key={product.id}>
                <p><b>{product.nameProduct}</b></p>
                <p>$ {product.priceProduct}</p>
                <Button id={product.id} nameButton={props.nameAddShoppingButton} classButton={props.classAddShoppingButton} handleEvent={props.handleAddShoppingProduct} />
                <Button id={product.id} nameButton={props.nameUpdateButton} classButton={props.classUpdateButton} handleEvent={props.handleUpdateProduct}/>
                <Button id={product.id} nameButton={props.nameDeleteButton} classButton={props.classDeleteButton} handleEvent={props.handleDeleteProduct}/>
            </div>
        ))}
    </div>
)

export default BoxProduct