const express = require('express')
const router = express.Router();


/* RUTAS DE PRODUCTOS */

router.get("/saludame",(req,res)=>{
    try {
        const params = {
            idProduct : req.query.idProducts
        }
        console.log(params)
        console.log("---------")
    
        const info = fetch("")
    
        res.status(200).send()
    } catch (error) {
        console.log(error)
        res.status(400).send(JSON.stringify(error))
    }




})

module.exports = router