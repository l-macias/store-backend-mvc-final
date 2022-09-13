import logger from "../utils/logger.js";

import CartApi from "../services/cartService.js";
const cart = new CartApi();

import ProductApi from "../services/productService.js";
const product = new ProductApi();

class CartController {
    constructor() {}

    async addCart(req, res) {
        try {
            cart.addCart({ ...req.body });
            res.send("Carrito generado con éxito");
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async getById(req, res) {
        try {
            const { user } = req;
            const cartUser = await cart.getByUserId(req.params.userId);
            res.render("pages/cart", { dataUser: user, cart: cartUser });
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async deleteByUserId(req, res) {
        try {
            await cart.deleteByUserId(req.params.userId);
            res.send("Carrito eliminado con éxito");
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }
    async emptyCart(req, res) {
        try {
            const cartUser = await cart.getById(req.params.cartId);
            cartUser.products = req.body.products;
            await cart.editById(req.params.cartId, cartUser);
            res.send("Carrito vaciado con éxito");
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async addProductCart(req, res) {
        try {
            const newProduct = await product.getById(req.body.id_newProd);
            await cart.addProductCart(req.params.userId, newProduct);
            res.send("Producto añadido al carrito");
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }
    async deleteProductCart(req, res) {
        try {
            await cart.deleteProductCart(
                req.params.userId,
                req.params.productId
            );
            res.send("Producto eliminado del carrito");
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }
}

export default CartController;
