import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

//  Esquema del documento/JSON/BSON de la BBDD.
const cartsSchema = new mongoose.Schema({
    products: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true, index:true },
        quantity: { type: Number, required: true }
    }]
});

cartsSchema.pre('find', function(){
    this.populate('products._id');
})

//  Plugin del paginate
cartsSchema.plugin(mongoosePaginate);

//           collection/invocacion         (Collection, Esquema)
export const CartsModel = mongoose.model('carts', cartsSchema);
