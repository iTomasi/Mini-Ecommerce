import React from "react";
import {useHistory} from "react-router-dom";
import hosting from "../config/hosting"
import "./scss/product.scss";

interface IProductProps {
    id: number,
    img: string,
    name: string,
    price: number
}

const Product = ({img, name, price, id}: IProductProps) => {
    const history = useHistory();

    const viewDetails = (e: any) => {
        history.push("/product/" + e.currentTarget.dataset.id)
    }

    return (
        <div className="product" data-id={id} key={id} onClick={viewDetails}>
            <img src={hosting.localHost_Server + "img/" + img} alt={name}/>

            <h3 className="product__name">{name}</h3>
            <h3 className="product__price">${price} CLP</h3>
        </div>
    )
}

export default Product