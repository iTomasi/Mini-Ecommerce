import React from "react";
import "./scss/home.scss";

// Component
import Product from "../components/Product";

interface IHomeProps {
    inventory: any[]
}

const Home = ({inventory}: IHomeProps) => {

    return (
        <div className="content">
            <div className="products">{
                inventory.map((inventory: any) => (
                    <Product id={inventory.id} name={inventory.name} price={inventory.price} img={inventory.theimg} />
                ))
            }</div>
        </div>
    )
}

export default Home;