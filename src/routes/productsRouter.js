import { Router } from "express";
import { ProductManager } from '../ProductManager.js';

const productsRouter = Router();
const productManager = new ProductManager("./productos.json");

productsRouter.get("/", async (req, res) => {
    try{
    let limit = req.query.limit;
    let productArray = productManager.getProducts();
    if(isNaN(limit)) return res.status(200).send({status: "success", payload: productArray});
    let limitArray = productArray.slice(0,Number(limit));
        res.status(200).send({status: "success", limitArray});
    } catch (error) {
        res.status(400).send({status: "error",error: error.toString()});
    }
});

productsRouter.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try{
        let product = productManager.getProductById(id);
        res.status(200).send({status: "success", payload: await product});
    } catch (error) {
        res.status(400).send({status: "error", error: error.toString()});
    }
});

productsRouter.post("/", async (req, res) => {
    let product = req.body;
    try {
        let id = await productManager.addProduct(product);
        res.status(200).send({status: "success", payload: {id: id}});
    } catch (error) {
        res.status(400).send({status: "error",error: error.toString()});
    }
});

productsRouter.put("/:pid", async (req, res) => {
    let product = req.body;
    let productToChange = req.params.pid;
    try {
        await productManager.updateProduct(productToChange, product);
        res.status(200).send({status: "success"});
    } catch (error) {
        res.status(400).send({status: "error",error: error.toString()});
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    let product = req.params.pid;
    try {
        await productManager.deleteProduct(product);
        res.status(200).send({status: "success"});
    } catch (error) {
        res.status(400).send({status: "error", error: error.toString()});
    }
});

export default productsRouter;