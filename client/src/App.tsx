import React, {useState, useEffect} from "react";
import Axios from "axios";
import {Route, Switch, useHistory} from "react-router-dom";
import hosting from "./config/hosting"

// Components
import Header from "./components/Header";

// Views
import Home from "./views/Home";
import ProductFiltered from "./views/ProductFiltered";
import DetailProduct from "./views/DetailProduct";
import Cart from "./views/Cart";
import FormPurchase from "./views/FormPurchase";

interface IInventory {
  id: number,
  name: string,
  price: number,
  quantity: number,
  theimg: string
}

const App = () => {
  const history = useHistory();

  const [inventoryList, setInventoryList] = useState<IInventory[]>([]);

  useEffect(() => {
    Axios.get(hosting.localHost_Server)
      .then(res => {
        setInventoryList(res.data.inventory);
      })

  }, [])

  const searchingProducts = (e: any) => {
    if (e.key !== "Enter") return;

    if (e.target.value === "") return history.push("/")

    return history.push("/searchq=" + e.target.value)

  }

  return (
    <>
    <Header onKeyDown={searchingProducts}/>
    <Switch>
      <Route exact path="/" component={() => <Home inventory={inventoryList} />}/>
      <Route exact path="/searchq=:product" component={ProductFiltered}/>
      <Route exact path="/product/:productID" component={DetailProduct}/>
      <Route exact path="/my-cart" component={Cart}/>
      <Route exact path="/purchasing-form" component={FormPurchase}/>
    </Switch>
    </>
  )
}


export default App;