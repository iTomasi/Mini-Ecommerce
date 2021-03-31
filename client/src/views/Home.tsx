import React from "react";
import "./scss/home.scss";

// Component
import Product from "../components/Product";

const Home = () => {
    return (
        <div className="content">
            <div className="products">
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />
                <Product img={"nike-shoes-green.png"} name={"Nike Green"} price={4000} />

            </div>
        </div>
    )
}

export default Home;