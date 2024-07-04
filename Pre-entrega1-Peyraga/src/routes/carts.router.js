import { Router } from "express";
import { __dirname } from '../utils.js';
import CartManager  from '../class/cartsManager.js';


const router = Router();

const cartsManager = new CartManager(__dirname+ '/data/carts.json');

router.post('/', (req, res) => {

})

router.get('/', (req, res) => {

})

router.post('/', (req, res) => {

}) 



export default router;