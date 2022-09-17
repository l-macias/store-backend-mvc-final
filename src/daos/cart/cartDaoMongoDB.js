import MongoDBContainer from "../../containers/mongoDBContainer.js";
import mongoose from "mongoose";
import logger from "../../utils/logger.js";

export default class CartsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(
            "cart",
            new mongoose.Schema({
                userId: { type: String, required: true, unique: true },
                products: Array,
                total: Number,
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
            //creamos una copia del producto a añadir al carrito, para luego añadir cantidad y total.
            let newProd = JSON.parse(JSON.stringify(newProduct));

            if (cart) {
                let prFind = await cart.products.filter(
                    (element) => element._id == newProd._id
                );
                //Si existe el productoen el carrito, sumamos 1 a la cantidad y actualizamos el total.
                if (prFind.length > 0) {
                    prFind[0].quantity++;
                    prFind[0].total = prFind[0].quantity * prFind[0].price;
                    cart.products = cart.products.filter(
                        (element) => element._id != newProd._id
                    );
                    cart.products.push(prFind[0]);
                } else {
                    //Si no existe, lo agregamos al carrito y establecemos la cantidad en 1.
                    newProd.quantity = 1;
                    newProd.total = newProd.price * newProd.quantity;
                    cart.products.push(newProd);
                }

                const data = await this.collection.findByIdAndUpdate(
                    _id,
                    { $set: { products: cart.products } },

                    { new: true }
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
                let prFind = await cart.products.find(
                    (element) => element._id == idProduct
                );
                //Si Cantidad es mayor a 1, solo restamos 1
                if (prFind.quantity > 1) {
                    prFind.quantity--;
                    prFind.total = prFind.quantity * prFind.price;
                    //Buscamos el índice para solo actualizar dicho producto.
                    let index = cart.products.findIndex(
                        (element) => element._id == idProduct
                    );
                    cart.products[index] = prFind;
                    this.editById(_id, cart);
                } else {
                    //Si hay solo una unidad, eliminamos el producto del carrito.
                    cart.products = cart.products.filter(
                        (element) => element._id != idProduct
                    );
                    this.editById(_id, cart);
                }
            }
        } catch (error) {
            logger.error(`Error al eliminar producto del carrito: ${error}`);
        }
    }
}
