import React from "react";
import hosting from "../config/hosting";
import "./scss/DK_cartProduct.scss";

interface IDK_CartProductProps {
    id: number,
    theimg: string,
    name: string,
    quantity: number,
    finalPrice: number,
    onClick: any
}

const DK_CARTPRODUCT = ({id, theimg, name, quantity, finalPrice, onClick}: IDK_CartProductProps) => {
    return (
        <div className="productCart-DK" data-id={id} onClick={onClick}>
            <span className="id">{id}</span>
            <span className="name">
                <img src={hosting.localHost_Server + "img/" + theimg} alt={name} />
                {name}
            </span>
            <span className="quantity">
                <button type="button" className="btnPlus">+</button>
                {quantity}
                <button type="button" className="btnMinus">-</button>
            </span>
            <span className="final_price">${finalPrice.toLocaleString()}</span>
            <span className="remove">
                <button type="button" className="removeBtn">X</button>
            </span>
        </div>
    )
}

export default DK_CARTPRODUCT