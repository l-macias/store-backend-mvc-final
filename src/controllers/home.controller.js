import logger from "../utils/logger.js";

import ProductApi from "../services/productService.js";
const product = new ProductApi();

import CartApi from "../services/cartService.js";
const cart = new CartApi();

class HomeController {
    constructor() {}
    async getHome(req, res) {
        try {
            const { user, query } = req;
            if (query.statusCart) {
                cart.addCart({ userId: user._id });
            }
            const products = await product.getAll();
            if (products.length > 0) {
                return res.render("pages/home", {
                    title: "Lista de Productos",
                    data: products,
                    dataUser: user,
                });
            }
            return res.render("pages/home", { data: false, dataUser: user });
        } catch (error) {
            logger.warn(error);
            res.json({
                error: -1,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }
}

export default HomeController;
