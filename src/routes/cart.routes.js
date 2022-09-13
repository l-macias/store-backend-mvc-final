import express from "express";
const { Router } = express;
const router = new Router();

import CartController from "../controllers/cart.controller.js";
const controller = new CartController();

//Agrega un producto al carrito
router.post("/", controller.addCart);

//Elimina el carrito de un usuario
router.delete("/:userId", controller.deleteByUserId);

//Vacía el carrito según el id.
router.post("/:cartId", controller.emptyCart);

//Obtiene los productos del carrito según el id del usuario.
router.get("/:userId/products", controller.getById);

//Añade un producto al carrito según el id del usuario.
router.post("/:userId/products", controller.addProductCart);

//Elimina un producto del carrito según el id del usuario.
router.delete("/:userId/products/:productId", controller.deleteProductCart);

export default router;
