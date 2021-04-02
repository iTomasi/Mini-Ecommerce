import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Product from "../components/Product";
import Axios from "axios";
import hosting from "../config/hosting";
import "./scss/home.scss";

const ProductFiltered = () => {
    const {product}: any = useParams();

    const [products, setProducts] = useState<any[]>([]);


    useEffect(() => {
        Axios.get(hosting.localHost_Server)
            .then(res => {
                const productFiltered = res.data.inventory.filter((element: any) => {
                    const productName_lowerCase = element.name.toLowerCase();
                    const params_lowerCase = product.toLowerCase();

                    return productName_lowerCase.includes(params_lowerCase);
                })

                setProducts(productFiltered)
            })
    })

    return (
        <div className="content">
            <div className="products">{
                products.map((product: any) => (
                    <Product id={product.id} name={product.name} price={product.price} img={product.theimg} />
                ))
            }</div>
        </div>
    )
}

export default ProductFiltered