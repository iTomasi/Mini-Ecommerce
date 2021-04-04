import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import DK_CARTPRODUCT from "../components/DK_CARTPRODUCT";
import MS_CARDPRODUCT from "../components/MS_CARDPRODUCT";
import hosting from "../config/hosting";
import Axios from "axios";
import Notification from "../components/Notification";
import "./scss/cart.scss";

interface INotification {
    type: string,
    msg: string,
    addActive: boolean
}


const Cart = () => {
    const history = useHistory();
    let notification_Timeout: any;

    const [checkWidthUser, setCheckWidthUser] = useState(true);
    const [userProductsList, setUserProductList] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [notification, setNotification] = useState<INotification>({
        type: "",
        msg: "",
        addActive: false
    })

    useEffect(() => {
        const checkingWidth = () => {
            if (window.innerWidth >= 850) return setCheckWidthUser(true)

            return (setCheckWidthUser(false))
        }

        window.addEventListener("resize", checkingWidth)

    }, [checkWidthUser])

    useEffect(() => {
        let count = 0;
        const userProducts = JSON.parse(localStorage.getItem("myproducts") || "[]");
        userProducts.forEach((price: any) => count += price.price * price.quantity);

        setUserProductList(userProducts)
        setTotalPrice(count)

    }, [])

    const handleProductClick = (e: any) => {
        const product_ID = e.currentTarget.dataset.id;
        const LS_productList = JSON.parse(localStorage.getItem("myproducts") || "[]");
        const arrayIndex = LS_productList.findIndex((element: any) => element.id === parseInt(product_ID));
        let count = 0;


        if (e.target.classList.contains("btnPlus")) {
            ++LS_productList[arrayIndex].quantity
            setUserProductList(LS_productList);
            localStorage.setItem("myproducts", JSON.stringify(LS_productList))
            LS_productList.forEach((element: any) => count += element.price * element.quantity);
            setTotalPrice(count)
        }

        else if (e.target.classList.contains("btnMinus") && LS_productList[arrayIndex].quantity > 1) {
            --LS_productList[arrayIndex].quantity;
            setUserProductList(LS_productList);
            localStorage.setItem("myproducts", JSON.stringify(LS_productList))
            LS_productList.forEach((element: any) => count += element.price * element.quantity);
            setTotalPrice(count)
        }

        else if (e.target.classList.contains("removeBtn")) {
            const removingProduct = LS_productList.filter((element: any) => element.id !== parseInt(product_ID));
            setUserProductList(removingProduct);
            localStorage.setItem("myproducts", JSON.stringify(removingProduct))

            removingProduct.forEach((element: any) => count += element.price * element.quantity)
            setTotalPrice(count)
        }

    }

    const purchaseBtnEvent = () => {
        Axios.post(hosting.localHost_Server + "validating-cart", {userProductsList}, {
            headers: {"Content-Type": "application/json"}
        })
            .then(res => {
                if (res.data.message !== "Congratz") return showNotification("error", `${res.data.message}: ${res.data.product}`)

                history.push("/purchasing-form")

            })
    }

    const showNotification = (type: string, msg: string) => {

        if (notification_Timeout !== undefined) clearTimeout(notification_Timeout);

        setNotification((prev: any) => ({...prev, addActive: true, type, msg}))

        notification_Timeout = setTimeout(() => {
            setNotification((prev: any) => ({...prev, addActive: false}))
        }, 3000)

    }

    const DK_CART = () => {
        return (
            <>
            <Notification type={notification.type} msg={notification.msg} addActive={notification.addActive} />
            <form className="cart-DK">
                <div className="table">
                    <div className="table__info" style={{display: "flex", alignItems: "center", background: "#1f2833", padding: "10px 0"}}>
                        <span style={{width: "10%"}}>ID</span>
                        <span style={{width: "30%"}}>Product</span>
                        <span style={{width: "25%"}}>Quantity</span>
                        <span style={{width: "25%"}}>Final Price</span>
                        <span style={{width: "10%"}}>Remove Product</span>
                    </div>

                    <div className="table__products">{
                        userProductsList.map((element: any) => (
                            <DK_CARTPRODUCT id={element.id} name={element.name} quantity={element.quantity} finalPrice={element.quantity * element.price} theimg={element.theimg} onClick={handleProductClick}/>
                        ))
                    }</div>

                    <div className="table__purchase">
                        <span style={{width: "10%"}}></span>
                        <span style={{width: "30%"}}></span>
                        <span style={{width: "25%"}}></span>
                        <span style={{width: "25%"}}>${totalPrice.toLocaleString()}</span>
                        <span style={{width: "10%"}}>
                            <button type="button" onClick={purchaseBtnEvent}>Purchase</button>
                        </span>
                    </div>
                </div>
            </form>
            </>
        )
    }

    const MS_CART = () => {
        return (
            <>
            <Notification type={notification.type} msg={notification.msg} addActive={notification.addActive} />
            <div className="cart-MS">
                <div className="table__products">{
                    userProductsList.map((element: any) => (
                        <MS_CARDPRODUCT id={element.id} name={element.name} quantity={element.quantity} finalPrice={element.quantity * element.price} theimg={element.theimg} onClick={handleProductClick}/>
                    ))
                }</div>

                <div className="confirm-purchase">
                    <h3>Total: ${totalPrice.toLocaleString()}</h3>
                    <button type="button" onClick={purchaseBtnEvent}>Purchase</button>
                </div>
            </div>
            </>
        )
    }

    if (window.innerWidth >= 850) return <DK_CART/>
    else if (window.innerWidth < 850) return <MS_CART/>

    return checkWidthUser ? <DK_CART/> : <MS_CART/>
}

export default Cart;