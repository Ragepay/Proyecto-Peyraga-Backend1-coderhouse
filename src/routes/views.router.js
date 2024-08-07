import { Router } from "express";

const app = Router();

app.get('/', (req,res)=>{
    res.render('home',{
    });
});

app.get('/realTimeProducts', (req,res)=>{
    res.render('realTimeProducts',{
    });
});

export default app;