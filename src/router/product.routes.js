import {Router} from "express"; 
import ProductManager from "./controllers/ProductManager.js";

const product = new ProductManager();
const productRouter = Router();


productRouter.post("/products", async(req, res) => {
    let newProduct = req.body;
    res.send(await product.addProducts(newProduct));

});

productRouter.get("/products", async(req, res) =>{
    res.send(await product.getProducts());
})

productRouter.get("/products/:id", async(req, res) =>{
    let id = parseInt(req.params.id);
    res.send(await product.getProductsById(id));
})

productRouter.delete("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    res.send(await product.deleteProducts(id));
})

productRouter.put("/products/:id", async (req, res) =>{
    let id = parseInt(req.params.id);
    let updateProduct = req.body;
    res.send(await product.updateProducts(id, updateProduct));
})

export default productRouter;