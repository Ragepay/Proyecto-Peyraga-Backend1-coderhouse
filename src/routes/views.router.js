import { Router } from "express";


const app = Router();

app.get('/products', (req, res) => {
    res.render('products', {
    });
});

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
    });
});

app.get('/carts/:id', (req, res) => {
    const { id } = req.params;
    //fetch
    res.render('carritos', {
    });
});

export default app;