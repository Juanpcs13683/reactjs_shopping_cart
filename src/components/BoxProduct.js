import React from "react";

const BoxProduct = ({title, products, nameButton, classButton}) => (
    <div>
        <h1>{title}</h1>
            {products.map(product => {<div>
                <p><b>{product.name}</b></p>
                <p>${product.price}</p>
                <button className={classButton}>{nameButton}</button>
            </div>})}
    </div>
)

export default BoxProduct