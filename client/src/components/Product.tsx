import React from "react";
import "./scss/product.scss";

interface IProductProps {
    img: string,
    name: string,
    price: number
}

const Product = ({img, name, price}: IProductProps) => {
    return (
        <div className="product">
            <img src={img} alt={name}/>

            <h3 className="product__name">{name}</h3>
            <h3 className="product__price">{price}</h3>
        </div>
    )
}

export default Product