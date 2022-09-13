import MongoDBContainer from "../../containers/mongoDBContainer.js";
import mongoose from "mongoose";

import logger from "../../utils/logger.js";

export default class CartsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(
            "cart",
            new mongoose.Schema({
                timestamps: { type: Date },
                userId: { type: String, required: true, unique: true },
                products: Array,
            })
        );
    }

    async getByUserId(id) {
        try {
            const data = await this.getAll();
            if (data) {
                let obj = await this.collection.find(
                    { userId: id },
                    { __v: 0 }
                );
                if (obj) return obj[0];
                return null;
            }
        } catch (error) {
            logger.error(
                `Error al obtener el carrito por id de usuario: ${error}`
            );
        }
    }

    async addProduct(id, newProduct) {
        try {
            const { _id } = await this.getByUserId(id);
            const cart = await this.getById(_id);
            cart.products.push(newProduct);
            if (cart) {
                const data = await this.collection.findByIdAndUpdate(
                    _id,
                    { $set: { products: cart.products } },
                    {
                        new: true,
                    }
                );
                return data;
            }
        } catch (error) {
            logger.error(`Error al agregar producto al carrito: ${error}`);
        }
    }
    async deleteProduct(idProduct, id) {
        try {
            const { _id } = await this.getByUserId(id);
            const cart = await this.getById(_id);
            if (cart) {
                let prFind = await cart.products.filter(
                    (element) => element._id != idProduct
                );
                cart.products = prFind;
                this.editById(_id, cart);
            }
        } catch (error) {
            logger.error(`Error al eliminar producto del carrito: ${error}`);
        }
    }
}
