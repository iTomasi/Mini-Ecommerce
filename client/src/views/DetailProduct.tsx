import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import Axios from "axios";
import hosting from "../config/hosting";
import "./scss/detailProduct.scss";

interface IProductInfo {
    message: string,
    product: {
        name: string,
        theimg: string,
        price: number,
        quantity: number
    }
}

const DetailProduct = () => {
    const {productID}: any = useParams();
    const history = useHistory();

    const [productInfo, setProductInfo] = useState<IProductInfo>({
        message: "",
        product: {name: "", theimg: "", price: 0, quantity: 0}
    })

    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        Axios.get(hosting.localHost_Server + "product/" + productID)
            .then(res => setProductInfo(res.data))
    }, [])

    const quantityProducts = (e: any) => {
        if (e.target.classList.contains("btnPlus") && productInfo.product.quantity > quantity) {
            setQuantity((prev: any) => (++prev))
        }

        else if (e.target.classList.contains("btnMinus") && quantity > 1) {
            setQuantity((prev: any) => (--prev))
        }
    }

    const addingToCart = () => {
        Axios.post(hosting.localHost_Server + "validating-product/" + productID, {quantity}, {
            headers: {"Content-Type": "application/json"}
        })
            .then(res => {
                if (res.data.message !== "Product in your Cart!") return console.log(res.data);
                
                try {
                    const LS_gettingProducts = JSON.parse(localStorage.getItem("myproducts") || "[]")
                    const LS_getProductID = LS_gettingProducts.findIndex((element: any) => element.id === parseInt(productID));

                    if (LS_getProductID !== -1) {
                        LS_gettingProducts[LS_getProductID].quantity += quantity

                        localStorage.setItem("myproducts", JSON.stringify(LS_gettingProducts))
                        history.push("/");
                        return
                    }
                    
                    localStorage.setItem("myproducts", JSON.stringify([
                        ...LS_gettingProducts, res.data.product
                    ]))

                    history.push("/")
                }

                catch(e) {
                    localStorage.setItem("myproducts", JSON.stringify([res.data.product]))
                    history.push("/")
                }
            })
    }

    return (
        <div className="productDetail">{
            productInfo.message === "product found" ?
            <div className="productDetail__product">
                <div className="img">
                    <img src={hosting.localHost_Server + "img/" + productInfo.product.theimg} alt={productInfo.product.name}/>
                </div>
                <div className="details">
                    <h2>{productInfo.product.name}</h2>
                    <h2>Quantity: <span>{productInfo.product.quantity}</span></h2>
                    <h2>Price: <span>${productInfo.product.price.toLocaleString()}</span></h2>
                    
                    <div className="quantity" onClick={quantityProducts}>
                        <button type="button" className="btnPlus">+</button>
                        {quantity}
                        <button type="button" className="btnMinus">-</button>
                    </div>

                    <button type="button" className="purchaseBtn" onClick={addingToCart}>
                        <i className="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
             :
            <h1>Q a pasao</h1>
        }</div>
    )
}

export default DetailProduct