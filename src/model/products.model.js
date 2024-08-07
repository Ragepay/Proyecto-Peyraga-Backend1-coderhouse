import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

//  Esquema del documento/JSON/BSON de la BBDD.
const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnails: [String],
    categoria: {
        type: String,
        required: true
    }
});

//  Plugin del paginate
productsSchema.plugin(mongoosePaginate);

//           collection/invocacion         (Collection, Esquema)
export const ProductsModel = mongoose.model('products', productsSchema);
