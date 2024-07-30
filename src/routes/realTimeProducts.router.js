import { Router } from "express";
//import { socketServer } from "../app";

const router = Router();

router.get('/', (req,res)=>{
    
    res.render('realTimeProducts',{
    });

});

export default router;