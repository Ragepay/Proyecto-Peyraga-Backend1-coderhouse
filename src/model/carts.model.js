import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

//  Esquema del documento/JSON/BSON de la BBDD.
const cartsSchema = new mongoose.Schema({
    products: [{
        _id: {
            type: String,
            unique: true
        },
        quantity: Number
    }]
});

//  Plugin del paginate
cartsSchema.plugin(mongoosePaginate);

//           collection/invocacion         (Collection, Esquema)
export const CartsModel = mongoose.model('carts', cartsSchema);