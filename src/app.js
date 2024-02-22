import express from 'express'
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';

const port = 8080;

const app = express();


//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//routers
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter)

//main
app.get("/", async (req, res) => {
    res.send("Working");
});
app.listen(port, () => console.log("running"))
