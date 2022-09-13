import logger from "../utils/logger.js";

import { productsDao } from "../daos/index.js";

class ProductApi {
    constructor() {
        this.ProductApi = productsDao;
    }

    async getAll() {
        try {
            return await this.ProductApi.getAll();
        } catch (error) {
            logger.error(`Error al obtener los productos: ${error}`);
        }
    }
    async addProduct(newProduct) {
        try {
            await this.ProductApi.add(newProduct);
            logger.info(`Producto añadido: ${newProduct}`);
        } catch (error) {
            logger.error(`Error al añadir el producto: ${error}`);
        }
    }

    async getById(id) {
        try {
            const product = await this.ProductApi.getById(id);
            return product;
        } catch (error) {
            logger.error(`Error al obtener el producto por ID: ${error}`);
        }
    }
    async getFormEdit(id) {
        try {
            const product = await this.ProductApi.getById(id);
            return product;
        } catch (error) {
            logger.error(
                `Error al obtener el producto por ID para editar: ${error}`
            );
        }
    }
    async editById(id, productUpd) {
        try {
            const product = await this.ProductApi.editById(id, productUpd);
            return product;
        } catch (error) {
            logger.error(`Error al editar el producto: ${error}`);
        }
    }
    async deleteById(id) {
        try {
            const productDel = await this.ProductApi.deleteById(id);
            return productDel;
        } catch (error) {
            logger.error(`Error al eliminar el producto: ${error}`);
        }
    }
}

export default ProductApi;
