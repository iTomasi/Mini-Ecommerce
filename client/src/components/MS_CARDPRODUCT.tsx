import React from "react";
import hosting from "../config/hosting";
import "./scss/MS_cartProduct.scss";

interface IMS_CARDPRODUCTProps {
    id: number,
    name: string,
    theimg: string,
    quantity: number,
    finalPrice: number,
    onClick: any
}

const MS_CARDPRODUCT = ({id, name, theimg, quantity, finalPrice, onClick}: IMS_CARDPRODUCTProps) => {
    return (
        <div className="productCart-MS" data-id={id} onClick={onClick}>
            <img src={hosting.localHost_Server + "img/" + theimg} alt={name}/>

            <div className="productCart__details">
                <h4>Name: {name}</h4>
                <h4 style={{textAlign: "center"}}>Quantity:</h4>
                <div className="quantity">
                    <button type="button" className="btnPlus">+</button>
                    {quantity}
                    <button type="button" className="btnMinus">-</button>
                </div>
                <h4>Price: {finalPrice.toLocaleString()}</h4>
                <button type="button" className="removeBtn">Remove Product</button>

            </div>
        </div>
    )
}

export default MS_CARDPRODUCT