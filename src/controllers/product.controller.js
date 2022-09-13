import logger from "../utils/logger.js";

import ProductApi from "../services/productService.js";
const product = new ProductApi();

class ProductsController {
    constructor() {}

    async getFormAdd(req, res) {
        try {
            return res.render("pages/addProduct", {
                title: "Agregar Productos",
            });
        } catch (error) {
            logger.warn(error);
            res.status(401).json({
                error: -1,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async addProduct(req, res) {
        try {
            await product.addProduct(req.body);
            res.redirect("/home");
        } catch (error) {
            logger.warn(error);
            res.json({
                error: -1,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async getById(req, res) {
        try {
            const pr = await product.getById(req.params.id);
            return res.render("pages/product", {
                title: "Detalles del producto",
                data: pr,
            });
        } catch (error) {
            logger.warn(error);
            res.json({
                error: -1,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async getFormEdit(req, res) {
        try {
            const pr = await product.getById(req.params.id);
            return res.render("pages/editProduct", {
                title: "Editar Producto",
                data: pr,
            });
        } catch (error) {
            logger.warn(error);
            res.json({
                error: -1,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async editById(req, res) {
        try {
            await product.editById(req.params.id, req.body);
            res.redirect("/home");
        } catch (error) {
            logger.warn(error);
            res.json({
                error: -1,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async deleteByid(req, res) {
        try {
            await product.deleteById(req.params.id);
            return res.render("/home");
        } catch (error) {
            logger.warn(error);
            res.json({
                error: -1,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }
}

export default ProductsController;
