import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import hosting from "../config/hosting";
import Axios from "axios";
import Notification from "../components/Notification";
import "./scss/formPurchase.scss";

interface INotification {
    type: string,
    msg: string,
    addActive: boolean
}

const FormPurchase = () => {
    const history = useHistory();
    let notification_Timeout: any;

    const [countryList, setCountryList] = useState<any[]>([]);
    const [userName, setUserName] = useState<string>("");
    const [userHomeAddress, setUserHomeAddress] = useState<string>("");
    const [userCountry, setUserCountry] = useState<string>("");
    const [userCard, setUserCard] = useState<string>("");
    const [userCard_MMYY, setUserCard_MMYY] = useState<string>("");
    const [userCard_CVC, setUserCard_CVC] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [showConfirmDatas, setShowConfirmDatas] = useState<boolean>(false);
    const [showPurchaseCompleted, setShowPurchaseCompleted] = useState<boolean>(false);
    const [notification, setNotification] = useState<INotification>({
        type: "",
        msg: "",
        addActive: false
    })


    useEffect(() => {
        Axios.get("https://restcountries.eu/rest/v2/all")
            .then(res => setCountryList(res.data))
        
        let count = 0;
        const LS_ProductList = JSON.parse(localStorage.getItem("myproducts") || "[]");

        LS_ProductList.forEach((product: any) => count += product.price * product.quantity);
        setTotalPrice(count)
    })

    const handleUserName = (e: any) => setUserName(e.target.value);
    const handleHomeAddress = (e: any) => setUserHomeAddress(e.target.value);
    const handleCountry = (e: any) => setUserCountry(e.target.value);

    const handleUserCard = (e: any) => {
        if (e.target.value.length > 19) return

        const gettingValue = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
        setUserCard(gettingValue)
    }

    const handleMMYY = (e: any) => {
        if (e.target.value.length > 5) return
        const gettingValue = e.target.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'').trim()

        setUserCard_MMYY(gettingValue)
    }

    const handleCVC = (e: any) => {
        if (e.target.value.length > 3) return;
        const gettingValue = e.target.value.replace(/[\D]/g, "").trim()

        setUserCard_CVC(gettingValue);
    }

    const checkingForm = () => {
        if (userName === "") return showNotification("error", "Full Name Missing")
        else if (userCountry === "") return showNotification("error", "Country Missing")
        else if (userHomeAddress === "") return showNotification("error", "Home Address Missing")

        setShowConfirmDatas(true)
    }

    const purchasingProducts = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const full_Name = formData.get("full_name");
        const country = formData.get("country");
        const home_Address = formData.get("home_address");

        Axios.post(hosting.localHost_Server + "purchasing-products", {
            userDatas: {full_Name, country, home_Address},
            products: JSON.parse(localStorage.getItem("myproducts") || "[]")
        }, {
            headers: {"Content-Type": "application/json"}
        })
            .then(res => {
                if (res.data.message !== "Purchase made satisfactorily.") return showNotification("error", res.data.message);

                setShowConfirmDatas(false);
                setShowPurchaseCompleted(true)
                showNotification("success", res.data.message);

                setTimeout(() => {
                    localStorage.removeItem("myproducts");
                    history.push("/")
                }, 3000)
            })

    }

    const showNotification = (type: string, msg: string) => {
        if (notification_Timeout !== undefined) clearTimeout(notification_Timeout);

        setNotification((prev: any) => ({...prev, addActive: true, msg, type}));

        notification_Timeout = setTimeout(() => {
            setNotification((prev: any) => ({...prev, addActive: false}))
        }, 3000)
    }
    
    return (
        <>
        <Notification type={notification.type} msg={notification.msg} addActive={notification.addActive}/>
        <form className="iw_form" onSubmit={purchasingProducts}>
            <div className="formSection">
                <label>Full Name</label>
                <input type="text" placeholder="Full Name..." onChange={handleUserName} value={userName} name="full_name"/>
            </div>

            <div className="formSection">
                <label>Select your Country</label>
                <select name="country" onChange={handleCountry}>
                    <option selected disabled>Country...</option>
                    {countryList.map((country: any) => (
                        <option value={country.name}>{`${country.name} (${country.alpha2Code})`}</option>
                    ))}
                </select>
            </div>

            <div className="formSection">
                <label>Home Address</label>
                <input type="text" placeholder="Home Address..." onChange={handleHomeAddress} value={userHomeAddress} name="home_address"/>
            </div>

            <div className="formSection">
                <label>Card Number</label>
                <input type="Card Number" placeholder="XXXX XXXX XXXX XXXX" onChange={handleUserCard} value={userCard} name="card_number"/>
            </div>

            <div className="formFlex">
                <div className="MMYY">
                    <label>MM / YY</label>
                    <input type="text" placeholder="12/11" onChange={handleMMYY} value={userCard_MMYY} name="mm_yy"/>
                </div>

                <div className="CVC">
                    <label>CVC</label>
                    <input type="text" placeholder="CVC" onChange={handleCVC} value={userCard_CVC} name="cvc"/>
                </div>
            </div>

            <button type="button" className="btnPay" onClick={checkingForm}>Pay! (${totalPrice.toLocaleString()})</button>

            <div className="confirmDatas" style={{display: showConfirmDatas ? "flex" : "none"}}>
                <div className="window">
                    <h3>Name: {userName}</h3>
                    <h3>Country: {userCountry}</h3>
                    <h3>Home Address: {userHomeAddress}</h3>

                    <div className="btns">
                        <button type="submit">Purchase!</button>
                        <button type="button" onClick={() => setShowConfirmDatas(false)}>No!</button>
                    </div>
                </div>
            </div>

            <div className="purchase-completed" style={{display: showPurchaseCompleted ? "flex" : "none"}}>
                <div className="window">
                    <h2>Purchase made Satisfactorily.</h2>
                </div>
            </div>
        </form>
        </>
    )
}

export default FormPurchase