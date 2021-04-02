import React, {useState, useEffect} from "react";
import Axios from "axios";
import "./scss/formPurchase.scss";

const FormPurchase = () => {

    const [countryList, setCountryList] = useState<any[]>([]);
    const [userCard, setUserCard] = useState<string>("");
    const [userCard_MMYY, setUserCard_MMYY] = useState<string>("");
    const [userCard_CVC, setUserCard_CVC] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<number>(0);


    useEffect(() => {
        Axios.get("https://restcountries.eu/rest/v2/all")
            .then(res => setCountryList(res.data))
        
        let count = 0;
        const LS_ProductList = JSON.parse(localStorage.getItem("myproducts") || "[]");

        LS_ProductList.forEach((product: any) => count += product.price * product.quantity);
        setTotalPrice(count)
    })

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
    
    return (
        <form className="iw_form">
            <div className="formSection">
                <label>Full Name</label>
                <input type="text" placeholder="Full Name..." name="full_name"/>
            </div>

            <div className="formSection">
                <label>Select your Country</label>
                <select name="country">
                    <option selected disabled>Country...</option>
                    {countryList.map((country: any) => (
                        <option value={country.name}>{`${country.name} (${country.alpha2Code})`}</option>
                    ))}
                </select>
            </div>

            <div className="formSection">
                <label>Home Address</label>
                <input type="text" placeholder="Home Address..." name="home_address"/>
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

            <button type="submit">Pay! (${totalPrice.toLocaleString()})</button>
        </form>
    )
}

export default FormPurchase