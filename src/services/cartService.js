import logger from "../utils/logger.js";

import { cartsDao } from "../daos/index.js";

class CartApi {
    constructor() {
        this.CartApi = cartsDao;
    }

    async addCart(newCart) {
        try {
            return await this.CartApi.add(newCart);
        } catch (error) {
            logger.error(error);
        }
    }

    async getById(id) {
        try {
            return await this.CartApi.getById(id);
        } catch (error) {
            logger.error(error);
        }
    }

    async getByUserId(id) {
        try {
            return await this.CartApi.getByUserId(id);
        } catch (error) {
            logger.error(error);
        }
    }

    async editById(id, cartUpd) {
        try {
            return await this.CartApi.editById(id, cartUpd);
        } catch (error) {
            logger.error(error);
        }
    }

    async deleteByUserId(id) {
        try {
            const { _id } = await this.CartApi.getByUserId(id);
            return await this.CartApi.deleteById(_id);
        } catch (error) {
            logger.error(error);
        }
    }

    async addProductCart(id, newProduct) {
        try {
            return await this.CartApi.addProduct(id, newProduct);
        } catch (error) {
            logger.error(error);
        }
    }
    async deleteProductCart(id, idProduct) {
        try {
            return await this.CartApi.deleteProduct(id, idProduct);
        } catch (error) {
            logger.error(error);
        }
    }
}

export default CartApi;
