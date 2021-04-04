import {Router} from "express";
import connection from "../database/mysql";
import path from "path";
const router = Router();

router.get("/img/:imgFile", (req, res) => {
    const imgFile = req.params.imgFile;

    res.sendFile(path.join(__dirname, "../../public/" + imgFile));
});

router.get("/", (req, res) => {
    connection.query("SELECT * FROM inventory", (err, resp) => {
        if (err) return console.log(err)

        res.json({inventory: resp})
    })
});

router.get("/product/:id", (req, res) => {
    const id = req.params.id;

    connection.query("SELECT * FROM inventory WHERE id = ?", [id], (err, resp) => {
        if (err) return console.log(err);
        if (resp[0] === undefined) return res.json({message: "Product not found"})

        res.json({message: "product found", product: resp[0]})
    })
});

router.post("/validating-product/:id", (req, res) => {
    const id = req.params.id;
    const {quantity} = req.body;
    
    if (!quantity || quantity === 0) return res.json({message: "Wtf?"})

    connection.query("SELECT * FROM inventory WHERE id = ?", [id], (err, resp) => {
        if (err) return console.log(err)
        if (resp[0] === undefined) res.json({message: "Product not exists."})

        if (quantity > resp[0].quantity) return res.json({message: "We dont have more from this product."})

        res.json({
            message: "Product in your Cart!",
            product: {
                id: resp[0].id,
                name: resp[0].name,
                quantity: quantity,
                price: resp[0].price,
                theimg: resp[0].theimg
            }
        })
    })
})

router.post("/validating-cart", (req, res) => {
    const productList = req.body.userProductsList;

    connection.query("SELECT * FROM inventory", (err, resp) => {
        if (err) return console.log(err);

        for (let i = 0; i < productList.length; i++) {
            const getProduct = productList[i]
            const validatingProduct = resp.filter((element: any) => element.id === getProduct.id);

            if (validatingProduct[0].name !== getProduct.name || validatingProduct[0].price !== getProduct.price) {
                return res.json({message: "you are editing our product?"})
            }

            else if (getProduct.quantity > validatingProduct[0].quantity) {
                return res.json({message: "We dont have more quantity", product: validatingProduct[0].name})
            }
        }

        res.json({message: "Congratz"})
    })
});

router.post("/purchasing-products", (req, res) => {
    const {userDatas, products} = req.body;

    if (!userDatas || !products) return res.json({message: "OlaXd?"})
    let newArray_Saving: any = [];

    connection.query("SELECT * FROM inventory", (err, resp) => {
        if (err) return console.log(err)

        for (let i = 0; i < products.length; i++) {
            const checkingProducts = resp.filter((element: any) => element.id === products[i].id)

            if (checkingProducts[0].name !== products[i].name) return res.json({message: "Product name are not equal"});
            else if (checkingProducts[0].price !== products[i].price) return res.json({message: "Product price are not equal"});
            else if (products[i].quantity > checkingProducts[0].quantity) return res.json({message: "We dont have more this item en our inventory"})

            newArray_Saving = [...newArray_Saving, products[i]]
        }

        console.log("OLA PASO FELICIADES");
        console.log(newArray_Saving);
    })
})

export default router;